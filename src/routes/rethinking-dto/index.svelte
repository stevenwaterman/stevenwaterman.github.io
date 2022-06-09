<script lang="ts">
  import BlogPost from "$lib/blog/BlogPost.svelte";
  import Snippet from "$lib/blog/snippets/Snippet.svelte";
  import snippets from "./snippets";
</script>

<BlogPost id="rethinking-dto">
  <p>
    As part of Scott Logic's graduate training program, I spent 12 weeks working with the other grads on an internal 
    project.
    One aspect stuck with me more than the rest - the style and structure of our DTOs.
    It was controversial during the project, and the subject of much debate, but I've really grown to like it.
    
    It's not *the one true solution to all problems*, but it's an interesting approach which integrates well with 
    modern IDEs.
    Hopefully, the initial shock will pass and you'll like it too!
  </p>
  
  <h2>What <em>is</em> a DTO (Data Transfer Object)?</h2>
  
  <p>
    In client-server projects, data is often structured differently by the client (<em>presentation layer</em>) and the server (<em>domain layer</em>).
    This allows the server to store its information in a database-friendly or performant way, while providing a user-friendly representation for the client.
    The server needs a way to translate between the two data formats.
    Different architectures <em>do</em> exist, but we are just considering this one for simplicity.
    DTO-like objects can be used between any two data representations.
  </p>
  
  <figure>
    <img
      src="/assets/blog/rethinking-dto/header.png"
      title="Data Representation Layers"
      alt="The Client and API both use the Presentation Layer data representation. The Service and Domain layers both use the domain representation, while the Controller layer uses both representations and maps between them."
    />
  </figure>
  
  <p>
    A DTO is a server-side <a href="https://en.wikipedia.org/wiki/Value_object">value object</a> which stores data using the presentation layer representation.
    We separate DTOs into those received by the server (<code>Request</code>), and those returned by the server (<code>Response</code>).
    They are automatically serialised/deserialised by Spring.
  </p>
  
  <p>
    For context, here is an example endpoint using DTOs:
  </p>

  <Snippet config={snippets.endpoint}/>
  
  <h2>What makes a good DTO?</h2>
  
  <p>
    First, it's important to remember that you don't <strong>have</strong> to use DTOs.
    They are a programming <em>pattern</em>, and your code will work just fine without them.
  </p>

  <ul>
    <li>If you want to keep the same data representation in both layers, you can just use your entities as DTOs.</li>
    <li>If you want to manually serialise your entities into presentation layer JSON, I can't stop you!</li>
  </ul>
  
  <p>
    They also document the presentation layer in a declarative human-readable way.
    I like DTOs, and think you should use them because they decouple the presentation layer and domain layer, allowing you to be more flexible while reducing the maintenance load.
  </p>

  <p>
    However, not all DTOs are <em>good</em> DTOs.
    A <em>good</em> DTO should encourage API best practices and clean code principles.
  </p>
  
  <p>
    They should allow developers to write APIs that are internally consistent.
    Knowledge about a parameter on one endpoint should apply to parameters with the same name on all related endpoints.
    For example, given the snippet above, if the request's <code>price</code> includes VAT then the response's <code>price</code> should include it too.
    A consistent API prevents bugs that would be caused by differences between endpoints, while facilitating the learning of developers new to a project.
  </p> 
  
  <p>
    They should minimise boilerplate, and be fool-proof to write.
    If it is easy to make a mistake when writing a DTO, you will struggle to be consistent.
    DTOs should also be readable - we have this amazing description of the presentation layer's data representation, but it's useless if our DTOs are illegible.
    They should allow you to quickly view the data structure, even from another class.
  </p>

  <p>
    Let's have a look at our DTOs before seeing whether they achieve those goals.
  </p>
  
  <h2>Show us the code!</h2>
  
  <p>
    This code will be confusing at first, but stick with it.
    Under the code, I describe how it all fits together.
    In the remainder of the post, I explain why we implemented it this way, and what the benefits are.
    Hopefully you'll understand the code and appreciate it by the end!
  </p>

  <p>
    It is based roughly on actual code we wrote in our grad project, translated into the context of an online store.
    For each product, we store the name, sale price, and wholesale cost of its products.
    Prices are stored as floating-point numbers for the purposes of this example, but in real projects <a href="https://dzone.com/articles/never-use-float-and-double-for-monetary-calculatio">should be stored as BigDecimal</a>.
  </p>
  
  <Snippet config={snippets.productDto}/>

  <p>
    We create one file for each controller.
    It contains a top-level enum with no values, in this case <code>ProductDTO</code>.
    Under that, we split into <code>Request</code> and <code>Response</code>.
    We create one <code>Request</code> DTO per controller endpoint, and as many <code>Response</code> DTOs as necessary.
    In this case, we have two <code>Response</code> DTOs, where <code>Public</code> is safe to send to any user and <code>Private</code> includes the wholesale cost of a product.
  </p>
  
  <p>
    For each API parameter, we create an interface with the same name as the parameter.
    Each defines a single method - the getter for that parameter.
    Any validation goes on the interface's method - for example, the `@NotBlank` annotation ensures that no DTO will ever have `""` as its name.
  </p>

  <p>
    For each field on a DTO, we implement the associated interface.
    <a href="https://projectlombok.org/features/Value">Lombok's <code>@Value</code> annotation</a> auto-generates getters which satisfy the interfaces.
  </p>

  <hr/>
  
  <p>
    For a full comparison with documentation, see the two examples: <a href="https://gist.github.com/stevenwaterman/93881ec1b81d23066dfed96bbf636104">before</a> and <a href="https://gist.github.com/stevenwaterman/28f0ec03a0cc0370a3b0c9351917976b">after</a>.
    Bear in mind that this is a small example, and the differences become more apparent as you add more DTOs.
  </p>
  
  <hr/>
  
  <h2>"I hate it"</h2>

  <p>
    It <em>is</em> really weird.
    There's a lot of unusual things going on there - let's discuss a few in detail.
  </p>

  <p>
    <strong>There's three enums and none have any values!</strong>
    This is a <a href="https://stackoverflow.com/a/26619349">trick</a> to create namespaces in java, meaning we can reference a DTO as `ProductDTO.Request.Create`.
    That trick is also the reason there's a trailing <code>;</code> after each enum.
    The semicolon indicates the end of the (empty) list of values!
    Using namespaces improves discoverability by allowing us to type <code>ProductDTO</code> and rely on auto-completion to list the DTOs.
    There are other ways of achieving that, but this way is very concise, while preventing <code>new ProductDTO()</code> and <code>new Create()</code>.
    Honestly, this is personal preference and you can organise the classes however you like.
  </p>
  
  <p>
    <strong>There are also a lot of interfaces - one per API parameter!</strong>
    This is because we use the interfaces as a single source of truth for that parameter.
    I will talk a lot more about this later - but trust me that it brings a lot of benefits.
  </p>
  
  <p>
    <strong>The interface methods never get implemented!</strong>
    Yeah, this one is pretty weird and I wish there was a better way.
    Using Lombok's auto-generated getters to implement the interface is quite hacky.
    It would be much nicer to just define fields on the interfaces, which would also mean the DTO classes could be one-line long.
    However, java doesn't allow interfaces to have non-static fields.
    If you followed this pattern in other languages, it would be much neater.
  </p>
  
  <h2>It's (almost) perfect</h2>

  <p>
    Let's go back to the list of things that make a good DTO.
    Does this style achieve those goals?
  </p>
  
  <h3>Consistent Syntax</h3>

  <p>
    We definitely enforce consistent syntax - and that was the main reason we started using this pattern.
    Each API parameter has its syntax defined by the associated interface.
    If the DTO class contains a typo in a parameter name or incorrect return type, the code won't compile and your 
    IDE will warn you.
    For example:
  </p>
  
  <Snippet config={snippets.syntaxError}/>
  
  <p>
    Additionally, since validation is placed on the interfaces, it is consistent between DTOs.
    You can never have a situation where a value can be valid for a parameter on one endpoint but not another.
  </p>

  <h3>Consistent Semantics</h3>

  <p>
    This style helps enforce consistent semantics through inherited documentation.
    Each parameter has its semantic meaning defined by the documentation on associated interface method.
    For example:
  </p>

  <Snippet config={snippets.semantics}/>
  
  <p>
    Since the DTO classes implement the interfaces, the documentation is automatically inherited by the getters.
    This means that on every DTO instance, you can learn the semantic meaning and validation rules for a field by viewing the documentation for the method:
  </p>

  <figure>
    <img
      src="/assets/blog/rethinking-dto/documentation.png"
      title="Documentation for getCost()"
      alt="The documentation for getCost() on a DTO class is automatically copied from the Cost interface."
    />
  </figure>
  
  <p>
    You're also guaranteed that this documentation is present and consistent across all DTOs that implement a given interface.
    In the rare case where an API parameter with the same name *should* have different semantics, this style enforces that a new interface should be created.
    While this is a hassle, it forces the developer to stop and think, while also allowing future readers to immediately see that something is different.
  </p>

  <h3>Readable & Maintainable</h3>
  
  <p>
    There's no getting around this - our style introduces a lot of boilerplate.
    There are four interfaces that could be removed, and each DTO class has a long <code>implements</code> list that doesn't need to be there.
    However, the interfaces can be hidden away in their own package, which helps maintain the signal:noise ratio of the actual DTO class.
    Still, the boilerplate is the main downside of this style, and it's reasonable to choose a different style on that basis.
    To me, it's worth the extra interface definitions.
  </p>

  <p>
    Our style really shines when it comes to creating a new DTO.
    You simply write <code>@Value public static class [name] implements</code>, followed by a list of the fields you want.
    Then, declare the fields demanded by your IDE until it stops complaining.
    You're done - a full DTO with validation!
  </p>
  
  <p>
    Additionally, it's trivial to see the structure of our DTO classes.
    Looking at the code, you can see everything you need from the class signature.
    Each field is listed in the <code>implements</code> list.
    Since it's all declared in the class signature, you can simply press `ctrl+q` in IntelliJ and see the list of fields.
  </p>
  
  <figure>
    <img
      src="/assets/blog/rethinking-dto/implements.png"
      title="The list of interfaces implemented by a DTO"
      alt="When viewing the documentation for ProductDTO.Response.Private, you can see that it implements ID, Name, Price, and Cost."
    />
  </figure>
  
  <p>
    Our style has write-once validation, as all validation is added to the interface methods.
    When writing a DTO, you get validation for free after implementing the interface.
  </p>

  <p>
    Finally, thanks to our single-method interfaces, we can write reusable utility methods.
    For example, given the sale price and wholesale cost of a product, we can calculate its markup:
  </p>

  <p>
    <code>markup = (sale_price - cost_price) / cost_price</code>
  </p>
  
  <p>
    In Java, we can implement this using a generic method with type parameter <code>T</code>:
  </p>
  
  <Snippet config={snippets.generics}/>

  <p>
    Our single parameter has type T, which is a generic <a href="https://en.wikipedia.org/wiki/Intersection_type">intersection type</a>.
    <code>dto</code> must implement both <code>Price</code> and <code>Cost</code> - meaning you can't pass a <code>Public</code> response to <code>getMarkup</code> (as it does not implement <code>Cost</code>).
    With normal DTO classes, we would have to write this as a method which takes two parameters, adding overloads for each DTO (<a href="https://gist.github.com/stevenwaterman/93881ec1b81d23066dfed96bbf636104">see the example</a>).
    This offloads the work onto the caller, and risks getting the parameters backwards, causing bugs.
  </p>
  
  <h2>Conclusion</h2>
  
  <p>
    I don't expect you to go away and rewrite all your DTOs right now.
    There are, however, a lot of small things you can take away:
  </p>

  <ol>
    <li>Establish a single source of truth for your API parameters</li>
    <li>Small interfaces are better</li>
    <li>Try being weird, maybe you'll like it!</li>
  </ol>  
</BlogPost>


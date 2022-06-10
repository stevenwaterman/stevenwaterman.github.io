<script lang="ts">
  import BlogPost from "$lib/blog/BlogPost.svelte";
import Snippet from "$lib/blog/snippets/Snippet.svelte";
  import YoutubeEmbed from "$lib/blog/YoutubeEmbed.svelte";
  import snippets from "./snippets";
</script>

<BlogPost id="pick-n-mix">
  <p>
    <em>In this article, I discuss how the <code>Pick</code> utility type can help satisfy the Interface Segregation Principle in TypeScript</em>
  </p>
  
  <p>
    When an interface declares many unrelated methods, developers must implement functionality that's never used.
    This wastes time, makes code less readable, and can lead to runtime type errors after 'implementing' the interface with method stubs.
    The <a href="https://en.wikipedia.org/wiki/Interface_segregation_principle">Interface Segregation principle</a> (one of the 5 <a href="https://en.wikipedia.org/wiki/SOLID">SOLID</a> principles) warns against this.
  </p>

  <p>
    It states:
  </p>
  
  <blockquote>
    No client should be forced to depend on methods it does not use
  </blockquote>

  <p>
    That's the theory, anyway.
    What does interface segregation look like in practice?
  </p>

  <h2>Defining the Problem</h2>
  
  <p>
    I will be using the same example throughout this post.
    It is a (fairly unrealistic) implementation of a list of strings.
    All code is available <a href="https://github.com/stevenwaterman/typescript-pick-n-mix">on GitHub</a>.
  </p>
  
  <Snippet config={snippets.example}/>

  <p>
    In theory, there should be nothing stopping us using the <code>contains</code> function on an immutable (read-only) list.
    It only uses the <code>indexOf</code> function and wouldn't be affected by the missing <code>add</code> and <code>remove</code> methods.
    In practice, the TypeScript compiler won't like that.
  </p>
  
  <p>
    Given the immutable list implementation:
  </p>
  
  <Snippet config={snippets.list}/>

  <p>
    We can't call <code>contains(list, "friend")</code> because <code>list</code> does not implement the <code>add</code> or <code>remove</code> methods on <code>StringList</code>.
    In JavaScript, I could call <code>contains</code> without any problems because I know it only uses the <code>indexOf</code> method.
    In contrast, the TypeScript compiler follows the method signature, which requires that <code>list</code> implements all of <code>StringList</code> - including <code>add</code> and <code>remove</code>.
  </p>

  <p>
    One quick and hacky solution is to use a cast, calling <code>contains(list as StringList, "friend")</code>.
    This just disables the type checking, meaning we can't guarantee that <code>contains</code> doesn't call <code>add</code> or <code>remove</code>.
    Why even use TypeScript at that point?
  </p>
  
  <p>
    Another option is to implement the extra methods with stubs:
  </p>
  
  <Snippet config={snippets.stubs}/>

  <p>
    This is even worse, because now <code>contains(list, "friend")</code> works but the compiler also allows <code>replaceElement(list, "hi", "hello")</code>.
    Since <code>replaceElement</code> uses <code>add</code> and <code>remove</code>, this will cause a runtime error.
  </p>

  <p>
    The only remaining option is to actually implement the functionality:
  </p>

  <Snippet config={snippets.functional}/>

  <p>
    But we only wanted to call <code>contains(list, "friend")</code> - now we had to implement 2 methods for no reason.
    That's what the Interface Segregation principle was warning us about!
  </p>

  <p>
    Ok, so we know it's bad.
    We've had enough of these hacky 'solutions' - what are our options for a real fix?
  </p>

  <h2>Accepted Solutions</h2>
  
  <p>
    There are two ways that the Interface Segregation Principle is normally satisfied.
    Both involve dividing our large interface into multiple smaller ones.
  </p>
  
  <h3>Role Interfaces</h3>

  <p>  
    The first option is to create a new interface for each <em>role</em> that can be filled by our interface.
    Each of these new interfaces is called a <a href="https://martinfowler.com/bliki/RoleInterface.html"><em>Role Interface</em></a>.
    In our case, the <code>StringList</code> interface fills two roles:
  </p>

  <ul>
    <li><strong>Searching</strong> - finding elements in the list</li>
    <li><strong>Mutation</strong> - editing the contents of the list</li>
  </ul>
  
  <p>
    We should extract these roles into their own interfaces.
    The <code>replaceElement</code> function uses both roles, so we still need an interface with all 3 methods.
    That means we now have 3 interfaces:
  </p>
  
  <Snippet config={snippets.interfaces}/>

  <p>
    And our methods can be edited to specify which role they use.
    The <code>contains</code> method searches the list, and the <code>setElement</code> method mutates the list.
    The <code>replaceElement</code> method does both.
  </p>

  <p>
    Their method signatures now look like this:
  </p>

  <Snippet config={snippets.methods}/>

  <p>
    Using our immutable list from before, <code>contains(list, "friend")</code> works fine.
    More importantly, <code>replaceElement(list, "hi", "hello")</code> correctly causes a compiler error.
    If we implemented <code>add</code> and <code>remove</code>, we could call <code>setElement</code> and <code>replaceElement</code>.
    This clearly satisfies the Interface Segregation Principle.
  </p>

  <p>
    It wasn't easy though - defining the boundary of each role is complex and gets harder with bigger interfaces.
    It can be difficult to use Role Interfaces and they need adjusting when functionality is added.
    Also, it is hard to slowly refactor an existing codebase to use Role Interfaces, as most of the effort happens at first when breaking down the large interfaces.
  </p>

  <p>
    There are other downsides too - any documentation on <code>StringList</code> needs to be copied to <code>Searchable</code> and <code>Mutable</code>.
    These are likely to get out-of-sync, and we don't have a single source of truth, since each method is defined in multiple places.
  </p>

  <h3>Single-Method Interfaces</h3>
  
  <p>
    Taking Role Interfaces to an extreme reveals a second option.
    We could define each method in its own Single-Method Interface (SMI).
    We can then combine interfaces using <a href="https://www.typescriptlang.org/docs/handbook/advanced-types.html#intersection-types"><em>intersection types</em></a>.
  </p>

  <p>
    We don't need the <code>StringList</code> interface anymore, so we can remove than and replace it with single-method interfaces:
  </p>
  
  <Snippet config={snippets.smi}/>

  <p>
    Then we rewrite our methods so that any parameter with type <code>StringList</code> now specifies which methods it uses.
    The new method signatures are:
  </p>
  
  <Snippet config={snippets.smiSignatures}/>

  <p>
    As before, this correctly allows <code>contains</code> but not <code>replaceElement</code> when our list has only implemented <code>indexOf</code>.
    Implementing <code>add</code> and <code>remove</code> would satisfy <code>I_add</code> and <code>I_remove</code>, allowing us to call <code>setElement</code> and <code>replaceElement</code>.
  </p>

  <p>
    It can be confusing at first, and you end up with a lot of interfaces.
    It's also a pain to implement on a legacy project.
    Most of the refactoring work happens up-front, deleting and recreating any interfaces.
    On the plus side, we keep our single source of truth for each method, and we can move the documentation from <code>StringList</code> to the SMIs.
  </p>

  <p>
    Both solutions are workable, and in many other languages there is no alternative.
    Thankfully, TypeScript provides a third option.
  </p>
  
  <h2>Introducing Pick</h2>
  
  <p>
    In TypeScript, <a href="https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys"><code>Pick</code></a> is a built-in utility type.
    Given a complex type, we can select some of its functionality and ignore the rest:
  </p>
  
  <Snippet config={snippets.pickExample}/>

  <p>
    The <code>ThingWithAge</code> type selects the <code>age</code> and <code>incrementAge</code> properties from the <code>Person</code> type.
    The resulting type is:
  </p>
  
  <Snippet config={snippets.pickResult}/>
  
  <figure>
    <!-- svelte-ignore a11y-img-redundant-alt -->
    <img
      src="/assets/blog/pick-n-mix/header.png"
      title="Pick extracts some properties from a type"
      alt="This diagram doesn't really add anything to be honest, I just needed a picture for the article header"
    />
  </figure>

  <p>
    The strings are concerning, but it's completely type-safe.
    The compiler won't let you use <code>Pick&lt;Person, "nonExistentField"&gt;</code>, as <code>nonExistentField</code> is not a property on <code>Person</code>.
    This is thanks to <a href="https://www.typescriptlang.org/docs/handbook/advanced-types.html#string-literal-types">String Literal types</a> - a huge topic in and of itself.
  </p>

  <h2>Interface Segregation with Pick</h2>
  
  <p>
    We can use <code>Pick</code> to select parts of our large <code>StringList</code> interface.
    Our interface is the same as it was in the first example:
  </p>
  
  <Snippet config={snippets.firstInterface}/>
  
  <p>
    We then edit our utility functions so that their <code>list</code> parameters use <code>Pick</code> to choose the relevant parts of <code>StringList</code>.
  </p>
  
  <Snippet config={snippets.utility}/>

  <p>
    Again, this solves our problem by allowing <code>contains</code> and not <code>replaceElement</code>.
    We also don't need to write or modify any interfaces, allowing bad codebases to be refactored on a per-function basis.
    Even better, our documentation works out of the box - it is automatically exposed by <code>Pick</code>.
  </p>

  <figure>
    <img
      src="/assets/blog/pick-n-mix/docs.png"
      title="It's like magic"
      alt="The documentation automatically propagates from StringList to Pick"
    />
  </figure>
  
  <p>
    You may think it strange that in <code>replaceElement</code> we used the type <code>Pick&lt;StringList, "indexOf" | "add" | "remove"&gt;</code>.
    Since <code>StringList</code> only has those 3 methods, it's equivalent to just using <code>StringList</code> as the type for <code>list</code>.
    Listing the methods is best practice, even when you must list all of them.
    That way, when more methods are added to <code>StringList</code>, we don't automatically require them in <code>replaceElement</code>.
  </p>

  <p>
    Another point of confusion around <code>replaceElement</code> is that we require the <code>add</code> and <code>remove</code> methods on <code>list</code> even though we don't explicitly use them.
    We need those methods because they are required by <code>setElement</code>.
    This can be a pain, as it requires looking at the definition for every method used.
    Also, if <code>setElement</code> added another method to the type for <code>list</code>, every function that used <code>setElement</code> would also have to be updated.
  </p>

  <p>
    There is a solution to this problem, but it might get confusing.
    First, we need to define our own custom utility type:
  </p>
  
  <Snippet config={snippets.parameters}/>
  
  <p>
    So, what does that do?
  </p>

  <p>
    Our <code>Parameter</code> type depends on <code>Parameters</code>, <a href="https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterstype">a base TypeScript utility type</a>.
    To understand our type, we first need to understand <code>Parameters</code>.
    It's hard to describe in words, but easy to demonstrate.
  </p>

  <p>
    We have a function <code>function myFunc(a: string, b: number): boolean</code>.
    Its type is <code>(a: string, b: number) => boolean</code>.
    <code>Parameters&lt;typeof myFunc&gt;</code> returns <code>[string, number]</code> - a tuple of the parameter types for <code>myFunc</code>.
    If you're still confused, click the link above for more examples.
  </p>

  <p>
    Our utility type simply extracts one element of that tuple.
    <code>Parameter&lt;typeof myFunc, 0&gt;</code> is the same as <code>Parameters<typeof myFunc>[0]</code>, which resolves to <code>string</code>.
    We can use this utility type in the definition of <code>replaceElement</code>:
  </p>

  <Snippet config={snippets.usingUtility}/>
  
  <p>Essentially, this says:</p>
  
  <blockblockquote>
    <code>replaceElement</code> accepts a parameter called list.
    I'm going to call the <code>indexOf</code> method on it, and I'm going to pass it as the first argument to <code>setElement</code>.
    Make sure it can also do whatever <code>setElement</code> needs.
  </blockblockquote>
 
  <h2>Chaining</h2>
  
  <p>
    One difficulty with tightening our function parameters is the ability to do method chaining.
    For instance, in the first example, we could write a method:
  </p>
  
  <Snippet config={snippets.chaining}/>
  
  <p>
    And could use it as <code>chaining(list).indexOf("friend")</code>.
    It's not that simple when using segregated interfaces:
  </p>

  <p>
    If we declare <code>function chaining(list: Mutable): Mutable</code>, then we can't call <code>chaining(list).indexOf("friend")</code>.
    <code>chaining(list)</code> outputs <code>Mutable</code>, even if the <code>list</code> parameter was actually a subtype of <code>Mutable</code>.
    Since <code>Mutable</code> does not provide a <code>indexOf</code> method, we can't call it.
    The same issue occurs with Single-Method Interfaces and <code>Pick</code>.
  </p>

  <p>
    Instead, we have to use generics:
  </p>
  
  <Snippet config={snippets.genericChaining}/>
  
  <p>
    Now the output of the <code>chaining</code> method is the same as the type of the <code>list</code> parameter.
    If <code>list</code> implements <code>indexOf</code>, we can do <code>chaining(list).indexOf("friend")</code>.
  </p>
  
  <h2>Conclusion</h2>
  
  <p>
    Interface Segregation is an important part of clean code and is essential for long-term maintainability of object-oriented code.
    With TypeScript, it's simple to use <code>Pick</code> to divide up a large interface.
    It's interoperable with old code, and once you understand how it works, there's no downside.
    Do yourself a favour and start using <code>Pick</code> today.
  </p>
</BlogPost>
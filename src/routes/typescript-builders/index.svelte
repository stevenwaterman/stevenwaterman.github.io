<script lang="ts">
  import BlogPost from "$lib/blog/BlogPost.svelte";
  import Snippet from "$lib/blog/snippets/Snippet.svelte";
  import snippets from "./snippets";
</script>

<style>
  img {
    width: 100%;
  }
</style>

<BlogPost id="typescript-builders">
  <p>
    The builder pattern in TypeScript is amazing.
    However, the way you use it in TypeScript is completely different to other languages.
    Typically, builders are used to add support for optional and default parameters in languages that don't support them directly.
    TypeScript <em>already</em> supports <a href="https://www.typescriptlang.org/docs/handbook/functions.html#optional-and-default-parameters">optional and default parameters</a> though - so what's the point?
  </p>

  <p>
    We can actually use builders as a workaround for other issues in the type system.
    In TypeScript, that means a way to enforce complex constraints like <code>only allow sending an event if anyone is listening for that event</code>.
    In this (long but beginner-friendly) post, we do an in-depth walkthrough of how to create a TypeScript builder class to enforce a complex constraint like that one.
  </p>

  <p>
    We start by introducing a simple data processing task and discuss how it would be useful to create a generic version.
    That immediately gets too hard, so we introduce builders to save the day.
    Step-by-step, we analyse the problem and design a builder to solve the problem.
    We then discuss the pros and cons of that approach, and explore whether it was even necessary in the first place.
  </p>

  <h2>A Simple Task</h2>

  <p>
    Let's imagine a basic data processing task:
  </p>

  <figure>
    <img 
      src="/assets/blog/typescript-builders/Builders-Simple-Pipeline.svg"
      title="This definitely warranted a 5000 word blog post"
      alt="Shows a simple data pipeline that performs the following steps:"
    />
  </figure>

  <ol>
    <li>Take an integer string as input</li>
    <li>Reverse it</li>
    <li>Parse it back into an integer</li>
    <li>Multiply it by 5</li>
  </ol>

  <Snippet config={snippets.basic}/>

  <p>
    The rest of this blog post is dedicated to over-engineering that tiny bit of code.
    It's clearly overkill in this case, but that's inevitable when we use a simple example to demonstrate an advanced technique.
  </p>

  <h3>Making it Reusable</h3>

  <p>
    We saw how to do that task as a one-off, but what if we wanted it to be a configurable reusable function?
    We can define a function that takes a few config parameters:
  </p>

  <figure>
    <img 
      src="/assets/blog/typescript-builders/Builders-Configurable-Pipeline.svg"
      title="Not that you'd ever really want to set the radix"
      alt="The to Int and multiply steps take config parameters now"
    />
  </figure>

  <Snippet config={snippets.reusable}/>

  <p>
    Often, it's easier to take the config as a single object:
  </p>

  <figure>
    <img 
      src="/assets/blog/typescript-builders/Builders-Config-Object.svg"
      title="We're definitely doing it this way because it's intuitive and not because it makes the rest of the blog post simpler"
      alt="The radix and multiplicand parameters come from a single config object"
    />
  </figure>

  <Snippet config={snippets.singleObject}/>

  <p>
    That's useful as it allows the config to be loaded from a JSON file.
    <em>Conveniently</em> it also makes our job easier later on.
    What are the odds?
  </p>

  <h3>Formal Definition</h3>

  <p>
    Taking a step back, what is it that we're actually trying to do?
  </p>

  <p>
    This pattern is really common, and goes by a few names.
    Most commonly in computing, it's known as a <a href="https://en.wikipedia.org/wiki/Pipeline_(computing)">pipeline</a> - a function which takes data and performs a sequence of transformations.
    The fundamental technique in mathematics is called <a href="https://en.wikipedia.org/wiki/Function_composition">function composition</a> - combining many small functions into one larger function.
  </p>

  <p>
    Pipelines are used for things like application build config, or for http request middleware.
    Their main benefit is the ability to <em>encapsulate</em> many functions, allowing them to be treated as one.
  </p>

  <figure>
    <img 
      src="/assets/blog/typescript-builders/Builders-Encapsulation.svg"
      title="All good technical diagrams include a red scribble"
      alt="We can treat the entire pipeline as a single function"
    />
  </figure>

  <h3>A Pipeline Factory</h3>

  <p>
    Since we create pipelines so often, a reusable function that creates pipelines sounds really useful.
    The JavaScript implementation is simple using higher-order functions:
  </p>

  <Snippet config={snippets.factory}/>

  <figure>
    <img 
      src="/assets/blog/typescript-builders/Builders-Factory.svg"
      title="If only it was that easy"
      alt="We pass the three functions as a list into the pipeline factory, which outputs the factory"
    />
  </figure>

  <p>
    However, just because the JS code is simple, that doesn't mean it's easy to do (safely) in TypeScript.
    Of course, it's possible to just copy the JavaScript with a healthy sprinkling of <code>any</code>.
  </p>

  <p>
    That's no fun though - why even use TypeScript if you're just gonna ignore type errors?
    Let's try actually putting in some effort, and see how narrow we can make the types.
    As a first attempt, I get something like this:
  </p>

  <Snippet config={snippets.typescript1}/>

  <p>
    This has issues.
    To find out why, we need to learn some new terminology.
  </p>

  <h3>Math Time</h3>

  <p>
    It's time for a quick journey into the foundations of mathematical logic, so hold on…
  </p>

  <hr>

  <p>
    Ideally, we want a type definition to be <em>sound</em> and <em>complete</em>.
    <em>Soundness</em> means any function call that compiles will not cause type errors at runtime.
    <em>Completeness</em> means any valid function call should compile.
  </p>

  <p>
    Mathematicians have <a href="https://en.wikipedia.org/wiki/Soundness">much longer</a>, <a href="https://en.wikipedia.org/wiki/Completeness_(logic)">more general</a> definitions of those terms.
  </p>

  <p>
    Our first Pipeline Factory attempt is <em>sound</em> but not <em>complete</em>.
    It requires all the functions to be the same type.
    The JavaScript version is more powerful.
  </p>

  <p>
    The pipeline we created manually contains three stages.
    Some of them output a string, while others output a number.
    That's fine in our JS example, but won't compile in our TS example.
  </p>

  <p>
    Specifically, a pipeline is valid when each stage's output is the same type as the next stage's input.
    To achieve both soundness and completeness, we'd need a way to check for that.
  </p>

  <figure>
    <img 
      src="/assets/blog/typescript-builders/Builders-Constraint.svg"
      title="The outie bit needs to fit the innie bit. That's just how science works."
      alt="Each stage has a shaped input and output. They must match up like a jigsaw if the pipeline is going to work"
    />
  </figure>

  <p>
    It's not obvious how we could achieve both soundness and completeness at the same time.
    Any simple solutions will only achieve completeness by losing soundness, like this:
  </p>

  <Snippet config={snippets.completeness}/>

  <p>
    In other words, this would let us pass an invalid pipeline, like this:
  </p>

  <ol>
    <li>Take a string and reverse it</li>
    <li>Multiply by 5</li>
  </ol>

  <p>
    In step 1, we output a string, but in step 2 we expect a number as an input.
  </p>

  <figure>
    <img 
      src="/assets/blog/typescript-builders/Builders-Constraint-Error.svg"
      title="It's like when you get a box that's half full of Lego and half MegaBlocks..."
      alt="The output of reverse doesn't fit the input of multiply"
    />
  </figure>

  <hr>

  <p>
    Right, we're out of the woods now.
    Still with me?
    Let's get back to the code.
  </p>

  <h3>The problem</h3>

  <p>
    Our ideal pipeline definition is too complex.
    A pipeline is valid based on whether each element in an array matches the one before it.
    That's not something we can easily restrict.
  </p>

  <p>
    With builders, it's a different picture entirely.
  </p>

  <h2>Introducing Builders</h2>

  <p>
    A <a href="https://en.wikipedia.org/wiki/Builder_pattern">builder</a> is any utility class that uses sequential method calls to have the effect of a single method call.
    They are typically used for the creation of complex objects.
    For example, a string concatenation function could be written as:
  </p>
  
  <Snippet config={snippets.concatFunction}/>

  <figure>
    <img 
      src="/assets/blog/typescript-builders/Builders-String-Factory.svg"
      title="ARGH I FORGOT THE SPACES!!!"
      alt="A simple function that takes a list of strings and joins them together"
    />
  </figure>

  <p>
    Or it could be written as a builder, meaning it gets used like this:
  </p>

  <Snippet config={snippets.concatBuilder}/>
  
  <figure>
    <img 
      src="/assets/blog/typescript-builders/Builders-String-Builder.svg"
      title="This is definitely much easier :|"
      alt="Achieves the same thing but using repeated append calls on a builder"
    />
  </figure>

  <p>
    <code>StringBuilder</code> isn't something we see very often in TypeScript, because it's easy enough to just write it as a single method as seen above.
    In Java however, we see builders all the time (<a href="https://docs.oracle.com/javase/8/docs/api/java/lang/StringBuilder.html">including <code>StringBuilder</code></a>).
    That's because Java's type system is less flexible than TypeScript's.
  </p>

  <blockquote>
    Builders make up for inadequacies in the type system
  </blockquote>

  <p>
    In Java, they let us call functions with a varying number of arguments, and provide a way to support optional and default parameters.
    TypeScript already supports <a href="https://www.typescriptlang.org/docs/handbook/functions.html#optional-and-default-parameters">all</a> of <a href="https://www.typescriptlang.org/docs/handbook/functions.html#rest-parameters">that</a>, but builders can let us enforce more complex constraints, like our pipeline's output-equals-input constraint.
  </p>

  <p>
    We can achieve that by using a technique that I'm calling <em>Mutable Generic State</em>.
  </p>

  <p>
    <em>If it already has a name, please <a href="https://twitter.com/stewaterman">let me know</a>. I spent a long time looking.</em>
  </p>

  <h2>Mutable Generic State</h2>

  <p>
    Mutable Generic State is a technique which uses immutable classes to give the impression of a class with mutable generic types.
  </p>

  <p>
    Let's imagine a simple string wrapper class.
    It stores a string which can be accessed with <code>.get()</code> and updated with <code>.set()</code>.
  </p>

  <Snippet config={snippets.mutableGeneric1}/>

  <p>
    Here, the return type of <code>a.get()</code> is <code>string</code>.
    We can make <code>a.get()</code> return <code>"hello"</code>, by using type literals in a generic type:
  </p>

  <Snippet config={snippets.mutableGeneric2}/>

  <p>
    However, now we can't call <code>a.set()</code> unless the new value is also <code>"hello"</code>.
    With Mutable Generic State, it all works as expected:
  </p>

  <Snippet config={snippets.mutableGeneric3}/>

  <p>
    The trick here is that we've made <code>StringWrapper</code> immutable.
    When we call <code>.set()</code>, we are actually creating a new instance of StringWrapper with a different generic parameter.
    Once those calls are inlined, there's no way to tell that each <code>.set()</code> call produces a new wrapper:
  </p>

  <Snippet config={snippets.mutableGeneric4}/>

  <figure>
    <img 
      src="/assets/blog/typescript-builders/Builders-MGS.svg"
      title="Sadly, one thing builders can't solve is YOU BEING AN IDIOT THAT FORGETS THE SPACES"
      alt="Achieves the same thing but using repeated append calls on a builder"
    />
  </figure>

  <p>
    From the user's perspective, it's like we've <em>mutated</em> the generic type from <code>"hello"</code> to <code>"there"</code> to <code>"friends!"</code>.
    The generic type tells us something about the current state of the builder, and it mutates when the builder does.
    That's where the name comes from - it's <em>state</em>, stored in the <em>generic</em> types, which is <em>mutable</em>.
  </p>

  <h2>Types of Constraints</h2>

  <p>
    When thinking about types, we think of it in terms of <em>constraining</em> the set of possible data types.
    Some of those constraints are <em>simple</em>:
  </p>

  <blockquote>
    String wrappers should contain a string
  </blockquote>

  <p>
    Some constraints are <em>complex</em>:
  </p>

  <blockquote>
    Calling <code>.get()</code> on a string wrapper should return the type of the argument passed in the last call to <code>.set()</code>
  </blockquote>

  <p>
    Complex constraints are <em>relative</em>.
    They change based on previous method calls, or previous elements in an array.
    In the case of <code>StringWrapper</code>, the arguments passed to <code>.set()</code> are conditionally valid based on previous <code>.set()</code> calls.
  </p>

  <p>
    That's not the only requirement though.
    A constraint can only be complex if it is potentially infinite.
    Otherwise, we could just list all valid type combinations.
    Our string wrapper has an infinite number of strings it could hold, and no limit on the number of calls to <code>.set()</code>.
  </p>

  <h2>When to use builders</h2>

  <p>
    Builders are clunky, hard to write, and hard to use.
    If you can do it without a builder, that's probably best.
    They should be a last resort.
  </p>

  <p>
    It's not always possible to use a builder.
    For example, builders can't help when writing type definitions for a pre-existing JavaScript library, as they exist in the compiled JavaScript code.
    You can still use builders in a wrapper around the library though!
  </p>

  <p>
    Sometimes, a builder is more readable and simpler than the alternative.
    If it's <em>technically possible</em> to achieve without a builder, but you don't know how, a builder is still a valid choice.
    In fact, as of TypeScript 4, you <em>technically</em> never need a builder.
    I'll come back to this right at the end, so keep an eye out.
    In practice though, a builder is usually a better option.
  </p>

  <p>
    If it wasn't already obvious, our pipeline example is a good candidate for a builder!
  </p>

  <h2>Builder building 1: Identifying the Generics</h2>

  <p>
    Now we're set on solving the problem with a builder, where do we start?
    The first step is to identify the generic types it needs.
    Some of those types will change as we call methods on the builder - the mutable generic state.
    Others are just normal generic types.
  </p>

  <p>
    There are two places we need to look:
  </p>

  <ol>
    <li>The builder's output</li>
    <li>The complex constraints</li>
  </ol>

  <p>
    The builder's output is dependent on what we passed in our method calls.
    In order to correctly type it, we need to add some generic state to the builder.
    In our case, the output is a function which performs some kind of data transformation on an input, producing an output, based on config.
    All three of those should be generic types.
  </p>

  <figure>
    <img 
      src="/assets/blog/typescript-builders/Builders-Output-Generics.svg"
      title="They were right there all along!"
      alt="The generic types needed for the built pipeline are the input, output, and config"
    />
  </figure>

  <p>
    Next, we need to think about the constraints on our builder and how they map to Mutable Generic State.
  </p>

  <p>
    To create our pipeline, we need a sequence of stages where:
  </p>

  <ul>
    <li>There is a defined order</li>
    <li>Each one has two arguments - input and config</li>
    <li>The output of one stage is the first argument to the next stage</li>
  </ul>

  <figure>
    <img 
      src="/assets/blog/typescript-builders/Builders-Mutation-Constraint.svg"
      title="Make them all fit together"
      alt="Visual representation of those bullet points using the jigsaw-like style"
    />
  </figure>

  <p>
    The first constraint is achieved by simply storing the stages in a list in the order they were added to the builder.
    The second constraint is a simple type definition: <code>(input: any, config: any) =&gt; any</code>.
    The final constraint is complex, and must be enforced using Mutable Generic State.
  </p>

  <h3>Enforcing Stage Consistency</h3>

  <p>
    Consider the builder in an intermediate state.
    We have a few stages already added, and assume that everything is correct until now.
  </p>

  <figure>
    <img 
      src="/assets/blog/typescript-builders/Builders-Intermediate-Builder.svg"
      title="A happy little community of stages!"
      alt="The builder has 3 stages added"
    />
  </figure>

  <p>
    What information do we need about the previous calls to add a new stage to our pipeline?
    Well, that depends on how we add the new stage.
    I can see a few options:
  </p>

  <ol>
    <li>Only add stages to the start of the pipeline</li>
    <li>Only add stages to the end of the pipeline</li>
    <li>Add stages anywhere valid in the pipeline assuming it doesn't make the pipeline invalid</li>
    <li>Add stages anywhere in the pipeline, even if it becomes invalid, and only allow building the pipeline when it's valid</li>
  </ol>

  <p>
    All four options are <em>possible</em> using builders and Mutable Generic State, but some are easier than others.
  </p>

  <p>
    Options 1 and 2 are both pretty simple. 
    In option 1, we need to know the current pipeline input and the new stage's output.
    In option 2, we need the pipeline's output and the new stage's input.
  </p>

  <p>
    Option 3 is quite hard.
    We need to know the state before and after each stage of the pipeline:
  </p>

  <ul>
    <li>If we insert at the start, we restrict the output of the new stage.</li>
    <li>If we insert at the end, we restrict the input of the new stage.</li>
    <li>If we insert in the middle, we restrict both the input and output. Both must be the same as the state at the insertion point.</li>
  </ul>

  <p>
    Option 4 is nightmarish.
    I'm not going to go into detail, because this is already an absurdly long post.
    Feel free to try, and let me know if you get it to work!
  </p>

  <p>
    We need to weigh up user-friendliness vs simplicity of writing the builder.
    To me, options 3 and 4 are too complex and don't make the final builder <em>that much</em> easier to use.
    Between options 1 and 2, there's no difference in complexity but adding to the end of the pipeline is more natural.
  </p>

  <p>
    Therefore, I'm going with option 2.
    <strong>When adding a stage, we need to know its input and the current pipeline's output.</strong>
  </p>

  <figure>
    <img 
      src="/assets/blog/typescript-builders/Builders-Stage-Consistency-Check.svg"
      title="An outsider - but they mesh well!"
      alt="We add a fourth stage, and it is valid because it fits against the current output"
    />
  </figure>

  <p>
    Getting the input of the new stage is simple with a generic type on the builder's <code>append</code> method.
  </p>

  <p>
    We already have an <code>Output</code> generic type on the builder, but we'll need to update it over time.
    Whenever we add a new stage to the pipeline, we update <code>Output</code> to be the output of the new stage.
  </p>

  <h3>Tracking the Config</h3>

  <p>
    There's one other constraint on our builder.
    The config in the resulting pipeline needs to provide the information to each stage.
    I'm going to skip the in-depth discussion of how we could achieve that and tell you the solution.
    When talking about function parameters, it's simplest to just use a single config object.
  </p>

  <p>
    In other words, rather than our stages looking like this:
  </p>

  <Snippet config={snippets.preConfig}/>

  <p>
    We should just require them to look like this:
  </p>

  <Snippet config={snippets.postConfig}/>

  <p>
    The first example can work, but it's usually not worth the extra effort.
  </p>

  <p>
    We already had the <code>Config</code> generic type, but now we know it needs to be mutable.
    Whenever we append a stage, its config parameters should be added to the <code>Config</code> generic type.
  </p>

  <figure>
    <img 
      src="/assets/blog/typescript-builders/Builders-Config-Consistency.svg"
      title="Grow! GROW!!!"
      alt="When we add a fourth stage, the config is also updated"
    />
  </figure>

  <h2>Builder building 2: Structuring the Builder</h2>

  <p>
    Now we know what our generic types are and how they update, we can start writing our builder.
    Just focus on the types for now, since that's the hard bit.
    We can fill in the method stubs later.
  </p>

  <h3>Class Definition</h3>

  <p>
    Create a new class for our builder, with the generics we figured out previously.
  </p>

  <Snippet config={snippets.builderClass}/>

  <p>
    If you haven't seen the <a href="https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeystype">Record type</a> before, just know that we're saying that <code>Config</code> must be an object with strings for its keys.
  </p>

  <h3>Build definition</h3>

  <p>
    The build method creates the output of the pipeline.
    It's really nothing special.
    We declare a method which outputs a pipeline function based on the generic types:
  </p>

  <Snippet config={snippets.buildDefinition}/>

  <h3>Mutator Definition</h3>

  <p>
    The mutator method is the one that changes something about the object, in our case <code>append</code>.
    It's not an entirely accurate name, since our builders are immutable, but it makes sense when we're conceptualising them as mutable objects.
  </p>

  <p>
    Thinking back to our discussion about how to enforce the constraints with Mutable Generic State, how should each of the three type parameters change after a call to append?
    Firstly, <code>Input</code> should not change. Stages are added to the end of the pipeline and don't affect the start.
  </p>

  <p>
    Regarding <code>Output</code>, we said:
  </p>

  <blockquote>
    Whenever we add a new stage to the pipeline, we update the type to be the output of the new stage.
  </blockquote>

  <p>
    Regarding <code>Config</code>, we said:
  </p>

  <blockquote>
    Whenever we append a new stage, any new parameters in that stage should be added to the <code>Config</code> generic type.
  </blockquote>

  <p>
    In terms of a type definition, that looks like this:
  </p>

  <Snippet config={snippets.appendDefinition}/>

  <p>
    <code>Output</code> becomes <code>NewOutput</code> and <code>Config</code> becomes <code>Config &amp; NewConfig</code>, an <a href="https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html#intersection-types">intersection type</a>.
  </p>

  <p>
    Notice that after a few calls to <code>append</code>, the <code>Config</code> type will be something like <code>Config & NewConfig1 & NewConfig2 & NewConfig3 & NewConfig4</code>
  </p>

  <p>
  That is harmless, and just a quirk of the Mutable Generic State, so don't be alarmed if you see a huge type when you weren't expecting one.
  The autocomplete will get better once the builder is done and in use.
  </p>

  <h3>Internal State</h3>

  <p>
  The internal state should just be whatever the <code>build</code> method needs for its implementation.
  In our case, we only need the list of stages.
  We add that as a private readonly property, and give it the narrowest type we can:
  </p>

  <Snippet config={snippets.stages}/>

  <h3>Instantiation</h3>

  <p>
    Up until this point, we have ignored how to instantiate a new pipeline builder, just assuming that we had one ready-made.
    Unsurprisingly, it's more complex than just adding a constructor.
    In fact, we need two different ways of creating a builder.
  </p>

  <p>
    First, we need a private constructor to use internally.
    It allows 'mutation' of the builder, setting <code>stages</code> to any value, even if that would break the resulting pipeline.
    That's why it must be private.
  </p>

  <Snippet config={snippets.constructor}/>

  <p>
    Secondly, we need a public creation method.
    It should set reasonable defaults for the type parameters where possible, in line with what you'd expect from an 'empty' builder.
  </p>

  <Snippet config={snippets.staticInstantiator}/>

  <p>
    Here, the <code>Config</code> parameter was set to a reasonable default of <code>{"{}"}</code>, since a pipeline with no stages doesn't need config.
    Other type parameters may have to be manually specified by the user, like the <code>Input</code> type.
    The <code>Output</code> type is the same as <code>Input</code> since a pipeline with no stages just outputs the input.
  </p>

  <p>
    Alternatively, by requiring at least one stage in each pipeline, there's no need to manually specify any generic types:
  </p>

  <Snippet config={snippets.inferredGenerics}/>

  <p>
    I'm going with the first option, but it's a matter of preference.
  </p>

  <h2>Builder building 3: Implementation</h2>

  <p>
    Finally, the method stubs need implementing.
    The implementation is standard TypeScript, without having to worry about the complex constraints.
    Those are handled by the method signatures.
  </p>

  <p>
    However, be aware that the builder <strong>isn't really type-safe</strong>, at least internally.
    A few casts are needed to get the types to work, which means simple mistakes like adding a stage in the wrong location won't cause type errors.
    Double-checking that everything lines up is imperative.
  </p>

  <p>
    Implementing those methods is the last step, meaning the builder is now done!
    Here's one I made earlier:
  </p>

  <Snippet config={snippets.implementation}/>

  <p>
    In a whistle-stop tour of the implementation, we see that:
  </p>

  <ul>
    <li>The constructor sets the <code>stages</code> property</li>
    <li><code>new</code> creates an empty builder - one with no stages</li>
    <li><code>append</code> creates a new list of stages, adds the new stage, and returns a new builder based on that</li>
    <li><code>build</code> returns a function which takes an input and some config, then sequentially applies the stages</li>
  </ul>

  <h3>Usage</h3>

  <p>
    Let's see the builder in action:
  </p>

  <Snippet config={snippets.usage}/>

  <p>
    I defined the stages above, but they could've been inlined as arrow functions.
  </p>

  <p>
    We call <code>PipelineBuilder.new&lt;string&gt;()</code> to create a new builder that takes a string as input.
    Then we append our three functions in the correct order.
    Finally, we call <code>.build()</code> to get a pipeline that we can call, and then we try it out.
  </p>

  <figure>
    <img
      src="/assets/blog/typescript-builders/Builders-Usage.svg"
      title="The code may be simple, but the complexity of this diagram makes me feel a bit better about how long the post is!"
      alt="Visual representation of the last paragraph's description"
    >
  </figure>

  <p>
    It's hard to demonstrate the builder, because the most impressive bit is all the things you <em>can't do</em>.
    Here's a gallery of things that won't compile:
  </p>

  <hr>

  <p>
    <strong>Invalid first pipeline stage, <code>multiply</code> takes a <code>number</code> but got a <code>string</code></strong>:
  </p>

  <Snippet config={snippets.error1}/>

  <hr>

  <p>
  <strong>Invalid second pipeline stage, <code>toInt</code> outputs a number but inputs a string</strong>:
  </p>

  <Snippet config={snippets.error2}/>

  <hr>

  <p>
  <strong>Invalid type on <code>output</code>, pipeline returns <code>string</code></strong>:
  </p>

  <Snippet config={snippets.error3}/>

  <hr>

  <p>
  <strong>Invalid pipeline input, should be string</strong>:
  </p>

  <Snippet config={snippets.error4}/>

  <hr>

  <p>
  <strong>Invalid config, missing radix</strong>:
  </p>

  <Snippet config={snippets.error5}/>

  <hr>

  <p>
    <a href="https://en.wikipedia.org/wiki/Soundness">Sound.</a>
  </p>

  <h2>Analysing the Builder</h2>

  <p>
    This is not a simple technique, and I've really hyped it up.
    However, there are drawbacks, and things can easily go wrong.
    Let's discuss a couple of those rough edges.
  </p>

  <h3>Immutable internal state</h3>

  <p>
    Each call to the <code>.append()</code> method creates a new builder.
    That's a bit slow, but that's not the main issue.
    There's no guarantee that someone won't hold on to an old builder, like this:
  </p>

  <Snippet config={snippets.error6}/>

  <p>
    If <code>stages</code> was mutable, and append looked like this:
  </p>

  <Snippet config={snippets.error7}/>

  <p>
    Then <code>a</code> and <code>b</code> both hold the same reference to <code>stages</code>, and now both contain one stage.
    However, the <code>Output</code> type parameter on <code>a</code> says it returns a string.
    In reality, a pipeline created from <code>a</code> would be identical to one created from <code>b</code>, and would return a number.
  </p>

  <p>
    The long and short of it is: <strong>the builder's variables must be immutable</strong>.
  </p>

  <h3>Unsafe types</h3>

  <p>
    The implementation has <code>any</code> littered throughout it.
    If you're anything like me then alarms are ringing.
    Isn't the whole point that we want to <em>increase</em> type safety?
  </p>

  <p>
    Yes, and that's the core issue.
    If we could write a correct type for <code>stages</code>, one which guarantees the input to a stage is the output of the previous one, we wouldn't need a builder.
    We can't do that directly*, so instead we guarantee that the type meets those requirements through the type signature of <code>.append()</code>.
  </p>

  <p>
    Essentially, we encapsulate all the type-unsafe code behind a type-safe interface.
    For that reason, adding to a builder like in <code>.append()</code> requires extreme care.
    That internal constructor <em>is not</em> type-safe, and would accept almost anything.
    If the list passed to the constructor breaks that <code>input to x == output of x-1</code> guarantee, then any pipelines built from it will break.
  </p>

  <h3>Another Way?</h3>

  <p>
    There was a suspicious asterisk in the previous section, and earlier I promised to tell you more about the wonders of TypeScript 4.
    Buckle up!
  </p>

  <p>
    For the entirety of this post, we've just accepted the fact that you can only resolve complex constraints with builders.
    In fact, that's not true.
    I'm not saying builders are useless, and in fact this section should come with a disclaimer:
  </p>

  <blockquote>
    <strong>The stunts performed in this section were done with a complete disregard for best practice.</strong>
    <strong>Don't try this at work.</strong>
  </blockquote>

  <hr>

  <p>
    Allow me to introduce <a href="https://devblogs.microsoft.com/typescript/announcing-typescript-4-0/">TypeScript 4.0</a>, and more importantly, <a href="https://github.com/microsoft/TypeScript/pull/39094">Variadic Tuple Types</a>.
    Variadic tuple types <strong>massively</strong> increase the flexibility of TypeScript's tuples.
  </p>

  <p>
    With variadic tuples, we can actually implement anything we could use a builder for as a normal type constraint.
    It will be huge, unmaintainable, and really hard to write (this took me a day), but it's possible.
    Even better, these don't exist at runtime which means they work when writing type declarations for a 3rd-party library.
  </p>

  <p>
    Here's the pipeline without a builder:
  </p>

  <Snippet config={snippets.complex}/>

  <p>
    This snippet declares that a pipeline is a list of functions in the form <code>Array&lt;(input: Input, config: Config) =&gt; Output&gt;</code>.
    Then, it defines what makes a pipeline valid:
  </p>

  <p>
    A pipeline with only one stage is always valid.
    A longer pipeline is only valid if:
  </p>

  <ul>
    <li>The output type of the first stage is the input type of the second stage <strong>and</strong></li>
    <li>The pipeline consisting of all stages except the first is valid</li>
  </ul>

  <p>
    That's right, a recursive conditional type definition!
    If the pipeline is 10 stages long, we end up with a 10-layer nested type:
  </p>

  <figure>
    <img
      src="/assets/blog/typescript-builders/Builders-Varaidic.svg"
      title="Recursive type definitions are a bit of a trip"
      alt="Shows the full recursive type checking of a pipeline"
    >
  </figure>

  <hr>

  <p>
    It goes without saying that you probably shouldn't do this without good reason.
    The <code>createPipeline</code> method signature, with 238 characters on one line, is probably enough evidence of that.
  </p>

  <p>
    If you do have a good reason to do this though, hooray!
    It's finally possible.
    Look how nice that <code>createPipeline</code> call is!
  </p>

  <p>
    I'm really excited about variadic tuple types, so keep an eye out for a future blog post on that topic.
  </p>

  <h2>Conclusion</h2>

  <p>
    We've introduced the idea of a pipeline, and discussed how it's really hard to achieve type soundness in a pipeline factory function.
    Builders came in to save the day, introducing us to Mutable Generic State.
  </p>

  <p>
    We used the pipeline as a worked example, establishing what generic types the builder would need.
    Our builders couldn't enforce the complex constraints on the state directly, so we set up our methods to prevent the internal state becoming invalid.
  </p>

  <p>
    Finally, we discussed the issues with using the builder pattern, and ended with a bang courtesy of variadic tuple types.
  </p>

  <p>
    Next time you find yourself cursing a type definition that's <strong>just not narrow enough</strong>, I hope your newfound builder knowledge is useful!
  </p>

  <hr>

  <p>
    If you made it this far, congrats.
    This is the longest blog post I've ever written, by a large margin, and it's taken me 6 months to finish.
  </p>

  <p>
    I really hope you enjoyed it, and I hope you found it useful.
    Feel free to contact me on <a href="https://twitter.com/SteWaterman">Twitter</a> with any questions, feedback, or to point out mistakes!
  </p>

  <hr>

  <p>
    My follow up post '<a href="/reducer-builder">Better Redux Reducers with TypeScript Builders</a>' is now live.
    It demonstrates how to use the builder pattern we saw in this post to create Redux Reducers.
    If you want a more realistic example of where builders can help in your TypeScript projects, go check it out!
  </p>
</BlogPost>

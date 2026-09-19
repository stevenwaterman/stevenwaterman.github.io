<script lang="ts">
  import BlogPost from "$lib/blog/BlogPost.svelte";
  import Snippet from "$lib/blog/snippets/Snippet.svelte";
  import snippets from "./snippets"
</script>

<BlogPost id="reducer-builder">
  <p>
    If you haven't read <a href="/typescript-builders">my last blog post</a>, I'd recommend it, but I'm the kind of person to ignore that warning so no judgement here!
  </p>

  <p>
    In this post, I show how the builder pattern can be used to create Reducers in a TypeScript React-Redux app.
    I discuss the benefits of that approach before walking through the code and explaining what it does at each step.
  </p>

  <p>
    It's not perfectly type-safe, but that's not the goal.
    Instead, we use the builder pattern to create a type-safe boundary around unsafe code.
    That way, we can get the best of both worlds - a utility method that is both safe <em>and</em> maintainable.
  </p>

  <h2>Redux Reducers</h2>

  <p>
    I'll assume you have used Redux before, but here's a quick primer if not:
  </p>

  <p>
    Redux is a state management library that's usually used with React.
    In Redux, there is a single global 'store' which contains the current state of the website.
    The store is updated by dispatching an 'action' onto the store.
    Each action has two properties, <code>type</code> and <code>payload</code>.
    Attach a 'reducer' to the store to define how the state should change when an action is received.
    Each reducer contains a number of cases, where each case handles a given type of action.
  </p>

  <p>
    For a full explanation of those concepts and the terminology, <a href="https://redux.js.org/tutorials/essentials/part-1-overview-concepts#reducers">read the official documentation</a>.
  </p>

  <h2>Redux Type Safety</h2>

  <p>
    For the remainder of this post, we will be using <a href="https://redux.js.org/redux-toolkit/overview">Redux Toolkit</a>, the official recommended way to develop Redux apps.
    However, you could easily tweak this code to work in a plain Redux project that doesn't use Redux Toolkit.
  </p>

  <p>
    In Redux Toolkit, you are expected to use 'action creators' rather than writing your actions as object literals.
    They are important later, so let's start by writing a couple of action creators.
    I'll assume our app is a counter, meaning the state is a number and we have two actions:
  </p>

  <Snippet config={snippets.actions}/>

  <p>
    Now that we have our actions, there are two ways to create a reducer that handles them:
  </p>

  <ol>
    <li>From a map of action types to handlers</li>
    <li>Using a builder</li>
  </ol>

  <h3>Option 1: Using a Map</h3>

  <p>
    Here, you can call <code>createReducer()</code>, passing a map of action types to handlers, like this:
  </p>

  <Snippet config={snippets.createReducer}/>

  <p>
    Then, we can dispatch actions onto the reducer.
    Note that this isn't how you normally use a reducer, and it's just to demonstrate the type safety.
  </p>

  <Snippet config={snippets.reducerUsage}/>

  <p>
    That's all well and good, but there's nothing stopping us dispatching an action that doesn't exist on the reducer:
  </p>

  <Snippet config={snippets.invalidAction}/>

  <p>
    Likewise, there's nothing saying we even need to pass the correct type of payload:
  </p>

  <Snippet config={snippets.invalidPayload}/>

  <p>
    Nothing we've seen so far has caused a compiler error.
    Our <code>decrement</code> action would just do nothing, while passing the wrong payload type or  would probably cause runtime errors.
  </p>

  <p>
    It's clear that this isn't strongly typed at all.
  </p>

  <h3>Option 2: Using a Builder</h3>

  <p>
    First, note that this isn't the builder that I promised in the intro.
    Redux Toolkit provides its own Reducer Builder which is insufficient for reasons that will soon become obvious.
  </p>

  <Snippet config={snippets.builtInBuilder}/>

  <p>
    As before, we can create our builder that handles the two actions, then dispatch actions to it.
    Also like before, we can dispatch a load of invalid actions without causing any compiler errors:
  </p>

  <Snippet config={snippets.builderInvalidActions}/>

  <p>
    That's really not ideal, and essentially means that the core of your type-safe TS project is completely unsafe.
    There must be a better way, and there is:
  </p>

  <h2>Fixing it with Mutable Generic State</h2>

  <p>
    Let's start with the end product, a type-safe Reducer Builder:
  </p>

  <Snippet config={snippets.typeSafeBuilder}/>

  <p>
    Before we dive into that code, let's see what it can (and can't) do:
  </p>

  <Snippet config={snippets.typeSafeUsage}/>

  <p>
    That's not impressive, since the syntax is pretty much the same as the Redux Toolkit builder.
    However, the main appeal of this builder is the type-safety.
    Both of these cause compile-time errors:
  </p>

  <Snippet config={snippets.invalidUsage}/>

  <p>
    Like the pipeline builder from the last post, the goal here was never end-to-end type safety.
    Instead, we guarantee that the builder is type-safe through its APIs.
    The implementation is unashamedly type-unsafe, and is only viable thanks to the restrictions on the methods.
  </p>

  <p>
    We could go to the effort of improving the types inside the builder in multiple ways.
    For example, we could use <code>this.cases.forEach(&lt;T extends string&gt;</code> in the <code>build</code> method to prevent losing type information.
    We could also add another generic parameter to our class, tracking which action types map to each action payload, which would prevent the need to use <code>any</code> in the <code>build</code> method.
  </p>

  <p>
    That's not the point though.
    The power of the builder pattern comes from <strong>a type-safe boundary around unsafe code</strong>.
    By embracing that concept, we get the same level of confidence in our software with far less work, and avoid the maintainability issues that come from complex types.
  </p>

  <h3>Other useful bits</h3>

  <p>
    This reducer builder is useful, but it's not enough on its own to get full type-safety in Redux.
    Your root reducer and root store will also need some help with their types, like this:
  </p>

  <Snippet config={snippets.rootReducer}/>

  <p>
    Then you can simply use Redux like normal inside your React components, but with full type-safety:
  </p>

  <Snippet config={snippets.rootReducerUsage}/>

  <p>
    If we haven't configured handlers for <code>playAction</code> in either <code>worldReducer</code> or <code>playerReducer</code>, this won't compile.
    Perfect!
  </p>

  <p>
    If you just want to take those snippets and use them, go for it!
    It's batteries-included and doesn't have any real problems.
    Often in my posts there's a section at the end that says <code>please don't actually use this</code> - but not here!
  </p>

  <h3>Code Walkthrough</h3>

  <p>
    This section contains an in-depth walkthrough of the code snippet above.
    I skip over some of the background detail, so I'd recommend reading <a href="/typescript-builders">my last post</a> first if you haven't already.
  </p>

  <p>
    To understand how this builder works, let's think about what a reducer needs in terms of type information.
    When you call a reducer, it looks something like this: <code>const newState = reducer(oldState, action);</code>
  </p>

  <p>
    The <code>newState</code> and <code>oldState</code> variables are both the reducer's state type, while the <code>action</code> parameter should be one of the actions that the reducer is configured to handle.
    It's fairly intuitive that our builder must have generic types for the state and the set of valid actions.
    Of those two, the state type never changes but the set of valid actions must be mutable when we add cases to the reducer.
    Each time we add a case, we should add a valid action type.
  </p>

  <p>
    In this case, it's not enough to just have a union of strings representing the valid action types.
    If we did that, there would be no compile-time guarantee that the action's payload is correct.
    Instead, we need the generic type representing valid actions to be a union of <code>PayloadAction</code>.
    This is the Redux Toolkit type representing an action with a given type and payload.
    You specify the type and payload using generic parameters, like this:
    <code>type SetAction = PayloadAction&lt;number, "set"&gt;;</code>
  </p>

  <p>
    Therefore, our class declaration looks like this:
    <code>export class ReducerBuilder&lt;STATE, ACTIONS extends PayloadAction&lt;any, string&gt;&gt;&#123;</code>
  </p>

  <p>
    The state is configured via <code>STATE</code>, which can be any type, and the set of valid actions is configured via <code>ACTIONS</code>, which can be any payload action type.
    In practice, this would actually be a union of many payload action types.
    Also, note that the <code>PayloadAction</code> type can be configured to represent an action without a payload by passing <code>undefined</code> as its first generic parameter.
  </p>

  <p>
  We could have used two generic parameters.
  One would be for the union of valid action types, and the other would be the union of valid action payloads.
  </p>

  <figure>
    <img
      src="/assets/blog/reducer-builder/header.png"
      alt="Using our method, we specify that the action must either have type set and payload number of it must have type increment and payload undefined. The proposed method would allow any action with either type set or type increment and either payload number of payload undefined."
      title="It's ok to figure this kind of thing out through trial and error"
    />
  </figure>

  <p>
    However, that wouldn't work properly.
    It would allow us to dispatch the action:
    <code>&#123; type: "increment", payload: 5 &#125;</code>
  </p>

  <p>
    This action has a type that is one of the valid options, and it has a payload that is also a valid option.
    However, we specifically care about the <em>combination</em> of properties on the action.
    A <code>number</code> payload is only valid on a <code>set</code> action, and any <code>increment</code> action with a payload is invalid.
    Therefore, we have to use a union of <code>PayloadAction</code> objects.
  </p>

  <p>
    Moving on to the actual class implementation, let's look at the builder's internal state:
  </p>

  <Snippet config={snippets.internalState}/>

  <p>
    At the top of the class, we define the two pieces of internal state.
    The <code>initialState</code> property is simple, and is taken as a parameter when the builder is created, then used when creating the reducer.
    The <code>cases</code> property is more complex, and maps action types to their handlers.
    This uses the <code>ActionHandler</code> type defined at the top of the snippet:
    <code>type ActionHandler&lt;STATE, PAYLOAD&gt; = (state: Draft&lt;STATE&gt;, payload: PAYLOAD) =&gt; STATE;</code>
  </p>

  <p>
    This type simply represents a function that takes the current state and the payload from the received action, returning the new state.
    The <code>Draft</code> type is part of Redux Toolkit, and allows us to directly mutate the state parameter without breaking things.
    In Redux, you typically have to treat the state as immutable, so this just makes it a bit simpler to use.
  </p>

  <p>
    Interestingly, our <code>ACTIONS</code> generic type doesn't appear anywhere in the builder's internal state.
    It only exists at compile time to check that the reducer is valid.
    There is never anything in our builder that actually fits that type.
  </p>

  <p>
    Like before, we have a private constructor for internal use and a static factory method for external use:
  </p>

  <Snippet config={snippets.construction}/>

  <p>
    The static <code>new</code> method permanently sets the initial state of the reducer, and initialises the builder to have no cases.
    That means that the second generic parameter, representing the union of all valid actions, is typed as <code>never</code>.
    This type is unique because it never matches anything.
    That makes sense - a reducer with no cases should accept no actions.
  </p>

  <p>
    I have left the state and constructor separate to make it easier to explain, but you can combine the two as:
  </p>

  <Snippet config={snippets.combinedConstruction}/>

  <p>
    To add a new case to the reducer, we invoke our mutator method, <code>addCase</code>:
  </p>

  <Snippet config={snippets.mutator}/>

  <p>
    When called, this method configures a handler for a given action type.
    The <code>actionCreator</code> parameter specifies what action we are configuring a handler for.
    It uses the Redux Toolkit <code>ActionCreatorWithPayload</code> type.
    Like before, you can set the payload to <code>undefined</code> when representing an action with no payload.
  </p>

  <p>
    The second parameter specifies what should happen to the state when the reducer receives that action.
    We create a new builder where the initial state stays the same but the cases map is extended.
    The new case is added to the end as an object containing the action type and action handler.
  </p>

  <p>
    The <code>ACTIONS</code> generic parameter in the returned builder is explicitly specified as <code>ACTIONS | PayloadAction&lt;PAYLOAD, TYPE&gt;</code>.
    This simply adds a new action into the <code>ACTIONS</code> union.
    The new action is defined as having the type and payload from the action creator.
  </p>

  <p>
    Finally, we look at the build method.
    This takes the builder's current state and uses it to configure a Redux reducer:
  </p>

  <Snippet config={snippets.build}/>

  <p>
    There's no fancy type magic going on here, just a call to the normal Redux Toolkit <code>createReducer</code>, using its builder mode.
    For each case in the builder's internal state, it adds a matching case to the reducer.
    When it has added all cases, it is done and the reducer is ready to use.
  </p>

  <h2>Conclusion</h2>

  <p>
    Redux Reducers were the first time I realised the power of the builder pattern in TypeScript, and they're still one of the best use-cases.
    They give you real type-safety, have basically no runtime cost, and are completely encapsulated which means there's limited impact on maintainability.
    In my Redux projects, I went even further and added a similar builder for <a href="https://github.com/redux-saga/redux-saga">Redux Sagas</a>, but I'm leaving that as an exercise to the reader.
  </p>

  <p>
    I hope that this post gave you a better insight into how builders can be used to get better types in TypeScript.
    If not, at least you got some code snippets to copy-paste!
  </p>

  <hr>

  <p>
    Feel free to contact me on <a href="https://twitter.com/SteWaterman">Twitter</a> with any questions, feedback, or to point out mistakes!
    I'd love to hear from you if you've found this useful and tried using builders in your own project.
    How did it go?
  </p>
</BlogPost>

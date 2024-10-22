import{S as yi,i as mi,s as wi,q as a,r as l,m as r,k as p,w as d,e as s,g as n,c as i,F as hi,f as o}from"../../chunks/vendor-b123dbec.js";import{B as Ti}from"../../chunks/BlogPost-fb5b6ef4.js";import{S as u}from"../../chunks/Snippet-0180392a.js";import"../../chunks/Template-7e2d3e9c.js";const bi={name:"Actions",language:"ts",snippet:`const incrementAction = createAction("increment");
  const setAction = createAction<number, "set">("set");`},Ai={name:"Typical Reducer",language:"ts",snippet:`const reducer = createReducer(0, {
    "increment": (state) => state + 1,
    "set": (state, action: PayloadAction<number>) => action.payload
  });`},Si={name:"Reducer Usage",language:"ts",snippet:`const oldState = 0;
  reducer(oldState, setAction(3));
  reducer(oldState, incrementAction());`},$i={name:"Invalid Action",language:"ts",snippet:`const decrementAction = createAction("decrement");
  const oldState = 0;
  reducer(oldState, decrementAction());`},vi={name:"Invalid Payload",language:"ts",snippet:`const oldState = 0;
  reducer(oldState, {
    type: "set",
    payload: "this is meant to be a number"
  });`},xi={name:"Built-in Builder",language:"ts",snippet:`const reducer = createReducer(0, (builder => builder
    .addCase(incrementAction, (state) => state + 1)
    .addCase(setAction, (state, action) => action.payload)
  ));
  
  const oldState = 0;
  reducer(oldState, setAction(3));
  reducer(oldState, incrementAction());`},Ri={name:"Invalid Actions",language:"ts",snippet:`const decrementAction = createAction("decrement");
  reducer(oldState, decrementAction());
  
  reducer(oldState, {
    type: "set",
    payload: "this should be a number"
  });
  
  reducer(oldState, {
    type: "nonexistent",
    payload: "action"
  });`},Ci={name:"Type-Safe Builder",language:"ts",snippet:`import { createReducer, PayloadAction, ActionCreatorWithPayload, Reducer, Draft } from "@reduxjs/toolkit";
  type ActionHandler<STATE, PAYLOAD> = (state: Draft<STATE>, payload: PAYLOAD) => STATE;
  
  export class ReducerBuilder<STATE, ACTIONS extends PayloadAction<any, string>>{
    private readonly initialState: STATE;
    private readonly cases: Array<{type: string; handler: ActionHandler<STATE, any>}>;
  
    private constructor(
      initialState: STATE, 
      cases: Array<{type: string; handler: ActionHandler<STATE, any>}>
    ) {
      this.initialState = initialState;
      this.cases = cases;
    }
  
    static new<STATE>(initialState: STATE): ReducerBuilder<STATE, never> {
      return new ReducerBuilder(initialState, [])
    }
  
    addCase<TYPE extends string, PAYLOAD>(
      actionCreator: ActionCreatorWithPayload<PAYLOAD, TYPE>, 
      actionHandler: ActionHandler<STATE, PAYLOAD>
    ): ReducerBuilder<STATE, ACTIONS | PayloadAction<PAYLOAD, TYPE>> {
      return new ReducerBuilder(
        this.initialState, 
        [...this.cases, {type: actionCreator.type, handler: actionHandler}]
      );
    }
  
    build(): ReduxReducer<STATE, ACTIONS> {
      return createReducer(this.initialState, (builder => {
        this.cases.forEach(({type, handler}) => {
          builder.addCase(type, 
            (state: Draft<STATE>, action: PayloadAction<any, string>) => 
              handler(state, action.payload)
          );
        })
      }))
    }
  }
  `},Ii={name:"Type-Safe Usage",language:"ts",snippet:`const reducer = ReducerBuilder.new(0)
  .addCase(incrementAction, (state) => state + 1)
  .addCase(setAction, (state, payload) => payload)
  .build();
  
const oldState = 0;
reducer(oldState, setAction(3));
reducer(oldState, incrementAction());`},ki={name:"Invalid Usage",language:"ts",snippet:`const oldState = 0;
  reducer(oldState, {
    type: "nonexistent",
    payload: "action"
  });
  
  reducer(oldState, {
    type: "set",
    payload: "1"
  });`},Hi={name:"Root Reducer",language:"ts",snippet:`import {
    combineReducers, 
    configureStore, 
    Dispatch, 
    getDefaultMiddleware
  } from "@reduxjs/toolkit";
  import { useDispatch } from "react-redux";
  
  export type RootState = {
      world: ReturnType<typeof worldReducer>;
      player: ReturnType<typeof playerReducer>;
  };
  
  export type RootActions = 
    Parameters<typeof worldReducer>[1] |
    Parameters<typeof playerReducer>[1];
  
  export const rootReducer = combineReducers<RootState, RootActions>({
    world: worldReducer,
    player: playerReducer
  });
  
  export const rootStore = configureStore<RootState, RootActions, any>({
    reducer: rootReducer,
    middleware: [
      ...getDefaultMiddleware<RootState>()
    ] as const
  });
  
  export type AppDispatch = Dispatch<RootActions>;
  export const useAppDispatch = () => useDispatch<AppDispatch>();
  `},Li={name:"Root Reducer Usage",language:"ts",snippet:`const Root: FunctionComponent = () => {
    const dispatch = useAppDispatch();
  
    const handleClick = () => {
        return dispatch(playAction())
    }
  
    return <Button onClick={handleClick}>Start</Button>
  }`},Ei={name:"Internal State",language:"ts",snippet:`class Builder {private readonly initialState: STATE;
  private readonly cases: Array<{type: string; handler: ActionHandler<STATE, any>}>;}
  `},Pi={name:"Instantiation",language:"ts",snippet:`class Builder{private constructor(
    initialState: STATE, 
    cases: Array<{type: string; handler: ActionHandler<STATE, any>}>
  ) {
    this.initialState = initialState;
    this.cases = cases;
  }
  
  static new<STATE>(initialState: STATE): ReducerBuilder<STATE, never> {
    return new ReducerBuilder(initialState, [])
  }}`},Mi={name:"Combined Construction",language:"ts",snippet:`class Builder{private constructor(
    private readonly initialState: STATE, 
    private readonly cases: Array<{type: string; handler: ActionHandler<STATE, any>}>
  ) { }}`},Bi={name:"Mutation",language:"ts",snippet:`function addCase<TYPE extends string, PAYLOAD>(
    actionCreator: ActionCreatorWithPayload<PAYLOAD, TYPE>, 
    actionHandler: ActionHandler<STATE, PAYLOAD>
  ): ReducerBuilder<STATE, ACTIONS | PayloadAction<PAYLOAD, TYPE>> {
    return new ReducerBuilder(
      this.initialState, 
      [...this.cases, {type: actionCreator.type, handler: actionHandler}]
    );
  }
  `},Oi={name:"Build",language:"ts",snippet:`function build(): ReduxReducer<STATE, ACTIONS> {
    return createReducer(this.initialState, (builder => {
      this.cases.forEach(({type, handler}) => {
        builder.addCase(type, 
          (state: Draft<STATE>, action: PayloadAction<any, string>) => 
            handler(state, action.payload)
        );
      })
    }))
  }`};var f={actions:bi,createReducer:Ai,reducerUsage:Si,invalidAction:$i,invalidPayload:vi,builtInBuilder:xi,builderInvalidActions:Ri,typeSafeBuilder:Ci,typeSafeUsage:Ii,invalidUsage:ki,rootReducer:Hi,rootReducerUsage:Li,internalState:Ei,construction:Pi,combinedConstruction:Mi,mutator:Bi,build:Oi};function Di(_e){let c,m,y,w,h,Fe,O,qe,D,Ge,Y,ze,j,Je,U,Ke,N,Qe,W,Ve,T,Xe,_,Ze,F,ge,q,et,G,tt,b,it,z,ot,A,nt,J,st,S,at,K,lt,$,rt,Q,pt,V,dt,X,ut,Z,ft,v,ct,g,yt,x,mt,ee,wt,te,ht,ie,Tt,R,bt,oe,At,C,St,ne,$t,I,vt,se,xt,ae,Rt,le,Ct,re,It,pe,kt,k,Ht,de,Lt,H,Et,ue,Pt,fe,Mt,ce,Bt,ye,Ot,me,Dt,we,Yt,he,jt,Te,Ut,be,Nt,Ae,Wt,Se,_t,$e,Ft,ve,qt,xe,Gt,L,zt,Re,Jt,Ce,Kt,Ie,Qt,ke,Vt,E,Xt,He,Zt,Le,gt,P,ei,Ee,ti,M,ii,Pe,oi,Me,ni,Be,si,Oe,ai,B,li,De,ri,Ye,pi,je,di,Ue,ui,fi,ci,Ne,We;return T=new u({props:{config:f.actions}}),b=new u({props:{config:f.createReducer}}),A=new u({props:{config:f.reducerUsage}}),S=new u({props:{config:f.invalidAction}}),$=new u({props:{config:f.invalidPayload}}),v=new u({props:{config:f.builtInBuilder}}),x=new u({props:{config:f.builderInvalidActions}}),R=new u({props:{config:f.typeSafeBuilder}}),C=new u({props:{config:f.typeSafeUsage}}),I=new u({props:{config:f.invalidUsage}}),k=new u({props:{config:f.rootReducer}}),H=new u({props:{config:f.rootReducerUsage}}),L=new u({props:{config:f.internalState}}),E=new u({props:{config:f.construction}}),P=new u({props:{config:f.combinedConstruction}}),M=new u({props:{config:f.mutator}}),B=new u({props:{config:f.build}}),{c(){c=s("p"),c.innerHTML='If you haven&#39;t read <a href="/typescript-builders">my last blog post</a>, I&#39;d recommend it, but I&#39;m the kind of person to ignore that warning so no judgement here!',m=n(),y=s("p"),y.textContent=`In this post, I show how the builder pattern can be used to create Reducers in a TypeScript React-Redux app.
    I discuss the benefits of that approach before walking through the code and explaining what it does at each step.`,w=n(),h=s("p"),h.innerHTML=`It&#39;s not perfectly type-safe, but that&#39;s not the goal.
    Instead, we use the builder pattern to create a type-safe boundary around unsafe code.
    That way, we can get the best of both worlds - a utility method that is both safe <em>and</em> maintainable.`,Fe=n(),O=s("h2"),O.textContent="Redux Reducers",qe=n(),D=s("p"),D.textContent="I'll assume you have used Redux before, but here's a quick primer if not:",Ge=n(),Y=s("p"),Y.innerHTML=`Redux is a state management library that&#39;s usually used with React.
    In Redux, there is a single global &#39;store&#39; which contains the current state of the website.
    The store is updated by dispatching an &#39;action&#39; onto the store.
    Each action has two properties, <code>type</code> and <code>payload</code>.
    Attach a &#39;reducer&#39; to the store to define how the state should change when an action is received.
    Each reducer contains a number of cases, where each case handles a given type of action.`,ze=n(),j=s("p"),j.innerHTML='For a full explanation of those concepts and the terminology, <a href="https://redux.js.org/tutorials/essentials/part-1-overview-concepts#reducers">read the official documentation</a>.',Je=n(),U=s("h2"),U.textContent="Redux Type Safety",Ke=n(),N=s("p"),N.innerHTML=`For the remainder of this post, we will be using <a href="https://redux.js.org/redux-toolkit/overview">Redux Toolkit</a>, the official recommended way to develop Redux apps.
    However, you could easily tweak this code to work in a plain Redux project that doesn&#39;t use Redux Toolkit.`,Qe=n(),W=s("p"),W.textContent=`In Redux Toolkit, you are expected to use 'action creators' rather than writing your actions as object literals.
    They are important later, so let's start by writing a couple of action creators.
    I'll assume our app is a counter, meaning the state is a number and we have two actions:`,Ve=n(),a(T.$$.fragment),Xe=n(),_=s("p"),_.textContent="Now that we have our actions, there are two ways to create a reducer that handles them:",Ze=n(),F=s("ol"),F.innerHTML=`<li>From a map of action types to handlers</li> 
    <li>Using a builder</li>`,ge=n(),q=s("h3"),q.textContent="Option 1: Using a Map",et=n(),G=s("p"),G.innerHTML="Here, you can call <code>createReducer()</code>, passing a map of action types to handlers, like this:",tt=n(),a(b.$$.fragment),it=n(),z=s("p"),z.textContent=`Then, we can dispatch actions onto the reducer.
    Note that this isn't how you normally use a reducer, and it's just to demonstrate the type safety.`,ot=n(),a(A.$$.fragment),nt=n(),J=s("p"),J.textContent="That's all well and good, but there's nothing stopping us dispatching an action that doesn't exist on the reducer:",st=n(),a(S.$$.fragment),at=n(),K=s("p"),K.textContent="Likewise, there's nothing saying we even need to pass the correct type of payload:",lt=n(),a($.$$.fragment),rt=n(),Q=s("p"),Q.innerHTML=`Nothing we&#39;ve seen so far has caused a compiler error.
    Our <code>decrement</code> action would just do nothing, while passing the wrong payload type or  would probably cause runtime errors.`,pt=n(),V=s("p"),V.textContent="It's clear that this isn't strongly typed at all.",dt=n(),X=s("h3"),X.textContent="Option 2: Using a Builder",ut=n(),Z=s("p"),Z.textContent=`First, note that this isn't the builder that I promised in the intro.
    Redux Toolkit provides its own Reducer Builder which is insufficient for reasons that will soon become obvious.`,ft=n(),a(v.$$.fragment),ct=n(),g=s("p"),g.textContent=`As before, we can create our builder that handles the two actions, then dispatch actions to it.
    Also like before, we can dispatch a load of invalid actions without causing any compiler errors:`,yt=n(),a(x.$$.fragment),mt=n(),ee=s("p"),ee.textContent=`That's really not ideal, and essentially means that the core of your type-safe TS project is completely unsafe.
    There must be a better way, and there is:`,wt=n(),te=s("h2"),te.textContent="Fixing it with Mutable Generic State",ht=n(),ie=s("p"),ie.textContent="Let's start with the end product, a type-safe Reducer Builder:",Tt=n(),a(R.$$.fragment),bt=n(),oe=s("p"),oe.textContent="Before we dive into that code, let's see what it can (and can't) do:",At=n(),a(C.$$.fragment),St=n(),ne=s("p"),ne.textContent=`That's not impressive, since the syntax is pretty much the same as the Redux Toolkit builder.
    However, the main appeal of this builder is the type-safety.
    Both of these cause compile-time errors:`,$t=n(),a(I.$$.fragment),vt=n(),se=s("p"),se.textContent=`Like the pipeline builder from the last post, the goal here was never end-to-end type safety.
    Instead, we guarantee that the builder is type-safe through its APIs.
    The implementation is unashamedly type-unsafe, and is only viable thanks to the restrictions on the methods.`,xt=n(),ae=s("p"),ae.innerHTML=`We could go to the effort of improving the types inside the builder in multiple ways.
    For example, we could use <code>this.cases.forEach(&lt;T extends string&gt;</code> in the <code>build</code> method to prevent losing type information.
    We could also add another generic parameter to our class, tracking which action types map to each action payload, which would prevent the need to use <code>any</code> in the <code>build</code> method.`,Rt=n(),le=s("p"),le.innerHTML=`That&#39;s not the point though.
    The power of the builder pattern comes from <strong>a type-safe boundary around unsafe code</strong>.
    By embracing that concept, we get the same level of confidence in our software with far less work, and avoid the maintainability issues that come from complex types.`,Ct=n(),re=s("h3"),re.textContent="Other useful bits",It=n(),pe=s("p"),pe.textContent=`This reducer builder is useful, but it's not enough on its own to get full type-safety in Redux.
    Your root reducer and root store will also need some help with their types, like this:`,kt=n(),a(k.$$.fragment),Ht=n(),de=s("p"),de.textContent="Then you can simply use Redux like normal inside your React components, but with full type-safety:",Lt=n(),a(H.$$.fragment),Et=n(),ue=s("p"),ue.innerHTML=`If we haven&#39;t configured handlers for <code>playAction</code> in either <code>worldReducer</code> or <code>playerReducer</code>, this won&#39;t compile.
    Perfect!`,Pt=n(),fe=s("p"),fe.innerHTML=`If you just want to take those snippets and use them, go for it!
    It&#39;s batteries-included and doesn&#39;t have any real problems.
    Often in my posts there&#39;s a section at the end that says <code>please don&#39;t actually use this</code> - but not here!`,Mt=n(),ce=s("h3"),ce.textContent="Code Walkthrough",Bt=n(),ye=s("p"),ye.innerHTML=`This section contains an in-depth walkthrough of the code snippet above.
    I skip over some of the background detail, so I&#39;d recommend reading <a href="/typescript-builders">my last post</a> first if you haven&#39;t already.`,Ot=n(),me=s("p"),me.innerHTML=`To understand how this builder works, let&#39;s think about what a reducer needs in terms of type information.
    When you call a reducer, it looks something like this: <code>const newState = reducer(oldState, action);</code>`,Dt=n(),we=s("p"),we.innerHTML=`The <code>newState</code> and <code>oldState</code> variables are both the reducer&#39;s state type, while the <code>action</code> parameter should be one of the actions that the reducer is configured to handle.
    It&#39;s fairly intuitive that our builder must have generic types for the state and the set of valid actions.
    Of those two, the state type never changes but the set of valid actions must be mutable when we add cases to the reducer.
    Each time we add a case, we should add a valid action type.`,Yt=n(),he=s("p"),he.innerHTML=`In this case, it&#39;s not enough to just have a union of strings representing the valid action types.
    If we did that, there would be no compile-time guarantee that the action&#39;s payload is correct.
    Instead, we need the generic type representing valid actions to be a union of <code>PayloadAction</code>.
    This is the Redux Toolkit type representing an action with a given type and payload.
    You specify the type and payload using generic parameters, like this:
    <code>type SetAction = PayloadAction&lt;number, &quot;set&quot;&gt;;</code>`,jt=n(),Te=s("p"),Te.innerHTML=`Therefore, our class declaration looks like this:
    <code>export class ReducerBuilder&lt;STATE, ACTIONS extends PayloadAction&lt;any, string&gt;&gt;{</code>`,Ut=n(),be=s("p"),be.innerHTML=`The state is configured via <code>STATE</code>, which can be any type, and the set of valid actions is configured via <code>ACTIONS</code>, which can be any payload action type.
    In practice, this would actually be a union of many payload action types.
    Also, note that the <code>PayloadAction</code> type can be configured to represent an action without a payload by passing <code>undefined</code> as its first generic parameter.`,Nt=n(),Ae=s("p"),Ae.textContent=`We could have used two generic parameters.
  One would be for the union of valid action types, and the other would be the union of valid action payloads.`,Wt=n(),Se=s("figure"),Se.innerHTML='<img src="/assets/blog/reducer-builder/header.png" alt="Using our method, we specify that the action must either have type set and payload number of it must have type increment and payload undefined. The proposed method would allow any action with either type set or type increment and either payload number of payload undefined." title="It&#39;s ok to figure this kind of thing out through trial and error"/>',_t=n(),$e=s("p"),$e.innerHTML=`However, that wouldn&#39;t work properly.
    It would allow us to dispatch the action:
    <code>{ type: &quot;increment&quot;, payload: 5 }</code>`,Ft=n(),ve=s("p"),ve.innerHTML=`This action has a type that is one of the valid options, and it has a payload that is also a valid option.
    However, we specifically care about the <em>combination</em> of properties on the action.
    A <code>number</code> payload is only valid on a <code>set</code> action, and any <code>increment</code> action with a payload is invalid.
    Therefore, we have to use a union of <code>PayloadAction</code> objects.`,qt=n(),xe=s("p"),xe.textContent="Moving on to the actual class implementation, let's look at the builder's internal state:",Gt=n(),a(L.$$.fragment),zt=n(),Re=s("p"),Re.innerHTML=`At the top of the class, we define the two pieces of internal state.
    The <code>initialState</code> property is simple, and is taken as a parameter when the builder is created, then used when creating the reducer.
    The <code>cases</code> property is more complex, and maps action types to their handlers.
    This uses the <code>ActionHandler</code> type defined at the top of the snippet:
    <code>type ActionHandler&lt;STATE, PAYLOAD&gt; = (state: Draft&lt;STATE&gt;, payload: PAYLOAD) =&gt; STATE;</code>`,Jt=n(),Ce=s("p"),Ce.innerHTML=`This type simply represents a function that takes the current state and the payload from the received action, returning the new state.
    The <code>Draft</code> type is part of Redux Toolkit, and allows us to directly mutate the state parameter without breaking things.
    In Redux, you typically have to treat the state as immutable, so this just makes it a bit simpler to use.`,Kt=n(),Ie=s("p"),Ie.innerHTML=`Interestingly, our <code>ACTIONS</code> generic type doesn&#39;t appear anywhere in the builder&#39;s internal state.
    It only exists at compile time to check that the reducer is valid.
    There is never anything in our builder that actually fits that type.`,Qt=n(),ke=s("p"),ke.textContent="Like before, we have a private constructor for internal use and a static factory method for external use:",Vt=n(),a(E.$$.fragment),Xt=n(),He=s("p"),He.innerHTML=`The static <code>new</code> method permanently sets the initial state of the reducer, and initialises the builder to have no cases.
    That means that the second generic parameter, representing the union of all valid actions, is typed as <code>never</code>.
    This type is unique because it never matches anything.
    That makes sense - a reducer with no cases should accept no actions.`,Zt=n(),Le=s("p"),Le.textContent="I have left the state and constructor separate to make it easier to explain, but you can combine the two as:",gt=n(),a(P.$$.fragment),ei=n(),Ee=s("p"),Ee.innerHTML="To add a new case to the reducer, we invoke our mutator method, <code>addCase</code>:",ti=n(),a(M.$$.fragment),ii=n(),Pe=s("p"),Pe.innerHTML=`When called, this method configures a handler for a given action type.
    The <code>actionCreator</code> parameter specifies what action we are configuring a handler for.
    It uses the Redux Toolkit <code>ActionCreatorWithPayload</code> type.
    Like before, you can set the payload to <code>undefined</code> when representing an action with no payload.`,oi=n(),Me=s("p"),Me.textContent=`The second parameter specifies what should happen to the state when the reducer receives that action.
    We create a new builder where the initial state stays the same but the cases map is extended.
    The new case is added to the end as an object containing the action type and action handler.`,ni=n(),Be=s("p"),Be.innerHTML=`The <code>ACTIONS</code> generic parameter in the returned builder is explicitly specified as <code>ACTIONS | PayloadAction&lt;PAYLOAD, TYPE&gt;</code>.
    This simply adds a new action into the <code>ACTIONS</code> union.
    The new action is defined as having the type and payload from the action creator.`,si=n(),Oe=s("p"),Oe.textContent=`Finally, we look at the build method.
    This takes the builder's current state and uses it to configure a Redux reducer:`,ai=n(),a(B.$$.fragment),li=n(),De=s("p"),De.innerHTML=`There&#39;s no fancy type magic going on here, just a call to the normal Redux Toolkit <code>createReducer</code>, using its builder mode.
    For each case in the builder&#39;s internal state, it adds a matching case to the reducer.
    When it has added all cases, it is done and the reducer is ready to use.`,ri=n(),Ye=s("h2"),Ye.textContent="Conclusion",pi=n(),je=s("p"),je.innerHTML=`Redux Reducers were the first time I realised the power of the builder pattern in TypeScript, and they&#39;re still one of the best use-cases.
    They give you real type-safety, have basically no runtime cost, and are completely encapsulated which means there&#39;s limited impact on maintainability.
    In my Redux projects, I went even further and added a similar builder for <a href="https://github.com/redux-saga/redux-saga">Redux Sagas</a>, but I&#39;m leaving that as an exercise to the reader.`,di=n(),Ue=s("p"),Ue.textContent=`I hope that this post gave you a better insight into how builders can be used to get better types in TypeScript.
    If not, at least you got some code snippets to copy-paste!`,ui=n(),fi=s("hr"),ci=n(),Ne=s("p"),Ne.innerHTML=`Feel free to contact me on <a href="https://twitter.com/SteWaterman">Twitter</a> with any questions, feedback, or to point out mistakes!
    I&#39;d love to hear from you if you&#39;ve found this useful and tried using builders in your own project.
    How did it go?`},m(e,t){i(e,c,t),i(e,m,t),i(e,y,t),i(e,w,t),i(e,h,t),i(e,Fe,t),i(e,O,t),i(e,qe,t),i(e,D,t),i(e,Ge,t),i(e,Y,t),i(e,ze,t),i(e,j,t),i(e,Je,t),i(e,U,t),i(e,Ke,t),i(e,N,t),i(e,Qe,t),i(e,W,t),i(e,Ve,t),l(T,e,t),i(e,Xe,t),i(e,_,t),i(e,Ze,t),i(e,F,t),i(e,ge,t),i(e,q,t),i(e,et,t),i(e,G,t),i(e,tt,t),l(b,e,t),i(e,it,t),i(e,z,t),i(e,ot,t),l(A,e,t),i(e,nt,t),i(e,J,t),i(e,st,t),l(S,e,t),i(e,at,t),i(e,K,t),i(e,lt,t),l($,e,t),i(e,rt,t),i(e,Q,t),i(e,pt,t),i(e,V,t),i(e,dt,t),i(e,X,t),i(e,ut,t),i(e,Z,t),i(e,ft,t),l(v,e,t),i(e,ct,t),i(e,g,t),i(e,yt,t),l(x,e,t),i(e,mt,t),i(e,ee,t),i(e,wt,t),i(e,te,t),i(e,ht,t),i(e,ie,t),i(e,Tt,t),l(R,e,t),i(e,bt,t),i(e,oe,t),i(e,At,t),l(C,e,t),i(e,St,t),i(e,ne,t),i(e,$t,t),l(I,e,t),i(e,vt,t),i(e,se,t),i(e,xt,t),i(e,ae,t),i(e,Rt,t),i(e,le,t),i(e,Ct,t),i(e,re,t),i(e,It,t),i(e,pe,t),i(e,kt,t),l(k,e,t),i(e,Ht,t),i(e,de,t),i(e,Lt,t),l(H,e,t),i(e,Et,t),i(e,ue,t),i(e,Pt,t),i(e,fe,t),i(e,Mt,t),i(e,ce,t),i(e,Bt,t),i(e,ye,t),i(e,Ot,t),i(e,me,t),i(e,Dt,t),i(e,we,t),i(e,Yt,t),i(e,he,t),i(e,jt,t),i(e,Te,t),i(e,Ut,t),i(e,be,t),i(e,Nt,t),i(e,Ae,t),i(e,Wt,t),i(e,Se,t),i(e,_t,t),i(e,$e,t),i(e,Ft,t),i(e,ve,t),i(e,qt,t),i(e,xe,t),i(e,Gt,t),l(L,e,t),i(e,zt,t),i(e,Re,t),i(e,Jt,t),i(e,Ce,t),i(e,Kt,t),i(e,Ie,t),i(e,Qt,t),i(e,ke,t),i(e,Vt,t),l(E,e,t),i(e,Xt,t),i(e,He,t),i(e,Zt,t),i(e,Le,t),i(e,gt,t),l(P,e,t),i(e,ei,t),i(e,Ee,t),i(e,ti,t),l(M,e,t),i(e,ii,t),i(e,Pe,t),i(e,oi,t),i(e,Me,t),i(e,ni,t),i(e,Be,t),i(e,si,t),i(e,Oe,t),i(e,ai,t),l(B,e,t),i(e,li,t),i(e,De,t),i(e,ri,t),i(e,Ye,t),i(e,pi,t),i(e,je,t),i(e,di,t),i(e,Ue,t),i(e,ui,t),i(e,fi,t),i(e,ci,t),i(e,Ne,t),We=!0},p:hi,i(e){We||(r(T.$$.fragment,e),r(b.$$.fragment,e),r(A.$$.fragment,e),r(S.$$.fragment,e),r($.$$.fragment,e),r(v.$$.fragment,e),r(x.$$.fragment,e),r(R.$$.fragment,e),r(C.$$.fragment,e),r(I.$$.fragment,e),r(k.$$.fragment,e),r(H.$$.fragment,e),r(L.$$.fragment,e),r(E.$$.fragment,e),r(P.$$.fragment,e),r(M.$$.fragment,e),r(B.$$.fragment,e),We=!0)},o(e){p(T.$$.fragment,e),p(b.$$.fragment,e),p(A.$$.fragment,e),p(S.$$.fragment,e),p($.$$.fragment,e),p(v.$$.fragment,e),p(x.$$.fragment,e),p(R.$$.fragment,e),p(C.$$.fragment,e),p(I.$$.fragment,e),p(k.$$.fragment,e),p(H.$$.fragment,e),p(L.$$.fragment,e),p(E.$$.fragment,e),p(P.$$.fragment,e),p(M.$$.fragment,e),p(B.$$.fragment,e),We=!1},d(e){e&&o(c),e&&o(m),e&&o(y),e&&o(w),e&&o(h),e&&o(Fe),e&&o(O),e&&o(qe),e&&o(D),e&&o(Ge),e&&o(Y),e&&o(ze),e&&o(j),e&&o(Je),e&&o(U),e&&o(Ke),e&&o(N),e&&o(Qe),e&&o(W),e&&o(Ve),d(T,e),e&&o(Xe),e&&o(_),e&&o(Ze),e&&o(F),e&&o(ge),e&&o(q),e&&o(et),e&&o(G),e&&o(tt),d(b,e),e&&o(it),e&&o(z),e&&o(ot),d(A,e),e&&o(nt),e&&o(J),e&&o(st),d(S,e),e&&o(at),e&&o(K),e&&o(lt),d($,e),e&&o(rt),e&&o(Q),e&&o(pt),e&&o(V),e&&o(dt),e&&o(X),e&&o(ut),e&&o(Z),e&&o(ft),d(v,e),e&&o(ct),e&&o(g),e&&o(yt),d(x,e),e&&o(mt),e&&o(ee),e&&o(wt),e&&o(te),e&&o(ht),e&&o(ie),e&&o(Tt),d(R,e),e&&o(bt),e&&o(oe),e&&o(At),d(C,e),e&&o(St),e&&o(ne),e&&o($t),d(I,e),e&&o(vt),e&&o(se),e&&o(xt),e&&o(ae),e&&o(Rt),e&&o(le),e&&o(Ct),e&&o(re),e&&o(It),e&&o(pe),e&&o(kt),d(k,e),e&&o(Ht),e&&o(de),e&&o(Lt),d(H,e),e&&o(Et),e&&o(ue),e&&o(Pt),e&&o(fe),e&&o(Mt),e&&o(ce),e&&o(Bt),e&&o(ye),e&&o(Ot),e&&o(me),e&&o(Dt),e&&o(we),e&&o(Yt),e&&o(he),e&&o(jt),e&&o(Te),e&&o(Ut),e&&o(be),e&&o(Nt),e&&o(Ae),e&&o(Wt),e&&o(Se),e&&o(_t),e&&o($e),e&&o(Ft),e&&o(ve),e&&o(qt),e&&o(xe),e&&o(Gt),d(L,e),e&&o(zt),e&&o(Re),e&&o(Jt),e&&o(Ce),e&&o(Kt),e&&o(Ie),e&&o(Qt),e&&o(ke),e&&o(Vt),d(E,e),e&&o(Xt),e&&o(He),e&&o(Zt),e&&o(Le),e&&o(gt),d(P,e),e&&o(ei),e&&o(Ee),e&&o(ti),d(M,e),e&&o(ii),e&&o(Pe),e&&o(oi),e&&o(Me),e&&o(ni),e&&o(Be),e&&o(si),e&&o(Oe),e&&o(ai),d(B,e),e&&o(li),e&&o(De),e&&o(ri),e&&o(Ye),e&&o(pi),e&&o(je),e&&o(di),e&&o(Ue),e&&o(ui),e&&o(fi),e&&o(ci),e&&o(Ne)}}}function Yi(_e){let c,m;return c=new Ti({props:{id:"reducer-builder",$$slots:{default:[Di]},$$scope:{ctx:_e}}}),{c(){a(c.$$.fragment)},m(y,w){l(c,y,w),m=!0},p(y,[w]){const h={};w&1&&(h.$$scope={dirty:w,ctx:y}),c.$set(h)},i(y){m||(r(c.$$.fragment,y),m=!0)},o(y){p(c.$$.fragment,y),m=!1},d(y){d(c,y)}}}class _i extends yi{constructor(c){super();mi(this,c,null,Yi,wi,{})}}export{_i as default};

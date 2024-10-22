import{S as Ko,i as Qo,s as Zo,q as p,r as o,m as u,k as f,w as r,e as l,g as n,t as K,c as i,E as b,F as eu,f as s}from"../../chunks/vendor-b123dbec.js";import{B as tu}from"../../chunks/BlogPost-fb5b6ef4.js";import{S as a}from"../../chunks/Snippet-0180392a.js";import"../../chunks/Template-7e2d3e9c.js";const iu={name:"Basic",language:"ts",snippet:`const input = "524";
  const a = input.split("").reverse().join("");
  const b = parseInt(input, 10);
  const c = b * 5;`},su={name:"Reusable",language:"ts",snippet:`function process(input: string, radix: number, multiplicand: number) {
    const a = input.split("").reverse().join("");
    const b = parseInt(input, radix);
    const c = b * multiplicand;
    return c;
  }
  process("524", 10, 5);`},nu={name:"Single Object Config",language:"ts",snippet:`function process(input: string, radix: number, multiplicand: number) {
    const a = input.split("").reverse().join("");
    const b = parseInt(input, radix);
    const c = b * multiplicand;
    return c;
  }
  process("524", 10, 5);`},lu={name:"Pipeline Factory",language:"ts",snippet:`
  function createPipeline(functions) {
    return function pipeline(initState, config) {
      let state = initState;
      for (func of functions) {
        state = func(state, config);
      }
      return state;
    }
  }
  
  // Or as a long one-liner:
  const createPipeline = initState => functions.reduce((state, func) => func(state, config), initState);`},pu={name:"Trying TypeScript",language:"ts",snippet:`function createPipeline<Type, Config>(
    functions: Array<(input: Type, config: Config) => Type>
  ): (input: Type, config: Config) => Type { }`},ou={name:"Completeness",language:"ts",snippet:`function createPipeline<Config>(
    functions: Array<(input: any, config: Config) => any>
  ): (input: any, config: Config) => any {/*...*/}`},uu={name:"Concatenation Function",language:"ts",snippet:`function concat(...sections: string[]): string { }
  const output = concat("hi", "my", "pals");`},fu={name:"Concatenation Builder",language:"ts",snippet:`const output = StringBuilder.new()
  .append("Hi")
  .append("my")
  .append("pals")
  .build();`},ru={name:"Mutable Generics 1",language:"ts",snippet:`const a: StringWrapper = wrap("hello");
  a.set("friends!");`},au={name:"Mutable Generics 2",language:"ts",snippet:'const a: StringWrapper<"hello"> = wrap("hello");'},mu={name:"Mutable Generics 3",language:"ts",snippet:`const a: StringWrapper<"hello"> = wrap("hello");
  const b: StringWrapper<"friends"> = a.set("friends!");`},du={name:"Mutable Generics 4",language:"ts",snippet:`const a = wrap("hello")
  .set("there")
  .set("friends!");`},yu={name:"Pre Config",language:"ts",snippet:`function multiply(input: number, multiplicand: number): number { }
  /*...*/
  type Pipeline = (input: number, multiplicand: number, radix: number, /*...*/) => number;`},wu={name:"Post Config",language:"ts",snippet:`function multiply(input: number, config: {multiplicand: number}): number { }
  /*...*/
  type Pipeline = (input: number, config: {
    multiplicand: number; 
    radix: number; 
    /*...*/
  }) => number;`},bu={name:"Builder Class",language:"ts",snippet:"class PipelineBuilder<Input, Config extends Record<string, any>, Output> { }"},Tu={name:"Build Definition",language:"ts",snippet:"function build(): (input: Input, config: Config) => Output { }"},vu={name:"Append Definition",language:"ts",snippet:`function append<NewConfig extends Record<string, any>, NewOutput>(
    func: (state: Output, config: NewConfig) => NewOutput
  ): PipelineBuilder<Input, Config & NewConfig, NewOutput> { }`},xu={name:"Stage",language:"ts",snippet:`class PipelineBuilder<Input, Config extends Record<string, any>, Output> { private readonly stages: Array<(state: any, config: Config) => any>;}
  `},$u={name:"Constructor",language:"ts",snippet:"class PipelineBuilder<Input, Config extends Record<string, any>, Output> { private constructor(stages: Array<(state: any, config: Config) => any>) { }}"},Cu={name:"Static Instantiator",language:"ts",snippet:"class PipelineBuilder<Input, Config extends Record<string, any>, Output> { static new<Input>(): PipelineBuilder<Input, {}, Input> { }}"},cu={name:"Inferred Generics",language:"ts",snippet:`class PipelineBuilder<Input, Config extends Record<string, any>, Output> { static new<Input, Config extends Record<string, any>, Output>(
    stage: (state: Input, config: Config) => Output
  ): PipelineBuilder<Input, Config, Output> { }}`},ku={name:"Implementation",language:"ts",snippet:`class PipelineBuilder<Input, Config extends Record<string, any>, Output> {
    private readonly stages: Array<(state: any, config: Config) => any>;
  
    private constructor(stages: Array<(state: any, config: Config) => any>) {
      this.stages = stages;
    }
    
    static new<Input>(): PipelineBuilder<Input, {}, Input> {
      return new PipelineBuilder([]);
    }
  
    append<NewConfig extends Record<string, any>, NewOutput>(
      newStage: (state: Output, config: NewConfig) => NewOutput
    ): PipelineBuilder<Input, Config & NewConfig, NewOutput> {
      const newStages: Array<(state: any, config: Config & NewConfig) => any> = this.stages.slice();
      newStages.push(newStage);
      return new PipelineBuilder<Input, Config & NewConfig, NewOutput>(newStages);
    }
  
    build(): (input: Input, config: Config) => Output {
      return (input: Input, config: Config) => 
        this.stages.reduce((state, stage) => stage(state, config), input);
    }  
  }`},Iu={name:"Usage",language:"ts",snippet:`function reverse(input: string) {
    return input.split("").reverse().join("");
  }
  
  function toInt(input: string, config: {radix: number}) {
    return parseInt(input, config.radix);
  }
  
  function multiply(input: number, config: {multiplicand: number}) {
    return input * config.multiplicand;
  }
  
  const pipeline = PipelineBuilder
    .new<string>()
    .append(reverse)
    .append(toInt)
    .append(multiply)
    .build();
  
  const output: number = pipeline("532", {
    radix: 10,
    multiplicand: 5
  })`},Su={name:"Invalid first pipeline stage",language:"ts",snippet:`const pipeline = PipelineBuilder
  .new<string>()
  .append(multiply)`},Mu={name:"Invalid second pipeline stage",language:"ts",snippet:`const pipeline = PipelineBuilder
  .new<string>()
  .append(toInt)
  .append(toInt)`},Hu={name:"Invalid type on output",language:"ts",snippet:`const pipeline = PipelineBuilder
  .new<string>()
  .append(reverse)
  .build();

const output: number = pipeline("532", {})`},Lu={name:"Invalid pipeline input",language:"ts",snippet:`const output: number = pipeline(532, {
    radix: 10,
    multiplicand: 5
  })`},Bu={name:"Invalid config",language:"ts",snippet:`const output: number = pipeline("532", {
    multiplicand: 5
  })`},Pu={name:"Reusing Builders",language:"ts",snippet:`const a = PipelineBuilder.new<string>();
  const b = a.append((input: string, config: {}) => parseInt(input));
  const pipeline = a.build();`},Ou={name:"Mutable Stages",language:"ts",snippet:`function append(/*...*/) {
    stages.append(func);
    return new PipelineBuilder(stages);
  }`},Wu={name:"Black Magic Code",language:"ts",snippet:`type Tail<XS extends readonly any[]> = XS extends readonly [any, ...infer T] ? T : [];
  type Last<XS extends readonly any[]> = XS extends readonly [...infer _, infer X] ? X : never;
  type UnionToIntersection<U> = (U extends any ? (k: U)=>void : never) extends ((k: infer I)=>void) ? I : never;
  type Equal<A, B> = A extends B ? B extends A ? true : false : false;
  
  type PipelineStage<Input, Config extends Record<any, unknown>, Output> = (input: Input, config: Config) => Output;
  
  type Input<Stage extends PipelineStage<any, any, any>> = Parameters<Stage>[0];
  type Config<Stage extends PipelineStage<any, any, any>> = Parameters<Stage>[1];
  type Output<Stage extends PipelineStage<any, any, any>> = ReturnType<Stage>;
  type PipelineInput<Stages extends readonly [PipelineStage<any, any, any>, ...any[]]> = Input<Stages[0]>;
  type PipelineConfig<Stages extends readonly PipelineStage<any, any, any>[]> = UnionToIntersection<Config<Stages[number]>>;
  type PipelineOutput<Stages extends readonly PipelineStage<any, any, any>[]> = Output<Last<Stages>>;
  
  type Match<First extends PipelineStage<any, any, any>, Second extends PipelineStage<any, any, any>> = Equal<Output<First>, Input<Second>>;
  type ValidPipeline<Stages extends readonly PipelineStage<any, any, any>[]> =
    Stages extends readonly [any] ? true
    : Stages extends readonly [any, any, ...any[]] ? Match<Stages[0], Stages[1]> extends true ? ValidPipeline<Tail<Stages>>
    : false : false;
  
  type Pipeline<Stages extends readonly PipelineStage<any, any, any>[]> = ValidPipeline<Stages> extends true ? Stages : never;
  
  function createPipeline<Stages extends readonly [PipelineStage<any, any, any>, ...PipelineStage<any, any, any>[]]>(...pipeline: Pipeline<Stages>): (input: PipelineInput<Stages>, config: PipelineConfig<Stages>) => PipelineOutput<Stages> {
    return (input: PipelineInput<Stages>, config: PipelineConfig<Stages>) => {
      let state: any = input;
      for(const stage of pipeline) {
        state = stage(state, config)
      }
      return state;
    }
  }
  
  function reverse(input: string, config: {}) {
    return input.split("").reverse().join("");
  }
  
  function toInt(input: string, config: {radix: number}) {
    return parseInt(input, config.radix);
  }
  
  function multiply(input: number, config: {multiplicand: number}) {
    return input * config.multiplicand;
  }
  
  const pipeline = createPipeline(reverse, toInt, multiply);
  const output = pipeline("524", {radix: 10, multiplicand: 5});`};var m={basic:iu,reusable:su,singleObject:nu,factory:lu,typescript1:pu,completeness:ou,concatFunction:uu,concatBuilder:fu,mutableGeneric1:ru,mutableGeneric2:au,mutableGeneric3:mu,mutableGeneric4:du,preConfig:yu,postConfig:wu,builderClass:bu,buildDefinition:Tu,appendDefinition:vu,stages:xu,constructor:$u,staticInstantiator:Cu,inferredGenerics:cu,implementation:ku,usage:Iu,error1:Su,error2:Mu,error3:Hu,error4:Lu,error5:Bu,error6:Pu,error7:Ou,complex:Wu};function qu(Ts){let d,T,y,v,x,vs,Q,xs,Z,$s,ee,Cs,te,cs,$,ks,ie,Is,se,Ss,ne,Ms,le,Hs,C,Ls,pe,Bs,oe,Ps,c,Os,ue,Ws,fe,qs,re,js,ae,As,me,Gs,de,Ns,ye,Rs,we,Fs,k,hs,be,_s,Te,gs,ve,Es,I,Ds,xe,Js,$e,Us,Ce,Vs,Xs,Ys,ce,zs,ke,Ks,Ie,Qs,Se,Zs,Me,en,He,tn,Le,sn,S,nn,Be,ln,Pe,pn,Oe,on,We,un,fn,rn,qe,an,je,mn,Ae,dn,Ge,yn,Ne,wn,Re,bn,M,Tn,Fe,vn,he,xn,H,$n,_e,Cn,ge,cn,Ee,kn,De,In,Je,Sn,Ue,Mn,Ve,Hn,Xe,Ln,Ye,Bn,L,Pn,ze,On,B,Wn,Ke,qn,P,jn,Qe,An,O,Gn,Ze,Nn,et,Rn,tt,Fn,it,hn,st,_n,nt,gn,lt,En,pt,Dn,ot,Jn,ut,Un,ft,Vn,rt,Xn,at,Yn,mt,zn,dt,Kn,yt,Qn,wt,Zn,bt,el,Tt,tl,vt,il,xt,sl,$t,nl,Ct,ll,ct,pl,kt,ol,It,ul,St,fl,Mt,rl,Ht,al,Lt,ml,Bt,dl,Pt,yl,Ot,wl,Wt,bl,qt,Tl,jt,vl,At,xl,Gt,$l,Nt,Cl,Rt,cl,Ft,kl,ht,Il,_t,Sl,W,Ml,gt,Hl,q,Ll,Et,Bl,Dt,Pl,Jt,Ol,Ut,Wl,Vt,ql,Xt,jl,Yt,Al,j,Gl,zt,Nl,Kt,Rl,Qt,Fl,A,hl,Zt,_l,ei,gl,ti,El,ii,Dl,si,Jl,ni,Ul,li,Vl,pi,Xl,G,Yl,oi,zl,ui,Kl,fi,Ql,ri,Zl,ai,ep,N,tp,mi,ip,di,sp,yi,np,R,lp,wi,pp,F,op,w,Jo,up,Uo,fp,Vo,rp,Xo,ap,Yo,mp,zo,dp,bi,yp,h,wp,Ti,bp,vi,Tp,xi,vp,$i,xp,Ci,$p,_,Cp,ci,cp,ki,kp,Ii,Ip,Si,Sp,g,Mp,Mi,Hp,Hi,Lp,Li,Bp,Bi,Pp,Op,Wp,Pi,qp,E,jp,Ap,Gp,Oi,Np,D,Rp,Fp,hp,Wi,_p,J,gp,Ep,Dp,qi,Jp,U,Up,Vp,Xp,ji,Yp,V,zp,Kp,Qp,Ai,Zp,Gi,eo,Ni,to,Ri,io,Fi,so,X,no,hi,lo,Y,po,_i,oo,gi,uo,Ei,fo,Di,ro,Ji,ao,Ui,mo,Vi,yo,Xi,wo,Yi,bo,zi,To,vo,xo,Ki,$o,Qi,Co,Zi,co,z,ko,es,Io,ts,So,is,Mo,ss,Ho,ns,Lo,Bo,Po,ls,Oo,ps,Wo,os,qo,us,jo,fs,Ao,rs,Go,as,No,ms,Ro,Fo,ho,ds,_o,ys,go,Eo,Do,ws,bs;return $=new a({props:{config:m.basic}}),C=new a({props:{config:m.reusable}}),c=new a({props:{config:m.singleObject}}),k=new a({props:{config:m.factory}}),I=new a({props:{config:m.typescript1}}),S=new a({props:{config:m.completeness}}),M=new a({props:{config:m.concatFunction}}),H=new a({props:{config:m.concatBuilder}}),L=new a({props:{config:m.mutableGeneric1}}),B=new a({props:{config:m.mutableGeneric2}}),P=new a({props:{config:m.mutableGeneric3}}),O=new a({props:{config:m.mutableGeneric4}}),W=new a({props:{config:m.preConfig}}),q=new a({props:{config:m.postConfig}}),j=new a({props:{config:m.builderClass}}),A=new a({props:{config:m.buildDefinition}}),G=new a({props:{config:m.appendDefinition}}),N=new a({props:{config:m.stages}}),R=new a({props:{config:m.constructor}}),F=new a({props:{config:m.staticInstantiator}}),h=new a({props:{config:m.inferredGenerics}}),_=new a({props:{config:m.implementation}}),g=new a({props:{config:m.usage}}),E=new a({props:{config:m.error1}}),D=new a({props:{config:m.error2}}),J=new a({props:{config:m.error3}}),U=new a({props:{config:m.error4}}),V=new a({props:{config:m.error5}}),X=new a({props:{config:m.error6}}),Y=new a({props:{config:m.error7}}),z=new a({props:{config:m.complex}}),{c(){d=l("p"),d.innerHTML=`The builder pattern in TypeScript is amazing.
    However, the way you use it in TypeScript is completely different to other languages.
    Typically, builders are used to add support for optional and default parameters in languages that don&#39;t support them directly.
    TypeScript <em>already</em> supports <a href="https://www.typescriptlang.org/docs/handbook/functions.html#optional-and-default-parameters">optional and default parameters</a> though - so what&#39;s the point?`,T=n(),y=l("p"),y.innerHTML=`We can actually use builders as a workaround for other issues in the type system.
    In TypeScript, that means a way to enforce complex constraints like <code>only allow sending an event if anyone is listening for that event</code>.
    In this (long but beginner-friendly) post, we do an in-depth walkthrough of how to create a TypeScript builder class to enforce a complex constraint like that one.`,v=n(),x=l("p"),x.textContent=`We start by introducing a simple data processing task and discuss how it would be useful to create a generic version.
    That immediately gets too hard, so we introduce builders to save the day.
    Step-by-step, we analyse the problem and design a builder to solve the problem.
    We then discuss the pros and cons of that approach, and explore whether it was even necessary in the first place.`,vs=n(),Q=l("h2"),Q.textContent="A Simple Task",xs=n(),Z=l("p"),Z.textContent="Let's imagine a basic data processing task:",$s=n(),ee=l("figure"),ee.innerHTML='<img src="/assets/blog/typescript-builders/Builders-Simple-Pipeline.svg" title="This definitely warranted a 5000 word blog post" alt="Shows a simple data pipeline that performs the following steps:" class="svelte-1wsp3u5"/>',Cs=n(),te=l("ol"),te.innerHTML=`<li>Take an integer string as input</li> 
    <li>Reverse it</li> 
    <li>Parse it back into an integer</li> 
    <li>Multiply it by 5</li>`,cs=n(),p($.$$.fragment),ks=n(),ie=l("p"),ie.textContent=`The rest of this blog post is dedicated to over-engineering that tiny bit of code.
    It's clearly overkill in this case, but that's inevitable when we use a simple example to demonstrate an advanced technique.`,Is=n(),se=l("h3"),se.textContent="Making it Reusable",Ss=n(),ne=l("p"),ne.textContent=`We saw how to do that task as a one-off, but what if we wanted it to be a configurable reusable function?
    We can define a function that takes a few config parameters:`,Ms=n(),le=l("figure"),le.innerHTML='<img src="/assets/blog/typescript-builders/Builders-Configurable-Pipeline.svg" title="Not that you&#39;d ever really want to set the radix" alt="The to Int and multiply steps take config parameters now" class="svelte-1wsp3u5"/>',Hs=n(),p(C.$$.fragment),Ls=n(),pe=l("p"),pe.textContent="Often, it's easier to take the config as a single object:",Bs=n(),oe=l("figure"),oe.innerHTML='<img src="/assets/blog/typescript-builders/Builders-Config-Object.svg" title="We&#39;re definitely doing it this way because it&#39;s intuitive and not because it makes the rest of the blog post simpler" alt="The radix and multiplicand parameters come from a single config object" class="svelte-1wsp3u5"/>',Ps=n(),p(c.$$.fragment),Os=n(),ue=l("p"),ue.innerHTML=`That&#39;s useful as it allows the config to be loaded from a JSON file.
    <em>Conveniently</em> it also makes our job easier later on.
    What are the odds?`,Ws=n(),fe=l("h3"),fe.textContent="Formal Definition",qs=n(),re=l("p"),re.textContent="Taking a step back, what is it that we're actually trying to do?",js=n(),ae=l("p"),ae.innerHTML=`This pattern is really common, and goes by a few names.
    Most commonly in computing, it&#39;s known as a <a href="https://en.wikipedia.org/wiki/Pipeline_(computing)">pipeline</a> - a function which takes data and performs a sequence of transformations.
    The fundamental technique in mathematics is called <a href="https://en.wikipedia.org/wiki/Function_composition">function composition</a> - combining many small functions into one larger function.`,As=n(),me=l("p"),me.innerHTML=`Pipelines are used for things like application build config, or for http request middleware.
    Their main benefit is the ability to <em>encapsulate</em> many functions, allowing them to be treated as one.`,Gs=n(),de=l("figure"),de.innerHTML='<img src="/assets/blog/typescript-builders/Builders-Encapsulation.svg" title="All good technical diagrams include a red scribble" alt="We can treat the entire pipeline as a single function" class="svelte-1wsp3u5"/>',Ns=n(),ye=l("h3"),ye.textContent="A Pipeline Factory",Rs=n(),we=l("p"),we.textContent=`Since we create pipelines so often, a reusable function that creates pipelines sounds really useful.
    The JavaScript implementation is simple using higher-order functions:`,Fs=n(),p(k.$$.fragment),hs=n(),be=l("figure"),be.innerHTML='<img src="/assets/blog/typescript-builders/Builders-Factory.svg" title="If only it was that easy" alt="We pass the three functions as a list into the pipeline factory, which outputs the factory" class="svelte-1wsp3u5"/>',_s=n(),Te=l("p"),Te.innerHTML=`However, just because the JS code is simple, that doesn&#39;t mean it&#39;s easy to do (safely) in TypeScript.
    Of course, it&#39;s possible to just copy the JavaScript with a healthy sprinkling of <code>any</code>.`,gs=n(),ve=l("p"),ve.textContent=`That's no fun though - why even use TypeScript if you're just gonna ignore type errors?
    Let's try actually putting in some effort, and see how narrow we can make the types.
    As a first attempt, I get something like this:`,Es=n(),p(I.$$.fragment),Ds=n(),xe=l("p"),xe.textContent=`This has issues.
    To find out why, we need to learn some new terminology.`,Js=n(),$e=l("h3"),$e.textContent="Math Time",Us=n(),Ce=l("p"),Ce.textContent="It's time for a quick journey into the foundations of mathematical logic, so hold on\u2026",Vs=n(),Xs=l("hr"),Ys=n(),ce=l("p"),ce.innerHTML=`Ideally, we want a type definition to be <em>sound</em> and <em>complete</em>.
    <em>Soundness</em> means any function call that compiles will not cause type errors at runtime.
    <em>Completeness</em> means any valid function call should compile.`,zs=n(),ke=l("p"),ke.innerHTML='Mathematicians have <a href="https://en.wikipedia.org/wiki/Soundness">much longer</a>, <a href="https://en.wikipedia.org/wiki/Completeness_(logic)">more general</a> definitions of those terms.',Ks=n(),Ie=l("p"),Ie.innerHTML=`Our first Pipeline Factory attempt is <em>sound</em> but not <em>complete</em>.
    It requires all the functions to be the same type.
    The JavaScript version is more powerful.`,Qs=n(),Se=l("p"),Se.textContent=`The pipeline we created manually contains three stages.
    Some of them output a string, while others output a number.
    That's fine in our JS example, but won't compile in our TS example.`,Zs=n(),Me=l("p"),Me.textContent=`Specifically, a pipeline is valid when each stage's output is the same type as the next stage's input.
    To achieve both soundness and completeness, we'd need a way to check for that.`,en=n(),He=l("figure"),He.innerHTML='<img src="/assets/blog/typescript-builders/Builders-Constraint.svg" title="The outie bit needs to fit the innie bit. That&#39;s just how science works." alt="Each stage has a shaped input and output. They must match up like a jigsaw if the pipeline is going to work" class="svelte-1wsp3u5"/>',tn=n(),Le=l("p"),Le.textContent=`It's not obvious how we could achieve both soundness and completeness at the same time.
    Any simple solutions will only achieve completeness by losing soundness, like this:`,sn=n(),p(S.$$.fragment),nn=n(),Be=l("p"),Be.textContent="In other words, this would let us pass an invalid pipeline, like this:",ln=n(),Pe=l("ol"),Pe.innerHTML=`<li>Take a string and reverse it</li> 
    <li>Multiply by 5</li>`,pn=n(),Oe=l("p"),Oe.textContent="In step 1, we output a string, but in step 2 we expect a number as an input.",on=n(),We=l("figure"),We.innerHTML='<img src="/assets/blog/typescript-builders/Builders-Constraint-Error.svg" title="It&#39;s like when you get a box that&#39;s half full of Lego and half MegaBlocks..." alt="The output of reverse doesn&#39;t fit the input of multiply" class="svelte-1wsp3u5"/>',un=n(),fn=l("hr"),rn=n(),qe=l("p"),qe.textContent=`Right, we're out of the woods now.
    Still with me?
    Let's get back to the code.`,an=n(),je=l("h3"),je.textContent="The problem",mn=n(),Ae=l("p"),Ae.textContent=`Our ideal pipeline definition is too complex.
    A pipeline is valid based on whether each element in an array matches the one before it.
    That's not something we can easily restrict.`,dn=n(),Ge=l("p"),Ge.textContent="With builders, it's a different picture entirely.",yn=n(),Ne=l("h2"),Ne.textContent="Introducing Builders",wn=n(),Re=l("p"),Re.innerHTML=`A <a href="https://en.wikipedia.org/wiki/Builder_pattern">builder</a> is any utility class that uses sequential method calls to have the effect of a single method call.
    They are typically used for the creation of complex objects.
    For example, a string concatenation function could be written as:`,bn=n(),p(M.$$.fragment),Tn=n(),Fe=l("figure"),Fe.innerHTML='<img src="/assets/blog/typescript-builders/Builders-String-Factory.svg" title="ARGH I FORGOT THE SPACES!!!" alt="A simple function that takes a list of strings and joins them together" class="svelte-1wsp3u5"/>',vn=n(),he=l("p"),he.textContent="Or it could be written as a builder, meaning it gets used like this:",xn=n(),p(H.$$.fragment),$n=n(),_e=l("figure"),_e.innerHTML='<img src="/assets/blog/typescript-builders/Builders-String-Builder.svg" title="This is definitely much easier :|" alt="Achieves the same thing but using repeated append calls on a builder" class="svelte-1wsp3u5"/>',Cn=n(),ge=l("p"),ge.innerHTML=`<code>StringBuilder</code> isn&#39;t something we see very often in TypeScript, because it&#39;s easy enough to just write it as a single method as seen above.
    In Java however, we see builders all the time (<a href="https://docs.oracle.com/javase/8/docs/api/java/lang/StringBuilder.html">including <code>StringBuilder</code></a>).
    That&#39;s because Java&#39;s type system is less flexible than TypeScript&#39;s.`,cn=n(),Ee=l("blockquote"),Ee.textContent="Builders make up for inadequacies in the type system",kn=n(),De=l("p"),De.innerHTML=`In Java, they let us call functions with a varying number of arguments, and provide a way to support optional and default parameters.
    TypeScript already supports <a href="https://www.typescriptlang.org/docs/handbook/functions.html#optional-and-default-parameters">all</a> of <a href="https://www.typescriptlang.org/docs/handbook/functions.html#rest-parameters">that</a>, but builders can let us enforce more complex constraints, like our pipeline&#39;s output-equals-input constraint.`,In=n(),Je=l("p"),Je.innerHTML="We can achieve that by using a technique that I&#39;m calling <em>Mutable Generic State</em>.",Sn=n(),Ue=l("p"),Ue.innerHTML='<em>If it already has a name, please <a href="https://twitter.com/stewaterman">let me know</a>. I spent a long time looking.</em>',Mn=n(),Ve=l("h2"),Ve.textContent="Mutable Generic State",Hn=n(),Xe=l("p"),Xe.textContent="Mutable Generic State is a technique which uses immutable classes to give the impression of a class with mutable generic types.",Ln=n(),Ye=l("p"),Ye.innerHTML=`Let&#39;s imagine a simple string wrapper class.
    It stores a string which can be accessed with <code>.get()</code> and updated with <code>.set()</code>.`,Bn=n(),p(L.$$.fragment),Pn=n(),ze=l("p"),ze.innerHTML=`Here, the return type of <code>a.get()</code> is <code>string</code>.
    We can make <code>a.get()</code> return <code>&quot;hello&quot;</code>, by using type literals in a generic type:`,On=n(),p(B.$$.fragment),Wn=n(),Ke=l("p"),Ke.innerHTML=`However, now we can&#39;t call <code>a.set()</code> unless the new value is also <code>&quot;hello&quot;</code>.
    With Mutable Generic State, it all works as expected:`,qn=n(),p(P.$$.fragment),jn=n(),Qe=l("p"),Qe.innerHTML=`The trick here is that we&#39;ve made <code>StringWrapper</code> immutable.
    When we call <code>.set()</code>, we are actually creating a new instance of StringWrapper with a different generic parameter.
    Once those calls are inlined, there&#39;s no way to tell that each <code>.set()</code> call produces a new wrapper:`,An=n(),p(O.$$.fragment),Gn=n(),Ze=l("figure"),Ze.innerHTML='<img src="/assets/blog/typescript-builders/Builders-MGS.svg" title="Sadly, one thing builders can&#39;t solve is YOU BEING AN IDIOT THAT FORGETS THE SPACES" alt="Achieves the same thing but using repeated append calls on a builder" class="svelte-1wsp3u5"/>',Nn=n(),et=l("p"),et.innerHTML=`From the user&#39;s perspective, it&#39;s like we&#39;ve <em>mutated</em> the generic type from <code>&quot;hello&quot;</code> to <code>&quot;there&quot;</code> to <code>&quot;friends!&quot;</code>.
    The generic type tells us something about the current state of the builder, and it mutates when the builder does.
    That&#39;s where the name comes from - it&#39;s <em>state</em>, stored in the <em>generic</em> types, which is <em>mutable</em>.`,Rn=n(),tt=l("h2"),tt.textContent="Types of Constraints",Fn=n(),it=l("p"),it.innerHTML=`When thinking about types, we think of it in terms of <em>constraining</em> the set of possible data types.
    Some of those constraints are <em>simple</em>:`,hn=n(),st=l("blockquote"),st.textContent="String wrappers should contain a string",_n=n(),nt=l("p"),nt.innerHTML="Some constraints are <em>complex</em>:",gn=n(),lt=l("blockquote"),lt.innerHTML="Calling <code>.get()</code> on a string wrapper should return the type of the argument passed in the last call to <code>.set()</code>",En=n(),pt=l("p"),pt.innerHTML=`Complex constraints are <em>relative</em>.
    They change based on previous method calls, or previous elements in an array.
    In the case of <code>StringWrapper</code>, the arguments passed to <code>.set()</code> are conditionally valid based on previous <code>.set()</code> calls.`,Dn=n(),ot=l("p"),ot.innerHTML=`That&#39;s not the only requirement though.
    A constraint can only be complex if it is potentially infinite.
    Otherwise, we could just list all valid type combinations.
    Our string wrapper has an infinite number of strings it could hold, and no limit on the number of calls to <code>.set()</code>.`,Jn=n(),ut=l("h2"),ut.textContent="When to use builders",Un=n(),ft=l("p"),ft.textContent=`Builders are clunky, hard to write, and hard to use.
    If you can do it without a builder, that's probably best.
    They should be a last resort.`,Vn=n(),rt=l("p"),rt.textContent=`It's not always possible to use a builder.
    For example, builders can't help when writing type definitions for a pre-existing JavaScript library, as they exist in the compiled JavaScript code.
    You can still use builders in a wrapper around the library though!`,Xn=n(),at=l("p"),at.innerHTML=`Sometimes, a builder is more readable and simpler than the alternative.
    If it&#39;s <em>technically possible</em> to achieve without a builder, but you don&#39;t know how, a builder is still a valid choice.
    In fact, as of TypeScript 4, you <em>technically</em> never need a builder.
    I&#39;ll come back to this right at the end, so keep an eye out.
    In practice though, a builder is usually a better option.`,Yn=n(),mt=l("p"),mt.textContent="If it wasn't already obvious, our pipeline example is a good candidate for a builder!",zn=n(),dt=l("h2"),dt.textContent="Builder building 1: Identifying the Generics",Kn=n(),yt=l("p"),yt.textContent=`Now we're set on solving the problem with a builder, where do we start?
    The first step is to identify the generic types it needs.
    Some of those types will change as we call methods on the builder - the mutable generic state.
    Others are just normal generic types.`,Qn=n(),wt=l("p"),wt.textContent="There are two places we need to look:",Zn=n(),bt=l("ol"),bt.innerHTML=`<li>The builder&#39;s output</li> 
    <li>The complex constraints</li>`,el=n(),Tt=l("p"),Tt.textContent=`The builder's output is dependent on what we passed in our method calls.
    In order to correctly type it, we need to add some generic state to the builder.
    In our case, the output is a function which performs some kind of data transformation on an input, producing an output, based on config.
    All three of those should be generic types.`,tl=n(),vt=l("figure"),vt.innerHTML='<img src="/assets/blog/typescript-builders/Builders-Output-Generics.svg" title="They were right there all along!" alt="The generic types needed for the built pipeline are the input, output, and config" class="svelte-1wsp3u5"/>',il=n(),xt=l("p"),xt.textContent="Next, we need to think about the constraints on our builder and how they map to Mutable Generic State.",sl=n(),$t=l("p"),$t.textContent="To create our pipeline, we need a sequence of stages where:",nl=n(),Ct=l("ul"),Ct.innerHTML=`<li>There is a defined order</li> 
    <li>Each one has two arguments - input and config</li> 
    <li>The output of one stage is the first argument to the next stage</li>`,ll=n(),ct=l("figure"),ct.innerHTML='<img src="/assets/blog/typescript-builders/Builders-Mutation-Constraint.svg" title="Make them all fit together" alt="Visual representation of those bullet points using the jigsaw-like style" class="svelte-1wsp3u5"/>',pl=n(),kt=l("p"),kt.innerHTML=`The first constraint is achieved by simply storing the stages in a list in the order they were added to the builder.
    The second constraint is a simple type definition: <code>(input: any, config: any) =&gt; any</code>.
    The final constraint is complex, and must be enforced using Mutable Generic State.`,ol=n(),It=l("h3"),It.textContent="Enforcing Stage Consistency",ul=n(),St=l("p"),St.textContent=`Consider the builder in an intermediate state.
    We have a few stages already added, and assume that everything is correct until now.`,fl=n(),Mt=l("figure"),Mt.innerHTML='<img src="/assets/blog/typescript-builders/Builders-Intermediate-Builder.svg" title="A happy little community of stages!" alt="The builder has 3 stages added" class="svelte-1wsp3u5"/>',rl=n(),Ht=l("p"),Ht.textContent=`What information do we need about the previous calls to add a new stage to our pipeline?
    Well, that depends on how we add the new stage.
    I can see a few options:`,al=n(),Lt=l("ol"),Lt.innerHTML=`<li>Only add stages to the start of the pipeline</li> 
    <li>Only add stages to the end of the pipeline</li> 
    <li>Add stages anywhere valid in the pipeline assuming it doesn&#39;t make the pipeline invalid</li> 
    <li>Add stages anywhere in the pipeline, even if it becomes invalid, and only allow building the pipeline when it&#39;s valid</li>`,ml=n(),Bt=l("p"),Bt.innerHTML="All four options are <em>possible</em> using builders and Mutable Generic State, but some are easier than others.",dl=n(),Pt=l("p"),Pt.textContent=`Options 1 and 2 are both pretty simple. 
    In option 1, we need to know the current pipeline input and the new stage's output.
    In option 2, we need the pipeline's output and the new stage's input.`,yl=n(),Ot=l("p"),Ot.textContent=`Option 3 is quite hard.
    We need to know the state before and after each stage of the pipeline:`,wl=n(),Wt=l("ul"),Wt.innerHTML=`<li>If we insert at the start, we restrict the output of the new stage.</li> 
    <li>If we insert at the end, we restrict the input of the new stage.</li> 
    <li>If we insert in the middle, we restrict both the input and output. Both must be the same as the state at the insertion point.</li>`,bl=n(),qt=l("p"),qt.textContent=`Option 4 is nightmarish.
    I'm not going to go into detail, because this is already an absurdly long post.
    Feel free to try, and let me know if you get it to work!`,Tl=n(),jt=l("p"),jt.innerHTML=`We need to weigh up user-friendliness vs simplicity of writing the builder.
    To me, options 3 and 4 are too complex and don&#39;t make the final builder <em>that much</em> easier to use.
    Between options 1 and 2, there&#39;s no difference in complexity but adding to the end of the pipeline is more natural.`,vl=n(),At=l("p"),At.innerHTML=`Therefore, I&#39;m going with option 2.
    <strong>When adding a stage, we need to know its input and the current pipeline&#39;s output.</strong>`,xl=n(),Gt=l("figure"),Gt.innerHTML='<img src="/assets/blog/typescript-builders/Builders-Stage-Consistency-Check.svg" title="An outsider - but they mesh well!" alt="We add a fourth stage, and it is valid because it fits against the current output" class="svelte-1wsp3u5"/>',$l=n(),Nt=l("p"),Nt.innerHTML="Getting the input of the new stage is simple with a generic type on the builder&#39;s <code>append</code> method.",Cl=n(),Rt=l("p"),Rt.innerHTML=`We already have an <code>Output</code> generic type on the builder, but we&#39;ll need to update it over time.
    Whenever we add a new stage to the pipeline, we update <code>Output</code> to be the output of the new stage.`,cl=n(),Ft=l("h3"),Ft.textContent="Tracking the Config",kl=n(),ht=l("p"),ht.textContent=`There's one other constraint on our builder.
    The config in the resulting pipeline needs to provide the information to each stage.
    I'm going to skip the in-depth discussion of how we could achieve that and tell you the solution.
    When talking about function parameters, it's simplest to just use a single config object.`,Il=n(),_t=l("p"),_t.textContent="In other words, rather than our stages looking like this:",Sl=n(),p(W.$$.fragment),Ml=n(),gt=l("p"),gt.textContent="We should just require them to look like this:",Hl=n(),p(q.$$.fragment),Ll=n(),Et=l("p"),Et.textContent="The first example can work, but it's usually not worth the extra effort.",Bl=n(),Dt=l("p"),Dt.innerHTML=`We already had the <code>Config</code> generic type, but now we know it needs to be mutable.
    Whenever we append a stage, its config parameters should be added to the <code>Config</code> generic type.`,Pl=n(),Jt=l("figure"),Jt.innerHTML='<img src="/assets/blog/typescript-builders/Builders-Config-Consistency.svg" title="Grow! GROW!!!" alt="When we add a fourth stage, the config is also updated" class="svelte-1wsp3u5"/>',Ol=n(),Ut=l("h2"),Ut.textContent="Builder building 2: Structuring the Builder",Wl=n(),Vt=l("p"),Vt.textContent=`Now we know what our generic types are and how they update, we can start writing our builder.
    Just focus on the types for now, since that's the hard bit.
    We can fill in the method stubs later.`,ql=n(),Xt=l("h3"),Xt.textContent="Class Definition",jl=n(),Yt=l("p"),Yt.textContent="Create a new class for our builder, with the generics we figured out previously.",Al=n(),p(j.$$.fragment),Gl=n(),zt=l("p"),zt.innerHTML='If you haven&#39;t seen the <a href="https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeystype">Record type</a> before, just know that we&#39;re saying that <code>Config</code> must be an object with strings for its keys.',Nl=n(),Kt=l("h3"),Kt.textContent="Build definition",Rl=n(),Qt=l("p"),Qt.textContent=`The build method creates the output of the pipeline.
    It's really nothing special.
    We declare a method which outputs a pipeline function based on the generic types:`,Fl=n(),p(A.$$.fragment),hl=n(),Zt=l("h3"),Zt.textContent="Mutator Definition",_l=n(),ei=l("p"),ei.innerHTML=`The mutator method is the one that changes something about the object, in our case <code>append</code>.
    It&#39;s not an entirely accurate name, since our builders are immutable, but it makes sense when we&#39;re conceptualising them as mutable objects.`,gl=n(),ti=l("p"),ti.innerHTML=`Thinking back to our discussion about how to enforce the constraints with Mutable Generic State, how should each of the three type parameters change after a call to append?
    Firstly, <code>Input</code> should not change. Stages are added to the end of the pipeline and don&#39;t affect the start.`,El=n(),ii=l("p"),ii.innerHTML="Regarding <code>Output</code>, we said:",Dl=n(),si=l("blockquote"),si.textContent="Whenever we add a new stage to the pipeline, we update the type to be the output of the new stage.",Jl=n(),ni=l("p"),ni.innerHTML="Regarding <code>Config</code>, we said:",Ul=n(),li=l("blockquote"),li.innerHTML="Whenever we append a new stage, any new parameters in that stage should be added to the <code>Config</code> generic type.",Vl=n(),pi=l("p"),pi.textContent="In terms of a type definition, that looks like this:",Xl=n(),p(G.$$.fragment),Yl=n(),oi=l("p"),oi.innerHTML='<code>Output</code> becomes <code>NewOutput</code> and <code>Config</code> becomes <code>Config &amp; NewConfig</code>, an <a href="https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html#intersection-types">intersection type</a>.',zl=n(),ui=l("p"),ui.innerHTML="Notice that after a few calls to <code>append</code>, the <code>Config</code> type will be something like <code>Config &amp; NewConfig1 &amp; NewConfig2 &amp; NewConfig3 &amp; NewConfig4</code>",Kl=n(),fi=l("p"),fi.textContent=`That is harmless, and just a quirk of the Mutable Generic State, so don't be alarmed if you see a huge type when you weren't expecting one.
  The autocomplete will get better once the builder is done and in use.`,Ql=n(),ri=l("h3"),ri.textContent="Internal State",Zl=n(),ai=l("p"),ai.innerHTML=`The internal state should just be whatever the <code>build</code> method needs for its implementation.
  In our case, we only need the list of stages.
  We add that as a private readonly property, and give it the narrowest type we can:`,ep=n(),p(N.$$.fragment),tp=n(),mi=l("h3"),mi.textContent="Instantiation",ip=n(),di=l("p"),di.textContent=`Up until this point, we have ignored how to instantiate a new pipeline builder, just assuming that we had one ready-made.
    Unsurprisingly, it's more complex than just adding a constructor.
    In fact, we need two different ways of creating a builder.`,sp=n(),yi=l("p"),yi.innerHTML=`First, we need a private constructor to use internally.
    It allows &#39;mutation&#39; of the builder, setting <code>stages</code> to any value, even if that would break the resulting pipeline.
    That&#39;s why it must be private.`,np=n(),p(R.$$.fragment),lp=n(),wi=l("p"),wi.textContent=`Secondly, we need a public creation method.
    It should set reasonable defaults for the type parameters where possible, in line with what you'd expect from an 'empty' builder.`,pp=n(),p(F.$$.fragment),op=n(),w=l("p"),Jo=K("Here, the "),up=l("code"),up.textContent="Config",Uo=K(" parameter was set to a reasonable default of "),fp=l("code"),fp.textContent="{}",Vo=K(`, since a pipeline with no stages doesn't need config.
    Other type parameters may have to be manually specified by the user, like the `),rp=l("code"),rp.textContent="Input",Xo=K(` type.
    The `),ap=l("code"),ap.textContent="Output",Yo=K(" type is the same as "),mp=l("code"),mp.textContent="Input",zo=K(" since a pipeline with no stages just outputs the input."),dp=n(),bi=l("p"),bi.textContent="Alternatively, by requiring at least one stage in each pipeline, there's no need to manually specify any generic types:",yp=n(),p(h.$$.fragment),wp=n(),Ti=l("p"),Ti.textContent="I'm going with the first option, but it's a matter of preference.",bp=n(),vi=l("h2"),vi.textContent="Builder building 3: Implementation",Tp=n(),xi=l("p"),xi.textContent=`Finally, the method stubs need implementing.
    The implementation is standard TypeScript, without having to worry about the complex constraints.
    Those are handled by the method signatures.`,vp=n(),$i=l("p"),$i.innerHTML=`However, be aware that the builder <strong>isn&#39;t really type-safe</strong>, at least internally.
    A few casts are needed to get the types to work, which means simple mistakes like adding a stage in the wrong location won&#39;t cause type errors.
    Double-checking that everything lines up is imperative.`,xp=n(),Ci=l("p"),Ci.textContent=`Implementing those methods is the last step, meaning the builder is now done!
    Here's one I made earlier:`,$p=n(),p(_.$$.fragment),Cp=n(),ci=l("p"),ci.textContent="In a whistle-stop tour of the implementation, we see that:",cp=n(),ki=l("ul"),ki.innerHTML=`<li>The constructor sets the <code>stages</code> property</li> 
    <li><code>new</code> creates an empty builder - one with no stages</li> 
    <li><code>append</code> creates a new list of stages, adds the new stage, and returns a new builder based on that</li> 
    <li><code>build</code> returns a function which takes an input and some config, then sequentially applies the stages</li>`,kp=n(),Ii=l("h3"),Ii.textContent="Usage",Ip=n(),Si=l("p"),Si.textContent="Let's see the builder in action:",Sp=n(),p(g.$$.fragment),Mp=n(),Mi=l("p"),Mi.textContent="I defined the stages above, but they could've been inlined as arrow functions.",Hp=n(),Hi=l("p"),Hi.innerHTML=`We call <code>PipelineBuilder.new&lt;string&gt;()</code> to create a new builder that takes a string as input.
    Then we append our three functions in the correct order.
    Finally, we call <code>.build()</code> to get a pipeline that we can call, and then we try it out.`,Lp=n(),Li=l("figure"),Li.innerHTML='<img src="/assets/blog/typescript-builders/Builders-Usage.svg" title="The code may be simple, but the complexity of this diagram makes me feel a bit better about how long the post is!" alt="Visual representation of the last paragraph&#39;s description" class="svelte-1wsp3u5"/>',Bp=n(),Bi=l("p"),Bi.innerHTML=`It&#39;s hard to demonstrate the builder, because the most impressive bit is all the things you <em>can&#39;t do</em>.
    Here&#39;s a gallery of things that won&#39;t compile:`,Pp=n(),Op=l("hr"),Wp=n(),Pi=l("p"),Pi.innerHTML="<strong>Invalid first pipeline stage, <code>multiply</code> takes a <code>number</code> but got a <code>string</code></strong>:",qp=n(),p(E.$$.fragment),jp=n(),Ap=l("hr"),Gp=n(),Oi=l("p"),Oi.innerHTML="<strong>Invalid second pipeline stage, <code>toInt</code> outputs a number but inputs a string</strong>:",Np=n(),p(D.$$.fragment),Rp=n(),Fp=l("hr"),hp=n(),Wi=l("p"),Wi.innerHTML="<strong>Invalid type on <code>output</code>, pipeline returns <code>string</code></strong>:",_p=n(),p(J.$$.fragment),gp=n(),Ep=l("hr"),Dp=n(),qi=l("p"),qi.innerHTML="<strong>Invalid pipeline input, should be string</strong>:",Jp=n(),p(U.$$.fragment),Up=n(),Vp=l("hr"),Xp=n(),ji=l("p"),ji.innerHTML="<strong>Invalid config, missing radix</strong>:",Yp=n(),p(V.$$.fragment),zp=n(),Kp=l("hr"),Qp=n(),Ai=l("p"),Ai.innerHTML='<a href="https://en.wikipedia.org/wiki/Soundness">Sound.</a>',Zp=n(),Gi=l("h2"),Gi.textContent="Analysing the Builder",eo=n(),Ni=l("p"),Ni.textContent=`This is not a simple technique, and I've really hyped it up.
    However, there are drawbacks, and things can easily go wrong.
    Let's discuss a couple of those rough edges.`,to=n(),Ri=l("h3"),Ri.textContent="Immutable internal state",io=n(),Fi=l("p"),Fi.innerHTML=`Each call to the <code>.append()</code> method creates a new builder.
    That&#39;s a bit slow, but that&#39;s not the main issue.
    There&#39;s no guarantee that someone won&#39;t hold on to an old builder, like this:`,so=n(),p(X.$$.fragment),no=n(),hi=l("p"),hi.innerHTML="If <code>stages</code> was mutable, and append looked like this:",lo=n(),p(Y.$$.fragment),po=n(),_i=l("p"),_i.innerHTML=`Then <code>a</code> and <code>b</code> both hold the same reference to <code>stages</code>, and now both contain one stage.
    However, the <code>Output</code> type parameter on <code>a</code> says it returns a string.
    In reality, a pipeline created from <code>a</code> would be identical to one created from <code>b</code>, and would return a number.`,oo=n(),gi=l("p"),gi.innerHTML="The long and short of it is: <strong>the builder&#39;s variables must be immutable</strong>.",uo=n(),Ei=l("h3"),Ei.textContent="Unsafe types",fo=n(),Di=l("p"),Di.innerHTML=`The implementation has <code>any</code> littered throughout it.
    If you&#39;re anything like me then alarms are ringing.
    Isn&#39;t the whole point that we want to <em>increase</em> type safety?`,ro=n(),Ji=l("p"),Ji.innerHTML=`Yes, and that&#39;s the core issue.
    If we could write a correct type for <code>stages</code>, one which guarantees the input to a stage is the output of the previous one, we wouldn&#39;t need a builder.
    We can&#39;t do that directly*, so instead we guarantee that the type meets those requirements through the type signature of <code>.append()</code>.`,ao=n(),Ui=l("p"),Ui.innerHTML=`Essentially, we encapsulate all the type-unsafe code behind a type-safe interface.
    For that reason, adding to a builder like in <code>.append()</code> requires extreme care.
    That internal constructor <em>is not</em> type-safe, and would accept almost anything.
    If the list passed to the constructor breaks that <code>input to x == output of x-1</code> guarantee, then any pipelines built from it will break.`,mo=n(),Vi=l("h3"),Vi.textContent="Another Way?",yo=n(),Xi=l("p"),Xi.textContent=`There was a suspicious asterisk in the previous section, and earlier I promised to tell you more about the wonders of TypeScript 4.
    Buckle up!`,wo=n(),Yi=l("p"),Yi.textContent=`For the entirety of this post, we've just accepted the fact that you can only resolve complex constraints with builders.
    In fact, that's not true.
    I'm not saying builders are useless, and in fact this section should come with a disclaimer:`,bo=n(),zi=l("blockquote"),zi.innerHTML=`<strong>The stunts performed in this section were done with a complete disregard for best practice.</strong> 
    <strong>Don&#39;t try this at work.</strong>`,To=n(),vo=l("hr"),xo=n(),Ki=l("p"),Ki.innerHTML=`Allow me to introduce <a href="https://devblogs.microsoft.com/typescript/announcing-typescript-4-0/">TypeScript 4.0</a>, and more importantly, <a href="https://github.com/microsoft/TypeScript/pull/39094">Variadic Tuple Types</a>.
    Variadic tuple types <strong>massively</strong> increase the flexibility of TypeScript&#39;s tuples.`,$o=n(),Qi=l("p"),Qi.textContent=`With variadic tuples, we can actually implement anything we could use a builder for as a normal type constraint.
    It will be huge, unmaintainable, and really hard to write (this took me a day), but it's possible.
    Even better, these don't exist at runtime which means they work when writing type declarations for a 3rd-party library.`,Co=n(),Zi=l("p"),Zi.textContent="Here's the pipeline without a builder:",co=n(),p(z.$$.fragment),ko=n(),es=l("p"),es.innerHTML=`This snippet declares that a pipeline is a list of functions in the form <code>Array&lt;(input: Input, config: Config) =&gt; Output&gt;</code>.
    Then, it defines what makes a pipeline valid:`,Io=n(),ts=l("p"),ts.textContent=`A pipeline with only one stage is always valid.
    A longer pipeline is only valid if:`,So=n(),is=l("ul"),is.innerHTML=`<li>The output type of the first stage is the input type of the second stage <strong>and</strong></li> 
    <li>The pipeline consisting of all stages except the first is valid</li>`,Mo=n(),ss=l("p"),ss.textContent=`That's right, a recursive conditional type definition!
    If the pipeline is 10 stages long, we end up with a 10-layer nested type:`,Ho=n(),ns=l("figure"),ns.innerHTML='<img src="/assets/blog/typescript-builders/Builders-Varaidic.svg" title="Recursive type definitions are a bit of a trip" alt="Shows the full recursive type checking of a pipeline" class="svelte-1wsp3u5"/>',Lo=n(),Bo=l("hr"),Po=n(),ls=l("p"),ls.innerHTML=`It goes without saying that you probably shouldn&#39;t do this without good reason.
    The <code>createPipeline</code> method signature, with 238 characters on one line, is probably enough evidence of that.`,Oo=n(),ps=l("p"),ps.innerHTML=`If you do have a good reason to do this though, hooray!
    It&#39;s finally possible.
    Look how nice that <code>createPipeline</code> call is!`,Wo=n(),os=l("p"),os.textContent="I'm really excited about variadic tuple types, so keep an eye out for a future blog post on that topic.",qo=n(),us=l("h2"),us.textContent="Conclusion",jo=n(),fs=l("p"),fs.textContent=`We've introduced the idea of a pipeline, and discussed how it's really hard to achieve type soundness in a pipeline factory function.
    Builders came in to save the day, introducing us to Mutable Generic State.`,Ao=n(),rs=l("p"),rs.textContent=`We used the pipeline as a worked example, establishing what generic types the builder would need.
    Our builders couldn't enforce the complex constraints on the state directly, so we set up our methods to prevent the internal state becoming invalid.`,Go=n(),as=l("p"),as.textContent="Finally, we discussed the issues with using the builder pattern, and ended with a bang courtesy of variadic tuple types.",No=n(),ms=l("p"),ms.innerHTML="Next time you find yourself cursing a type definition that&#39;s <strong>just not narrow enough</strong>, I hope your newfound builder knowledge is useful!",Ro=n(),Fo=l("hr"),ho=n(),ds=l("p"),ds.textContent=`If you made it this far, congrats.
    This is the longest blog post I've ever written, by a large margin, and it's taken me 6 months to finish.`,_o=n(),ys=l("p"),ys.innerHTML=`I really hope you enjoyed it, and I hope you found it useful.
    Feel free to contact me on <a href="https://twitter.com/SteWaterman">Twitter</a> with any questions, feedback, or to point out mistakes!`,go=n(),Eo=l("hr"),Do=n(),ws=l("p"),ws.innerHTML=`My follow up post &#39;<a href="/reducer-builder">Better Redux Reducers with TypeScript Builders</a>&#39; is now live.
    It demonstrates how to use the builder pattern we saw in this post to create Redux Reducers.
    If you want a more realistic example of where builders can help in your TypeScript projects, go check it out!`},m(e,t){i(e,d,t),i(e,T,t),i(e,y,t),i(e,v,t),i(e,x,t),i(e,vs,t),i(e,Q,t),i(e,xs,t),i(e,Z,t),i(e,$s,t),i(e,ee,t),i(e,Cs,t),i(e,te,t),i(e,cs,t),o($,e,t),i(e,ks,t),i(e,ie,t),i(e,Is,t),i(e,se,t),i(e,Ss,t),i(e,ne,t),i(e,Ms,t),i(e,le,t),i(e,Hs,t),o(C,e,t),i(e,Ls,t),i(e,pe,t),i(e,Bs,t),i(e,oe,t),i(e,Ps,t),o(c,e,t),i(e,Os,t),i(e,ue,t),i(e,Ws,t),i(e,fe,t),i(e,qs,t),i(e,re,t),i(e,js,t),i(e,ae,t),i(e,As,t),i(e,me,t),i(e,Gs,t),i(e,de,t),i(e,Ns,t),i(e,ye,t),i(e,Rs,t),i(e,we,t),i(e,Fs,t),o(k,e,t),i(e,hs,t),i(e,be,t),i(e,_s,t),i(e,Te,t),i(e,gs,t),i(e,ve,t),i(e,Es,t),o(I,e,t),i(e,Ds,t),i(e,xe,t),i(e,Js,t),i(e,$e,t),i(e,Us,t),i(e,Ce,t),i(e,Vs,t),i(e,Xs,t),i(e,Ys,t),i(e,ce,t),i(e,zs,t),i(e,ke,t),i(e,Ks,t),i(e,Ie,t),i(e,Qs,t),i(e,Se,t),i(e,Zs,t),i(e,Me,t),i(e,en,t),i(e,He,t),i(e,tn,t),i(e,Le,t),i(e,sn,t),o(S,e,t),i(e,nn,t),i(e,Be,t),i(e,ln,t),i(e,Pe,t),i(e,pn,t),i(e,Oe,t),i(e,on,t),i(e,We,t),i(e,un,t),i(e,fn,t),i(e,rn,t),i(e,qe,t),i(e,an,t),i(e,je,t),i(e,mn,t),i(e,Ae,t),i(e,dn,t),i(e,Ge,t),i(e,yn,t),i(e,Ne,t),i(e,wn,t),i(e,Re,t),i(e,bn,t),o(M,e,t),i(e,Tn,t),i(e,Fe,t),i(e,vn,t),i(e,he,t),i(e,xn,t),o(H,e,t),i(e,$n,t),i(e,_e,t),i(e,Cn,t),i(e,ge,t),i(e,cn,t),i(e,Ee,t),i(e,kn,t),i(e,De,t),i(e,In,t),i(e,Je,t),i(e,Sn,t),i(e,Ue,t),i(e,Mn,t),i(e,Ve,t),i(e,Hn,t),i(e,Xe,t),i(e,Ln,t),i(e,Ye,t),i(e,Bn,t),o(L,e,t),i(e,Pn,t),i(e,ze,t),i(e,On,t),o(B,e,t),i(e,Wn,t),i(e,Ke,t),i(e,qn,t),o(P,e,t),i(e,jn,t),i(e,Qe,t),i(e,An,t),o(O,e,t),i(e,Gn,t),i(e,Ze,t),i(e,Nn,t),i(e,et,t),i(e,Rn,t),i(e,tt,t),i(e,Fn,t),i(e,it,t),i(e,hn,t),i(e,st,t),i(e,_n,t),i(e,nt,t),i(e,gn,t),i(e,lt,t),i(e,En,t),i(e,pt,t),i(e,Dn,t),i(e,ot,t),i(e,Jn,t),i(e,ut,t),i(e,Un,t),i(e,ft,t),i(e,Vn,t),i(e,rt,t),i(e,Xn,t),i(e,at,t),i(e,Yn,t),i(e,mt,t),i(e,zn,t),i(e,dt,t),i(e,Kn,t),i(e,yt,t),i(e,Qn,t),i(e,wt,t),i(e,Zn,t),i(e,bt,t),i(e,el,t),i(e,Tt,t),i(e,tl,t),i(e,vt,t),i(e,il,t),i(e,xt,t),i(e,sl,t),i(e,$t,t),i(e,nl,t),i(e,Ct,t),i(e,ll,t),i(e,ct,t),i(e,pl,t),i(e,kt,t),i(e,ol,t),i(e,It,t),i(e,ul,t),i(e,St,t),i(e,fl,t),i(e,Mt,t),i(e,rl,t),i(e,Ht,t),i(e,al,t),i(e,Lt,t),i(e,ml,t),i(e,Bt,t),i(e,dl,t),i(e,Pt,t),i(e,yl,t),i(e,Ot,t),i(e,wl,t),i(e,Wt,t),i(e,bl,t),i(e,qt,t),i(e,Tl,t),i(e,jt,t),i(e,vl,t),i(e,At,t),i(e,xl,t),i(e,Gt,t),i(e,$l,t),i(e,Nt,t),i(e,Cl,t),i(e,Rt,t),i(e,cl,t),i(e,Ft,t),i(e,kl,t),i(e,ht,t),i(e,Il,t),i(e,_t,t),i(e,Sl,t),o(W,e,t),i(e,Ml,t),i(e,gt,t),i(e,Hl,t),o(q,e,t),i(e,Ll,t),i(e,Et,t),i(e,Bl,t),i(e,Dt,t),i(e,Pl,t),i(e,Jt,t),i(e,Ol,t),i(e,Ut,t),i(e,Wl,t),i(e,Vt,t),i(e,ql,t),i(e,Xt,t),i(e,jl,t),i(e,Yt,t),i(e,Al,t),o(j,e,t),i(e,Gl,t),i(e,zt,t),i(e,Nl,t),i(e,Kt,t),i(e,Rl,t),i(e,Qt,t),i(e,Fl,t),o(A,e,t),i(e,hl,t),i(e,Zt,t),i(e,_l,t),i(e,ei,t),i(e,gl,t),i(e,ti,t),i(e,El,t),i(e,ii,t),i(e,Dl,t),i(e,si,t),i(e,Jl,t),i(e,ni,t),i(e,Ul,t),i(e,li,t),i(e,Vl,t),i(e,pi,t),i(e,Xl,t),o(G,e,t),i(e,Yl,t),i(e,oi,t),i(e,zl,t),i(e,ui,t),i(e,Kl,t),i(e,fi,t),i(e,Ql,t),i(e,ri,t),i(e,Zl,t),i(e,ai,t),i(e,ep,t),o(N,e,t),i(e,tp,t),i(e,mi,t),i(e,ip,t),i(e,di,t),i(e,sp,t),i(e,yi,t),i(e,np,t),o(R,e,t),i(e,lp,t),i(e,wi,t),i(e,pp,t),o(F,e,t),i(e,op,t),i(e,w,t),b(w,Jo),b(w,up),b(w,Uo),b(w,fp),b(w,Vo),b(w,rp),b(w,Xo),b(w,ap),b(w,Yo),b(w,mp),b(w,zo),i(e,dp,t),i(e,bi,t),i(e,yp,t),o(h,e,t),i(e,wp,t),i(e,Ti,t),i(e,bp,t),i(e,vi,t),i(e,Tp,t),i(e,xi,t),i(e,vp,t),i(e,$i,t),i(e,xp,t),i(e,Ci,t),i(e,$p,t),o(_,e,t),i(e,Cp,t),i(e,ci,t),i(e,cp,t),i(e,ki,t),i(e,kp,t),i(e,Ii,t),i(e,Ip,t),i(e,Si,t),i(e,Sp,t),o(g,e,t),i(e,Mp,t),i(e,Mi,t),i(e,Hp,t),i(e,Hi,t),i(e,Lp,t),i(e,Li,t),i(e,Bp,t),i(e,Bi,t),i(e,Pp,t),i(e,Op,t),i(e,Wp,t),i(e,Pi,t),i(e,qp,t),o(E,e,t),i(e,jp,t),i(e,Ap,t),i(e,Gp,t),i(e,Oi,t),i(e,Np,t),o(D,e,t),i(e,Rp,t),i(e,Fp,t),i(e,hp,t),i(e,Wi,t),i(e,_p,t),o(J,e,t),i(e,gp,t),i(e,Ep,t),i(e,Dp,t),i(e,qi,t),i(e,Jp,t),o(U,e,t),i(e,Up,t),i(e,Vp,t),i(e,Xp,t),i(e,ji,t),i(e,Yp,t),o(V,e,t),i(e,zp,t),i(e,Kp,t),i(e,Qp,t),i(e,Ai,t),i(e,Zp,t),i(e,Gi,t),i(e,eo,t),i(e,Ni,t),i(e,to,t),i(e,Ri,t),i(e,io,t),i(e,Fi,t),i(e,so,t),o(X,e,t),i(e,no,t),i(e,hi,t),i(e,lo,t),o(Y,e,t),i(e,po,t),i(e,_i,t),i(e,oo,t),i(e,gi,t),i(e,uo,t),i(e,Ei,t),i(e,fo,t),i(e,Di,t),i(e,ro,t),i(e,Ji,t),i(e,ao,t),i(e,Ui,t),i(e,mo,t),i(e,Vi,t),i(e,yo,t),i(e,Xi,t),i(e,wo,t),i(e,Yi,t),i(e,bo,t),i(e,zi,t),i(e,To,t),i(e,vo,t),i(e,xo,t),i(e,Ki,t),i(e,$o,t),i(e,Qi,t),i(e,Co,t),i(e,Zi,t),i(e,co,t),o(z,e,t),i(e,ko,t),i(e,es,t),i(e,Io,t),i(e,ts,t),i(e,So,t),i(e,is,t),i(e,Mo,t),i(e,ss,t),i(e,Ho,t),i(e,ns,t),i(e,Lo,t),i(e,Bo,t),i(e,Po,t),i(e,ls,t),i(e,Oo,t),i(e,ps,t),i(e,Wo,t),i(e,os,t),i(e,qo,t),i(e,us,t),i(e,jo,t),i(e,fs,t),i(e,Ao,t),i(e,rs,t),i(e,Go,t),i(e,as,t),i(e,No,t),i(e,ms,t),i(e,Ro,t),i(e,Fo,t),i(e,ho,t),i(e,ds,t),i(e,_o,t),i(e,ys,t),i(e,go,t),i(e,Eo,t),i(e,Do,t),i(e,ws,t),bs=!0},p:eu,i(e){bs||(u($.$$.fragment,e),u(C.$$.fragment,e),u(c.$$.fragment,e),u(k.$$.fragment,e),u(I.$$.fragment,e),u(S.$$.fragment,e),u(M.$$.fragment,e),u(H.$$.fragment,e),u(L.$$.fragment,e),u(B.$$.fragment,e),u(P.$$.fragment,e),u(O.$$.fragment,e),u(W.$$.fragment,e),u(q.$$.fragment,e),u(j.$$.fragment,e),u(A.$$.fragment,e),u(G.$$.fragment,e),u(N.$$.fragment,e),u(R.$$.fragment,e),u(F.$$.fragment,e),u(h.$$.fragment,e),u(_.$$.fragment,e),u(g.$$.fragment,e),u(E.$$.fragment,e),u(D.$$.fragment,e),u(J.$$.fragment,e),u(U.$$.fragment,e),u(V.$$.fragment,e),u(X.$$.fragment,e),u(Y.$$.fragment,e),u(z.$$.fragment,e),bs=!0)},o(e){f($.$$.fragment,e),f(C.$$.fragment,e),f(c.$$.fragment,e),f(k.$$.fragment,e),f(I.$$.fragment,e),f(S.$$.fragment,e),f(M.$$.fragment,e),f(H.$$.fragment,e),f(L.$$.fragment,e),f(B.$$.fragment,e),f(P.$$.fragment,e),f(O.$$.fragment,e),f(W.$$.fragment,e),f(q.$$.fragment,e),f(j.$$.fragment,e),f(A.$$.fragment,e),f(G.$$.fragment,e),f(N.$$.fragment,e),f(R.$$.fragment,e),f(F.$$.fragment,e),f(h.$$.fragment,e),f(_.$$.fragment,e),f(g.$$.fragment,e),f(E.$$.fragment,e),f(D.$$.fragment,e),f(J.$$.fragment,e),f(U.$$.fragment,e),f(V.$$.fragment,e),f(X.$$.fragment,e),f(Y.$$.fragment,e),f(z.$$.fragment,e),bs=!1},d(e){e&&s(d),e&&s(T),e&&s(y),e&&s(v),e&&s(x),e&&s(vs),e&&s(Q),e&&s(xs),e&&s(Z),e&&s($s),e&&s(ee),e&&s(Cs),e&&s(te),e&&s(cs),r($,e),e&&s(ks),e&&s(ie),e&&s(Is),e&&s(se),e&&s(Ss),e&&s(ne),e&&s(Ms),e&&s(le),e&&s(Hs),r(C,e),e&&s(Ls),e&&s(pe),e&&s(Bs),e&&s(oe),e&&s(Ps),r(c,e),e&&s(Os),e&&s(ue),e&&s(Ws),e&&s(fe),e&&s(qs),e&&s(re),e&&s(js),e&&s(ae),e&&s(As),e&&s(me),e&&s(Gs),e&&s(de),e&&s(Ns),e&&s(ye),e&&s(Rs),e&&s(we),e&&s(Fs),r(k,e),e&&s(hs),e&&s(be),e&&s(_s),e&&s(Te),e&&s(gs),e&&s(ve),e&&s(Es),r(I,e),e&&s(Ds),e&&s(xe),e&&s(Js),e&&s($e),e&&s(Us),e&&s(Ce),e&&s(Vs),e&&s(Xs),e&&s(Ys),e&&s(ce),e&&s(zs),e&&s(ke),e&&s(Ks),e&&s(Ie),e&&s(Qs),e&&s(Se),e&&s(Zs),e&&s(Me),e&&s(en),e&&s(He),e&&s(tn),e&&s(Le),e&&s(sn),r(S,e),e&&s(nn),e&&s(Be),e&&s(ln),e&&s(Pe),e&&s(pn),e&&s(Oe),e&&s(on),e&&s(We),e&&s(un),e&&s(fn),e&&s(rn),e&&s(qe),e&&s(an),e&&s(je),e&&s(mn),e&&s(Ae),e&&s(dn),e&&s(Ge),e&&s(yn),e&&s(Ne),e&&s(wn),e&&s(Re),e&&s(bn),r(M,e),e&&s(Tn),e&&s(Fe),e&&s(vn),e&&s(he),e&&s(xn),r(H,e),e&&s($n),e&&s(_e),e&&s(Cn),e&&s(ge),e&&s(cn),e&&s(Ee),e&&s(kn),e&&s(De),e&&s(In),e&&s(Je),e&&s(Sn),e&&s(Ue),e&&s(Mn),e&&s(Ve),e&&s(Hn),e&&s(Xe),e&&s(Ln),e&&s(Ye),e&&s(Bn),r(L,e),e&&s(Pn),e&&s(ze),e&&s(On),r(B,e),e&&s(Wn),e&&s(Ke),e&&s(qn),r(P,e),e&&s(jn),e&&s(Qe),e&&s(An),r(O,e),e&&s(Gn),e&&s(Ze),e&&s(Nn),e&&s(et),e&&s(Rn),e&&s(tt),e&&s(Fn),e&&s(it),e&&s(hn),e&&s(st),e&&s(_n),e&&s(nt),e&&s(gn),e&&s(lt),e&&s(En),e&&s(pt),e&&s(Dn),e&&s(ot),e&&s(Jn),e&&s(ut),e&&s(Un),e&&s(ft),e&&s(Vn),e&&s(rt),e&&s(Xn),e&&s(at),e&&s(Yn),e&&s(mt),e&&s(zn),e&&s(dt),e&&s(Kn),e&&s(yt),e&&s(Qn),e&&s(wt),e&&s(Zn),e&&s(bt),e&&s(el),e&&s(Tt),e&&s(tl),e&&s(vt),e&&s(il),e&&s(xt),e&&s(sl),e&&s($t),e&&s(nl),e&&s(Ct),e&&s(ll),e&&s(ct),e&&s(pl),e&&s(kt),e&&s(ol),e&&s(It),e&&s(ul),e&&s(St),e&&s(fl),e&&s(Mt),e&&s(rl),e&&s(Ht),e&&s(al),e&&s(Lt),e&&s(ml),e&&s(Bt),e&&s(dl),e&&s(Pt),e&&s(yl),e&&s(Ot),e&&s(wl),e&&s(Wt),e&&s(bl),e&&s(qt),e&&s(Tl),e&&s(jt),e&&s(vl),e&&s(At),e&&s(xl),e&&s(Gt),e&&s($l),e&&s(Nt),e&&s(Cl),e&&s(Rt),e&&s(cl),e&&s(Ft),e&&s(kl),e&&s(ht),e&&s(Il),e&&s(_t),e&&s(Sl),r(W,e),e&&s(Ml),e&&s(gt),e&&s(Hl),r(q,e),e&&s(Ll),e&&s(Et),e&&s(Bl),e&&s(Dt),e&&s(Pl),e&&s(Jt),e&&s(Ol),e&&s(Ut),e&&s(Wl),e&&s(Vt),e&&s(ql),e&&s(Xt),e&&s(jl),e&&s(Yt),e&&s(Al),r(j,e),e&&s(Gl),e&&s(zt),e&&s(Nl),e&&s(Kt),e&&s(Rl),e&&s(Qt),e&&s(Fl),r(A,e),e&&s(hl),e&&s(Zt),e&&s(_l),e&&s(ei),e&&s(gl),e&&s(ti),e&&s(El),e&&s(ii),e&&s(Dl),e&&s(si),e&&s(Jl),e&&s(ni),e&&s(Ul),e&&s(li),e&&s(Vl),e&&s(pi),e&&s(Xl),r(G,e),e&&s(Yl),e&&s(oi),e&&s(zl),e&&s(ui),e&&s(Kl),e&&s(fi),e&&s(Ql),e&&s(ri),e&&s(Zl),e&&s(ai),e&&s(ep),r(N,e),e&&s(tp),e&&s(mi),e&&s(ip),e&&s(di),e&&s(sp),e&&s(yi),e&&s(np),r(R,e),e&&s(lp),e&&s(wi),e&&s(pp),r(F,e),e&&s(op),e&&s(w),e&&s(dp),e&&s(bi),e&&s(yp),r(h,e),e&&s(wp),e&&s(Ti),e&&s(bp),e&&s(vi),e&&s(Tp),e&&s(xi),e&&s(vp),e&&s($i),e&&s(xp),e&&s(Ci),e&&s($p),r(_,e),e&&s(Cp),e&&s(ci),e&&s(cp),e&&s(ki),e&&s(kp),e&&s(Ii),e&&s(Ip),e&&s(Si),e&&s(Sp),r(g,e),e&&s(Mp),e&&s(Mi),e&&s(Hp),e&&s(Hi),e&&s(Lp),e&&s(Li),e&&s(Bp),e&&s(Bi),e&&s(Pp),e&&s(Op),e&&s(Wp),e&&s(Pi),e&&s(qp),r(E,e),e&&s(jp),e&&s(Ap),e&&s(Gp),e&&s(Oi),e&&s(Np),r(D,e),e&&s(Rp),e&&s(Fp),e&&s(hp),e&&s(Wi),e&&s(_p),r(J,e),e&&s(gp),e&&s(Ep),e&&s(Dp),e&&s(qi),e&&s(Jp),r(U,e),e&&s(Up),e&&s(Vp),e&&s(Xp),e&&s(ji),e&&s(Yp),r(V,e),e&&s(zp),e&&s(Kp),e&&s(Qp),e&&s(Ai),e&&s(Zp),e&&s(Gi),e&&s(eo),e&&s(Ni),e&&s(to),e&&s(Ri),e&&s(io),e&&s(Fi),e&&s(so),r(X,e),e&&s(no),e&&s(hi),e&&s(lo),r(Y,e),e&&s(po),e&&s(_i),e&&s(oo),e&&s(gi),e&&s(uo),e&&s(Ei),e&&s(fo),e&&s(Di),e&&s(ro),e&&s(Ji),e&&s(ao),e&&s(Ui),e&&s(mo),e&&s(Vi),e&&s(yo),e&&s(Xi),e&&s(wo),e&&s(Yi),e&&s(bo),e&&s(zi),e&&s(To),e&&s(vo),e&&s(xo),e&&s(Ki),e&&s($o),e&&s(Qi),e&&s(Co),e&&s(Zi),e&&s(co),r(z,e),e&&s(ko),e&&s(es),e&&s(Io),e&&s(ts),e&&s(So),e&&s(is),e&&s(Mo),e&&s(ss),e&&s(Ho),e&&s(ns),e&&s(Lo),e&&s(Bo),e&&s(Po),e&&s(ls),e&&s(Oo),e&&s(ps),e&&s(Wo),e&&s(os),e&&s(qo),e&&s(us),e&&s(jo),e&&s(fs),e&&s(Ao),e&&s(rs),e&&s(Go),e&&s(as),e&&s(No),e&&s(ms),e&&s(Ro),e&&s(Fo),e&&s(ho),e&&s(ds),e&&s(_o),e&&s(ys),e&&s(go),e&&s(Eo),e&&s(Do),e&&s(ws)}}}function ju(Ts){let d,T;return d=new tu({props:{id:"typescript-builders",$$slots:{default:[qu]},$$scope:{ctx:Ts}}}),{c(){p(d.$$.fragment)},m(y,v){o(d,y,v),T=!0},p(y,[v]){const x={};v&1&&(x.$$scope={dirty:v,ctx:y}),d.$set(x)},i(y){T||(u(d.$$.fragment,y),T=!0)},o(y){f(d.$$.fragment,y),T=!1},d(y){r(d,y)}}}class Fu extends Ko{constructor(d){super();Qo(this,d,null,ju,Zo,{})}}export{Fu as default};

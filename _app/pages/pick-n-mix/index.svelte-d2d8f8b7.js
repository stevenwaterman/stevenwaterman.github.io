import{S as li,i as di,s as fi,q as l,r as d,m as f,k as r,w as p,e as s,g as o,c as i,F as ri,f as n}from"../../chunks/vendor-b123dbec.js";import{B as pi}from"../../chunks/BlogPost-fb5b6ef4.js";import{S as m}from"../../chunks/Snippet-0180392a.js";/* empty css                                                              */import"../../chunks/Template-7e2d3e9c.js";const mi={name:"Example",language:"ts",snippet:`interface StringList {
    /**
     * @param elem The element to add
     * @param idx 0-indexed, the index of the new element
     */
    add(elem: string, idx: number);
 
    /**
     * @param idx 0-indexed, the index of the element to remove
     */
    remove(idx: number): boolean;
 
    /**
     * Returns the index of an element, or <code>null</code> if it is not in the list
     */
    indexOf(elem: string): number | null;
}

function contains(list: StringList, elem: string): boolean {
    return list.indexOf(elem) !== null;
}

function setElement(list: StringList, idx: number, newElem: string): boolean {
    const removed = list.remove(idx);
    if (!removed) return false;
    list.add(newElem, idx);
}

function replaceElement(
    list: StringList,
    oldElem: string,
    newElem: string
): boolean {
    const idx = list.indexOf(oldElem);
    if (idx === null) return false;
    return setElement(list, idx, newElem);
}`},ui={name:"List",language:"ts",snippet:`const listValues = ["hi", "there", "friend"];
  const list = {
      indexOf(elem: string): number | null {
          const idx = listValues.indexOf(elem)
          if(idx === -1) return null;
          return idx;
      }
  };`},ci={name:"Stubs",language:"ts",snippet:`const listValues = ["hi", "there", "friend"];
  const list = {
      add(elem: string, idx: number){
        throw new Error("not implemented");
      },
      remove(idx: number){
        throw new Error("not implemented");
      },
      indexOf(elem: string): number | null {
        const idx = listValues.indexOf(elem);
        if (idx === -1) return null;
        return idx;
      }
  };`},ai={name:"Functional",language:"ts",snippet:`const listValues = ["hi", "there", "friend"];
  const list = {
      add(elem: string, idx: number){
        listValues.splice(idx, 1, elem)
      },
      remove(idx: number){
        const deleted = listValues.splice(idx, 1);
        return deleted.length > 0;
      },
      indexOf(elem: string): number | null {
        const idx = listValues.indexOf(elem);
        if (idx === -1) return null;
        return idx;
      }
  };`},wi={name:"Interfaces",language:"ts",snippet:`interface Searchable {
    indexOf(elem: string): number | null;
}

interface Mutable {
    add(elem: string, idx: number);
    remove(idx: number): boolean;
}

interface StringList {
    add(elem: string, idx: number);
    remove(idx: number): boolean;
    indexOf(elem: string): number | null;
}`},yi={name:"Method Signatures",language:"ts",snippet:`function contains(
    list: Searchable,
    elem: string
): boolean

function setElement(
    list: Mutable,
    idx: number,
    newElem: string
): boolean

function replaceElement(
    list: StringList,
    oldElem: string,
    newElem: string
): boolean`},bi={name:"Single-method Interfaces",language:"ts",snippet:`interface I_add {
    add(elem: string, idx: number);
}
interface I_remove {
    remove(idx: number): boolean;
}
interface I_indexOf {
    indexOf(elem: string): number | null;
}`},xi={name:"SMI Signuatures",language:"ts",snippet:`function contains(
    list: I_indexOf,
    elem: string
): boolean

function setElement(
    list: I_add & I_remove,
    idx: number,
    newElem: string
): boolean

function replaceElement(
    list: I_indexOf & I_add & I_remove,
    oldElem: string,
    newElem: string
): boolean`},$i={name:"Pick Example",language:"ts",snippet:`type Person = {
    name: string,
    age: number,
    incrementAge: () => void
}

type ThingWithAge = Pick<Person, "age" | "incrementAge">;`},Ti={name:"Equivalent to Pick",language:"ts",snippet:`type ThingWithAge = {
    age: number,
    incrementAge: () => void
}`},ki={name:"Interface",language:"ts",snippet:`  interface StringList {
    add(elem: string, idx: number);
    remove(idx: number): boolean;
    indexOf(elem: string): number | null;
}`},vi={name:"Utility Methods",language:"ts",snippet:`function contains(
    list: Pick<StringList, "indexOf">,
  elem: string
): boolean {
    return list.indexOf(elem) !== null;
}

function setElement(
    list: Pick<StringList, "add" | "remove">,
    idx: number,
    newElem: string
): boolean {
    const removed = list.remove(idx);
    if (!removed) return false;
    list.add(newElem, idx);
}

function replaceElement(
    list: Pick<StringList, "indexOf" | "add" | "remove">,
    oldElem: string,
    newElem: string
): boolean {
    const idx = list.indexOf(oldElem);
    if (idx === null) return false;
    return setElement(list, idx, newElem);
}`},Ii={name:"A Solution",language:"ts",snippet:` type Parameter<
  T extends (...args: any) => any,
  idx extends number
> = Parameters<T>[idx]`},Si={name:"Using Utility",language:"ts",snippet:`function replaceElement(
    list: Pick<StringList, "indexOf"> & Parameter<typeof setElement, 0>,
    oldElem: string,
    newElem: string
): boolean`},hi={name:"Chaining",language:"ts",snippet:`function chaining(list: StringList): StringList {
    setElement(list, 0, "example");
    return list;
}`},Li={name:"Chaining with Generics",language:"ts",snippet:`
  // Role Interfaces
  function chaining<T extends Mutable>(list: T): T
  
  // Single Method Interfaces
  function chaining<T extends I_add & I_remove>(list: T): T
  
  // Pick
  function chaining<T extends Pick<StringList, "add" | "remove">>(list: T): T`};var u={example:mi,list:ui,stubs:ci,functional:ai,interfaces:wi,methods:yi,smi:bi,smiSignatures:xi,pickExample:$i,pickResult:Ti,firstInterface:ki,utility:vi,parameters:Ii,usingUtility:Si,chaining:hi,genericChaining:Li};function Ei(Re){let c,w,a,y,b,Ve,C,je,_,Ue,W,Be,A,De,x,Ge,F,Ne,R,Je,$,Ye,V,ze,j,Ke,U,Qe,T,Xe,B,Ze,D,et,k,tt,G,it,N,nt,J,ot,Y,st,z,lt,K,dt,Q,ft,X,rt,v,pt,Z,mt,ee,ut,I,ct,te,at,ie,wt,ne,yt,oe,bt,se,xt,le,$t,S,Tt,de,kt,h,vt,fe,It,re,St,pe,ht,me,Lt,ue,Et,L,Mt,ce,gt,E,qt,ae,Pt,we,Ot,ye,Ht,be,Ct,M,_t,xe,Wt,g,At,$e,Ft,Te,Rt,ke,Vt,ve,jt,Ie,Ut,q,Bt,Se,Dt,he,Gt,Le,Nt,Ee,Jt,P,Yt,Me,zt,ge,Kt,qe,Qt,Pe,Xt,O,Zt,Oe,ei,He,ti,Ce,ii,H,ni,_e,oi,We,si,Ae,Fe;return x=new m({props:{config:u.example}}),$=new m({props:{config:u.list}}),T=new m({props:{config:u.stubs}}),k=new m({props:{config:u.functional}}),v=new m({props:{config:u.interfaces}}),I=new m({props:{config:u.methods}}),S=new m({props:{config:u.smi}}),h=new m({props:{config:u.smiSignatures}}),L=new m({props:{config:u.pickExample}}),E=new m({props:{config:u.pickResult}}),M=new m({props:{config:u.firstInterface}}),g=new m({props:{config:u.utility}}),q=new m({props:{config:u.parameters}}),P=new m({props:{config:u.usingUtility}}),O=new m({props:{config:u.chaining}}),H=new m({props:{config:u.genericChaining}}),{c(){c=s("p"),c.innerHTML="<em>In this article, I discuss how the <code>Pick</code> utility type can help satisfy the Interface Segregation Principle in TypeScript</em>",w=o(),a=s("p"),a.innerHTML=`When an interface declares many unrelated methods, developers must implement functionality that&#39;s never used.
    This wastes time, makes code less readable, and can lead to runtime type errors after &#39;implementing&#39; the interface with method stubs.
    The <a href="https://en.wikipedia.org/wiki/Interface_segregation_principle">Interface Segregation principle</a> (one of the 5 <a href="https://en.wikipedia.org/wiki/SOLID">SOLID</a> principles) warns against this.`,y=o(),b=s("p"),b.textContent="It states:",Ve=o(),C=s("blockquote"),C.textContent="No client should be forced to depend on methods it does not use",je=o(),_=s("p"),_.textContent=`That's the theory, anyway.
    What does interface segregation look like in practice?`,Ue=o(),W=s("h2"),W.textContent="Defining the Problem",Be=o(),A=s("p"),A.innerHTML=`I will be using the same example throughout this post.
    It is a (fairly unrealistic) implementation of a list of strings.
    All code is available <a href="https://github.com/stevenwaterman/typescript-pick-n-mix">on GitHub</a>.`,De=o(),l(x.$$.fragment),Ge=o(),F=s("p"),F.innerHTML=`In theory, there should be nothing stopping us using the <code>contains</code> function on an immutable (read-only) list.
    It only uses the <code>indexOf</code> function and wouldn&#39;t be affected by the missing <code>add</code> and <code>remove</code> methods.
    In practice, the TypeScript compiler won&#39;t like that.`,Ne=o(),R=s("p"),R.textContent="Given the immutable list implementation:",Je=o(),l($.$$.fragment),Ye=o(),V=s("p"),V.innerHTML=`We can&#39;t call <code>contains(list, &quot;friend&quot;)</code> because <code>list</code> does not implement the <code>add</code> or <code>remove</code> methods on <code>StringList</code>.
    In JavaScript, I could call <code>contains</code> without any problems because I know it only uses the <code>indexOf</code> method.
    In contrast, the TypeScript compiler follows the method signature, which requires that <code>list</code> implements all of <code>StringList</code> - including <code>add</code> and <code>remove</code>.`,ze=o(),j=s("p"),j.innerHTML=`One quick and hacky solution is to use a cast, calling <code>contains(list as StringList, &quot;friend&quot;)</code>.
    This just disables the type checking, meaning we can&#39;t guarantee that <code>contains</code> doesn&#39;t call <code>add</code> or <code>remove</code>.
    Why even use TypeScript at that point?`,Ke=o(),U=s("p"),U.textContent="Another option is to implement the extra methods with stubs:",Qe=o(),l(T.$$.fragment),Xe=o(),B=s("p"),B.innerHTML=`This is even worse, because now <code>contains(list, &quot;friend&quot;)</code> works but the compiler also allows <code>replaceElement(list, &quot;hi&quot;, &quot;hello&quot;)</code>.
    Since <code>replaceElement</code> uses <code>add</code> and <code>remove</code>, this will cause a runtime error.`,Ze=o(),D=s("p"),D.textContent="The only remaining option is to actually implement the functionality:",et=o(),l(k.$$.fragment),tt=o(),G=s("p"),G.innerHTML=`But we only wanted to call <code>contains(list, &quot;friend&quot;)</code> - now we had to implement 2 methods for no reason.
    That&#39;s what the Interface Segregation principle was warning us about!`,it=o(),N=s("p"),N.textContent=`Ok, so we know it's bad.
    We've had enough of these hacky 'solutions' - what are our options for a real fix?`,nt=o(),J=s("h2"),J.textContent="Accepted Solutions",ot=o(),Y=s("p"),Y.textContent=`There are two ways that the Interface Segregation Principle is normally satisfied.
    Both involve dividing our large interface into multiple smaller ones.`,st=o(),z=s("h3"),z.textContent="Role Interfaces",lt=o(),K=s("p"),K.innerHTML=`The first option is to create a new interface for each <em>role</em> that can be filled by our interface.
    Each of these new interfaces is called a <a href="https://martinfowler.com/bliki/RoleInterface.html"><em>Role Interface</em></a>.
    In our case, the <code>StringList</code> interface fills two roles:`,dt=o(),Q=s("ul"),Q.innerHTML=`<li><strong>Searching</strong> - finding elements in the list</li> 
    <li><strong>Mutation</strong> - editing the contents of the list</li>`,ft=o(),X=s("p"),X.innerHTML=`We should extract these roles into their own interfaces.
    The <code>replaceElement</code> function uses both roles, so we still need an interface with all 3 methods.
    That means we now have 3 interfaces:`,rt=o(),l(v.$$.fragment),pt=o(),Z=s("p"),Z.innerHTML=`And our methods can be edited to specify which role they use.
    The <code>contains</code> method searches the list, and the <code>setElement</code> method mutates the list.
    The <code>replaceElement</code> method does both.`,mt=o(),ee=s("p"),ee.textContent="Their method signatures now look like this:",ut=o(),l(I.$$.fragment),ct=o(),te=s("p"),te.innerHTML=`Using our immutable list from before, <code>contains(list, &quot;friend&quot;)</code> works fine.
    More importantly, <code>replaceElement(list, &quot;hi&quot;, &quot;hello&quot;)</code> correctly causes a compiler error.
    If we implemented <code>add</code> and <code>remove</code>, we could call <code>setElement</code> and <code>replaceElement</code>.
    This clearly satisfies the Interface Segregation Principle.`,at=o(),ie=s("p"),ie.textContent=`It wasn't easy though - defining the boundary of each role is complex and gets harder with bigger interfaces.
    It can be difficult to use Role Interfaces and they need adjusting when functionality is added.
    Also, it is hard to slowly refactor an existing codebase to use Role Interfaces, as most of the effort happens at first when breaking down the large interfaces.`,wt=o(),ne=s("p"),ne.innerHTML=`There are other downsides too - any documentation on <code>StringList</code> needs to be copied to <code>Searchable</code> and <code>Mutable</code>.
    These are likely to get out-of-sync, and we don&#39;t have a single source of truth, since each method is defined in multiple places.`,yt=o(),oe=s("h3"),oe.textContent="Single-Method Interfaces",bt=o(),se=s("p"),se.innerHTML=`Taking Role Interfaces to an extreme reveals a second option.
    We could define each method in its own Single-Method Interface (SMI).
    We can then combine interfaces using <a href="https://www.typescriptlang.org/docs/handbook/advanced-types.html#intersection-types"><em>intersection types</em></a>.`,xt=o(),le=s("p"),le.innerHTML="We don&#39;t need the <code>StringList</code> interface anymore, so we can remove than and replace it with single-method interfaces:",$t=o(),l(S.$$.fragment),Tt=o(),de=s("p"),de.innerHTML=`Then we rewrite our methods so that any parameter with type <code>StringList</code> now specifies which methods it uses.
    The new method signatures are:`,kt=o(),l(h.$$.fragment),vt=o(),fe=s("p"),fe.innerHTML=`As before, this correctly allows <code>contains</code> but not <code>replaceElement</code> when our list has only implemented <code>indexOf</code>.
    Implementing <code>add</code> and <code>remove</code> would satisfy <code>I_add</code> and <code>I_remove</code>, allowing us to call <code>setElement</code> and <code>replaceElement</code>.`,It=o(),re=s("p"),re.innerHTML=`It can be confusing at first, and you end up with a lot of interfaces.
    It&#39;s also a pain to implement on a legacy project.
    Most of the refactoring work happens up-front, deleting and recreating any interfaces.
    On the plus side, we keep our single source of truth for each method, and we can move the documentation from <code>StringList</code> to the SMIs.`,St=o(),pe=s("p"),pe.textContent=`Both solutions are workable, and in many other languages there is no alternative.
    Thankfully, TypeScript provides a third option.`,ht=o(),me=s("h2"),me.textContent="Introducing Pick",Lt=o(),ue=s("p"),ue.innerHTML=`In TypeScript, <a href="https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys"><code>Pick</code></a> is a built-in utility type.
    Given a complex type, we can select some of its functionality and ignore the rest:`,Et=o(),l(L.$$.fragment),Mt=o(),ce=s("p"),ce.innerHTML=`The <code>ThingWithAge</code> type selects the <code>age</code> and <code>incrementAge</code> properties from the <code>Person</code> type.
    The resulting type is:`,gt=o(),l(E.$$.fragment),qt=o(),ae=s("figure"),ae.innerHTML='<img src="/assets/blog/pick-n-mix/header.png" title="Pick extracts some properties from a type" alt="This diagram doesn&#39;t really add anything to be honest, I just needed a picture for the article header"/>',Pt=o(),we=s("p"),we.innerHTML=`The strings are concerning, but it&#39;s completely type-safe.
    The compiler won&#39;t let you use <code>Pick&lt;Person, &quot;nonExistentField&quot;&gt;</code>, as <code>nonExistentField</code> is not a property on <code>Person</code>.
    This is thanks to <a href="https://www.typescriptlang.org/docs/handbook/advanced-types.html#string-literal-types">String Literal types</a> - a huge topic in and of itself.`,Ot=o(),ye=s("h2"),ye.textContent="Interface Segregation with Pick",Ht=o(),be=s("p"),be.innerHTML=`We can use <code>Pick</code> to select parts of our large <code>StringList</code> interface.
    Our interface is the same as it was in the first example:`,Ct=o(),l(M.$$.fragment),_t=o(),xe=s("p"),xe.innerHTML="We then edit our utility functions so that their <code>list</code> parameters use <code>Pick</code> to choose the relevant parts of <code>StringList</code>.",Wt=o(),l(g.$$.fragment),At=o(),$e=s("p"),$e.innerHTML=`Again, this solves our problem by allowing <code>contains</code> and not <code>replaceElement</code>.
    We also don&#39;t need to write or modify any interfaces, allowing bad codebases to be refactored on a per-function basis.
    Even better, our documentation works out of the box - it is automatically exposed by <code>Pick</code>.`,Ft=o(),Te=s("figure"),Te.innerHTML='<img src="/assets/blog/pick-n-mix/docs.png" title="It&#39;s like magic" alt="The documentation automatically propagates from StringList to Pick"/>',Rt=o(),ke=s("p"),ke.innerHTML=`You may think it strange that in <code>replaceElement</code> we used the type <code>Pick&lt;StringList, &quot;indexOf&quot; | &quot;add&quot; | &quot;remove&quot;&gt;</code>.
    Since <code>StringList</code> only has those 3 methods, it&#39;s equivalent to just using <code>StringList</code> as the type for <code>list</code>.
    Listing the methods is best practice, even when you must list all of them.
    That way, when more methods are added to <code>StringList</code>, we don&#39;t automatically require them in <code>replaceElement</code>.`,Vt=o(),ve=s("p"),ve.innerHTML=`Another point of confusion around <code>replaceElement</code> is that we require the <code>add</code> and <code>remove</code> methods on <code>list</code> even though we don&#39;t explicitly use them.
    We need those methods because they are required by <code>setElement</code>.
    This can be a pain, as it requires looking at the definition for every method used.
    Also, if <code>setElement</code> added another method to the type for <code>list</code>, every function that used <code>setElement</code> would also have to be updated.`,jt=o(),Ie=s("p"),Ie.textContent=`There is a solution to this problem, but it might get confusing.
    First, we need to define our own custom utility type:`,Ut=o(),l(q.$$.fragment),Bt=o(),Se=s("p"),Se.textContent="So, what does that do?",Dt=o(),he=s("p"),he.innerHTML=`Our <code>Parameter</code> type depends on <code>Parameters</code>, <a href="https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterstype">a base TypeScript utility type</a>.
    To understand our type, we first need to understand <code>Parameters</code>.
    It&#39;s hard to describe in words, but easy to demonstrate.`,Gt=o(),Le=s("p"),Le.innerHTML=`We have a function <code>function myFunc(a: string, b: number): boolean</code>.
    Its type is <code>(a: string, b: number) =&gt; boolean</code>.
    <code>Parameters&lt;typeof myFunc&gt;</code> returns <code>[string, number]</code> - a tuple of the parameter types for <code>myFunc</code>.
    If you&#39;re still confused, click the link above for more examples.`,Nt=o(),Ee=s("p"),Ee.innerHTML=`Our utility type simply extracts one element of that tuple.
    <code>Parameter&lt;typeof myFunc, 0&gt;</code> is the same as <code>Parameters<typeof myfunc="">[0]</typeof></code>, which resolves to <code>string</code>.
    We can use this utility type in the definition of <code>replaceElement</code>:`,Jt=o(),l(P.$$.fragment),Yt=o(),Me=s("p"),Me.textContent="Essentially, this says:",zt=o(),ge=s("blockblockquote"),ge.innerHTML=`<code>replaceElement</code> accepts a parameter called list.
    I&#39;m going to call the <code>indexOf</code> method on it, and I&#39;m going to pass it as the first argument to <code>setElement</code>.
    Make sure it can also do whatever <code>setElement</code> needs.`,Kt=o(),qe=s("h2"),qe.textContent="Chaining",Qt=o(),Pe=s("p"),Pe.textContent=`One difficulty with tightening our function parameters is the ability to do method chaining.
    For instance, in the first example, we could write a method:`,Xt=o(),l(O.$$.fragment),Zt=o(),Oe=s("p"),Oe.innerHTML=`And could use it as <code>chaining(list).indexOf(&quot;friend&quot;)</code>.
    It&#39;s not that simple when using segregated interfaces:`,ei=o(),He=s("p"),He.innerHTML=`If we declare <code>function chaining(list: Mutable): Mutable</code>, then we can&#39;t call <code>chaining(list).indexOf(&quot;friend&quot;)</code>.
    <code>chaining(list)</code> outputs <code>Mutable</code>, even if the <code>list</code> parameter was actually a subtype of <code>Mutable</code>.
    Since <code>Mutable</code> does not provide a <code>indexOf</code> method, we can&#39;t call it.
    The same issue occurs with Single-Method Interfaces and <code>Pick</code>.`,ti=o(),Ce=s("p"),Ce.textContent="Instead, we have to use generics:",ii=o(),l(H.$$.fragment),ni=o(),_e=s("p"),_e.innerHTML=`Now the output of the <code>chaining</code> method is the same as the type of the <code>list</code> parameter.
    If <code>list</code> implements <code>indexOf</code>, we can do <code>chaining(list).indexOf(&quot;friend&quot;)</code>.`,oi=o(),We=s("h2"),We.textContent="Conclusion",si=o(),Ae=s("p"),Ae.innerHTML=`Interface Segregation is an important part of clean code and is essential for long-term maintainability of object-oriented code.
    With TypeScript, it&#39;s simple to use <code>Pick</code> to divide up a large interface.
    It&#39;s interoperable with old code, and once you understand how it works, there&#39;s no downside.
    Do yourself a favour and start using <code>Pick</code> today.`},m(e,t){i(e,c,t),i(e,w,t),i(e,a,t),i(e,y,t),i(e,b,t),i(e,Ve,t),i(e,C,t),i(e,je,t),i(e,_,t),i(e,Ue,t),i(e,W,t),i(e,Be,t),i(e,A,t),i(e,De,t),d(x,e,t),i(e,Ge,t),i(e,F,t),i(e,Ne,t),i(e,R,t),i(e,Je,t),d($,e,t),i(e,Ye,t),i(e,V,t),i(e,ze,t),i(e,j,t),i(e,Ke,t),i(e,U,t),i(e,Qe,t),d(T,e,t),i(e,Xe,t),i(e,B,t),i(e,Ze,t),i(e,D,t),i(e,et,t),d(k,e,t),i(e,tt,t),i(e,G,t),i(e,it,t),i(e,N,t),i(e,nt,t),i(e,J,t),i(e,ot,t),i(e,Y,t),i(e,st,t),i(e,z,t),i(e,lt,t),i(e,K,t),i(e,dt,t),i(e,Q,t),i(e,ft,t),i(e,X,t),i(e,rt,t),d(v,e,t),i(e,pt,t),i(e,Z,t),i(e,mt,t),i(e,ee,t),i(e,ut,t),d(I,e,t),i(e,ct,t),i(e,te,t),i(e,at,t),i(e,ie,t),i(e,wt,t),i(e,ne,t),i(e,yt,t),i(e,oe,t),i(e,bt,t),i(e,se,t),i(e,xt,t),i(e,le,t),i(e,$t,t),d(S,e,t),i(e,Tt,t),i(e,de,t),i(e,kt,t),d(h,e,t),i(e,vt,t),i(e,fe,t),i(e,It,t),i(e,re,t),i(e,St,t),i(e,pe,t),i(e,ht,t),i(e,me,t),i(e,Lt,t),i(e,ue,t),i(e,Et,t),d(L,e,t),i(e,Mt,t),i(e,ce,t),i(e,gt,t),d(E,e,t),i(e,qt,t),i(e,ae,t),i(e,Pt,t),i(e,we,t),i(e,Ot,t),i(e,ye,t),i(e,Ht,t),i(e,be,t),i(e,Ct,t),d(M,e,t),i(e,_t,t),i(e,xe,t),i(e,Wt,t),d(g,e,t),i(e,At,t),i(e,$e,t),i(e,Ft,t),i(e,Te,t),i(e,Rt,t),i(e,ke,t),i(e,Vt,t),i(e,ve,t),i(e,jt,t),i(e,Ie,t),i(e,Ut,t),d(q,e,t),i(e,Bt,t),i(e,Se,t),i(e,Dt,t),i(e,he,t),i(e,Gt,t),i(e,Le,t),i(e,Nt,t),i(e,Ee,t),i(e,Jt,t),d(P,e,t),i(e,Yt,t),i(e,Me,t),i(e,zt,t),i(e,ge,t),i(e,Kt,t),i(e,qe,t),i(e,Qt,t),i(e,Pe,t),i(e,Xt,t),d(O,e,t),i(e,Zt,t),i(e,Oe,t),i(e,ei,t),i(e,He,t),i(e,ti,t),i(e,Ce,t),i(e,ii,t),d(H,e,t),i(e,ni,t),i(e,_e,t),i(e,oi,t),i(e,We,t),i(e,si,t),i(e,Ae,t),Fe=!0},p:ri,i(e){Fe||(f(x.$$.fragment,e),f($.$$.fragment,e),f(T.$$.fragment,e),f(k.$$.fragment,e),f(v.$$.fragment,e),f(I.$$.fragment,e),f(S.$$.fragment,e),f(h.$$.fragment,e),f(L.$$.fragment,e),f(E.$$.fragment,e),f(M.$$.fragment,e),f(g.$$.fragment,e),f(q.$$.fragment,e),f(P.$$.fragment,e),f(O.$$.fragment,e),f(H.$$.fragment,e),Fe=!0)},o(e){r(x.$$.fragment,e),r($.$$.fragment,e),r(T.$$.fragment,e),r(k.$$.fragment,e),r(v.$$.fragment,e),r(I.$$.fragment,e),r(S.$$.fragment,e),r(h.$$.fragment,e),r(L.$$.fragment,e),r(E.$$.fragment,e),r(M.$$.fragment,e),r(g.$$.fragment,e),r(q.$$.fragment,e),r(P.$$.fragment,e),r(O.$$.fragment,e),r(H.$$.fragment,e),Fe=!1},d(e){e&&n(c),e&&n(w),e&&n(a),e&&n(y),e&&n(b),e&&n(Ve),e&&n(C),e&&n(je),e&&n(_),e&&n(Ue),e&&n(W),e&&n(Be),e&&n(A),e&&n(De),p(x,e),e&&n(Ge),e&&n(F),e&&n(Ne),e&&n(R),e&&n(Je),p($,e),e&&n(Ye),e&&n(V),e&&n(ze),e&&n(j),e&&n(Ke),e&&n(U),e&&n(Qe),p(T,e),e&&n(Xe),e&&n(B),e&&n(Ze),e&&n(D),e&&n(et),p(k,e),e&&n(tt),e&&n(G),e&&n(it),e&&n(N),e&&n(nt),e&&n(J),e&&n(ot),e&&n(Y),e&&n(st),e&&n(z),e&&n(lt),e&&n(K),e&&n(dt),e&&n(Q),e&&n(ft),e&&n(X),e&&n(rt),p(v,e),e&&n(pt),e&&n(Z),e&&n(mt),e&&n(ee),e&&n(ut),p(I,e),e&&n(ct),e&&n(te),e&&n(at),e&&n(ie),e&&n(wt),e&&n(ne),e&&n(yt),e&&n(oe),e&&n(bt),e&&n(se),e&&n(xt),e&&n(le),e&&n($t),p(S,e),e&&n(Tt),e&&n(de),e&&n(kt),p(h,e),e&&n(vt),e&&n(fe),e&&n(It),e&&n(re),e&&n(St),e&&n(pe),e&&n(ht),e&&n(me),e&&n(Lt),e&&n(ue),e&&n(Et),p(L,e),e&&n(Mt),e&&n(ce),e&&n(gt),p(E,e),e&&n(qt),e&&n(ae),e&&n(Pt),e&&n(we),e&&n(Ot),e&&n(ye),e&&n(Ht),e&&n(be),e&&n(Ct),p(M,e),e&&n(_t),e&&n(xe),e&&n(Wt),p(g,e),e&&n(At),e&&n($e),e&&n(Ft),e&&n(Te),e&&n(Rt),e&&n(ke),e&&n(Vt),e&&n(ve),e&&n(jt),e&&n(Ie),e&&n(Ut),p(q,e),e&&n(Bt),e&&n(Se),e&&n(Dt),e&&n(he),e&&n(Gt),e&&n(Le),e&&n(Nt),e&&n(Ee),e&&n(Jt),p(P,e),e&&n(Yt),e&&n(Me),e&&n(zt),e&&n(ge),e&&n(Kt),e&&n(qe),e&&n(Qt),e&&n(Pe),e&&n(Xt),p(O,e),e&&n(Zt),e&&n(Oe),e&&n(ei),e&&n(He),e&&n(ti),e&&n(Ce),e&&n(ii),p(H,e),e&&n(ni),e&&n(_e),e&&n(oi),e&&n(We),e&&n(si),e&&n(Ae)}}}function Mi(Re){let c,w;return c=new pi({props:{id:"pick-n-mix",$$slots:{default:[Ei]},$$scope:{ctx:Re}}}),{c(){l(c.$$.fragment)},m(a,y){d(c,a,y),w=!0},p(a,[y]){const b={};y&1&&(b.$$scope={dirty:y,ctx:a}),c.$set(b)},i(a){w||(f(c.$$.fragment,a),w=!0)},o(a){r(c.$$.fragment,a),w=!1},d(a){p(c,a)}}}class Ci extends li{constructor(c){super();di(this,c,null,Mi,fi,{})}}export{Ci as default};

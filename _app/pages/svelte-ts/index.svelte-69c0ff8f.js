import{S as Je,i as Ve,s as qe,q as m,r as c,m as y,k as d,w as a,e as l,g as o,c as i,F as Pe,f as s}from"../../chunks/vendor-b123dbec.js";import{B as Xe}from"../../chunks/BlogPost-fb5b6ef4.js";import{S as h}from"../../chunks/Snippet-0180392a.js";import"../../chunks/Template-7e2d3e9c.js";const Ye={name:"Imports",language:"ts",snippet:`import typescript from "@rollup/plugin-typescript";
  import sveltePreprocess from "svelte-preprocess";`},Oe={name:"TypeCheck",language:"ts",snippet:`function typeCheck() {
    return {
      writeBundle() {
        require('child_process').spawn('svelte-check', {
          stdio: ['ignore', 'inherit', 'inherit'],
          shell: true
        });
      }
    }
  }`},Re={name:"Plugins",language:"ts",snippet:`typeCheck(),
  typescript({ sourceMap: !production }),
  svelte({
    preprocess: sveltePreprocess(),
    dev: !production,
    css: css => {
      css.write("public/build/bundle.css");
    }
  })`},We={name:"tsConfig.json",language:"json",snippet:`{
    "include": ["src/**/*"],
    "exclude": ["node_modules/*", "public/*"],
    "compilerOptions": {
      "target": "ESNEXT",
      "lib": ["ESNEXT", "dom"],
      "module": "ESNEXT",
      "moduleResolution": "node",
  
      "esModuleInterop": true,
      "allowSyntheticDefaultImports": true,
      "strict": true,
      "forceConsistentCasingInFileNames": true,
      
      "resolveJsonModule": true,
      "isolatedModules": true,
      "noEmit": true,
      "strictNullChecks": true
    }
  }`},ze={name:"Gotch #1",language:"ts",snippet:`import {searchBinaryTree} from "./tree"
  import type {BinaryTree, BinaryTreeNode} from "./tree"`},Ue={name:"Gotch #2",language:"svelte",snippet:`let inverseSliderValue: number;
  $: inverseSliderValue = 10 - sliderValue;`};var k={imports:Ye,typeCheck:Oe,plugins:Re,tsConfig:We,gotcha1:ze,gotcha2:Ue};function Ke(ie){let n,r,p,u,f,se,C,oe,M,le,x,ne,j,pe,H,re,L,ue,I,fe,_,me,E,ce,g,ye,v,de,N,ae,w,ve,B,we,T,Te,A,be,D,Se,F,$e,b,he,G,ke,J,Ce,V,Me,q,xe,P,je,X,He,Y,Le,O,Ie,R,_e,W,Ee,z,ge,S,Ne,U,Be,$,Ae,K,De,Q,Fe,Z,Ge,ee,te;return v=new h({props:{config:k.imports}}),w=new h({props:{config:k.typeCheck}}),T=new h({props:{config:k.plugins}}),b=new h({props:{config:k.tsConfig}}),S=new h({props:{config:k.gotcha1}}),$=new h({props:{config:k.gotcha2}}),{c(){n=l("p"),n.innerHTML=`Svelte is an up-and-coming web framework which removes the need for any runtime libraries by adding a transpilation step in its build process.
    I first started using Svelte in January, seen in <a href="/minesweeper-optimisation">my optimisation blog post</a>, and have since used it for my AI music generation tool <a href="https://www.stevenwaterman.uk/musetree/">MuseTree</a>.
    In my experience, Svelte was blazing-fast and super simple to use, making me more productive than ever before.
    There was just one problem:`,r=o(),p=l("p"),p.innerHTML="<strong>no TypeScript support</strong> \u{1F631}",u=o(),f=l("p"),f.textContent=`Thankfully, support has slowly been improving over time.
    You can see this evolution in MuseTree, with more and more of its code slowly becoming TypeScript as wider support was implemented.
    It has finally reached the point where I feel comfortable saying that you can use Svelte with TypeScript, so it's time to spread the word.`,se=o(),C=l("p"),C.innerHTML=`Get excited because we&#39;re about to use my two favourite web technologies together.
    Find a spare 5 minutes and grab your nearest Svelte project (<a href="https://github.com/sveltejs/template">store-bought is fine</a>) - it&#39;s time to get stuck in.`,oe=o(),M=l("p"),M.innerHTML='<em>All code samples in this post are taken from my <a href="https://github.com/stevenwaterman/svelte-ts">example repo on GitHub</a></em>',le=o(),x=l("h2"),x.textContent="Update Your Build Config",ne=o(),j=l("p"),j.innerHTML='<em>These steps assume that you are starting with the <a href="https://github.com/sveltejs/template">official Svelte template</a></em>',pe=o(),H=l("h3"),H.textContent="package.json",re=o(),L=l("p"),L.innerHTML="All that&#39;s changed in <code>package.json</code> is some new dev dependencies:",ue=o(),I=l("ul"),I.innerHTML=`<li><code>svelte-preprocess</code> lets us define preprocessing steps in rollup</li> 
    <li><code>@rollup/plugin-typescript</code> registers TypeScript transpilation as one of those steps</li> 
    <li><code>typescript</code> is used by the TypeScript plugin</li> 
    <li><code>svelte-check</code> gives us compile-time type checking</li>`,fe=o(),_=l("p"),_.innerHTML=`You can install all of these at once with
    <code>npm i -D svelte-preprocess @rollup/plugin-typescript typescript svelte-check</code>
    then follow it up with <code>npm install</code> to make sure all your dependencies are installed.`,me=o(),E=l("h3"),E.textContent="rollup.config.js",ce=o(),g=l("p"),g.innerHTML=`This is where the real changes happen.
    First, <strong>update the <code>input</code> from <code>main.js</code> to <code>main.ts</code></strong>.
    Then import our two new plugins at the top of the file:`,ye=o(),m(v.$$.fragment),de=o(),N=l("p"),N.innerHTML=`Next, we need to write our own plugin, as seen below.
    This plugin runs <code>svelte-check</code>, which is a command-line utility and not available as a rollup plugin directly.
    Add this block to the bottom of your rollup config.`,ae=o(),m(w.$$.fragment),ve=o(),B=l("p"),B.textContent="Finally, at the top of the plugins list, add this block to register the three new plugins:",we=o(),m(T.$$.fragment),Te=o(),A=l("p"),A.innerHTML=`If you already have a <code>svelte</code> section in your config, just replace it.
    Now, every time we build our project, it will first type-check your code and transpile any TypeScript code into JavaScript.`,be=o(),D=l("h3"),D.textContent="tsconfig.json",Se=o(),F=l("p"),F.innerHTML=`Since we&#39;re using TypeScript, we need a <code>tsconfig.json</code> file to configure it.
    Nothing special here, so if you&#39;re experienced with TypeScript then use it like normal.
    Otherwise, just create a file at the root of your project named <code>tsconfig.json</code> containing this config:`,$e=o(),m(b.$$.fragment),he=o(),G=l("h3"),G.textContent="main.js",ke=o(),J=l("p"),J.innerHTML=`Rename your entrypoint from <code>main.js</code> to <code>main.ts</code>.**
    The first line, <code>import App from &#39;./App.svelte&#39;;</code> will cause compilation errors as you can&#39;t import a Svelte component into a TypeScript file.
    Make the compiler ignore that error by adding <code>// @ts-ignore</code> on the line above the import.`,Ce=o(),V=l("p"),V.textContent=`That's everything!
    Your Svelte project is now configured to work with TypeScript.`,Me=o(),q=l("h2"),q.textContent="Start Using TypeScript in Svelte",xe=o(),P=l("p"),P.innerHTML=`First things first, use an IDE that supports the <a href="https://microsoft.github.io/language-server-protocol/">Language Server Protocol</a>.
    That includes VS Code, Atom, Sublime Text, and many others.
    It <strong>does not</strong> include JetBrains IDEs.
    Even as a die-hard JetBrains fan, I have resigned myself to using VS Code, which is the best supported.
    <a href="https://microsoft.github.io/language-server-protocol/implementors/tools/">A full list of supported IDEs is available here</a>.`,je=o(),X=l("p"),X.innerHTML=`Get the relevant Svelte extension - such as <a href="https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode">Svelte for VS Code</a>.
    This adds in-IDE type checks for your Svelte code.`,He=o(),Y=l("p"),Y.innerHTML=`Then simply <strong>change your <code>&lt;script&gt;</code> tag to <code>&lt;script lang=&quot;ts&quot;&gt;</code></strong> in each Svelte component, and you&#39;re off!
    Start using TypeScript, and you&#39;ll see any type errors in your IDE.
    When you&#39;re running the project, you&#39;ll also get type errors in the terminal:`,Le=o(),O=l("figure"),O.innerHTML='<img src="/assets/blog/svelte-ts/typeCheck.png" alt="Type errors are being written to the terminal" title="These checks run when you do a production build too"/>',Ie=o(),R=l("h3"),R.textContent="Gotchas",_e=o(),W=l("p"),W.textContent=`The TypeScript support in Svelte isn't perfect.
    There's a few things you need to look out for:`,Ee=o(),z=l("ul"),z.innerHTML="<li>When importing a type into a Svelte component, you need to use the <code>import type</code> syntax. This means you might have two import statements for one file, like this:</li>",ge=o(),m(S.$$.fragment),Ne=o(),U=l("ul"),U.innerHTML="<li>To add types to a reactive declaration (<code>$:</code>), you have to do it in two steps. First, declare the variable using let with the correct type. Then add a reactive declaration like normal, without any types.</li>",Be=o(),m($.$$.fragment),Ae=o(),K=l("ul"),K.innerHTML=`<li>The type definitions for the inline <code>style</code> on a DOM component are lying. They say they support JSX-like style objects, but really only support strings. If you want to use JSX, try the <code>react-style-object-to-css</code> library.</li> 
    <li>Types are only checked inside the <code>&lt;script&gt;</code> tags, meaning you can have a text input with <code>bind:value={stringVariable}</code>.</li> 
    <li>The app won&#39;t live-reload when you change a <code>.ts</code> file, only when you change the <code>.svelte</code> files.</li>`,De=o(),Q=l("h3"),Q.textContent="Conclusion",Fe=o(),Z=l("p"),Z.textContent=`Svelte is amazing, and it's even better with TypeScript.
    While support isn't perfect, it's good enough that I'd recommend it to anyone that's used Svelte and TypeScript before.
    If you've been waiting for TypeScript support before learning Svelte, now's the time to get stuck in.`,Ge=o(),ee=l("p"),ee.innerHTML='Make sure you check out the <a href="https://github.com/stevenwaterman/svelte-ts">GitHub Repo</a> which contains a working example project.'},m(e,t){i(e,n,t),i(e,r,t),i(e,p,t),i(e,u,t),i(e,f,t),i(e,se,t),i(e,C,t),i(e,oe,t),i(e,M,t),i(e,le,t),i(e,x,t),i(e,ne,t),i(e,j,t),i(e,pe,t),i(e,H,t),i(e,re,t),i(e,L,t),i(e,ue,t),i(e,I,t),i(e,fe,t),i(e,_,t),i(e,me,t),i(e,E,t),i(e,ce,t),i(e,g,t),i(e,ye,t),c(v,e,t),i(e,de,t),i(e,N,t),i(e,ae,t),c(w,e,t),i(e,ve,t),i(e,B,t),i(e,we,t),c(T,e,t),i(e,Te,t),i(e,A,t),i(e,be,t),i(e,D,t),i(e,Se,t),i(e,F,t),i(e,$e,t),c(b,e,t),i(e,he,t),i(e,G,t),i(e,ke,t),i(e,J,t),i(e,Ce,t),i(e,V,t),i(e,Me,t),i(e,q,t),i(e,xe,t),i(e,P,t),i(e,je,t),i(e,X,t),i(e,He,t),i(e,Y,t),i(e,Le,t),i(e,O,t),i(e,Ie,t),i(e,R,t),i(e,_e,t),i(e,W,t),i(e,Ee,t),i(e,z,t),i(e,ge,t),c(S,e,t),i(e,Ne,t),i(e,U,t),i(e,Be,t),c($,e,t),i(e,Ae,t),i(e,K,t),i(e,De,t),i(e,Q,t),i(e,Fe,t),i(e,Z,t),i(e,Ge,t),i(e,ee,t),te=!0},p:Pe,i(e){te||(y(v.$$.fragment,e),y(w.$$.fragment,e),y(T.$$.fragment,e),y(b.$$.fragment,e),y(S.$$.fragment,e),y($.$$.fragment,e),te=!0)},o(e){d(v.$$.fragment,e),d(w.$$.fragment,e),d(T.$$.fragment,e),d(b.$$.fragment,e),d(S.$$.fragment,e),d($.$$.fragment,e),te=!1},d(e){e&&s(n),e&&s(r),e&&s(p),e&&s(u),e&&s(f),e&&s(se),e&&s(C),e&&s(oe),e&&s(M),e&&s(le),e&&s(x),e&&s(ne),e&&s(j),e&&s(pe),e&&s(H),e&&s(re),e&&s(L),e&&s(ue),e&&s(I),e&&s(fe),e&&s(_),e&&s(me),e&&s(E),e&&s(ce),e&&s(g),e&&s(ye),a(v,e),e&&s(de),e&&s(N),e&&s(ae),a(w,e),e&&s(ve),e&&s(B),e&&s(we),a(T,e),e&&s(Te),e&&s(A),e&&s(be),e&&s(D),e&&s(Se),e&&s(F),e&&s($e),a(b,e),e&&s(he),e&&s(G),e&&s(ke),e&&s(J),e&&s(Ce),e&&s(V),e&&s(Me),e&&s(q),e&&s(xe),e&&s(P),e&&s(je),e&&s(X),e&&s(He),e&&s(Y),e&&s(Le),e&&s(O),e&&s(Ie),e&&s(R),e&&s(_e),e&&s(W),e&&s(Ee),e&&s(z),e&&s(ge),a(S,e),e&&s(Ne),e&&s(U),e&&s(Be),a($,e),e&&s(Ae),e&&s(K),e&&s(De),e&&s(Q),e&&s(Fe),e&&s(Z),e&&s(Ge),e&&s(ee)}}}function Qe(ie){let n,r;return n=new Xe({props:{id:"svelte-ts",$$slots:{default:[Ke]},$$scope:{ctx:ie}}}),{c(){m(n.$$.fragment)},m(p,u){c(n,p,u),r=!0},p(p,[u]){const f={};u&1&&(f.$$scope={dirty:u,ctx:p}),n.$set(f)},i(p){r||(y(n.$$.fragment,p),r=!0)},o(p){d(n.$$.fragment,p),r=!1},d(p){a(n,p)}}}class st extends Je{constructor(n){super();Ve(this,n,null,Qe,qe,{})}}export{st as default};

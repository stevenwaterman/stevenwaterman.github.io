import{S as lt,i as rt,s as at,q as m,r as f,m as d,k as c,w as h,e as s,g as n,c as o,F as ut,f as i}from"../../chunks/vendor-b123dbec.js";import{B as pt}from"../../chunks/BlogPost-fb5b6ef4.js";import{S as g}from"../../chunks/Snippet-0180392a.js";import"../../chunks/Template-7e2d3e9c.js";const mt={name:"Simple Test Bench",language:"html",snippet:`<html>
  <head>
      <script src="./myCode.js"><\/script>
  </head>
</html>`},ft={name:"Test Bench Stubs",language:"ts",snippet:`const Button = {
    A: "a",
    B: "b",
    AB: "ab"
};

let aPressed = () => {};
let bPressed = () => {};
let abPressed = () => {};

const input = {
    onButtonPressed: (button: string, func: () => void) => {
        if (button === Button.A) aPressed = func;
        if (button === Button.B) bPressed = func;
        if (button === Button.AB) abPressed = func;
    }
}`},dt={name:"Test Bench",language:"html",snippet:`<html>
  <head>
      <script src="./myCode.js"><\/script>
  </head>

  <body>
      <button onClick="aPressed()">A</button>
      <button onClick="bPressed()">B</button>
      <button onClick="abPressed()">AB</button>
  </body>
</html>`},ct={name:"High Memory Usage",language:"ts",snippet:`function getRange(values: number[]) {
    return {
        min: Math.min(values),
        max: Math.max(values)
    }
}`},ht={name:"Low Memory Usage",language:"ts",snippet:`let minResult: number = 0;
  let maxResult: number = 0;
  
  function getRange(values: number[]) {
      minResult = Math.min(values);
      maxResult = Math.max(values);
  }`},yt={name:"Global State",language:"ts",snippet:`const rangeResult = {
    min: 0,
    max: 0
};

function getRange(values: number[]) {
    rangeResult.min = Math.min(values);
    rangeResult.max = Math.max(values);
}`};var M={simpleBench:mt,stubs:ft,bench:dt,highMemory:ct,lowMemory:ht,globalState:yt};function bt(me){let l,a,r,u,p,fe,C,de,$,ce,x,he,I,ye,H,be,B,we,L,Te,y,ke,S,ve,P,ge,b,Me,_,Ce,w,$e,A,xe,j,Ie,R,He,q,Be,W,Le,J,Se,D,Pe,z,_e,E,Ae,U,je,Y,Re,F,qe,G,We,O,Je,N,De,Z,ze,K,Ee,Q,Ue,V,Ye,X,Fe,ee,Ge,te,Oe,oe,Ne,T,Ze,ie,Ke,k,Qe,ne,Ve,v,Xe,se,et,le,tt,re,ot,ae,it,nt,st,ue,pe;return y=new g({props:{config:M.simpleBench}}),b=new g({props:{config:M.stubs}}),w=new g({props:{config:M.bench}}),T=new g({props:{config:M.highMemory}}),k=new g({props:{config:M.lowMemory}}),v=new g({props:{config:M.globalState}}),{c(){l=s("p"),l.innerHTML=`When I <a href="https://blog.scottlogic.com/2020/03/10/raytracer-how-to.html">wrote a ray tracer</a> for the <a href="https://microbit.org/">BBC Micro:Bit</a>, I didn&#39;t expect it to be fast.
    I was right - my first attempt was unbearably slow, taking multiple seconds to respond to a button press.
    That meant I had to optimise my code, but the normal <a href="https://makecode.microbit.org/">MakeCode IDE</a> doesn&#39;t provide any tools to let you inspect your program while it&#39;s running.
    Instead, I reworked my code to <a href="https://stevenwaterman.uk/microbit-raytracer/">run as a website</a> and used Chrome&#39;s Developer Tools.
    My test bench code is available <a href="https://github.com/stevenwaterman/microbit-raytracer/tree/gh-pages">on GitHub</a>.`,a=n(),r=s("p"),r.textContent=`This post walks you through how to build a test bench website for your code and use the Chrome Developer Tools to optimise it.
    It is aimed at more advanced Micro:Bit users, but you don't need any experience with HTML or web development in general.
    However, you will need a basic grasp of using the command line to navigate between folders and run commands.`,u=n(),p=s("h2"),p.textContent="Introduction to Profiling",fe=n(),C=s("p"),C.innerHTML=`When it comes to optimising your code, there are a lot of general tips I could give you.
    However, I can&#39;t give advice about your specific project.
    Thankfully, you can use a tool called a <a href="https://en.wikipedia.org/wiki/Profiling_(computer_programming)">profiler</a> for that.`,de=n(),$=s("p"),$.textContent=`Profilers inspect your program during execution and generate a report.
    The report lists how often each function ran and how long they took.
    It also tells you how much memory was used, and where in your code the memory was allocated.
    This helps you find the 'hot spots' in your code - the parts that are running frequently and taking a long time.`,ce=n(),x=s("figure"),x.innerHTML='<img src="/assets/blog/microbit-optimisation/header.png" alt="Some code with cartoon fire superimposed" title="If your code is this hot, you need more help than I can give"/>',he=n(),I=s("p"),I.textContent=`In general, a profiler lets you know which bits of your code are causing slowness and need optimising.
    Since optimisation usually makes your code harder to read and maintain, this information comes in handy.
    We only want to optimise the parts of the code that need it most.`,ye=n(),H=s("p"),H.innerHTML=`The MakeCode IDE doesn&#39;t include a profiler, but we can rework our code to let us use a normal JavaScript profiler.
    Google Chrome has a JavaScript profiler built-in, and you can run it on any website using the <a href="https://developers.google.com/web/tools/chrome-devtools">Chrome Developer Tools</a>.
    In fact, Chrome is not unique here - most browsers include profilers in their developer tools.
    In this post, I&#39;ll focus on Chrome&#39;s profiler, so make sure you are using Chrome too if you are following along at home.`,be=n(),B=s("h2"),B.textContent="Building a Test Bench",we=n(),L=s("p"),L.innerHTML=`Since Chrome&#39;s profiler only works on websites, we can&#39;t use it to profile your Micro:Bit project directly.
    Instead, we need to build a website that runs your code - known as a <a href="https://en.wikipedia.org/wiki/Test_bench">test bench</a>.
    That could be as simple as:`,Te=n(),m(y.$$.fragment),ke=n(),S=s("p"),S.innerHTML=`However, this only works if your program is pure JavaScript.
    Most Micro:Bit code uses the handy built-in functions, like <code>input.onButtonPressed</code> or <code>basic.clearScreen</code>.
    We will need to write some extra code to let us use those functions, known as <a href="https://en.wikipedia.org/wiki/Method_stub">stubbing</a> them.`,ve=n(),P=s("p"),P.innerHTML=`Stubbing a function means writing a simpler version of it, which can be used in place of the real version.
    For example, you could stub <code>radio.sendString</code> with a function that just writes the value in a text box.
    You could stub <code>input.onButtonPressed</code> like this:`,ge=n(),m(b.$$.fragment),Me=n(),_=s("p"),_.innerHTML=`Now, other parts of your code can call <code>input.onButtonPressed</code> just like on a real Micro:Bit.
    The final step is to add some HTML buttons to your test bench.
    When the <code>A</code> button is pressed, it should run the <code>aPressed</code> function from the stub.`,Ce=n(),m(w.$$.fragment),$e=n(),A=s("p"),A.innerHTML=`If you need a second example, you can look at my ray tracer&#39;s <a href="https://github.com/stevenwaterman/microbit-raytracer/tree/gh-pages">test bench</a>.
    There, I stubbed the LED screen using <a href="https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API">HTML canvas</a>.
    The resulting website looks like this:`,xe=n(),j=s("figure"),j.innerHTML='<img src="/assets/blog/microbit-optimisation/testbench.png" title="It&#39;s no pixar, but it&#39;s mine" alt="My test bench shows a red pyramid on the display, and has one button for each input you can give the micro:bit, including the two buttons and the tilt gestures"/>',Ie=n(),R=s("p"),R.textContent=`Stubbing the Micro:Bit methods can be really hard at first, and it's often unclear what approach to take.
    Therefore, before you jump in and start stubbing the methods, you should think about whether you really need them.
    If your only goal is to test the performance of your program, do you really need to see the output of the LED display?
    If not, you can just comment out any lines that use the Micro:Bit functions.`,He=n(),q=s("p"),q.textContent=`It's also important to remember that your computer is much faster than the Micro:Bit.
    That means that your code could run so quickly that it finishes before the profiler records any data!
    That happened in my case, so I had to increase the number of pixels in my ray tracer until it took a few seconds to run.
    You could even just run your program over and over again in a loop.`,Be=n(),W=s("h2"),W.textContent="An Important Note",Le=n(),J=s("p"),J.innerHTML=`The &#39;JavaScript&#39; code used by the Micro:Bit is actually <a href="https://www.typescriptlang.org/">TypeScript</a>.
    TypeScript isn&#39;t natively supported by the browser, so we have to <a href="https://en.wikipedia.org/wiki/Source-to-source_compiler">transpile</a> it into JavaScript.
    The method is quite straightforward:`,Se=n(),D=s("ol"),D.innerHTML=`<li><a href="https://www.npmjs.com/get-npm">Install npm</a> by clicking the link and following the instructions for your operating system</li> 
    <li>Install TypeScript by running <code>npm install -g typescript</code> in the command line</li> 
    <li>With your code in a file named <code>myCode.ts</code>, navigate to that folder and run <code>tsc myCode.ts</code></li>`,Pe=n(),z=s("p"),z.innerHTML=`The compiled JavaScript will be written to a file called <code>myCode.js</code>, ready to be used in your test bench.
    You&#39;ll need to repeat the last step any time you make changes to <code>myCode.ts</code>.`,_e=n(),E=s("h2"),E.textContent="Using the Profiler",Ae=n(),U=s("p"),U.innerHTML=`Open up your HTML file and check that your code is running.
    If you haven&#39;t set up any outputs, it could be hard to tell - try adding <code>console.log(&quot;It&#39;s working!&quot;)</code> somewhere in your code.
    After recompiling and refreshing the web page, you should see the message printed in the console.
    To access the console, open developer tools by right-clicking on the page and selecting <code>Inspect Element</code>.
    Then, switch to the <code>Console</code> tab.`,je=n(),Y=s("p"),Y.innerHTML=`Now we know that&#39;s all working, it&#39;s time to start inspecting your code.
    There are two tabs that we&#39;re interested in: <code>Performance</code> and <code>Memory</code>.
    The Performance tab shows you how long each function is taking, both on a per-call level, and in total.
    The Memory tab shows you where memory is being allocated and how much is being used while the program was running.`,Re=n(),F=s("h3"),F.textContent="Performance",qe=n(),G=s("p"),G.innerHTML=`In the performance tab, press the circular <code>Record</code> button and start running your program.
    After a few seconds, press the button again to stop recording and wait for it to process.
    You should see something like this:`,We=n(),O=s("figure"),O.innerHTML='<img src="/assets/blog/microbit-optimisation/performance.png" alt="The performance tab of developer tools is shown. It has a number of small squares for each function that ran" title="It&#39;s scary at first, but this is one of the most helpful things ever"/>',Je=n(),N=s("p"),N.textContent=`Time increases from left to right, and each rectangle is the function in your code that was running at the time.
    When one function is under another, it means that the bottom one was called by the top one.
    The name of the function is written on the rectangle.
    Zoom in and see which functions are taking the longest in your code.
    Those functions are the ones that you should try to optimise.`,De=n(),Z=s("p"),Z.innerHTML=`I&#39;m not going to discuss <em>how</em> to optimise your code, because it&#39;s an entire topic in itself.
    A few techniques I&#39;d recommend looking into are:`,ze=n(),K=s("ul"),K.innerHTML=`<li><a href="https://en.wikipedia.org/wiki/Memoization">Memoization</a>: When a function is called with some arguments for the first time, the result is stored in a lookup table. On future calls, the arguments are used to get the result from the lookup table, instead of computing it again.</li> 
    <li><a href="https://en.wikipedia.org/wiki/Inline_expansion">Function Inlining</a>: Copying the contents of a function into the part of the code where you previously called that function, allowing you to remove the function. This is useful when a function gets called millions of times as each function call introduces a tiny delay.</li> 
    <li><a href="https://en.wikipedia.org/wiki/Precomputation">Precomputation</a>: Calculating every possible result of a function externally and hard-coding it into your program. This helps when the range of arguments is very small and known in advance, but the calculation is so complex that there&#39;s no realistic way to run it on the Micro:Bit.</li> 
    <li><a href="https://en.wikipedia.org/wiki/Lazy_loading">Lazy Loading</a>: Only calculate things when you&#39;re absolutely sure the result will get used. This is a good general principle to look out for in any project, and helps reduce wasted CPU time.</li>`,Ee=n(),Q=s("p"),Q.innerHTML=`In the performance profiler, you may see that your program spends a lot of time doing *garbage collection* (GC).
    This happens when you use lots of memory in your program.
    High memory use means the JavaScript interpreter constantly has to pause execution and tidy up after you.
    If that is the case in your code, you should check out the <em>Memory</em> tab.`,Ue=n(),V=s("h3"),V.textContent="Memory",Ye=n(),X=s("p"),X.innerHTML=`The memory tab works just like the performance tab.
    First, select the <code>Allocation Sampling</code> profile, then hit <code>Start</code>.
    Your code will run much slower while the memory profiler is running, so let it run for a while before clicking to stop the recording.
    After giving it a few seconds to generate the report, it should look something like this:`,Fe=n(),ee=s("figure"),ee.innerHTML='<img src="/assets/blog/microbit-optimisation/memory.png" alt="Shows the memory tab in developer tools. There is a big list of different places that memory was allocated." title="Click an entry in the list to see more information about what is being saved in memory"/>',Ge=n(),te=s("p"),te.innerHTML=`The default view is <code>Summary</code> but you should change that to <code>Containment</code>.
    Then, click to open the <code>Window / &lt;your url&gt;</code> category.
    Here, you will see all of the memory allocated by your code.
    The amount of memory allocated is written in the far-right column, <code>Retained Size</code>.
    Just to the left of that, it says which line of code allocated the memory, e.g. <code>myCode.js:85</code> means line 85.
    Look for any of your methods near the top of the list - those are the ones that are using the most memory and need fixing.`,Oe=n(),oe=s("p"),oe.textContent="The following code is an example of a function with high memory use because it creates a new object each time it gets called:",Ne=n(),m(T.$$.fragment),Ze=n(),ie=s("p"),ie.innerHTML=`To reduce the memory use of a function like that, try removing any object creation and instead store the result in a global variable.
    In our case, we could use two global variables, <code>minResult</code> and <code>maxResult</code>:`,Ke=n(),m(k.$$.fragment),Qe=n(),ne=s("p"),ne.textContent="Alternatively, you could create one object in a global variable and simply mutate its properties, like this:",Ve=n(),m(v.$$.fragment),Xe=n(),se=s("p"),se.textContent=`Using the profiler, you should be able to incrementally improve your code, focusing on the parts that need it most.
    That incremental approach lets you optimise as little of your code as possible, while still seeing positive results overall.`,et=n(),le=s("h2"),le.textContent="Conclusion",tt=n(),re=s("p"),re.textContent=`A profiler is a great way to start intelligently optimising your code.
    They help you focus your efforts on the areas that would benefit most from being optimised.
    Since optimisation usually makes your code harder to read and maintain, it's important to only optimise those 'hot spots'.`,ot=n(),ae=s("p"),ae.textContent="Hopefully, with the help of a profiler, you'll be able to take your Micro:Bit code to new heights!",it=n(),nt=s("hr"),st=n(),ue=s("p"),ue.innerHTML='If you&#39;re interested in reading more about how profilers can be used to optimise code, check out one of my older blog posts <a href="/minesweeper-optimisation">Slow Code HATES him! Optimising a web app from 1 to 60fps</a>.'},m(e,t){o(e,l,t),o(e,a,t),o(e,r,t),o(e,u,t),o(e,p,t),o(e,fe,t),o(e,C,t),o(e,de,t),o(e,$,t),o(e,ce,t),o(e,x,t),o(e,he,t),o(e,I,t),o(e,ye,t),o(e,H,t),o(e,be,t),o(e,B,t),o(e,we,t),o(e,L,t),o(e,Te,t),f(y,e,t),o(e,ke,t),o(e,S,t),o(e,ve,t),o(e,P,t),o(e,ge,t),f(b,e,t),o(e,Me,t),o(e,_,t),o(e,Ce,t),f(w,e,t),o(e,$e,t),o(e,A,t),o(e,xe,t),o(e,j,t),o(e,Ie,t),o(e,R,t),o(e,He,t),o(e,q,t),o(e,Be,t),o(e,W,t),o(e,Le,t),o(e,J,t),o(e,Se,t),o(e,D,t),o(e,Pe,t),o(e,z,t),o(e,_e,t),o(e,E,t),o(e,Ae,t),o(e,U,t),o(e,je,t),o(e,Y,t),o(e,Re,t),o(e,F,t),o(e,qe,t),o(e,G,t),o(e,We,t),o(e,O,t),o(e,Je,t),o(e,N,t),o(e,De,t),o(e,Z,t),o(e,ze,t),o(e,K,t),o(e,Ee,t),o(e,Q,t),o(e,Ue,t),o(e,V,t),o(e,Ye,t),o(e,X,t),o(e,Fe,t),o(e,ee,t),o(e,Ge,t),o(e,te,t),o(e,Oe,t),o(e,oe,t),o(e,Ne,t),f(T,e,t),o(e,Ze,t),o(e,ie,t),o(e,Ke,t),f(k,e,t),o(e,Qe,t),o(e,ne,t),o(e,Ve,t),f(v,e,t),o(e,Xe,t),o(e,se,t),o(e,et,t),o(e,le,t),o(e,tt,t),o(e,re,t),o(e,ot,t),o(e,ae,t),o(e,it,t),o(e,nt,t),o(e,st,t),o(e,ue,t),pe=!0},p:ut,i(e){pe||(d(y.$$.fragment,e),d(b.$$.fragment,e),d(w.$$.fragment,e),d(T.$$.fragment,e),d(k.$$.fragment,e),d(v.$$.fragment,e),pe=!0)},o(e){c(y.$$.fragment,e),c(b.$$.fragment,e),c(w.$$.fragment,e),c(T.$$.fragment,e),c(k.$$.fragment,e),c(v.$$.fragment,e),pe=!1},d(e){e&&i(l),e&&i(a),e&&i(r),e&&i(u),e&&i(p),e&&i(fe),e&&i(C),e&&i(de),e&&i($),e&&i(ce),e&&i(x),e&&i(he),e&&i(I),e&&i(ye),e&&i(H),e&&i(be),e&&i(B),e&&i(we),e&&i(L),e&&i(Te),h(y,e),e&&i(ke),e&&i(S),e&&i(ve),e&&i(P),e&&i(ge),h(b,e),e&&i(Me),e&&i(_),e&&i(Ce),h(w,e),e&&i($e),e&&i(A),e&&i(xe),e&&i(j),e&&i(Ie),e&&i(R),e&&i(He),e&&i(q),e&&i(Be),e&&i(W),e&&i(Le),e&&i(J),e&&i(Se),e&&i(D),e&&i(Pe),e&&i(z),e&&i(_e),e&&i(E),e&&i(Ae),e&&i(U),e&&i(je),e&&i(Y),e&&i(Re),e&&i(F),e&&i(qe),e&&i(G),e&&i(We),e&&i(O),e&&i(Je),e&&i(N),e&&i(De),e&&i(Z),e&&i(ze),e&&i(K),e&&i(Ee),e&&i(Q),e&&i(Ue),e&&i(V),e&&i(Ye),e&&i(X),e&&i(Fe),e&&i(ee),e&&i(Ge),e&&i(te),e&&i(Oe),e&&i(oe),e&&i(Ne),h(T,e),e&&i(Ze),e&&i(ie),e&&i(Ke),h(k,e),e&&i(Qe),e&&i(ne),e&&i(Ve),h(v,e),e&&i(Xe),e&&i(se),e&&i(et),e&&i(le),e&&i(tt),e&&i(re),e&&i(ot),e&&i(ae),e&&i(it),e&&i(nt),e&&i(st),e&&i(ue)}}}function wt(me){let l,a;return l=new pt({props:{id:"microbit-optimisation",$$slots:{default:[bt]},$$scope:{ctx:me}}}),{c(){m(l.$$.fragment)},m(r,u){f(l,r,u),a=!0},p(r,[u]){const p={};u&1&&(p.$$scope={dirty:u,ctx:r}),l.$set(p)},i(r){a||(d(l.$$.fragment,r),a=!0)},o(r){c(l.$$.fragment,r),a=!1},d(r){h(l,r)}}}class Mt extends lt{constructor(l){super();rt(this,l,null,wt,at,{})}}export{Mt as default};

import{S as B,i as D,s as j,q as G,r as R,m as C,k as L,w as W,e as r,g as l,b as F,c as o,F as P,f as s}from"../../chunks/vendor-b123dbec.js";import{B as z}from"../../chunks/BlogPost-fb5b6ef4.js";import{S}from"../../chunks/Snippet-0180392a.js";import"../../chunks/Template-7e2d3e9c.js";const U={name:"core.ts",language:"ts",snippet:`
  function centralMethodUsedEverywhere(opt: Options) {
      // TODO IMPORTANT: add validations for all options

      /* ... */
  }

  /*
  > git blame
  > 3176a8d9611 frontend/core.ts  (steven waterman   2019-02-21 11:35:33 +0000    2)
  */
  `},J={name:"nomerge.yml",language:"yaml",snippet:`
  name: "Check for NoMerge comments"

concurrency:
  group: nomerge-\${{ github.ref }}
  cancel-in-progress: true

on:
  pull_request:
    types:
      - synchronize
      - opened
      - reopened
      - labeled

jobs:
  search:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      # Way faster than grep
      - run: sudo apt install silversearcher-ag
      # Fail whenever it finds 'NoMerge' case-insensitive
      # Ignore the .git folder
      # Ignore this file
      # Look in .github .husky etc but not ../
      # This also listens to .gitignore etc
      - run: "! ag -i --ignore=git --ignore=nomerge.yml NoMerge .[^.]* ."
`};var A={ignoredTodo:U,actions:J};function K($){let n,a,i,p,m,I,u,M,d,T,b,E,f,_,y,k,g,O,h,N,v,H,q,x,c,w;return u=new S({props:{config:A.ignoredTodo}}),f=new S({props:{config:A.actions}}),{c(){n=r("p"),n.textContent=`How many times have you left a console log in prod? Do you ever forget what you still need to do
		before releasing some code? How often do you comment something out and forget to re-add it
		before releasing?`,a=l(),i=r("p"),i.textContent=`For me, constantly. Hopefully it's pretty common for you too. This blog post won't be very
		popular if it turns out that I'm the only one.`,p=l(),m=r("p"),m.innerHTML=`At TalkJS we solved it with <code>NOMERGE</code> comments. Think of them like <code>TODO</code>s
		you can&#39;t forget. Because I think we&#39;ve all experienced this:`,I=l(),G(u.$$.fragment),M=l(),d=r("h2"),d.textContent="How?",T=l(),b=r("p"),b.innerHTML=`We use GitHub actions for CI. It was as simple as adding a new job which greps the codebase for
		<code>NOMERGE</code>. If found, the CI job will fail, making it clear that there&#39;s something
		that you forgot to do.`,E=l(),G(f.$$.fragment),_=l(),y=r("h2"),y.textContent="Why?",k=l(),g=r("p"),g.innerHTML=`I use nomerge comments any time there&#39;s something that <strong>must</strong> happen before the code
		is released:`,O=l(),h=r("ul"),h.innerHTML=`<li class="svelte-1t6539q">To track the things I haven&#39;t implemented yet:<br/><code>// NOMERGE add pagination support</code></li> 

		<li class="svelte-1t6539q">To stop myself from committing my debug logs:<br/><code>console.log(&quot;NOMERGE batching ran&quot;)</code></li> 

		<li class="svelte-1t6539q">When deliberately breaking things to reproduce bugs:<br/><code>// NOMERGE this terminates the connection whenever immediately</code></li> 

		<li class="svelte-1t6539q">When doing dangerous things to make experimentation easier:<br/><code>// NOMERGE this means we don&#39;t verify auth tokens</code></li> 

		<li class="svelte-1t6539q">When I&#39;m deep in flow but have a concerning thought:<br/><code>// NOMERGE I think these events could happen out of order</code></li> 

		<li class="svelte-1t6539q">When reviewing big PRs and GitHub&#39;s UI is too clunky:<br/><code>// NOMERGE Does this code ever run?</code></li>`,N=l(),v=r("p"),v.innerHTML=`There are better ways to prevent some of these issues. Linting can catch a stray <code>console.log</code>, and your tests could catch a deliberately-broken class. But they&#39;re not perfect, and I&#39;ve
		found NOMERGE to be incredibly useful and versatile.`,H=l(),q=r("hr"),x=l(),c=r("p"),c.innerHTML=`Also, I can&#39;t believe it&#39;s been over a year since I last posted. Apparently my last post was <a href="/burden-deliberate-choice/">a depressing mologue about how overwhelming society is, and how I wanted to become a medieval
			shepherd</a>. Things are better. I got therapy. I&#39;ll update at some point. I have exciting shepherd
		thoughts.`,F(c,"font-size","0.8em")},m(e,t){o(e,n,t),o(e,a,t),o(e,i,t),o(e,p,t),o(e,m,t),o(e,I,t),R(u,e,t),o(e,M,t),o(e,d,t),o(e,T,t),o(e,b,t),o(e,E,t),R(f,e,t),o(e,_,t),o(e,y,t),o(e,k,t),o(e,g,t),o(e,O,t),o(e,h,t),o(e,N,t),o(e,v,t),o(e,H,t),o(e,q,t),o(e,x,t),o(e,c,t),w=!0},p:P,i(e){w||(C(u.$$.fragment,e),C(f.$$.fragment,e),w=!0)},o(e){L(u.$$.fragment,e),L(f.$$.fragment,e),w=!1},d(e){e&&s(n),e&&s(a),e&&s(i),e&&s(p),e&&s(m),e&&s(I),W(u,e),e&&s(M),e&&s(d),e&&s(T),e&&s(b),e&&s(E),W(f,e),e&&s(_),e&&s(y),e&&s(k),e&&s(g),e&&s(O),e&&s(h),e&&s(N),e&&s(v),e&&s(H),e&&s(q),e&&s(x),e&&s(c)}}}function Q($){let n,a;return n=new z({props:{id:"nomerge-comments",$$slots:{default:[K]},$$scope:{ctx:$}}}),{c(){G(n.$$.fragment)},m(i,p){R(n,i,p),a=!0},p(i,[p]){const m={};p&1&&(m.$$scope={dirty:p,ctx:i}),n.$set(m)},i(i){a||(C(n.$$.fragment,i),a=!0)},o(i){L(n.$$.fragment,i),a=!1},d(i){W(n,i)}}}class ee extends B{constructor(n){super();D(this,n,null,Q,j,{})}}export{ee as default};

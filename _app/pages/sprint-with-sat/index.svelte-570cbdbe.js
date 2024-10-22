import{S as re,i as ae,s as ue,q as pe,r as fe,m as me,k as ce,w as be,e as s,g as d,c as o,f as i}from"../../chunks/vendor-b123dbec.js";import{B as he}from"../../chunks/BlogPost-fb5b6ef4.js";import"../../chunks/Template-7e2d3e9c.js";function we(at){let l,r,n,a,u,ut,p,pt,f,ft,m,mt,c,ct,b,bt,h,ht,w,wt,k,kt,v,vt,y,yt,T,Tt,x,xt,A,At,S,St,M,Mt,H,Ht,L,Lt,C,Ct,I,It,_,_t,q,qt,P,Pt,W,Wt,$,$t,F,Ft,j,jt,R,Rt,X,Xt,O,Ot,U,Ut,V,Vt,D,Dt,E,Et,Y,Yt,B,Bt,G,Gt,N,Nt,z,zt,J,Jt,K,Kt,Z,Zt,Q,Qt,g,gt,tt,te,et,ee,ot,oe,it,ie,st,se,dt,de,lt,le,nt,ne,rt;return{c(){l=s("p"),l.innerHTML=`While researching <a href="https://github.com/stevenwaterman/Minesweeper-Constrained">constraint-based minesweeper solvers</a>, I discovered that <a href="https://pwmarcz.pl/blog/kaboom/">many others</a> had utilised SAT solvers in their algorithms.
    I had some exposure to SAT solvers in university, but this was the first time I saw them used in the wild.
    Around the same time, I was thinking back to a painful sprint planning meeting during our Scott Logic Grad Project.
    Could I use a SAT solver to improve our sprint planning meetings in future?`,r=d(),n=s("p"),n.innerHTML='The full solver code is <a href="https://github.com/stevenwaterman/sprint-sat">available on GitHub</a>.',a=d(),u=s("h2"),u.innerHTML="A <em>what</em> solver?",ut=d(),p=s("p"),p.innerHTML=`SAT solvers are programs which solve the <a href="https://en.wikipedia.org/wiki/Boolean_satisfiability_problem">boolean satisfiability problem</a> (aka SAT).
    Since boolean satisfiability is <a href="https://xlinux.nist.gov/dads/HTML/npcomplete.html">NP-Complete</a>, a SAT solver can be used to solve almost anything.
    In the worst case, they still take <a href="https://en.wikipedia.org/wiki/Time_complexity#Exponential_time">exponential time</a>, but they are <a href="https://codingnest.com/modern-sat-solvers-fast-neat-underused-part-1-of-n/">surprisingly fast for everyday use</a>.`,pt=d(),f=s("p"),f.innerHTML=`To apply a SAT solver to a real-life problem, we need to translate it into a form our solver can understand.
    SAT problems come in the form: <code>Set each variable {a,b,c} to 0 or 1 such that:</code>`,ft=d(),m=s("blockquote"),m.innerHTML=`Set each variable <code>{a,b,c}</code> to <code>0</code> or <code>1</code> such that:

    <ul><li><code>a = 1</code> or <code>c = 1</code></li> 
      <li><code>a = 0</code> or <code>b = 0</code> or <code>c = 0</code></li> 
      <li><code>b = 0</code> or <code>c = 1</code></li></ul>`,mt=d(),c=s("p"),c.innerHTML=`There are many solvers available online, but I chose the <a href="https://www.sat4j.org/">SAT4J</a> Java library.
    It provides two extra features that were invaluable:`,ct=d(),b=s("ul"),b.innerHTML=`<li><a href="https://www.cs.cmu.edu/afs/cs/project/jair/pub/volume21/dixon04a-html/node14.html"><strong>Pseudo-boolean constraints</strong></a> let you add constraints in the form <code>Xa + Yb + Zc is at least/at most/exactly K</code> for given integers <code>{K,X,Y,Z}</code>.</li> 
    <li><a href="https://en.wikipedia.org/wiki/Maximum_satisfiability_problem#Weighted_MAX-SAT"><strong>Weighted MAX-SAT</strong></a> computes the <code>value</code> of each solution and picks the one with highest value. The value is computed using a function of the form <code>Ra + Sb + Tc</code> given nonnegative integers <code>{R,S,T}</code>.</li>`,bt=d(),h=s("h2"),h.textContent="Applying MAX-SAT to sprint planning",ht=d(),w=s("p"),w.innerHTML=`In Scrum, <a href="https://www.agilealliance.org/glossary/sprint-planning/">sprint planning</a> meetings involve deciding which work from the product backlog to perform in the next sprint.
    The product team estimates the amount of work required for each user story.
    The Product Owner decides which user stories are highest priority based on the amount of value delivered to the client.
    They work together to decide how to maximise the amount of value created in the sprint.`,wt=d(),k=s("p"),k.textContent="It can be difficult to translate problems into MAX-SAT, but this one seems trivial:",kt=d(),v=s("ol"),v.innerHTML=`<li>Create a variable for each user story. If a variable is set to <code>1</code>, it is included in the next sprint</li> 
    <li>Estimate the work of each story <code>e(x)</code>, in <a href="https://www.mountaingoatsoftware.com/blog/what-are-story-points">Story Points</a></li> 
    <li>Estimate the value of each story <code>v(x)</code>, in &#39;Value Points&#39;</li> 
    <li>Constrain the total amount of work to be no more than the story point budget. This is a pseudo-boolean constraint in the form <code>e(a)*a + e(b)*b + ... &lt;= budget</code></li> 
    <li>Maximise the function <code>v(a)*a + v(b)*b + ...</code></li>`,vt=d(),y=s("p"),y.textContent=`Value Points (which I just made up) and Story Points are arbitrary scales and each team can decide how to use them.
    The only requirement is proportionality - on either scale, three 1 point tasks should equal one 3 point task.`,yt=d(),T=s("h2"),T.textContent="Reality is complicated",Tt=d(),x=s("p"),x.textContent=`For the rest of the article, I'll be referring to a real (slightly adjusted) sprint planning meeting.
    We had 5 user stories:`,xt=d(),A=s("ul"),A.innerHTML=`<li>As a user, I want to be able to log in and read posts</li> 
    <li>As a user, I want to be able to sign up</li> 
    <li>As an author, I want my name to appear on all my posts</li> 
    <li>As an author, I want to be able to delete my posts</li> 
    <li>As an admin, I want to be able to register authors</li>`,At=d(),S=s("p"),S.innerHTML="Deciding <code>e(x)</code> for each of these stories was easy at first:",St=d(),M=s("blockquote"),M.textContent="The login task is quite big because we'll need an authentication framework, let's call it a 3",Mt=d(),H=s("blockquote"),H.textContent="The sign-up task is even bigger than that! The UX alone makes it into a 5",Ht=d(),L=s("blockquote"),L.textContent="Wait... it's only a 5 if we haven't done login yet - otherwise it's only a 3",Lt=d(),C=s("p"),C.textContent="In the end, the real estimates looked like this, where the final cost depended on which other tasks were in the sprint:",Ct=d(),I=s("ul"),I.innerHTML=`<li><code>User Login</code>: 1-3</li> 
    <li><code>User Signup</code>: 3-5</li> 
    <li><code>Author Names</code>: 1-6</li> 
    <li><code>Author Delete</code>: 2-7</li> 
    <li><code>Register Authors</code>: 2-6</li>`,It=d(),_=s("p"),_.textContent=`I was going to include the full list of dependencies, but it was too long.
    Instead, I created a dependency graph for you, which will make it much clearer:`,_t=d(),q=s("figure"),q.innerHTML='<img src="/assets/blog/sprint-with-sat/header.png" title="How our stories affect each other" alt="The graph is just a deliberately incomprehensible mess of lines."/>',qt=d(),P=s("p"),P.textContent="...Nope.",Pt=d(),W=s("p"),W.textContent=`If the development team can't decide a single number for each user story, we can't program our solver.
    It's useless!`,Wt=d(),$=s("h2"),$.textContent="Circular Dependencies",$t=d(),F=s("p"),F.innerHTML=`The dependencies between our stories are circular.
    They&#39;re not <em>hard</em> dependencies, but they affect the estimate for the task.
    That makes it impossible to give a single estimate for a given task, as we don&#39;t know what other work will be in the sprint.`,Ft=d(),j=s("p"),j.textContent=`The real issue is that we're being implicit about the tech tasks.
    These tasks don't provide value to the user, but user stories depend on them being done, and they still take effort.
    For example, the login and signup stories both depend on an authentication framework being added.`,jt=d(),R=s("h2"),R.textContent="Solving the Problem",Rt=d(),X=s("p"),X.innerHTML=`We need to separate tasks into two categories: <em>tech</em>  <em>story</em>.
    Tech tasks don&#39;t directly provide any value to the client, so they should only be completed to unblock a user story.
    This means that all our soft dependencies become hard dependencies.
    However, it also breaks the circular dependencies, solving our issue.`,Xt=d(),O=s("p"),O.textContent="In the case of login and signup, you end up with this:",Ot=d(),U=s("ul"),U.innerHTML=`<li>(Tech) <code>Framework</code>: 2</li> 
    <li>(Story) <code>Login</code>: 1 (requires <code>Framework</code>)</li> 
    <li>(Story) <code>Signup</code>: 3 (requires <code>Framework</code>)</li>`,Ut=d(),V=s("p"),V.innerHTML=`The total cost of <code>Login</code> is 3, as before.
    In the process of completing <code>Login</code>, we completed <code>Framework</code>, meaning <code>Signup</code> is unblocked and will only cost 3.
    After extracting any tech tasks, and asking the PO to estimate the value of each user story, our final task list looks like this:`,Vt=d(),D=s("figure"),D.innerHTML=`<table><thead><tr><th><strong>ID</strong></th> 
          <th><strong>Task</strong></th> 
          <th><strong>Estimate</strong></th> 
          <th><strong>Value</strong></th> 
          <th><strong>Requires</strong></th></tr></thead> 
      <tbody><tr><td>a</td> 
          <td>Auth Framework</td> 
          <td>2</td> 
          <td>0</td> 
          <td></td></tr> 

        <tr><td>b</td> 
          <td>User Login</td> 
          <td>1</td> 
          <td>3</td> 
          <td></td></tr> 

        <tr><td>c</td> 
          <td>User Signup</td> 
          <td>3</td> 
          <td>1</td> 
          <td>a</td></tr> 

        <tr><td>d</td> 
          <td>Role-Level Auth</td> 
          <td>2</td> 
          <td>0</td> 
          <td>a</td></tr> 

        <tr><td>e</td> 
          <td>Store Author</td> 
          <td>1</td> 
          <td>0</td> 
          <td>a</td></tr> 

        <tr><td>f</td> 
          <td>Register Authors</td> 
          <td>2</td> 
          <td>1</td> 
          <td>d</td></tr> 

        <tr><td>g</td> 
          <td>Author Names</td> 
          <td>1</td> 
          <td>2</td> 
          <td>d e</td></tr> 

        <tr><td>h</td> 
          <td>Author Delete</td> 
          <td>2</td> 
          <td>2</td> 
          <td>d e</td></tr></tbody></table>`,Dt=d(),E=s("p"),E.textContent="When graphing the dependencies, you can see that the situation is much simpler:",Et=d(),Y=s("figure"),Y.innerHTML='<img src="/assets/blog/sprint-with-sat/stories-clean.png" title="We can remove the circular dependencies by adding more tasks" alt="The graph is much neater and has no circular dependencies."/>',Yt=d(),B=s("h2"),B.textContent="Updating the Solver",Bt=d(),G=s("p"),G.textContent=`Our first version of the solver didn't handle blocked tasks, and we assumed that any task could be chosen regardless of the other tasks in the sprint.
    We need to stop the solver from creating sprints where we do tasks without their dependencies.`,Gt=d(),N=s("p"),N.innerHTML=`In mathematical terms, if we have tasks <code>a</code> and <code>b</code>, where <code>b</code> depends on <code>a</code>, we can say <code>b implies a</code>.
    If <code>b</code> is included in the sprint, we know that <code>a</code> must also be included to satisfy the <code>b</code>&#39;s dependency on <code>a</code>.
    This is the same as <code>(a and b) or (not b)</code>, which simplifies to <code>a or not b</code>.`,Nt=d(),z=s("p"),z.innerHTML=`Thankfully, <code>a or not b</code> is a constraint that our SAT solver can understand!
    For each dependency, we can add that constraint.
    For the backlog described previously, our final SAT problem is:`,zt=d(),J=s("ul"),J.innerHTML=`<li>Given variables <code>{a,b,...,h}</code></li> 
    <li>Maximise <code>3a + c + f + 2g + 2h</code> such that:</li> 
    <ul><li><code>2a + b + 3c + 2d + e + 2f + g + 2h &lt;= budget</code></li> 
      <li><code>a || !b</code>, <code>a || !c</code>, <code>a || !d</code>, <code>a || !e</code></li> 
      <li><code>d || !f</code>, <code>d || !g</code>, <code>d || !h</code></li> 
      <li><code>e || !g</code>, <code>e || !h</code></li></ul>`,Jt=d(),K=s("h2"),K.textContent="Is it useful?",Kt=d(),Z=s("p"),Z.textContent=`It could be.
    It's not going to replace your Product Owner, but there's a lot of benefits:`,Zt=d(),Q=s("ul"),Q.innerHTML=`<li>Guaranteed to find the optimal solution</li> 
    <li>Very fast, taking a few milliseconds for our tasks</li> 
    <li>Allows for quick experimentation:</li> 
    <ul><li>If we budget 8 points, we only use 7. What if we commit to 9 points?</li> 
      <li>What happens if we estimate this story as a 3?</li> 
      <li>The client suddenly values task <code>c</code> as a 3. What should change in the sprint?</li></ul>`,Qt=d(),g=s("p"),g.textContent=`We can even run the solver for all possible budgets to quickly see the options.
    The total time to run 14 instances of the problem was 250ms.
    That time includes set-up and outputting a table similar to this one:`,gt=d(),tt=s("figure"),tt.innerHTML=`<table><thead><tr><th><strong>Budget</strong></th> 
          <th><code>b</code></th> 
          <th><code>c</code></th> 
          <th><code>f</code></th> 
          <th><code>g</code></th> 
          <th><code>h</code></th> 
          <th><strong>Cost</strong></th> 
          <th><strong>Value</strong></th></tr></thead> 
      <tbody><tr><td>1</td> 
          <td></td> 
          <td></td> 
          <td></td> 
          <td></td> 
          <td></td> 
          <td>0</td> 
          <td>0</td></tr> 

        <tr><td>2</td> 
          <td></td> 
          <td></td> 
          <td></td> 
          <td></td> 
          <td></td> 
          <td>0</td> 
          <td>0</td></tr> 

        <tr><td>3</td> 
          <td>\u2714</td> 
          <td></td> 
          <td></td> 
          <td></td> 
          <td></td> 
          <td>3</td> 
          <td>3</td></tr> 

        <tr><td>4</td> 
          <td>\u2714</td> 
          <td></td> 
          <td></td> 
          <td></td> 
          <td></td> 
          <td>3</td> 
          <td>3</td></tr> 

        <tr><td>5</td> 
          <td>\u2714</td> 
          <td></td> 
          <td></td> 
          <td></td> 
          <td></td> 
          <td>3</td> 
          <td>3</td></tr> 

        <tr><td>6</td> 
          <td>\u2714</td> 
          <td>\u2714</td> 
          <td></td> 
          <td></td> 
          <td></td> 
          <td>6</td> 
          <td>4</td></tr> 

        <tr><td>7</td> 
          <td>\u2714</td> 
          <td></td> 
          <td></td> 
          <td>\u2714</td> 
          <td></td> 
          <td>7</td> 
          <td>5</td></tr> 

        <tr><td>8</td> 
          <td>\u2714</td> 
          <td></td> 
          <td></td> 
          <td>\u2714</td> 
          <td></td> 
          <td>7</td> 
          <td>5</td></tr> 

        <tr><td>9</td> 
          <td>\u2714</td> 
          <td></td> 
          <td></td> 
          <td>\u2714</td> 
          <td>\u2714</td> 
          <td>9</td> 
          <td>7</td></tr> 

        <tr><td>10</td> 
          <td>\u2714</td> 
          <td></td> 
          <td></td> 
          <td>\u2714</td> 
          <td>\u2714</td> 
          <td>9</td> 
          <td>7</td></tr> 

        <tr><td>11</td> 
          <td>\u2714</td> 
          <td></td> 
          <td>\u2714</td> 
          <td>\u2714</td> 
          <td>\u2714</td> 
          <td>11</td> 
          <td>8</td></tr> 

        <tr><td>12</td> 
          <td>\u2714</td> 
          <td>\u2714</td> 
          <td></td> 
          <td>\u2714</td> 
          <td>\u2714</td> 
          <td>12</td> 
          <td>8</td></tr> 

        <tr><td>13</td> 
          <td>\u2714</td> 
          <td>\u2714</td> 
          <td></td> 
          <td>\u2714</td> 
          <td>\u2714</td> 
          <td>12</td> 
          <td>8</td></tr> 

        <tr><td>14</td> 
          <td>\u2714</td> 
          <td>\u2714</td> 
          <td>\u2714</td> 
          <td>\u2714</td> 
          <td>\u2714</td> 
          <td>14</td> 
          <td>9</td></tr></tbody></table>`,te=d(),et=s("p"),et.innerHTML=`However, it&#39;s not all good.
    Our solver doesn&#39;t help with the hardest part of sprint planning - estimating the size and value of each task.
    Additionally, the sprints it creates aren&#39;t very cohesive.
    They are more like a collection of unrelated tasks.
    When all the tasks in a sprint work towards a single <a href="https://www.visual-paradigm.com/scrum/write-sprint-goal/">sprint goal</a>, developers can better support each other, and clients can give more relevant feedback.`,ee=d(),ot=s("p"),ot.textContent=`This issue is like the circular dependencies we saw before.
    Tasks provide more value when other similar tasks are also included in the sprint.
    However, our solver does not support a dynamic value function, so we'll just have to keep using humans for now.`,oe=d(),it=s("p"),it.textContent=`Also, it's important to remember that SAT has exponential time complexity.
    As we add more tasks, it gets slow.
    Very slow:`,ie=d(),st=s("figure"),st.innerHTML='<img src="/assets/blog/sprint-with-sat/exponential.png" title="How long does it take to run the solver for a given number of tasks" alt="The time taken to compute the optimal is exponential. For 10 tasks, it takes millisenconds. For 100, it can take minutes. For 150, it can take over an hour."/>',se=d(),dt=s("p"),dt.innerHTML=`It might be best to keep your backlog small.
    If we extrapolate to 300 tasks on the backlog, we get a predicted runtime of <strong>600,000 years</strong>.
    Your sprint will probably be done by then...`,de=d(),lt=s("h2"),lt.textContent="Conclusion",le=d(),nt=s("p"),nt.textContent=`Your Sprint Planning meetings are still valuable, and so is your Product Owner.
    You should probably keep both.
    However, there are still a few lessons we can learn:`,ne=d(),rt=s("ul"),rt.innerHTML=`<li>SAT solvers are useful and surprisingly easy to use</li> 
    <li>The &#39;optimal&#39; sprint might not be the best one</li> 
    <li>Exponential time is still exponential, even when it&#39;s fast</li>`},m(t,e){o(t,l,e),o(t,r,e),o(t,n,e),o(t,a,e),o(t,u,e),o(t,ut,e),o(t,p,e),o(t,pt,e),o(t,f,e),o(t,ft,e),o(t,m,e),o(t,mt,e),o(t,c,e),o(t,ct,e),o(t,b,e),o(t,bt,e),o(t,h,e),o(t,ht,e),o(t,w,e),o(t,wt,e),o(t,k,e),o(t,kt,e),o(t,v,e),o(t,vt,e),o(t,y,e),o(t,yt,e),o(t,T,e),o(t,Tt,e),o(t,x,e),o(t,xt,e),o(t,A,e),o(t,At,e),o(t,S,e),o(t,St,e),o(t,M,e),o(t,Mt,e),o(t,H,e),o(t,Ht,e),o(t,L,e),o(t,Lt,e),o(t,C,e),o(t,Ct,e),o(t,I,e),o(t,It,e),o(t,_,e),o(t,_t,e),o(t,q,e),o(t,qt,e),o(t,P,e),o(t,Pt,e),o(t,W,e),o(t,Wt,e),o(t,$,e),o(t,$t,e),o(t,F,e),o(t,Ft,e),o(t,j,e),o(t,jt,e),o(t,R,e),o(t,Rt,e),o(t,X,e),o(t,Xt,e),o(t,O,e),o(t,Ot,e),o(t,U,e),o(t,Ut,e),o(t,V,e),o(t,Vt,e),o(t,D,e),o(t,Dt,e),o(t,E,e),o(t,Et,e),o(t,Y,e),o(t,Yt,e),o(t,B,e),o(t,Bt,e),o(t,G,e),o(t,Gt,e),o(t,N,e),o(t,Nt,e),o(t,z,e),o(t,zt,e),o(t,J,e),o(t,Jt,e),o(t,K,e),o(t,Kt,e),o(t,Z,e),o(t,Zt,e),o(t,Q,e),o(t,Qt,e),o(t,g,e),o(t,gt,e),o(t,tt,e),o(t,te,e),o(t,et,e),o(t,ee,e),o(t,ot,e),o(t,oe,e),o(t,it,e),o(t,ie,e),o(t,st,e),o(t,se,e),o(t,dt,e),o(t,de,e),o(t,lt,e),o(t,le,e),o(t,nt,e),o(t,ne,e),o(t,rt,e)},d(t){t&&i(l),t&&i(r),t&&i(n),t&&i(a),t&&i(u),t&&i(ut),t&&i(p),t&&i(pt),t&&i(f),t&&i(ft),t&&i(m),t&&i(mt),t&&i(c),t&&i(ct),t&&i(b),t&&i(bt),t&&i(h),t&&i(ht),t&&i(w),t&&i(wt),t&&i(k),t&&i(kt),t&&i(v),t&&i(vt),t&&i(y),t&&i(yt),t&&i(T),t&&i(Tt),t&&i(x),t&&i(xt),t&&i(A),t&&i(At),t&&i(S),t&&i(St),t&&i(M),t&&i(Mt),t&&i(H),t&&i(Ht),t&&i(L),t&&i(Lt),t&&i(C),t&&i(Ct),t&&i(I),t&&i(It),t&&i(_),t&&i(_t),t&&i(q),t&&i(qt),t&&i(P),t&&i(Pt),t&&i(W),t&&i(Wt),t&&i($),t&&i($t),t&&i(F),t&&i(Ft),t&&i(j),t&&i(jt),t&&i(R),t&&i(Rt),t&&i(X),t&&i(Xt),t&&i(O),t&&i(Ot),t&&i(U),t&&i(Ut),t&&i(V),t&&i(Vt),t&&i(D),t&&i(Dt),t&&i(E),t&&i(Et),t&&i(Y),t&&i(Yt),t&&i(B),t&&i(Bt),t&&i(G),t&&i(Gt),t&&i(N),t&&i(Nt),t&&i(z),t&&i(zt),t&&i(J),t&&i(Jt),t&&i(K),t&&i(Kt),t&&i(Z),t&&i(Zt),t&&i(Q),t&&i(Qt),t&&i(g),t&&i(gt),t&&i(tt),t&&i(te),t&&i(et),t&&i(ee),t&&i(ot),t&&i(oe),t&&i(it),t&&i(ie),t&&i(st),t&&i(se),t&&i(dt),t&&i(de),t&&i(lt),t&&i(le),t&&i(nt),t&&i(ne),t&&i(rt)}}}function ke(at){let l,r;return l=new he({props:{id:"sprint-with-sat",$$slots:{default:[we]},$$scope:{ctx:at}}}),{c(){pe(l.$$.fragment)},m(n,a){fe(l,n,a),r=!0},p(n,[a]){const u={};a&1&&(u.$$scope={dirty:a,ctx:n}),l.$set(u)},i(n){r||(me(l.$$.fragment,n),r=!0)},o(n){ce(l.$$.fragment,n),r=!1},d(n){be(l,n)}}}class xe extends re{constructor(l){super();ae(this,l,null,ke,ue,{})}}export{xe as default};

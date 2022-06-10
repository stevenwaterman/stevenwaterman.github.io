<script lang="ts">
	import BlogPost from "$lib/blog/BlogPost.svelte";
</script>

<BlogPost id="sprint-with-sat">

  <p>
    While researching <a href="https://github.com/stevenwaterman/Minesweeper-Constrained">constraint-based minesweeper solvers</a>, I discovered that <a href="https://pwmarcz.pl/blog/kaboom/">many others</a> had utilised SAT solvers in their algorithms.
    I had some exposure to SAT solvers in university, but this was the first time I saw them used in the wild.
    Around the same time, I was thinking back to a painful sprint planning meeting during our Scott Logic Grad Project.
    Could I use a SAT solver to improve our sprint planning meetings in future?
  </p>

  <p>
    The full solver code is <a href="https://github.com/stevenwaterman/sprint-sat">available on GitHub</a>.
  </p>

  <h2>A <em>what</em> solver?</h2>

  <p>
    SAT solvers are programs which solve the <a href="https://en.wikipedia.org/wiki/Boolean_satisfiability_problem">boolean satisfiability problem</a> (aka SAT).
    Since boolean satisfiability is <a href="https://xlinux.nist.gov/dads/HTML/npcomplete.html">NP-Complete</a>, a SAT solver can be used to solve almost anything.
    In the worst case, they still take <a href="https://en.wikipedia.org/wiki/Time_complexity#Exponential_time">exponential time</a>, but they are <a href="https://codingnest.com/modern-sat-solvers-fast-neat-underused-part-1-of-n/">surprisingly fast for everyday use</a>.
  </p>

  <p>
    To apply a SAT solver to a real-life problem, we need to translate it into a form our solver can understand.
    SAT problems come in the form: <code>Set each variable &#123;a,b,c&#125; to 0 or 1 such that:</code>
  </p>

  <blockquote>
    Set each variable <code>&#123;a,b,c&#125;</code> to <code>0</code> or <code>1</code> such that:

    <ul>
      <li><code>a = 1</code> or <code>c = 1</code></li>
      <li><code>a = 0</code> or <code>b = 0</code> or <code>c = 0</code></li>
      <li><code>b = 0</code> or <code>c = 1</code></li>
    </ul>
  </blockquote>

  <p>
    There are many solvers available online, but I chose the <a href="https://www.sat4j.org/">SAT4J</a> Java library.
    It provides two extra features that were invaluable:
  </p>

  <ul>
    <li><a href="https://www.cs.cmu.edu/afs/cs/project/jair/pub/volume21/dixon04a-html/node14.html"><strong>Pseudo-boolean constraints</strong></a> let you add constraints in the form <code>Xa + Yb + Zc is at least/at most/exactly K</code> for given integers <code>&#123;K,X,Y,Z&#125;</code>.</li>
    <li><a href="https://en.wikipedia.org/wiki/Maximum_satisfiability_problem#Weighted_MAX-SAT"><strong>Weighted MAX-SAT</strong></a> computes the <code>value</code> of each solution and picks the one with highest value. The value is computed using a function of the form <code>Ra + Sb + Tc</code> given nonnegative integers <code>&#123;R,S,T&#125;</code>.</li>
  </ul>


  <h2>Applying MAX-SAT to sprint planning</h2>

  <p>
    In Scrum, <a href="https://www.agilealliance.org/glossary/sprint-planning/">sprint planning</a> meetings involve deciding which work from the product backlog to perform in the next sprint.
    The product team estimates the amount of work required for each user story.
    The Product Owner decides which user stories are highest priority based on the amount of value delivered to the client.
    They work together to decide how to maximise the amount of value created in the sprint.
  </p>

  <p>
    It can be difficult to translate problems into MAX-SAT, but this one seems trivial:
  </p>

  <ol>
    <li>Create a variable for each user story. If a variable is set to <code>1</code>, it is included in the next sprint</li>
    <li>Estimate the work of each story <code>e(x)</code>, in <a href="https://www.mountaingoatsoftware.com/blog/what-are-story-points">Story Points</a></li>
    <li>Estimate the value of each story <code>v(x)</code>, in 'Value Points'</li>
    <li>Constrain the total amount of work to be no more than the story point budget. This is a pseudo-boolean constraint in the form <code>e(a)*a + e(b)*b + ... &lt;= budget</code></li>
    <li>Maximise the function <code>v(a)*a + v(b)*b + ...</code></li>
  </ol>

  <p>
    Value Points (which I just made up) and Story Points are arbitrary scales and each team can decide how to use them.
    The only requirement is proportionality - on either scale, three 1 point tasks should equal one 3 point task.
  </p>

  <h2>Reality is complicated</h2>

  <p>
    For the rest of the article, I'll be referring to a real (slightly adjusted) sprint planning meeting.
    We had 5 user stories:
  </p>
  
  <ul>
    <li>As a user, I want to be able to log in and read posts</li>
    <li>As a user, I want to be able to sign up</li>
    <li>As an author, I want my name to appear on all my posts</li>
    <li>As an author, I want to be able to delete my posts</li>
    <li>As an admin, I want to be able to register authors</li>
  </ul>

  <p>
    Deciding <code>e(x)</code> for each of these stories was easy at first:
  </p>

  <blockquote>
    The login task is quite big because we'll need an authentication framework, let's call it a 3
  </blockquote>

  <blockquote>
    The sign-up task is even bigger than that! The UX alone makes it into a 5
  </blockquote>

  <blockquote>
    Wait... it's only a 5 if we haven't done login yet - otherwise it's only a 3
  </blockquote>

  <p>
    In the end, the real estimates looked like this, where the final cost depended on which other tasks were in the sprint:
  </p>

  <ul>
    <li><code>User Login</code>: 1-3</li>
    <li><code>User Signup</code>: 3-5</li>
    <li><code>Author Names</code>: 1-6</li>
    <li><code>Author Delete</code>: 2-7</li>
    <li><code>Register Authors</code>: 2-6</li>
  </ul>

  <p>
    I was going to include the full list of dependencies, but it was too long.
    Instead, I created a dependency graph for you, which will make it much clearer:
  </p>

  <figure>
    <img
      src="/assets/blog/sprint-with-sat/header.png"
      title="How our stories affect each other"
      alt="The graph is just a deliberately incomprehensible mess of lines."
    />
  </figure>

  <p>
    ...Nope.
  </p>

  <p>
    If the development team can't decide a single number for each user story, we can't program our solver.
    It's useless!
  </p>

  <h2>Circular Dependencies</h2>

  <p>
    The dependencies between our stories are circular.
    They're not <em>hard</em> dependencies, but they affect the estimate for the task.
    That makes it impossible to give a single estimate for a given task, as we don't know what other work will be in the sprint.
  </p>

  <p>
    The real issue is that we're being implicit about the tech tasks.
    These tasks don't provide value to the user, but user stories depend on them being done, and they still take effort.
    For example, the login and signup stories both depend on an authentication framework being added.
  </p>

  <h2>Solving the Problem</h2>

  <p>
    We need to separate tasks into two categories: <em>tech</em> <em>story</em>.
    Tech tasks don't directly provide any value to the client, so they should only be completed to unblock a user story.
    This means that all our soft dependencies become hard dependencies.
    However, it also breaks the circular dependencies, solving our issue.
  </p>

  <p>
    In the case of login and signup, you end up with this:
  </p>

  <ul>
    <li>(Tech) <code>Framework</code>: 2</li>
    <li>(Story) <code>Login</code>: 1 (requires <code>Framework</code>)</li>
    <li>(Story) <code>Signup</code>: 3 (requires <code>Framework</code>)</li>
  </ul>

  <p>
    The total cost of <code>Login</code> is 3, as before.
    In the process of completing <code>Login</code>, we completed <code>Framework</code>, meaning <code>Signup</code> is unblocked and will only cost 3.
    After extracting any tech tasks, and asking the PO to estimate the value of each user story, our final task list looks like this:
  </p>

  <figure>
    <table>
      <thead>
        <tr>
          <th><strong>ID</strong></th>
          <th><strong>Task</strong></th>
          <th><strong>Estimate</strong></th>
          <th><strong>Value</strong></th>
          <th><strong>Requires</strong></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>a</td>
          <td>Auth Framework</td>
          <td>2</td>
          <td>0</td>
          <td></td>
        </tr>

        <tr>
          <td>b</td>
          <td>User Login</td>
          <td>1</td>
          <td>3</td>
          <td></td>
        </tr>

        <tr>
          <td>c</td>
          <td>User Signup</td>
          <td>3</td>
          <td>1</td>
          <td>a</td>
        </tr>

        <tr>
          <td>d</td>
          <td>Role-Level Auth</td>
          <td>2</td>
          <td>0</td>
          <td>a</td>
        </tr>

        <tr>
          <td>e</td>
          <td>Store Author</td>
          <td>1</td>
          <td>0</td>
          <td>a</td>
        </tr>

        <tr>
          <td>f</td>
          <td>Register Authors</td>
          <td>2</td>
          <td>1</td>
          <td>d</td>
        </tr>

        <tr>
          <td>g</td>
          <td>Author Names</td>
          <td>1</td>
          <td>2</td>
          <td>d e</td>
        </tr>

        <tr>
          <td>h</td>
          <td>Author Delete</td>
          <td>2</td>
          <td>2</td>
          <td>d e</td>
        </tr>
      </tbody>
    </table>
  </figure>
  
  <p>
    When graphing the dependencies, you can see that the situation is much simpler:
  </p>

  <figure>
    <img
      src="/assets/blog/sprint-with-sat/stories-clean.png"
      title="We can remove the circular dependencies by adding more tasks"
      alt="The graph is much neater and has no circular dependencies."
    />
  </figure>

  <h2>Updating the Solver</h2>

  <p>
    Our first version of the solver didn't handle blocked tasks, and we assumed that any task could be chosen regardless of the other tasks in the sprint.
    We need to stop the solver from creating sprints where we do tasks without their dependencies.
  </p>

  <p>
    In mathematical terms, if we have tasks <code>a</code> and <code>b</code>, where <code>b</code> depends on <code>a</code>, we can say <code>b implies a</code>.
    If <code>b</code> is included in the sprint, we know that <code>a</code> must also be included to satisfy the <code>b</code>'s dependency on <code>a</code>.
    This is the same as <code>(a and b) or (not b)</code>, which simplifies to <code>a or not b</code>.
  </p>

  <p>
    Thankfully, <code>a or not b</code> is a constraint that our SAT solver can understand!
    For each dependency, we can add that constraint.
    For the backlog described previously, our final SAT problem is:
  </p>

  <ul>
    <li>Given variables <code>&#123;a,b,...,h&#125;</code></li>
    <li>Maximise <code>3a + c + f + 2g + 2h</code> such that:</li>
    <ul>
      <li><code>2a + b + 3c + 2d + e + 2f + g + 2h &lt;= budget</code></li>
      <li><code>a || !b</code>, <code>a || !c</code>, <code>a || !d</code>, <code>a || !e</code></li>
      <li><code>d || !f</code>, <code>d || !g</code>, <code>d || !h</code></li>
      <li><code>e || !g</code>, <code>e || !h</code></li>
    </ul>
  </ul>

  <h2>Is it useful?</h2>

  <p>
    It could be.
    It's not going to replace your Product Owner, but there's a lot of benefits:
  </p>

  <ul>
    <li>Guaranteed to find the optimal solution</li>
    <li>Very fast, taking a few milliseconds for our tasks</li>
    <li>Allows for quick experimentation:</li>
    <ul>
      <li>If we budget 8 points, we only use 7. What if we commit to 9 points?</li>
      <li>What happens if we estimate this story as a 3?</li>
      <li>The client suddenly values task <code>c</code> as a 3. What should change in the sprint?</li>
    </ul>
  </ul>

  <p>
    We can even run the solver for all possible budgets to quickly see the options.
    The total time to run 14 instances of the problem was 250ms.
    That time includes set-up and outputting a table similar to this one:
  </p>

  <figure>
    <table>
      <thead>
        <tr>
          <th><strong>Budget</strong></th>
          <th><code>b</code></th>
          <th><code>c</code></th>
          <th><code>f</code></th>
          <th><code>g</code></th>
          <th><code>h</code></th>
          <th><strong>Cost</strong></th>
          <th><strong>Value</strong></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>0</td>
          <td>0</td>
        </tr>

        <tr>
          <td>2</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>0</td>
          <td>0</td>
        </tr>

        <tr>
          <td>3</td>
          <td>✔</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>3</td>
          <td>3</td>
        </tr>

        <tr>
          <td>4</td>
          <td>✔</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>3</td>
          <td>3</td>
        </tr>

        <tr>
          <td>5</td>
          <td>✔</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>3</td>
          <td>3</td>
        </tr>

        <tr>
          <td>6</td>
          <td>✔</td>
          <td>✔</td>
          <td></td>
          <td></td>
          <td></td>
          <td>6</td>
          <td>4</td>
        </tr>

        <tr>
          <td>7</td>
          <td>✔</td>
          <td></td>
          <td></td>
          <td>✔</td>
          <td></td>
          <td>7</td>
          <td>5</td>
        </tr>

        <tr>
          <td>8</td>
          <td>✔</td>
          <td></td>
          <td></td>
          <td>✔</td>
          <td></td>
          <td>7</td>
          <td>5</td>
        </tr>

        <tr>
          <td>9</td>
          <td>✔</td>
          <td></td>
          <td></td>
          <td>✔</td>
          <td>✔</td>
          <td>9</td>
          <td>7</td>
        </tr>

        <tr>
          <td>10</td>
          <td>✔</td>
          <td></td>
          <td></td>
          <td>✔</td>
          <td>✔</td>
          <td>9</td>
          <td>7</td>
        </tr>

        <tr>
          <td>11</td>
          <td>✔</td>
          <td></td>
          <td>✔</td>
          <td>✔</td>
          <td>✔</td>
          <td>11</td>
          <td>8</td>
        </tr>

        <tr>
          <td>12</td>
          <td>✔</td>
          <td>✔</td>
          <td></td>
          <td>✔</td>
          <td>✔</td>
          <td>12</td>
          <td>8</td>
        </tr>

        <tr>
          <td>13</td>
          <td>✔</td>
          <td>✔</td>
          <td></td>
          <td>✔</td>
          <td>✔</td>
          <td>12</td>
          <td>8</td>
        </tr>

        <tr>
          <td>14</td>
          <td>✔</td>
          <td>✔</td>
          <td>✔</td>
          <td>✔</td>
          <td>✔</td>
          <td>14</td>
          <td>9</td>
        </tr>
      </tbody>
    </table>
  </figure>

  <p>
    However, it's not all good.
    Our solver doesn't help with the hardest part of sprint planning - estimating the size and value of each task.
    Additionally, the sprints it creates aren't very cohesive.
    They are more like a collection of unrelated tasks.
    When all the tasks in a sprint work towards a single <a href="https://www.visual-paradigm.com/scrum/write-sprint-goal/">sprint goal</a>, developers can better support each other, and clients can give more relevant feedback.
  </p>

  <p>
    This issue is like the circular dependencies we saw before.
    Tasks provide more value when other similar tasks are also included in the sprint.
    However, our solver does not support a dynamic value function, so we'll just have to keep using humans for now.
  </p>

  <p>
    Also, it's important to remember that SAT has exponential time complexity.
    As we add more tasks, it gets slow.
    Very slow:
  </p>

  <figure>
    <img
      src="/assets/blog/sprint-with-sat/exponential.png"
      title="How long does it take to run the solver for a given number of tasks"
      alt="The time taken to compute the optimal is exponential. For 10 tasks, it takes millisenconds. For 100, it can take minutes. For 150, it can take over an hour."
    />
  </figure>

  <p>
    It might be best to keep your backlog small.
    If we extrapolate to 300 tasks on the backlog, we get a predicted runtime of <strong>600,000 years</strong>.
    Your sprint will probably be done by then...
  </p>

  <h2>Conclusion</h2>

  <p>
    Your Sprint Planning meetings are still valuable, and so is your Product Owner.
    You should probably keep both.
    However, there are still a few lessons we can learn:
  </p>

  <ul>
    <li>SAT solvers are useful and surprisingly easy to use</li>
    <li>The 'optimal' sprint might not be the best one</li>
    <li>Exponential time is still exponential, even when it's fast</li>
  </ul>
</BlogPost>

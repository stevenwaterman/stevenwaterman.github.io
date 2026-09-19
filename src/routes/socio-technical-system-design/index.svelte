<script lang="ts">
	import BlogPost from "$lib/blog/BlogPost.svelte";
</script>

<BlogPost id="socio-technical-system-design">
  <p>
    I recently read <a href="https://www.seangoedecke.com/good-system-design/">Sean Goedecke's "Everything I know about good system design"</a>.
    It was interesting and I agreed with a lot of the advice, but they only talked about the tech.
    In the tech industry, "systems design" has been co-opted to mean "distributed service architecture & design".
    And I had no idea.
    Which means I have <em>definitely</em> confused a lot of people by introducing myself as a systems guy and then talking about users.
  </p>

  <p>
    I want to focus on the practical applications of this way of thinking, so I'll skip the lengthy theoretical section and give a TLDR instead:
  </p>

  <ul>
    <li>Every real-world system is infinitely large and complex. We deal with that complexity by creating models</li>
    <li>Any finite model must be smaller and simpler, meaning it asserts some parts of the system are negligible</li>
    <li>"System design" in the tech industry uses tech-only models that focus on the machines and ignoring the humans</li>
    <li>Humans are a critical part of the overall system, forming feedback loops wherever they interact with your solution</li>
    <li>To become a better system designer, use a model that includes those human-machine feedback loops (a socio-technical model)</li>
  </ul>

  <h2>There are developers in your system</h2>

  <p>
    You can actually see this tension in Sean's original blog post: the <em>Recognizing good design</em> section explains how engineers typically gravitate towards complex solutions with lots of moving parts, and recommends simple "underwhelming" solutions instead.
    But a socio-technical model builds that heuristic in.
  </p>

  <p>
    An engineer using a tech-only model will naturally create a solution that is robust, but over-complicated and unmaintainable.
    Those are human problems, not technical problems, so the tech-only model ignores them.
    In practice, over-complicated and unmaintainable solutions develop bugs and have to be replaced.
    We use heuristics like "simple is good", "don't reinvent the wheel", and "focus on the MVP" to paper over these flaws in the model.
  </p>

  <p>
    A socio-technical model includes these human factors by default.
    The code does not exist in a closed system with hard boundaries, it is surrounded by humans and feedback loops.
    Those socio-technical feedback loops can have a stabilising, or destabilising effect on the system.
  </p>

  <figure>
    <img
      src="/assets/blog/socio-technical-system-design/feedback.dot.svg"
      alt="Complexity causes confusion which delays maintenance until it gets bypassed with band-aid fixes, worsening the complexity."
    />
    <figcaption>Overly complex solutions collapse due to human feedback loops</figcaption>
  </figure>

  <p>
    Most developers already understand why you need to create maintainable solutions.
    It's much less common to see discussion about <strong>users</strong> as an important and dynamic part of your system.
  </p>

  <h2>There are users in your system</h2>

  <p>
    A tech-only model imagines requests appearing from one arrow and responses vanishing via a second.
    It imagines predictable patterns of traffic, and random anomalies.
    But zoom out a little, and there's a million humans on the other end of those arrows, waiting for and reacting to your response.
    It's a feedback loop, where the requests you receive right now depend on the responses you sent previously.
  </p>

  <p>
    Users are individuals.
    They are chaotic, and messy, and unpredictable.
    But they behave predictably in aggregate, and you can design around those patterns of behaviour.
  </p>

  <h2>How users act</h2>

  <h3>What they know</h3>

  <p>
    A user will identify the most similar thing to your product that they have used before, and assume it is exactly the same.
    They can't know what you don't tell them.

    50% of what a user's knowledge about your product, is an assumption 
    80% of what a user knows about your product is based on guessing.

  </p>

  <h3>The path of least resistance</h3>

  <p>
    They do not want a complicated solution
    They will use the deprecated solution if it's simpler
    There is no such thing as a sub-optimal solution
    If they cannot find a simple solution, they will find a complicated solution.
    If they live near your head office they will turn up.
    They will call up your phone support.
    They will scrape your site into an excel spreadsheet.
  </p>

  <h3>If it works you are done</h3>

  <p>
    Never look for a more optimal solution.
    They do not care what you recommend
    If a user has not noticed any problems, then it works and they never think about it again
  </p>

  <h3>When it doesn't work, </h3>

  <h3>Assume consistency</h3>

  <p>
    If your competitors have a feature, then you also have that feature
    You might not realise you have that feature but they will somehow hack it into your product
    There is no such thing as random chance, if something works once then it becomes official
    If something breaks once then it is broken
    If something works once and then stops working, it is both official and broken
  </p>

  <h3>They know more than you</h3>

  <p>
    They understand their problem better than you.
    They are more creative than you.
    They 
  </p>

  <p>
    Someone using your system has a goal they want to achieve.
    They are annoyed whenever they have to put in effort to do that.
  </p>

  <ul>
    <li>Users do the first thing that works, and then keep doing it until it doesn't work</li>
    <li>Users do not care whether they are using the right thing, as long as it works</li>
    <li>Everything that does not solve the user's problem, makes their problem worse</li>
    <li>Users do not read</li>
    <li>Users do not know who you are</li>
  </ul>

  <h2>Heuristics for organisations</h2>

</BlogPost>

<!-- <p>

  </p>

    It felt less like system design, and more like a mix of software engineering, data engineering, and distributed systems.
    But it turns out that the term system design has been co-opted most people in tech call that system design.
    And I've definitely been confusing people when I introduce myself as a systems guy and then start talking about user experience.
  </p>

  <p>
    I spend a lot of time thinking about systems.
    It's the most important part of my job, and it pervades every aspect of my life.
    So it came as a real shock to learn that everyone else has been using a different definition of system design this whole time.
  </p>

  <p>

  </p>

    it didn't really feel like system design.
  <p>

  </p>

  <p>
    
  </p>

  <p>
    That was definitely a surprise.
    I just assumed we were on the same page, but no.
    I'm over here still using the original definition of <a href="">system design</a>.
  </p>

  

  <p>
    
  </p>

  <p>
    This post tries to zoom out, to explain system design as I think about it, 
  </p>

    That blog post, and the vast majority of discussion about it, seemed to presume that "system design" was fundamentally a technical discipline.
  <p>
    


    But this implicit assumption that the boundary of your system could be defined in a Terraform config, felt totally foreign.
    , not system design.
    It was missing all the humans.
  </p>

  <p>

  </p>

  <p>
    Everyone had recommendations for databases, and state, and caching, backpressure, optimisation, load balancers, and there was the obligatory debate over microservices.
    But nobody mentioned the humans?
    There's this implicit assumption that "system design" is concerned with everything that fits inside a Terraform config
  </p>

  <p>
    Just like your algorithm doesn't exist in a vacuum, neither does your technical infrastructure.

  </p>




  Nobody was discussing the most important part of the systems.
  This discourse around system design felt totally foreign to me, compared to what I do and where my focus is on a daily basis.
  There was all this discussion about queues, and rate limiting, and state, but nobody mentioned the humans.

  A core tenet of systems thinking is that you zoom out as much as possible.
  Your system does not exist in a vacuum.
  The tech sector understands this, to some extent.
  That's what differentiates a technical interview from a system design interview.

  A technical interview zooms way in to a specific algorithm or piece of code, and tries to optimise it in a vacuum.
  Compare that to a system design interview, which zooms out to look at the infrastructure and architecture of the "whole system".

  The popular conception of "system design" in tech stops there, at the boundary of your computer infrastructure.
  Your system ends at the bottom of your `.tf` file.

  But zoom out more, and there's a CI/CD pipeline in your system.
  You'll find a release strategy.
  You'll find an incident response plan.
  You'll find the people who wrote those.
  You'll find an organisation in the future, maintaining or modernising this system that has since grown old and outdated.

  Now, "system design" does actually take these things into account, but indirectly.
  It relies on heuristics, like "simpler is better".

  When you look at software as a closed system, entirely technical, the natural impulse is to make it more robust, more elegant, and inevitably more complex.
  In which case, we need heuristics and goals like "keep it simple".

  But when you zoom out, and notice that the system actually includes the developers maintaining the system, you don't need a heuristic.
  Simplicity, maintainability, and good documentation all become a necessary part of a robust system.

  You'll find a runbook, an incident response 
  and humans appear. Other developers. You, but in the future.

  Very often in tech, system design is discussed in terms of databases, caches, load balancers, and compute.
  But system design is a much broader term than that.
  System design includes questions like

  - How do you design traffic signs so people listen to them
  - How do you write a constitution
  - How do you 

  Even in tech, the most interesting and most important system design happens when humans interact with tech.
  In other words, system design at the socio-technical boundary.

  If you take nothing else away from this post, try to remember this:

  There are humans in your system!!!

  Your system is CHOCK FULL of humans!
  
  Your perfect beautiful elegant system is crawling with the nasty little buggers.
  All messy, and chaotic, and imperfect.
  But so, so important.

  And despite all that zooming out, we have only just got to the boundary of your organisation.
  That's not the whole system.
  Not even close. -->
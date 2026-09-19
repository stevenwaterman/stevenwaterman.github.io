<script lang="ts">
import BlogPost from "$lib/blog/BlogPost.svelte";
import YoutubeEmbed from "$lib/blog/YoutubeEmbed.svelte";


</script>

<BlogPost id="embrace-your-obsessions">
  <p>
    <em>In this post, I tell the story of my recent obsession with the game Minesweeper and discuss why having an obsession can be helpful.</em>
  </p>

  <p>
    A few months ago, my partner and I were playing a lot of <a href="https://en.wikipedia.org/wiki/Minesweeper_(video_game)">Minesweeper</a>.
    It was a dark time - I even spent £3.99 for a Nintendo Switch version!
    When playing a game, I often think about how I'd write an AI for it.
    <em>Most of the time</em>, I don't actually implement that algorithm.
  </p>

  <p>
    This time was different.
    It all snowballed from there - implementing the solver was just the beginning.
    Two months on, I can think of at least six side projects that are the direct result of my Minesweeper obsession.
  </p>

  <h2>Artifact 1: A Minesweeper Solver</h2>

  <p>
    We were on our honeymoon at the time, travelling around Europe by train.
    That meant a lot of downtime, and I just happened to have a laptop with IntelliJ.
  </p>

  <figure>
    <img
      src="/assets/blog/embrace-your-obsessions/header.png"
      title="Can recommend both Star Realms & cheap 1st class upgrades"
      alt="I am on a train playing a card game"
    />
  </figure>

  <p>
    <em>(I did other things too, promise)</em>
  </p>

  <p>
    My solver defined Minesweeper as a set of constraints.
    Each constraint declared <code>This set of unknown cells contains between &lt;min&gt; and &lt;max&gt; mines</code>.
    If you want the details of how it all works, watch one of the talks later in this post or have a look at the <a href="https://github.com/stevenwaterman/Minesweeper-Constrained/blob/master/README.md#constraint-actions">Minesweeper Constrained readme</a>.
  </p>

  <p>
    I did finish my solver, and it worked - but it wasn't flawless.
    It never made a mistake, but occasionally it would get stuck in a situation that I could solve manually.
    Making things worse, at one point I sat for 5 minutes assuming it had crashed, only for the solver to then report it had processed <em>5 million</em> constraints!
    Looking back, this was inevitable given that <a href="http://simon.bailey.at/random/kaye.minesweeper.pdf">Minesweeper is NP-Complete</a>.
  </p>

  <p>
    All in all, the solver was good, and my constraint-based technique worked, but it wasn't a great bit of programming.
    I'm not particularly proud of it, so <a href="https://dash.harvard.edu/bitstream/handle/1/14398552/BECERRA-SENIORTHESIS-2015.pdf?sequence=1">here's someone's dissertation on the topic</a> instead.
  </p>

  <p>
    I thought that writing the solver would satisfy me and end my obsession - but it only made me want to do more...
  </p>

  <h2>Artifact 2: A Lightning Talk</h2>

  <p>
    It was time for Scott Logic's annual Christmas Lightning talks, and my Minesweeper obsession was in full swing.
    I knew exactly what I wanted to talk about, and jumped at the chance to indoctrinate the rest of the office!
    It was my first real Tech Talk, and I was well outside my comfort zone.
    It didn't help that everyone kept telling me that Lightning talks are the hardest kind of tech talk!
  </p>

  <p>
    I spent 2 days straight preparing for this 3 minute talk, which I titled <code>How to solve Minesweeper in 3 minutes</code>.
    It paid off though - I finished perfectly on time, and the audience really enjoyed it.
    One member of the audience enjoyed it so much that I was invited to give a longer version at the local meetup, <a href="https://www.meetup.com/NE-Tech/events/267298193/">NE:Tech</a>.
  </p>

  <YoutubeEmbed code="E7UYQA-7Ego"/>

  <p>
    If you're not prepared to listen to me shout for 3 minutes, you can just <a href="/assets/blog/minesweeper-lightning-talk/how-to-solve-minesweeper-in-3-mins.pdf">read the slides</a> instead.
  </p>

  <h2>Artifact 3: Minesweeper Constrained</h2>

  <p>
    So, I was invited to give a long-form talk, in a 15 minute slot.
    I knew from my previous talk that the audience was getting a bit lost when things got complex.
    Since this talk was going to be even more in-depth, I decided to include audience participation to keep people engaged.
    Adding audience participation just raised the bar - it's one thing to understand a talk, but it's another thing entirely to understand well enough to participate!
  </p>

  <p>
    I had a week's notice before the talk, and thankfully had nothing else to do.
    After spending every available moment working on it, I finished my version of Minesweeper with a few hours to spare.
    It forced you to act like an algorithmic solver, manually combining and clearing constraints.
    I called it <code>Minesweeper Constrained</code>, and it served its purpose - though it wasn't exactly efficient.
  </p>

  <p>
    You can view the <a href="https://github.com/stevenwaterman/Minesweeper-Constrained">source code on GitHub</a> or try a <a href="https://stevenwaterman.uk/Minesweeper-Constrained">live version of the game</a>.
  </p>

  <h2>Artifact 4: A Long Talk!</h2>

  <p>
    With my game complete, I needed to think about how to do the actual talk.
    I'd never seen a tech talk with heavy audience participation, so I relied on my experience with Improvised Comedy.
    There were three stages to my plan:
  </p>

  <ol>
    <li>Humorous introduction without theme to set a light-hearted tone</li>
    <li>Introduce a theme and the audience participation</li>
    <li>Bribe with chocolates</li>
  </ol>

  <p>
    But what theme would I pick for a presentation about clearing minefields?
    The military-industrial complex, of course!
  </p>

  <YoutubeEmbed code="2ibiA5TEsxw"/>

  <p>
    All in all, my presentation went well.
    People enjoyed it (including the venue staff!) and I think they understood what I was going for.
    The main complaint was the number of people (and fire sprinklers) I hit with chocolate projectiles!
  </p>

  <h2>Artifact 5: An article about SAT Solvers</h2>

  <p>
    While researching Minesweeper solvers, I came across <a href="https://pwmarcz.pl/blog/kaboom/">Kaboom</a>, a version of Minesweeper which forces you to play methodically.
    If you guess unnecessarily, you always lose - but if you're forced to guess then you're guaranteed to be correct.
    As part of that, they had to use a Minesweeper solver to know when guessing was needed.
    They used a <a href="https://en.wikipedia.org/wiki/Boolean_satisfiability_problem#Algorithms_for_solving_SAT">SAT Solver</a>, which inspired me to write a <a href="/sprint-with-sat">blog post about SAT solvers</a> applied to sprint planning.
  </p>

  <p>
    There were lots of examples of SAT solvers used for Minesweeper - which made it really easy to learn how they worked when researching for the blog post.
    Any time I got confused, I could rely on the general context of Minesweeper which I understood well.
    I always knew <em>what</em> they were trying to do, and just had to work out <em>how</em> they were achieving that.
  </p>

  <h2>Artifact 6: Optimised Minesweeper</h2>

  <p>
    Looking back on my NE:Tech talk, I was embarrassed at how inefficient Minesweeper Constrained was.
    I knew I could do better if I tried to write an optimised version, so I started looking into <a href="https://svelte.dev">svelte</a>.
    I was led down a rabbit-hole of svelte optimisation, exploring the intricacies of the HTML rendering pipeline.
  </p>

  <p>
    This is a whole story in itself, and one I wanted to write about in more detail.
    You can read all about it in <a href="/minesweeper-optimisation">my next blog post</a>.
  </p>

  <h2>Obsessions are Good</h2>

  <p>
    A lot of my recent productivity has been a direct result of my Minesweeper obsession.
    I don't mean that I was working any harder or longer hours than usual.
    I was enjoying it, but I was still working my usual hours.
    I was more productive because **I'd already done most of the work**.
  </p>

  <p>
    By having an obsession, and making any new projects related to it, you end up writing some parts over and over again.
    It means you can focus on the <em>how</em>.
    You know <em>what</em> you're building, <em>what</em> the requirements are, and <em>what</em> is transferrable.
    You can focus on <em>how</em> the latest project is different, and <em>how</em> you're going to leverage those differences.
  </p>

  <figure>
    <img
      src="/assets/blog/embrace-your-obsessions/web.png"
      title="Everything's Connected"
      alt="A visual representation of how each task feeds into each other. The same information is in the bullet points following the diagram"
    />
  </figure>

  <p>
    I worked out my solving algorithm in November, and everything since has just built on that.
  </p>

  <ul>
    <li>When writing the solver, I knew the algorithm inside-out, and explored <em>how</em> to transfer that to an efficient implementation.</li>
    <li>When writing the 1st talk, I had a deep understanding of the topic, and could focus on how to present it to an audience.</li>
    <li>When writing Minesweeper Constrained, the only bit I didn't know what <em>how</em> to port my solver and my talk's visualisations to a website.</li>
    <li>When writing the 2nd talk, I focussed on <em>how</em> a longer talk and audience participation would affect the style.</li>
    <li>When learning about SAT solvers, I could read examples that discussed Minesweeper and know exactly <em>what</em> they were trying to do, focussing on <em>how</em> they described that as a SAT problem.</li>
    <li>When it eventually got around to optimisation, I had already written the solver twice, and all I cared about was <em>how</em> to optimise the implementation.</li>
  </ul>

  <p>
    Having an obsession is great because it means you can do the same thing over and over again in different ways, focussing on how it's different each time.
    <strong>What will your obsession be?</strong>
  </p>

  <hr/>

  <p>
    I'd like to end this post by thanking all the people that supported me through this obsession, giving me progressively bigger opportunities.
  </p>

  <ul>
    <li>My partner Artie, for tolerating discussion of inexact constraints at 11pm on the streets of Cologne</li>
    <li>Andy, Wayne, John, and everyone else that helped me practice my Lightning talk</li>
    <li>Chris B, for asking me to speak at NE:Tech</li>
    <li>Sam P, for being super encouraging after NE:Tech and pushing me out of my comfort zone</li>
    <li>James D, for inviting me to give a talk at the London office</li>
    <li>Chris P, for appearing like StackOverflow personified and teaching me the secrets of HTML rendering</li>
    <li>Bartosz, for being a constant help with the blog, talks, and my application to Build IT Right</li>
    <li>Erin, for being a star and helping me edit all these blog posts!</li>
  </ul>
</BlogPost>

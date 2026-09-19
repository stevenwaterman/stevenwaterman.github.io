<script lang="ts">
  import BlogPost from "$lib/blog/BlogPost.svelte";
</script>

<BlogPost id="sunk-cost-fallacy">
  <p>
    Last year, I was playing a video game while chatting with friends.
    Every time I killed a certain monster, there was a rare chance for me to get the item I wanted, around 0.1%.
    I'd been killing that monster over and over again for weeks, far more than the expected 1000 times, with no luck yet.
  </p>

  <p>
    My friend asked why I was still trying - why hadn't I given up yet.
    I only expected it to take me a couple of days, and the item certainly wasn't worth 2 weeks of effort to get.
    A clear example of the sunk cost fallacy, he said.
    I should cut my losses and give up.
  </p>

  <p>
    As we talk more about the sunk cost fallacy, think to yourself about that situation.
    Who was right?
    Was it an example of the sunk cost fallacy?
    We'll come back to it at the end.
  </p>

  <h2>How we understand Sunk Cost</h2>

  <p>
    The popular conception of the sunk cost fallacy is roughly:
  </p>

  <blockquote>
    When you keep doing something because you're in too deep already.
  </blockquote>

  <p>
    That's deliberately a bit vague and ambiguous, because our understanding of it is vague and ambiguous too.
    Let's think of some situations based on that definition, and try to decide whether it's better to keep going or to give up.
  </p>

  <h2>Times when you are in too deep</h2>

  <p>
    A great way to remove the influence of the sunk cost fallacy is to just remove any mention of sunk costs.
    I'll introduce three examples, as someone might talk about them.
    Try and decide whether continuing on is the right decision, or whether they're making a bad decision due to the sunk cost fallacy.
  </p>

  <p>
    At its core, the Sunk Cost Fallacy is about letting your decisions be affected by previous decisions that you can't change.
    Rather than looking back at what you've done previously (and can't change), remove all of that and just look forwards instead.
    After each example, I'll reframe it to remove any information about how we got here, and just look forwards instead.
  </p>

  <p>
    The examples are thought experiments, and in reality there would be a lot of extra options.
    Treat it like the trolley problem, where you have to make a decision using only the information you're given, and not your knowledge of how the world works in reality.
  </p>


  <h3>The Computer Science Degree</h3>

  <blockquote>
    You hear that getting a computer science degree will increase your lifetime earnings by $1m.
    2 years into the 3-year course, you realise it will actually only increase your lifetime earnings by $500k.
    You wouldn't have started the degree if you had known that but you're 2 years in so you finish it anyway.
  </blockquote>

  <p>
    Here, the sunk cost is the 2 years you have already spent working towards the degree.
    We should ignore those, and only look at the costs and benefits that will happen in the future.
    Dropping out is free, and has no impact on lifetime earnings (in this example).
    Finishing the course takes 1 year, and increases our lifetime earnings by $500k:
  </p>

  <blockquote>
    You hear that getting a computer science degree will increase your lifetime earnings by $500k.
    The course takes 1 year to complete.
    Should you enroll?
  </blockquote>

  <p>
    Probably.
    You were willing to spend 3 years for $1m, which is a worse deal than 1 year for $500k.
  </p>


  <h3>The Organic Apple</h3>

  <blockquote>
    You buy yourself an organic apple that costs 5x as much as a normal apple as a treat.
    You forget to eat it until a week later, when it looks a bit worse for wear and is quite brown.
    It was really expensive, so you'd hate to throw it away, and eat it anyway, even though you don't enjoy it.
  </blockquote>

  <p>
    Our sunk cost is the large amount of money spent on the apple.
    Ignoring that, let's look at the <em>prospective</em> (future) costs and benefits.
    Throwing away has no cost and no benefits.
    Eating the apple has no cost and negative benefits, because it's disgusting and we might get ill:
  </p>

  <blockquote>
    You are offered a brown, slightly mouldy, organic apple.
    Do you want to eat it?
  </blockquote>

  <p>
    Probably not.
    If you were content eating mouldy fruit you could just go and scavenge in the woods instead.
  </p>

  <h3>The Web App</h3>

  <blockquote>
    You have been working on a new web app for 1.5 years.
    New market research shows that nobody is interested in the product and the company won't be able to sell it.
    It will only take 6 months to finish, so you press on regardless.
  </blockquote>

  <p>
    Our sunk cost is the 1.5 years already spent developing the app.
    Finishing the app costs 6 months of our time, and provides no benefits.
    Stopping immediately also has no benefits, but doesn't cost anything:
  </p>

  <blockquote>
    You have an idea for a new web app.
    It will take 6 months to create and nobody wants it.
    Should you work on the app?
  </blockquote>

  <p>
    Probably not.
    You could spend those 6 months creating something that people actually want.
  </p>

  <h3>The Video Game</h3>

  <blockquote>
    You have been trying to get a rare item on a video game.
    You expected it to take 3 days, but you have been unlucky and have spent 2 weeks so far.
    Since each time you kill the monster is mutually independent, you are no closer to the drop than when you started.
    You may as well keep going, since you've been here so long already.
  </blockquote>

  <p>
    Our sunk costs are the 2 weeks already spent killing the monster.
    If we give up, there are no costs and no benefits.
    If we continue, it will cost (on average) 3 more days to obtain the item.
  </p>

  <blockquote>
    You want an item in a video game, but it will take 3 days to obtain, on average.
    Are you willing to spend that long to obtain it?
  </blockquote>

  <p>
    Unlike the CS degree, this sunk-cost-free framing stays the same no matter how long we have been killing the monster.
    It will <em>always</em> take another 3 days on average, because there's no progress with mutually independent random events.
    You were happy with that trade - 3 days for the item - when you started, and you should still be happy with it now.
    Continuing is the correct choice.
  </p>

  <h2>Conclusion</h2>

  <p>
    Now, we've gone through those four examples and decided whether it was a good or bad decision to continue.
    We've also identified and avoided the sunk cost fallacy.
    But note that <em>all 4</em> situations showed examples of the sunk cost fallacy.
  </p>

  <p>
    All of them looked back, at the costs and benefits we'd already taken, and took them into account when making a decision.
    Sometimes, that was the right decision - but it was by pure chance:
  </p>

  <ul>
    <li><strong>Fallacy: </strong>Choosing to stick with your degree because you <em>are already 2 years in</em></li>
    <li><strong>Correct: </strong>Choosing to stick with your degree because you <em>only have 1 year left</em></li>
  </ul>

  <p>
    When my friends told me to give up on getting the item I wanted, they were showing the opposite of Sunk Cost, which I'm calling <em>Sunk Benefit</em>.
    In the 2 weeks I spent killing the monster, you would expect to receive 5 copies of the item, but I actually got 0.
    The <em>future</em> benefits were still the same, on average, but the <em>past</em> benefits were underwhelming.
  </p>

  <p>
    A good bet is still a good bet, even if you lose.
  </p>
</BlogPost>



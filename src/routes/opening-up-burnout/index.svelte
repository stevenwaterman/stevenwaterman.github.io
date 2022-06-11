<script lang="ts">
  import BlogPost from "$lib/blog/BlogPost.svelte";
  import YoutubeEmbed from "$lib/blog/YoutubeEmbed.svelte";
  import Calendly from "$lib/components/Calendly.svelte";
</script>

<style>
  .center {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
</style>

<BlogPost id="opening-up-burnout">
  <p>
    I'm not afraid to admit that I suffered from some pretty severe burnout last year.
    Actually, that's not true - I <strong>am</strong> afraid to admit that.
    I'm being open with it anyway, because I don't think my fear is <em>right</em>.
  </p>

  <ul>
    <li>I don't like that we pretend all is well, until it gets overwhelming.</li>
    <li>I don't like that this blog is basically my PR department.</li>
    <li>I don't like that we are so used to <em>lying</em> to each other.</li>
  </ul>

  <p>
    So I'm going to try and lead by example:
  </p>

  <p>
    Burnout is real, burnout sucks, burnout will happen to you too.
    It's probably not your fault, and it's probably not something you can fix alone.
    I thought I was immune, and it has taken me months to recover.
  </p>

  <h2>It's Not What You Expect</h2>

  <p>
    Much of the discussion around burnout focuses on people being overworked:
  </p>

  <blockquote>
    Burnout is a form of exhaustion caused by constantly feeling swamped.
    It's a result of excessive and prolonged emotional, physical, and mental stress.
    In many cases, burnout is related to one's job.
    Burnout happens when you're overwhelmed, emotionally drained, and unable to keep up with life's incessant demands.
    <cite><a href="https://www.webmd.com/mental-health/burnout-symptoms-signs">WebMD</a></cite>
  </blockquote>

  <p>
    But that's not the only reason it happens.
    In my case, it was the result of repeatedly trying to improve something at work, getting excited and motivated about it, and then having that blow up in my face.
    In a <a href="https://news.ycombinator.com/item?id=31249799">discussion on Hacker News</a>, one user put forward a unifying theory of burnout, which I've found helpful:
  </p>

  <blockquote>
    <p>
      What causes burnout is effort-reward cycle misses.
    </p>

    <p>
      Reward could be anything.
      The feeling of a job well done, the expectation of career advancement, or soft recognition by peers.
      It's dependent on the individual and project.
      You could even have an outward success and a pay raise but if you wanted your peers to love you and they didn't...
      Burnout.
    </p>

    <p>
      <strong>The disconnect between effort and reward teaches your brain to associate effort with failure.</strong>
      It's no surprise that "Take a break" didn't help you, because I think that doesn't work in general: it doesn't reassociate effort with expected reward.
    </p>

    <cite><a href="https://news.ycombinator.com/item?id=31250995">throwawaymaths</a>, Hacker News, paraphrased</cite>
  </blockquote>

  <p>
    So after spending a few months training my brain to associate intellectual curiosity with failure and punishment, it stopped trying.
  </p>

  <p>
    I couldn't bring myself to code, and I couldn't bring myself to <em>care</em> about the work.
    I started working less and less.
    The people around me in the job <em>were</em> supportive and empathetic, but it didn't help, because they didn't do anything to fix the effort-reward cycles.
  </p>

  <p>
    It didn't just affect work, either.
    Soon, even simple decisions like what to have for dinner, became hard.
    I couldn't sleep very well.
    I became a shell of my former self.
  </p>

  <p>
    Eventually, I just had to leave that job, with nothing lined up, and barely any notice.
    They knew it was coming, and we left on good terms, but it still felt like a failure.
  </p>

  <h2>Aftermath</h2>

  <p>
    I'm going to try and avoid being too critical on myself here.
    Today, I'd do things differently, but I'm a different person now.
    The only reason I can avoid burnout today, is because I couldn't avoid it then.
  </p>

  <p>
    I spent a couple of months unable to really do anything productive.
    I tried to do some programming, tried to play some games, tried to just exist as a human.
    The reward circuits in my brain didn't seem to work.
    Nothing gave me joy or motivation or excitement.
  </p>

  <p>
    Eventually, I accepted that things weren't going to get better on their own.
    I had to force myself to self-care.
    If my body was a plant, it would've died by now.
    I started caring for myself a bit more, and embraced harm reduction.
  </p>

  <p>
    I wasn't sleeping enough, or at regular times, so I set an alarm.
    At the same time every morning, my phone forced me out of bed to go and scan a barcode.
    I wasn't going to bed any earlier, but the sleep deprivation soon fixed that.
    My sleep schedule started to become more normal.
  </p>

  <p>
    I wasn't eating or drinking well, so I bought snacks.
    Better to eat <em>something</em> than nothing.
    Better to drink some sugar-free soda than be dehydrated.
  </p>

  <p>
    I wasn't getting any excercise, so I scheduled a daily walk.
    To be honest, I scheduled <em>everything</em> in.
    For a couple of weeks, it felt like I was back at school.
    An alarm would go off, and I'd check my calendar and start doing whatever it told me to.
  </p>

  <figure>
    <img
      src="/assets/blog/opening-up-burnout/calendar.png"
      alt="My calendar, with every minute planned out, 24 hours a day, with specific tasks for me to follow, like 'Feed Cat', 'Watch TV', and 'Put Clothes Away'"
      title="EVERYTHING"
    />
    <figcaption>This is the actual schedule I followed. 'Separate' was a specific task planned each day.</figcaption>
  </figure>

  <p>
    Each of these things helped, at least temporarily.
    They didn't always stick as habits, but it snowballed.
    The better I felt, the better equipped I was to look after myself, and the better I felt.
  </p>

  <p>
    Now, that's not to say I started enjoying programming again.
    The only 'productive' thing I did in those months was 3D-modelling a wrist rest that is moulded exactly to my wrist.
    Not the most useful outcome, but it was a fun project that helped me feel productive.
  </p>

  <p>
    I started to accept that it was going to be a long road.
    A week or two wasn't going to fix me.
    I started looking at the next 6 months, wondering what I could do to help myself in the long term.
  </p>

  <p>
    Eventually, I had the urge to start programming again.
    There was a little spark inside of me.
    Not the same intellectual flame that I had before, but there was something.
  </p>

  <p>
    That spark grew into <a href="https://stevenwaterman.uk/NoTimeToStalk/">No Time To Stalk</a>, a murder mystery game I made with my partner for the <a href="https://itch.io/jam/pridetharian21">Pridetharian Game Jam</a>.
    It carried over to <a href="https://lexoral.com">Lexoral</a>, and all the other side projects I've done since then.
  </p>

  <p>
    I may have moved on from Lexoral now (more on that in the next post), but I wouldn't change it.
    Looking back, it's a miracle I ended up where I am today.
    At each turning point, the opportunity was only possible due to all the decisions I'd made so far.
    I'm reminded of the <em>Open Space Technology</em> principles:
  </p>

  <ul>
    <li>Whenever it starts is the right time</li>
    <li>When it's over it's over</li>
    <li>Whatever happens, happens</li>
    <li>There is one "Law", the "Law of two feet"</li>
  </ul>

  <h2>Conclusion</h2>

  <p>
    If you're struggling with burnout, or worry that you might be heading in that direction, please look after yourself.
    Find something that motivates you, and something that reinforces those reward circuits.
  </p>

  <p>
    Don't be afraid to talk about it, and don't be afraid to ask for the help you need.
    Time off, or less work, isn't always the solution, and that's ok.
    If you need someone to talk to, I'm here.
    Even if you just need someone to get excited with.
  </p>

  <p>
    and remember to feed and water your human.
  </p>

  <div class="center">
    <Calendly/>
  </div>
</BlogPost>

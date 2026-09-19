<script lang="ts">
  import BlogPost from "$lib/blog/BlogPost.svelte";
  import Calendly from "$lib/components/Calendly.svelte";
</script>

<style>
  .center {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 1em;
  }
</style>

<BlogPost id="a-new-trajectory">
  <p>
    Over the past year, I've been <a href="/opening-up-burnout">recovering from burnout</a>.
    I started <a href="https://lexoral.com">Lexoral</a> to help with my partner's PhD work, and rekindle my love for programming.
    It worked!
    I really enjoy programming again, and Lexoral made Artie's PhD transcription less painful.
  </p>

  <p>
    Given that I had no experience in marketing, the launch was a failure.
    So I joined an <a href="https://dcincubator.co.uk">incubator</a>, and got some help with validating the business.
    It worked!
    There's definitely potential there, and I could grow Lexoral into a sustainable business.
  </p>

  <p>
    Then I realised I wasn't happy.
    It's not that Lexoral failed - it achieved both its goals, and more!
    It's just that I had succeeded in making a product people want, and failed to make a job <em>I</em> wanted.
    I missed working with people.
    I missed <em>helping</em> with the people problems.
    In fact, I'd <em>always</em> enjoyed that side of things more.
  </p>

  <p>
    I mapped out the things that motivated me in a job, and looked around for things that fit.
    I discovered Technical Coaching.
    It was everything I loved doing.
  </p>

  <p>
    As a Technical Coach, I help product teams believe that things can be better, relighting that spark of curiosity that makes us love tech.
    If that sounds like something you'd be interested in, you can read <a href="/assets/cv.pdf">my CV</a>, or organise a call:
  </p>

  <div class="center">
    <Calendly/>
  </div>

  <hr/>

  <p>
    Keep an eye out, because I'm hoping to write a lot more (shorter!) posts for this blog, talking about all the cool things I get up to!
  </p>
</BlogPost>
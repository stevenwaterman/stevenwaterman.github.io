<script lang="ts">
  import BlogPost from "$lib/blog/BlogPost.svelte";
  import Snippet from "$lib/blog/snippets/Snippet.svelte";
  import Balance from "$lib/components/Balance.svelte";
  import snippets from "./snippets";
</script>

<style>
  video {
    border: 2px solid var(--grey-0);
    border-radius: 4px;
  }
</style>

<BlogPost id="balance-box">
  <p>
    There's a box sitting on my desk.
    Three sliders, and a number above each.
    How I feel in myself, how I feel professionally, and how I feel spiritually.
    With 0 being the worst, and 9 being the best.
    I try to keep it updated:
  </p>
  
  <figure>
    <Balance/>
  </figure>

  <p>
    Of course, updating my website <em>instantly</em> isn't doable.
    It's <strong>one second</strong> out of date:
  </p>

  <figure>
    <!-- svelte-ignore a11y-media-has-caption -->
    <video autoplay loop 
      title="Sorry for how overexposed this is. Clever Steven told his camera to auto-adjust ISO based on black plastic..."
      src="/assets/blog/balance-box/box-gif.mp4" 
      alt="A screen recording of this website, also showing my webcam. I am holding the balance box, and adjust the personal slider from 5 to 7. After a second, the value on the website updates. I adjust it back to 5, and the website updates again."
    />
    <figcaption>You really are seeing it in real-time</figcaption>
  </figure>

  <h2>Why?</h2>

  <p>
    Online, we curate an image of ourselves, like a personal brand, by only present one side of day-to-day life.
    For many of us, it's the same at work too.
    Opening up is uncomfortable, because it makes us feel vulnerable.
    Even though we know that everyone else has bad days too, it doesn't feel nice to admit it.
  </p>

  <p>
    I recently finished reading <a href="https://agileconversations.com/agile-conversation-book/">Agile Conversations</a>, which talks in detail about <a href="http://www.aral.com.au/resources/argyris2.html#a_as_m12">Argyris' two models of reasoning</a>.
    That last paragraph is a clear example of <em>Defensive Reasoning</em> (aka Model I), which we tend to use when there's something important on the line.
    Defensive Reasoning is undepinned by four principles:
  </p>

  <ol>
    <li>Achieve the purposes as the actor perceives them</li>
    <li>Maximise winning and minimise losing</li>
    <li>Minimise eliciting negative feelings</li>
    <li>Be rational and minimise emotionality</li>
  </ol>

  <p>
    You can probably think of a time when you followed those rules, trying to win an argument.
    Contrast that with Model II, <em>Productive Reasoning</em>, which aims to foster relationships and collaborate towards the best possible solution:
  </p>

  <ol>
    <li>Valid information</li>
    <li>Free and informed choice</li>
    <li>Internal commitment to the choice and constant monitoring of the implementation</li>
  </ol>

  <p>
    If I asked how you thought people should act in a discussion, you'd probably describe Model II.
    If I put you in a group, and offered a cash prize for the person who won the argument, you'd probably exhibit Model I.
  </p>

  <p>
    Defensive Reasoning is stressful, harms relationships, and produces worse outcomes.
    <strong>Screw everything about that.</strong>
    I have always preached openness, authenticity, and Productive Reasoning, but it's time for me to commit to it.
    Time to practice what I preach.
  </p>

  <p>
    <strong>I have emotions</strong>.
    And you know what?
    <strong>I have bad days too</strong>.
    And when I'm not feeling great?
    <strong>I'll tell you</strong>.
    This is me, committing to openness, Productive Reasoning, and vulnerability.
    And there's a big glowing box on my desk to remind me.
  </p>

  <figure>
    <img 
      style="max-height: 30em; margin-bottom: 1em;"
      src="/assets/blog/balance-box/box.png"
      title="It's quite menacing to be honest"
      alt="The finished balance box. It is a tall box made of black plastic, presenting a front face with three sliders, and a 7-segment display above each. The brightly glowing displays show the numbers 6-7-7."
    />
    <figcaption>The Finished Box</figcaption>
  </figure>

  <h2>Balance Scores</h2>

  <p>
    Reading <a href="https://itrevolution.com/a-radical-enterprise/">A Radical Enterprise</a>, I learnt about <em>Balance Scores</em>.
    A balance score is a set of three ratings, describing how you feel at the time, and giving a little bit of context for how you act.
    There's no explanation, no questions allowed, just three scores out of ten:
  </p>

  <ul>
    <li><strong>Personal</strong> - Your mental health, physical health, happiness, and general wellbeing</li>
    <li><strong>Professional</strong> - How much you are enjoying your job, and feel productive</li>
    <li><strong>Spiritual</strong> - Up to you. For me, it's a sense of belonging, knowing that I've found my place in the world and have true belief in a mission / purpose.</li>
  </ul>

  <p>
    At the start of each meeting, try going around the room and sharing your balance scores.
    By openly sharing our emotional state, it becomes much easier to use productive reasoning.
    It sets the stage for a discussion that fosters relationships, rather than one that damages them.
  </p>

  <p>
    Of course, everyone will have a different idea of what a 5 means, or even what personal wellbeing is.
    It doesn't really matter though.
    Over time, you get a feeling for what someone's baseline is, and whether they're better or worse than usual on a given day.
    It's not really about the numbers anyway, it's about creating a space for emotions and vulnerability, so do whatever works best for you.
    Feel free to just use `good` / `neutral` / `bad` instead, if that's easier.
  </p>

  <p>
    So I went a step futher, and built a box that live-updates everyone on how I'm feeling.
    Just three digits, 0-9, visible for anyone that wants to look.
    You can see my scores on any blog post, or at <a href="https://stevenwaterman.uk/Balance">https://stevenwaterman.uk/Balance</a>.
  </p>

  <h2>How?</h2>

  <p>
    The system is fairly simple, conceptually, and everything you need to make one for yourself is available on <a href="https://github.com/stevenwaterman/Balance">GitHub</a>.
    An Arduino is connected to my PC via USB, constantly reporting the current values set on the sliders.
    My PC writes that to Firestore, which updates any of the browsers currently on the page.
  </p>

  <figure>
    <img 
      style="width: 80%;"
      src="/assets/blog/balance-box/components.svg"
      title="Seeing how simple this is makes me feel bad for how long it took"
      alt="A potentiometer has its voltage read by an arduino. The arduino reports the 3 scores to my PC over serial. My PC sends the data to Firestore. A browser fetches the web page from GitHub Pages, and the data from Firestore."
    />
    <figcaption>System Architecture</figcaption>
  </figure>

  <p>
    I'll work my way through each component, giving a brief overview.
    If you have any questions, check out the GitHub repo, or feel free to get in touch!
  </p>

  <h3>Case</h3>

  <p>
    I designed the casing in CAD based on component measurements and 3d-printed it on a <a href="https://www.prusa3d.com/category/original-prusa-i3-mk3s/">Prusa i3 MK3S+</a>.
    I printed most of it in black PETG, and the sliders in grey PLA.
    It's case is printed in 3 parts, and held together with 4 bolts, which just self-tap into the holes.
  </p>

  <figure>
    <iframe
      style="width: 100%; height: 30em;"
      src="https://viewscreen.githubusercontent.com/view/solid?enc_url=68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f73746576656e77617465726d616e2f42616c616e63652f663964366538313333343937343664316161363136663831613336336164336631373462626232642f7072696e74657246696c65732f6578706c6f6465642e73746c"
      title="The case files"
      name="56009715-555d-4e55-9648-cf14f7f40f43"
    ></iframe>
    <figcaption>The 3d Printer Files for the Case</figcaption>
  </figure>

  <p>
    There's not much else to say here, because CAD and 3d printing are definitely out of scope for this post.
    If you're looking for printer recommendations, I can say that the MK3S+ is expensive compared to more DIY options, but it's rock solid reliable, and I haven't found anything it can't do (yet).
    If your hobby is 3d <strong>printers</strong>, it's not for you.
    Nothing ever breaks.
    If your hobby is print<strong>ing</strong>, it's perfect.
  </p>


  <h3>Electronics</h3>

  <p>
    A sliding potentiometer is connected between the 5v rail and ground, and its signal is connected to one of the analog pins on the Arduino.
    That's the only <em>necessary</em> part, and everything else is just for the displays, which are much more complicated.
  </p>

  <figure>
    <img 
      style="width: 80%;"
      src="/assets/blog/balance-box/circuit.svg"
      title="Seeing how simple this is makes me feel bad for how long it took"
      alt="A potentiometer has its voltage read by an arduino. The arduino reports the 3 scores to my PC over serial. My PC sends the data to Firestore. A browser fetches the web page from GitHub Pages, and the data from Firestore."
    />
    <figcaption>Circuit Diagram, One per slider</figcaption>
  </figure>

  <p>
    Each <a href="https://en.wikipedia.org/wiki/Seven-segment_display">7-segment display</a> consists of 7 LEDs, each with their own pin named A-G.
    Because I need to run 3 of these displays, and the arduino doesn't have 21 pins, I have to use a <a href="https://en.wikipedia.org/wiki/Shift_register">shift register</a> for each one.
    That lets me control the 7 output pins using only 3 pins on the arduino, writing pin states serially and outputting them in parallel.
  </p>

  <p>
    To limit the current sent through the LEDs in the display, each LED needs a resistor connected to it.
    I found it really helpful to use some <a href="https://en.wikipedia.org/wiki/Stripboard#/media/File:UniversalPCB.jpg">TriPad stripboard</a> to hold everything in place.
  </p>

  <p>
    Honestly, if I did this again, I'd probably not bother with the 7-segment displays.
    Instead, I'd use a potentiometer with discrete steps, or mark on the casing where each value was.
  </p>

  
  <h3>Arduino</h3>

  <p>
    The Arduino polls the 3 potentiometers 60 times per second, and converts their voltages into digits 0-9.
    If there is any change, it updates the 7-segment displays by writing to the shift registers, and writes the new values to the serial bus.
  </p>

  <p>
    Below is a shortened version of <a href="https://github.com/stevenwaterman/Balance/blob/master/arduino/sketch/sketch.ino">the actual code</a>, which only contains the code for one of the 3 balance scores.
    It uses the pin layouts from the diagram above.
  </p>

  <figure>
    <Snippet config={snippets.arduino} />
  </figure>

  <p>
    I have no doubt that there are errors in that code.
    Feel free to let me know, but no need to bully me for it - C isn't my strong suit.
    In fact that goes for the electronics - actually it goes for everything here.
    Let's just agree not to bully people for not knowing things.
  </p>

  <h3>Serial Listener</h3>

  <p>
    Currently, the Arduino is just shouting into the void (serially).
    We need something on the other end, to listen.
    I wrote a Node.js TypeScript app that runs on my PC, listening for incoming serial data, and sending it to <a href="https://firebase.google.com/docs/firestore">Firestore</a>.
  </p>

  <figure>
    <Snippet config={snippets.serial} />
  </figure>

  <p>
    In the Firestore database, one document (<code>current</code>) is available for anyone to read, which contains my current balance scores.
    It gets overwritten each time I adjust a slider.
    I also create a document in the <code>historic</code> collection, which is there for when I want to analyse the data later on.
  </p>

  <figure>
    <Snippet config={snippets.firestore} />
  </figure>

  <p>
    In <a href="https://github.com/stevenwaterman/Balance/blob/master/serial/src/index.ts">the real code</a>, there's also a 1-second debounce timer.
    This means that no database writes happen until I stop moving the slider.
    It also means that Firestore doesn't get overwhelmed, because it's not designed to handle more than one update per second on a single document.
  </p>

  <p>
    For security, I have the database configured to deny all writes, and then I use the <code>firebase-admin</code> package to bypass those permissions.
    This requires a certificate stored locally, which gets read from storage and passed to <code>firebase-admin</code>.
    In the future I'll probably integrate authentication so that I can update my scores from my phone too.
  </p>

  <p>
    I expect that this will sit completely within Firestore's free tier - with the only potential cost being $0.06 per 100,000 reads, after the first 50,000 per day.
    By the time $0.0000006 per page view gets expensive, everything else will have broken.
  </p>

  <h3>Website</h3>

  <p>
    Finally, we get to the little web app I made that displays my current balance score, <a href="https://stevenwaterman.uk/Balance">https://stevenwaterman.uk/Balance</a>.
    Like most of my personal projects, it's written in <a href="https://svelte.dev">Svelte</a>, hosted on <a href="https://pages.github.com/">GitHub Pages</a>, and <a href="https://github.com/stevenwaterman/Balance/blob/master/.github/workflows/main.yml">deployed</a> with <a href="https://github.com/features/actions">GitHub Actions</a>.
  </p>

  <p>
    It uses Firestore's <a href="https://firebase.google.com/docs/firestore/query-data/listen">realtime update</a> feature to listen for changes.
    Whenever the document is updated, 
    Again, this code has been cut down to only show one of the three values:
  </p>

  <figure>
    <Snippet config={snippets.web} />
  </figure>

  <p>
    The <a href="https://github.com/stevenwaterman/Balance/blob/master/web/src/routes/index.svelte">real code</a> has a load of extra styling, some transitions, and all of the Firestore config code.
    Then, to display the balance scores on this blog, I just add an <code>iframe</code>, and it all works nicely!
    (I <a href="/you-dont-need-js">still refuse</a> to enable JS on this blog)
  </p>

  <h2>Conclusion</h2>

  <p>
    This project took much, <strong>much</strong> longer than I expected.
    Honestly, it's a good thing that I didn't have the balance scores set up at the time, because I was <strong>not</strong> having a good time.
    I'm not showing you inside the box, because it's a complete mess and I'm ashamed of it.
    But it works!
  </p>

  <p>
    Everyone can see how I feel, and can get a little bit of context for my actions!
    I'm committing to being vulnerable, to sharing my knowledge, and to Productive Reasoning.
  </p>

  <p>
    Next time you're in a meeting, try and think about which model you're using.
    Try and share your emotions, and the knowledge that you are keeping to yourself.
    Introduce others to Balance Scores, Productive Reasoning, and Radical Vulnerability.
  </p>

  <p>
    If you want to make your own Balance box, everything you need is available on <a href="https://github.com/stevenwaterman/Balance">GitHub</a>.
  </p>
</BlogPost>
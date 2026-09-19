<script lang="ts">
  import BlogPost from "$lib/blog/BlogPost.svelte";
</script>

<BlogPost id="what-makes-a-great-metaphor">
  <p>
    Metaphors are one of the first tools we reach for when trying to explain complex technical concepts, and we often use them without even realising.
    Look at that last sentence. Tool is a metaphor, and so is reach! They're pervasive - but that's because they're so useful.
  </p>

  <p>
    But some metaphors are more powerful than others.
    A bad metaphor can confuse a learner, while a great metaphor kick-starts the process and makes it clear where the remaining gaps in their knowledge are.
  </p>

  <p>
    So what makes one metaphor bad, and another amazing?
  </p>

  <h2>
    A terrible metaphor just maps objects
  </h2>

  <p>
    Let's start by defining what a metaphor is.
    That way, I can show you the worst-but-still-technically-valid metaphor I can think of. Then we can discuss why it's so useless.
  </p>

  <p>
    <strong>Metaphor</strong>
  </p>

  <ul>
    <li>a figure of speech in which a word or phrase is applied to an object or action to which it is not literally applicable</li>
    <li>a thing regarded as representative or symbolic of something else</li>
  </ul>
    
  <p>
    So, a metaphor is any time we use figuratively use one thing to represent another.
    I can do that! Here goes:
  </p>

  <blockquote>
    Our API is a banana
  </blockquote>

  <figure>
    <img 
      style="max-height: 30em; margin-bottom: 1em;"
      src="/assets/blog/what-makes-a-great-metaphor/metaphors-1.png"
      alt="A box containing the word API, and another containing the word Banana."
    />
  </figure>

  <p>
    There we go.
    Perfectly valid metaphor right there.
    Package it up and ship it.
    Job done.
    Article finished.
    Everyone understands how great metaphors are right now.
    Right?
  </p>

  <h3>
    Something is missing
  </h3>

  <p>
    That banana metaphor is technically valid, but it's pointless and doesn't teach you anything.
    That's because it's missing the most important part of a metaphor - something that they dictionary definition doesn't cover at all.
  </p>

  <p>
    Think about your initial reaction to '<em>Our API is a banana</em>'.
    I'm guessing it was something like '<em>Okay, in what way?</em>'
  </p>

  <p>
    That's because <strong>a metaphor's power is not about the concepts themselves, but in the interactions between those concepts</strong>.
  </p>

  <p>
    In this case, our metaphor maps a concept (the API is a banana) and then stops.
    It never mentions interactions, nor can you really guess from the context what those interactions might be.
    A better metaphor would map multiple concepts <em>and</em> the interactions between those concepts.
  </p>

  <h2>
    An okay metaphor maps interactions too
  </h2>

  <p>
    Let's take that idea of mapping multiple concepts and their interactions at face value and come up with a metaphor that's better, but still not great:
  </p>

  <blockquote>
    Our API is a restaurant menu listing all the data you can order from us
  </blockquote>

  <figure>
    <img 
      style="max-height: 30em; margin-bottom: 1em;"
      src="/assets/blog/what-makes-a-great-metaphor/metaphors-2.png"
      alt="In real life, an API lists the data options. In the metaphor, a menu lists the food options."
    />
  </figure>

  <p>
    This is definitely an improvement.
    We map two concepts in real life to two objects in the metaphor.
    We never explicitly mention food, but the implication is good enough.
    Most importantly, the interaction between the two concepts is also covered in the metaphor.
  </p>

  <p>
    So now if you ask '<em>In what way?</em>', the answer is that both the API and the menu list the available options.
  </p>

  <p>
    However, '<em>Our API is a restaurant menu</em>' still isn't a great metaphor.
    It has a problem, and part of you already knows what that problem is.
    The part of you that's saying '<em>Okay but what about prices / waiters / tablecloths / the wait time / the little basket of bread they give you sometimes?</em>'
  </p>

  <h3>
    The expanded metaphor universe
  </h3>

  <p>
    The true power of metaphors come when they let you infer things.
    They let you use your existing knowledge about one concept to learn new things about an unfamiliar concept.
  </p>

  <p>
    When you hear that our API is a menu, you immediately start to think of all the other interactions you have with a menu.
    Most importantly, you assume that <em>all</em> the interactions you have with a menu in real life must also map back onto the API.
    If our API is a menu, and a menu lists prices, then our API must list prices too.
  </p>

  <figure>
    <img 
      style="max-height: 30em; margin-bottom: 1em;"
      src="/assets/blog/what-makes-a-great-metaphor/metaphors-3.png"
      alt="Yes, a menu lists food. But it also lists daily specials, drinks, and prices. You have to order via a waiter, and you have to wait for the food."
    />
  </figure>
  
  <p>
    In our menu metaphor, very few of the other interactions with a menu can be mapped back onto an API.
    A menu lists the food, but it also lists drinks, and daily specials too.
    So if our API is a menu, and it offers a data where a menu offers food, then you must also be able to request things other than data, since a menu doesn't just list food.
  </p>

  <p>
    ...and some data must only be available on a Thursday.
    Oh, and when your food comes at a restaurant, you eat it and then it's gone.
    So you have to request the data each time you want to use it, right?
    You can't have your data and eat it.
  </p>

  <p>
    Of course, this is a contrived example.
    In practice, nobody is going to hear '<em>Our API is a menu for data</em>' and ask about the daily specials.
    It's almost impossible to create a metaphor that works for <em>all</em> of those inferred interactions.
  </p>

  <p>
    But we can still try...
  </p>

  <h2>
    A great metaphor helps you make assumptions
  </h2>

  <p>
    Our menu metaphor was good, because it included multiple concepts and the interactions between those concepts.
    However, it didn't help us transfer our existing knowledge about adjacent concepts.
  </p>

  <p>
    A <em>great</em> metaphor would let you use your existing knowledge about the metaphorical objects to infer things about the unknown concepts:
  </p>

  <blockquote>
    Our API is the door to your data
  </blockquote>

  <figure>
    <img 
      style="max-height: 30em; margin-bottom: 1em;"
      src="/assets/blog/what-makes-a-great-metaphor/metaphors-4.png"
      alt="Our API is used to access your data in the same way that a door is used to access a house."
    />
  </figure>

  <p>
    That might not seem too different to the menu example, but it really shines when you start to infer other interactions between a door and a house:
  </p>

  <figure>
    <img 
      style="max-height: 30em; margin-bottom: 1em;"
      src="/assets/blog/what-makes-a-great-metaphor/metaphors-5.png"
      alt="A door can be open or locked (and if locked can be opened with a key), and made of wood or glass. A house protects from the rain, contains people, and might have multiple entrances."
    />
  </figure>

  <p>
    When you hear '<em>Our API is the door to your data</em>', you might start thinking about how a door can be open to let anyone through, or it can be locked, only letting people with a key through.
    You might infer that an API would work the same way, and you'd be right.
  </p>

  <p>
    You might think about the fact that your house has two doors, not just one.
    Maybe you can access your data with multiple different APIs.
    And you'd be right.
  </p>

  <p>
    You might think about how a house stops your belongings from getting wet when it rains, and try to think of what that would mean for an API and your data.
    Maybe an API helps you still get access to your data, even when the environment outside is inhospitable?
    Kinda, in the sense that APIs will limit the impact of bad actors via rate limiting.
    But that one's a bit of a stretch.
  </p>

  <p>
    As for the fact that doors can be made of wood or glass?
    You could probably come up with something, but I left that as a reminder that it's almost impossible to make a perfect metaphor.
    There will always be some interactions that don't map nicely.
  </p>

  <h2>
    The power of a great metaphor
  </h2>

  <p>
    Great metaphors make it quicker and easier to learn new topics by allowing you to transfer your existing knowledge onto a new concept.
    In the last example, all we said was '<em>Our API is the door to your data</em>', and immediately you're thinking:
  </p>

  <ul>
    <li>APIs are used to access data</li>
    <li>You might be able to have multiple different APIs for one bit of data</li>
    <li>Some APIs could be open to everyone, while others need a key. If I lose my key, I could talk to the people inside and they'll let me in</li>
    <li>The API helps protect my data</li>
    <li>Some APIs automatically close themselves because they're fire-rated and if I use a doorstop I'll get in trouble</li>
  </ul>

  <p>
    Now clearly, not all of that is exactly correct.
    However, it's a great starting point for a conversation.
    It lets the learner, who previously knew nothing about APIs, lead a conversation with an expert and ask questions to check their understanding.
  </p>

  <p>
    Thanks to our metaphor, our learner can immediately make some assumptions and ask '<em>Can you have multiple APIs for the same data, like how my house has a back door?</em>' - a much more effective way to learn.
  </p>

  <p>
    So the next time you reach for a metaphor when explaining a difficult-to-understand concept, think about what you could infer from it.
    Is there anything that the listener might infer, that would confuse them?
    Clarify it for them.
  </p>
    
  <hr/>

  <p>
    <em>
      I'd like to acknowledge Caitlin Walker and her book 'From Contempt to Curiosity' for getting me thinking about the theory behind metaphors and what makes them so powerful.
      It's a great book, and I highly recommend it.
    </em>
  </p>
</BlogPost>

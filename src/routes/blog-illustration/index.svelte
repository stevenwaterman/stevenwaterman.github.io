<script lang="ts">
  import BlogPost from "$lib/blog/BlogPost.svelte";
  import ToolRow from "$lib/blog/postComponents/blog-illustration/ToolRow.svelte";
</script>

<style>

</style>

<BlogPost id="blog-illustration">
  <p>
    A few months ago, I saw OpenAI's announcement of their next-gen image synthesis model, <a href="https://openai.com/dall-e-2/">DALL·E 2</a>.
    I started looking around to see what the open-source state-of-the-art looked like.
    While it's not <em>as good</em>, it still <em>is</em> very good.
    I discovered Disco Diffusion, integrated into that community, and even created my own fork.
  </p>

  <p>
    Since discovering AI art, I've used it to create the header image for all my blog posts.
    Looking at the <a href="/">home page</a>, you can see when that change happened.
  </p>

  <figure>
    <img
      src="/assets/blog/blog-illustration/blog.png"
      alt="A screenshot of my blog home page, showing the most recent 7 posts with AI art, and the 3 afterwards with boring diagrams."
    />
    <figcaption>Wow it's almost 3 months exactly!</figcaption>
  </figure>

  <h2>Tools</h2>

  <p>
    There are quite a few deep-learning image-generation tools available now.
    I'm going to focus on text-to-image, because that's what I have experience with.
    Likewise, this isn't a complete list at all.
    People are constantly creating new tools - I just discovered <a href="https://github.com/multimodalart/majesty-diffusion">Latent Majesty Diffusion</a> today.
  </p>

  <figure style="position: relative;">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Sample <span style="font-weight: normal;"><em>(hover)</em></span></th>
        </tr>
      </thead>
      <tbody>
        <ToolRow
          name="DALL·E 2"
          link="https://openai.com/dall-e-2/"
          description="Closed source, invite only (good luck), state of the art, amazing at everything but has strict content filtering."
          sample="dalle2.jpeg"
          source="https://twitter.com/PizzaDalle/status/1529169106632597505/photo/1"
          alt="A Raphael painting of a Madonna and child, eating pizza, by DALL E 2"
        />
        <ToolRow
          name="Midjourney"
          link="https://www.midjourney.com/"
          description="Closed source, invite only, paid-for, generally creates more artsy images with excellent detail and coherence."
          sample="midjourney.jpeg"
          source="https://twitter.com/Shade_9SQ/status/1541780528126468097/photo/1"
          alt="An abstract portait of a woman, made of black and white curves, with red highlights around the eyes and mouth. She looks tired of your BS."
        />
        <ToolRow
          name="Craiyon"
          link="https://www.craiyon.com/"
          description="Formerly dalle-mini, a FOSS reimplementation of the original DALL·E. Generally great coherency, not very artsy. Low resolution, but completely free to use."
          sample="craiyon.png"
          source="https://www.reddit.com/r/weirddalle/comments/v97r9p/black_and_white_noir_film_with_moai_statue/"
          alt="A screenshot of dalle-mini, showing a grid of 9 images generated from the prompt 'Black and white noir film with moai statue detective smoking a cigarette'."
        />
        <ToolRow
          name="Latent Diffusion"
          link="https://colab.research.google.com/github/multimodalart/latent-diffusion-notebook/blob/main/Latent_Diffusion_LAION_400M_model_text_to_image.ipynb"
          description="FOSS, run via Google Colab. Great coherency, especially with humans, animals, and text. Not very artsy."
          sample="latentdiffusion.jpeg"
          source="https://twitter.com/tallcanopy/status/1540205579859271681/photo/1"
          alt=""
        />
        <ToolRow
          name="Disco Diffusion"
          link="https://github.com/alembics/disco-diffusion"
          description="FOSS, run via Google Colab. Very configurable, quite artsy, sometimes lacks coherency. Very slow and compute-heavy. I use a custom fork of this."
          sample="discodiffusion.jpg"
          source="https://old.reddit.com/r/DiscoDiffusion/comments/utqtgj/got_lucky_with_this_batch_anime_metropolis/"
          alt="A neon pink geometric cityscape in an anime style. A girl is walking towards the city. The central skyscraper looks like it reaches up towards the moon."
        />
        <ToolRow
          name="Centipede Diffusion"
          link="https://colab.research.google.com/github/Zalring/Centipede_Diffusion/blob/main/Centipede_Diffusion.ipynb"
          description="Combination of Disco & Latent diffusion. Generates an image with Latent Diffusion, then feeds that into Disco Diffusion to re-make the same coherent composition but more artsy."
          sample="centipede.png"
          source="https://twitter.com/delta_sauce/status/1522736689487224832/photo/1"
          alt="A female Samurai wearing colourful clothes and a metal faceguard."
        />
        <ToolRow
          name="Prog Rock Diffusion"
          link="https://github.com/lowfuel/progrockdiffusion"
          description="A local, command-line version of Disco Diffusion, with support for breaking an image into small sections and upscaling them."
          sample="progrock.png"
          source="https://www.reddit.com/r/bigsleep/comments/ua5f2j/mangrove_swamp_prog_rock_diffusion_gobig/"
          alt="A lush green mangrove swamp, with trees and leaves growing out of the stagnant water."
        />
        
      </tbody>
    </table>
    <figcaption style="margin-top: 1em">Summary of the available tools</figcaption>
  </figure>

  <p>
    Generating these images is really compute-intensive, so you'll generally struggle to get anything bigger than about 1000x2000, even if you have 40GB of VRAM available.
    Instead, generate something smaller, then use an upscaling tool.
    I've used <a href="https://github.com/xinntao/Real-ESRGAN">Real-ESRGAN</a> and <a href="https://www.topazlabs.com/gigapixel-ai">Topaz Gigapixel AI</a> in the past, and can recommend them.
  </p>

  <h2>My Workflow</h2>

  <p>
    Personally, I use a <a href="https://colab.research.google.com/drive/1wgQrpF0B7m0fCOKrLXO36rs34BE91u6g?usp=sharing">custom version</a> of <strong>Disco Diffusion</strong> (DD).
    You'll need to pay for Colab Pro to get more powerful GPUs - as all of my settings are based on you getting an NVIDIA T4 or P100 GPU.
  </p>

  <p>
    In my custom notebook, I've implemented a feature that allows doing part of a DD run, then stopping and saving it.
    That gives me more control over the generation, by progressing it bit-by-bit, and re-running until I like how that stage went.
    It's a bit like <a href="https://stevenwaterman.uk/musetree">MuseTree</a>, my AI music tool.
  </p>

  <p>
    Another benefit of splitting up the image generation is that I can start with at a small resolution with large, RAM-heavy models.
    Then, as we progress and have less need for the coherency of those large models, we can move to smaller models at a larger resolution.
    The process of upscaling mid-run isn't trivial, but that's a topic for another day.
  </p>

  <p>
    To generate the header image for this post, I split the full generation into 4 stages.
    I used the settings in <a href="https://colab.research.google.com/drive/1wgQrpF0B7m0fCOKrLXO36rs34BE91u6g">the notebook</a> that I linked.
    For reference, here's the header image again, captioned with the prompt that I used:
  </p>

  <figure>
    <img
      src="/assets/blog/blog-illustration/header.png"
      alt="A futuristic woman wearing a helmet with large goggles, in a neon color scheme. The word AI is emblazoned on her chest. There is a robot shooting lasers visible in the goggles."
    />
    <figcaption>A beautiful painting named 'AI is my tool, and I am the artist, would you like to see?', by Pixar and by Mike Winkelmann, trending on artstation.</figcaption>
  </figure>

  <h3>Step 1: Composition</h3>
  
  <p>
    The first stage is very short, only running for the first 8% of the generation.
    It's designed to very quickly show me the direction the image is going in, and what the overall composition will look like.
    Each image is 640x384px resolution, and takes about 15 minutes to generate.
  </p>

  <figure>
    <img
      src="/assets/blog/blog-illustration/composition.png"
      alt="A grid of four small blurry images. The top right one looks a bit like a car, on a red background, while the other three look like a yellow, green, and brown cyborg respectively. The bottom left one is a green cyborg with a camera for a face and a flat cap on."
    />
    <figcaption>4 example outputs from the Composition stage</figcaption>
  </figure>

  <p>
    As you can see, this stage has a huge amount of variability - these are all completely different images.
    I actually generated 16 different versions, but I've gone as high as 50 before.
    This stage is pretty fast, so I can just leave it running until I see something I like.
    I'll often run stage 2 with a few different options, just to help make the decision.
  </p>

  <p>
    In this case, I chose the bottom-left of those 4 images.
    Do you see the similarity?
    Note that I horizontally flipped the final image, so the following examples might all look mirrored to you.
    Feel free to look at the back of your monitor instead, to correct for that.
  </p>


  <h3>Step 2: Shape</h3>

  <p>
    Once we have the overall composition of the image - the areas of light an dark - we move on to defining the shape of each object.
    This is probably the stage that has the biggest impact on coherency, as most of the options generated are a bit too abstract or deformed for my liking.
  </p>

  <p>
    The shape stage runs from 8-40%, at the same resolution as the first stage, and takes around an hour per output.
    Have a look at some of the options generated:
  </p>

  <figure>
    <img
      src="/assets/blog/blog-illustration/shape.png"
      alt="A grid of 4 brown-green images, based off the one I selected in the previous section. The one I picked has what looks like a turban and a large pair of ski goggles on. The background contains some trees and orbs of white light. The other 3 are all missing eyes or have one eye a completely different size/shape."
    />
    <figcaption>4 example outputs from the Shape stage</figcaption>
  </figure>

  <p>
    Of the 15 options I generated, I chose the bottom right one in the grid above.
    It had great coherency, matched the theme of AI art that I was going for, and generally felt quite captivating.
    It reminds me of <a href="https://disney.fandom.com/wiki/Screenslaver">the Screenslaver</a> from the Incredibles 2.
  </p>

  <p>
    It wasn't the only one with those properties - and there were definitely others that I liked, such as the one below.
    It's just personal preference in the end, and I liked that one.
    If, when filling in the details, I couldn't get it to go in a direction I liked, I would probably come back and pick a different option at stage 2.
  </p>

  <figure>
    <img
      src="/assets/blog/blog-illustration/shape_2.png"
      alt="A young boy, shown from the neck-up, with one eye missing and wearing a turban made out of metal computer parts."
    />
    <figcaption>One of the other options that I liked from the Shape stage</figcaption>
  </figure>


  <h3>Step 3: Details</h3>

  <p>
    At this point, we have a good idea of what the image will look like, so we start upscaling and using less powerful models.
    The details stage upscales by 1.5x, to 960x576px, and runs from 40-70%.
    We see an explosion of colour, sharp edges, and detail in the background and objects around the image.
  </p>

  <figure>
    <img
      src="/assets/blog/blog-illustration/details.png"
      alt="A side-by-side of two images following on from my favourite in the last section. The pictures are much more colorful, and the goggles now have a small ethereal robot inside of them. Above the goggles is what looks like an old CPU that pushes into a slot. On the left, the letters I M are on the person's chest. On the right, it is the letters I A instead."
    />
    <figcaption>2 example outputs from the Details stage</figcaption>
  </figure>

  <p>
    The details stage is usually the longest, occasionally requiring 30+ images until I find something I'm happy with.
    At 35 mins per image, that's a long time.
    For this post, it was the quickest.
  </p>

  <p>
    The 2 images that you see above are the <em>only</em> two images I generated.
    DD usually struggles with text, so when I saw that the 2nd output had the word <em>AI</em> written clearly on the person's neck, I was amazed.
    Yes, it was backwards, but we can (did) fix that in post, and I didn't hate the way the rest of the image had come out!
  </p>

  <h3>Step 4: Texture</h3>

  <p>
    Finally, we work on the tiny details of the image, and finish upscaling it.
    The texture stage uses the smallest models out of any stage, and increases the reslution by 1.66x, to 1600x960px.
    That's 6.25x as many pixels as the first stage!
  </p>

  <p>
    As the name suggests, this stage is all about texture.
    Tiny bumps on skin, roughness of materials, individual strands of hair, and fake brush strokes.
    I've shown a small slice of each option at full resolution, because the differences are tiny, even though this stage lasts all the way from 70-100%.
  </p>

  <figure>
    <!-- svelte-ignore a11y-img-redundant-alt -->
    <img
      src="/assets/blog/blog-illustration/texture.png"
      alt="Three slices from the previous image, stacked top-to-bottom. Each one shows a different version with added texture. They're basically identical, it's like a really hard spot-the-difference."
    />
    <figcaption>Samples from 3 example outputs from the Texture stage</figcaption>
  </figure>

  <p>
    Despite taking 27 mins per run on average, this stage tends to be quite quick.
    Since the difference between runs are so tiny, I usually only generate a few before I'm happy with one of them.
    In this case - and the fact that I had to look it up is telling - I picked the middle one, out of 4 total options.
  </p>

  <p>
    So this is the point where the AI part ends, and the human part starts.
    Here's the raw output from Disco Diffusion, before I started doing a little bit of manual cleanup:
  </p>

  <figure>
    <img
      src="/assets/blog/blog-illustration/texture_final.png"
      alt="The header, but flipped horizontally, a little bit taller, and with some signatures in the bottom right."
    />
    <figcaption>My favourite output from the Texture stage</figcaption>
  </figure>

  <h3>Manual Cleanup</h3>

  <p>
    There were a few things that needed fixing in this version, before I could use it on my blog.
  </p>

  <p>
    I flipped the image horizontally, so that the word <em>AI</em> would show up correctly, and started to remove the signatures in the bottom right.
    Since the models used by Disco Diffusion were trained on a lot of art, it's used to seeing signatures all over the place.
    It's trying to recreate the things it sees, so it adds signature-like black squiggles sometimes.
  </p>

  <p>
    Occasionally, it will convert the signature into a bird, or some other object, towards the end of the run.
    In this case, they were still there, so I painted over them using the <em>heal</em> tool in <a href="https://www.gimp.org/">GIMP</a>.
  </p>

  <p>
    Finally, I cropped the top and bottom of the image slightly, so that It would display better as a header image.
    I configured my blog to position the header image to be bottom-aligned, so you can clearly see the <em>AI</em>.
    And that's it!
  </p>

  <figure>
    <img
      src="/assets/blog/blog-illustration/header.png"
      alt="The header again."
    />
    <figcaption>The finished header image</figcaption>
  </figure>

  <h2>Get Started</h2>

  <p>
    If you want to get started with making your own AI art, here are some of the things that helped me.
    For slightly techy people, I'd definitely recommend the <a href="https://discord.gg/pfRGbwqhTN">EleutherAI discord server</a>, and its art channel.
    They're really friendly, and some of the most knowledgeable people when it comes to AI art.
    It's not really for beginners though.
  </p>

  <p>
    If you are a complete beginner, try out <a href="https://colab.research.google.com/github/alembics/disco-diffusion/blob/main/Disco_Diffusion.ipynb">Disco Diffusion</a>.
    You can ask questions in their <a href="https://discord.gg/rxrVBpggMG">Discord server</a>, which is very active and helpful.
    To learn more about DD, read through <a href="https://docs.google.com/document/d/1l8s7uS2dGqjztYSjPpzlmXLjl5PM3IGkRWI3IiCuK7g/mobilebasic">Zippy's DD cheatsheet</a> in full.
    It's an amazing reference guide, and will answer most of your questions.
  </p>

  <p>
    Once you understand what most of the settings do, check out <a href="https://docs.google.com/document/d/1ORymHm0Te18qKiHnhcdgGp-WSt8ZkLZvow3raiu2DVU/edit?usp=sharing">the EZ Charts</a> document, which has a visual reference for most settings.
    There's also a visual reference of different <a href="https://weirdwonderfulai.art/resources/disco-diffusion-70-plus-artist-studies/">artists</a> and <a href="https://weirdwonderfulai.art/resources/disco-diffusion-modifiers/">modifiers</a> that you can use in prompts.
    The <a href="https://old.reddit.com/r/DiscoDiffusion/">subreddit</a> also has a load of model studies.
  </p>

  <p>
    And you can also ask me for help!
  </p>

  <h2>Conclusion</h2>

  <p>
    I'm not very artistic, but learning about DALL·E 2 set me off down a path of creating AI art.
    It's been a load of fun, and my blog looks amazing now.
    I'm super excited about all the possibilities of this new technology, and I can't wait to see what you all do with it!
  </p>

  <figure>
    <img
      src="/assets/blog/blog-illustration/house.png"
      alt="A modernist house sits in a grassy meadow surrounded by forest. A futuristic car is parked outside. The house is an angular mis-mash of shiny steel, dark wood, and glass."
    />
    <figcaption>The first image I made with my custom DD fork</figcaption>
  </figure>

</BlogPost>
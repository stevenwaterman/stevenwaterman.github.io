<script lang="ts">
  import BlogPost from "$lib/blog/BlogPost.svelte";
  import YoutubeEmbed from "$lib/blog/YoutubeEmbed.svelte";
</script>

<BlogPost id="microbit-raytracer">
  <p>
    The <a href="https://microbit.org/">BBC Micro:Bit</a> is a single-board computer that aims to help children learn to code.
    It has 16KB of RAM, a 16MHz processor, and a 25 pixel "screen" (which is just a 5x5 LED array).
    On their website, they propose <a href="https://makecode.microbit.org/projects">lots of fun ideas that you can try</a>.
  </p>

  <p>
    For <em>some reason</em>, they don't suggest trying to implement a ray tracer - an algorithm which simulates light rays to render a 3D scene.
    That may have something to do with the fact that <a href="https://en.wikipedia.org/wiki/Ray_tracing_(graphics)#Disadvantages">ray tracing is incredibly slow, even on fast computers</a> and <a href="https://sciencebehindpixar.org/pipeline/rendering">Pixar has entire supercomputers dedicated to it</a>.
    Nonetheless, I like a challenge!
  </p>

  <h2>Show me!</h2>

  <p>
    I don't want to keep you waiting, so here's the end result.
    The Micro:Bit is rendering a pyramid, with two bright red sides and two dark red sides.
    You can turn the camera by tilting, and move it with the buttons.
  </p>

  <YoutubeEmbed code="mtHFzrI7zEE"/>

  <p>
    Of course, the best bit about the Micro:Bit is its <a href="https://makecode.microbit.org/#editor">scratch-like, blocks-based IDE</a>.
    It has the killer feature of letting you convert a program back and forth between blocks and JavaScript - which I couldn't resist.
    Click the image to see a full-quality version.
  </p>

  <figure>
    <a href="https://stevenwaterman.uk/microbit-raytracer/blocks.html">
      <img
        src="/assets/blog/microbit-raytracer/blocks.jpg"
        alt="It's is zoomed out so much that you can barely tell what's going on. It is clear that the blocks-based IDE was not designed for this."
        title="Click me to see the full resolution"
      />
    </a>
  </figure>

  <p>
    The code is available <a href="https://github.com/stevenwaterman/microbit-raytracer">on GitHub</a>.
    You can try it out for yourself <a href="https://makecode.microbit.org/_dRJ72yCK0V6E">in the official emulator</a> or <a href="https://stevenwaterman.uk/microbit-raytracer/index.html">in my custom-made HTML test bench</a> (which generated the hi-res images in the top left of the video).
  </p>

  <p>
    The remainder of this post discusses more about the Micro:Bit, and explains what a ray tracer actually is and how it works.
    In my next blog post, I will discuss the actual implementation, and the challenges I faced when optimising such an intensive algorithm for the Micro:Bit.
  </p>

  <h2>A :bit more about the Micro:Bit</h2>

  <p>
    I apologise for that subheading...
  </p>

  <p>
    The <a href="https://microbit.org/">BBC Micro:Bit</a> is a single-board computer, like a <a href="https://www.raspberrypi.org/">Raspberry Pi</a> or <a href="https://www.arduino.cc/">Arduino</a>.
    It was announced March 2015 and released February 2016, costing under £15.
    For that, you get a pretty impressive <a href="https://microbit.org/guide/features/">feature list</a>:
  </p>

  <ul>
    <li>16MHz ARM Cortex-M0 processor</li>
    <li>256KB nonvolatile storage and 16KB RAM</li>
    <li>Power via USB or Battery</li>
    <li>25 LEDs</li>
    <li>Radio & Bluetooth</li>
    <li>2 programmable buttons</li>
    <li>Accelerometer, Compass, Light & Temperature sensors</li>
    <li>3 general purpose input/output (GPIO) pins</li>
    <li>3V 90mA power & ground for accessories</li>
  </ul>

  <figure>
      <img
        src="/assets/blog/microbit-raytracer/microbit.jpg"
        alt="The Micro:Bit and its packaging. It has a 5x5 array of LEDs in the middle, with a button either side."
        title="It's no supercomputer"
      />
  </figure>

  <p>
    There are many ways to program the Micro:Bit, including:
  </p>

  <ul>
    <li><a href="https://makecode.microbit.org/reference">Blocks + Javascript</a> (actually somewhere between JavaScript and Typescript, but they don't say that)</li>
    <li><a href="https://microbit.org/guide/python/">Python</a> (actually <a href="https://micropython.org/">MicroPython</a></li>
    <li><a href="https://microbit.org/guide/mobile/#swift">Swift</a></li>
    <li><a href="https://microbit.org/code-alternative-editors/">Many other 3rd party programs</a></li>
  </ul>

  <p>
    In any source language, the user's program is <a href="https://tech.microbit.org/software/hex-format/">compiled to a HEX file</a> which <a href="https://tech.microbit.org/software/#high-level-programming-languages">contains the ARM assembly code</a>.
    This assembly code usually interacts with the <a href="device abstraction layer">https://tech.microbit.org/software/runtime-mbed/</a> which provides a simpler interface for controlling the board's functionality such as Bluetooth and accelerometer.
  </p>

  <p>
    Basically everything about the Micro:Bit is open-source and well-documented, so check out their [developer site](https://tech.microbit.org/).
  </p>

  <h2>What's a Ray Tracer, Anyway?</h2>

  <p>
    A <a href="https://en.wikipedia.org/wiki/Ray_tracing_(graphics)">ray tracer</a> is a program which renders a 3D scene by simulating the path of light from a virtual camera.
    Rather than try and explain it in words, I have created a series of pictures demonstrating the process:
  </p>

  <p>
    On the left hand side of the scene, we can see the virtual camera.
    It sits behind the origin point, and is currently looking straight ahead, in the <code>z</code> direction.
  </p>

  <figure>
    <img
      src="/assets/blog/microbit-raytracer/raytrace-1.jpg"
      alt="The 3d environment is mostly white with a grid drawn on the floor. There are two darker grid lines representing x=0 and z=0. At the point where they cross, there is some text saying 0,0."
      title="The camera is a virtual object in the scene and chooses what direction we fire the rays"
    />
  </figure>

  <p>
    The pyramid is made of four triangles.
    It sits further away from the camera, with two light sides and two dark sides.
  </p>

  <figure>
    <img
      src="/assets/blog/microbit-raytracer/raytrace-2.jpg"
      alt="A few meters away from the camera, we see a square-based pyramid sitting on the grid. The side facing the camera is bright red, while the right-hand side is a darker red."
      title="The pyramid is the physical object that we want to render in the scene"
    />
  </figure>

  <p>
    Here, we visualise the <code>view plane</code> - the representation of the screen.
    It is a 5x5 grid, which sits 1m away from the camera.
    The width of the grid is customisable, and affects how wide of a view the camera has.
    Each LED on the Micro:Bit is represented by one cell in the grid.
  </p>
  
  <figure>
    <img
      src="/assets/blog/microbit-raytracer/raytrace-3.jpg"
      alt="A grid appears in the scene, with an arrow from the camera demonstrating that it is 1m away and 0.5m wide."
      title="There are other (better looking) ways to arrange the rays, but this is the fastest to compute"
    />
  </figure>

  <p>
    Now, we simulate the rays.
    Each of the 25 rays originates at the camera (now hidden) and travels through the center of a grid cell.
    For higher-quality rendering you could send multiple rays through each pixel, evenly spaced, and average the result.
  </p>

  <figure>
    <img
      src="/assets/blog/microbit-raytracer/raytrace-4.jpg"
      alt="Many bright-red lines appear, propoagating from the camera's location and shooting off into the distance. Some go through the pyramid."
      title="The rays are infinitely long"
    />
  </figure>
  
  <p>
    Some of the rays went through the pyramid.
    Let's just keep those, and remove the ones that didn't hit anything.
  </p>

  <figure>
    <img
      src="/assets/blog/microbit-raytracer/raytrace-5.jpg"
      alt="There are now far fewer rays - only the ones that went through the pyramid remain."
      title="Looks painful"
    />
  </figure>

  <p>
    Any time a ray hits something, we fill that cell the same colour as the object that the ray hit.
    This means that if a ray hits the dark side of the pyramid, the cell would get filled in a darker colour.
    The rays that don't hit anything get coloured in black, since the camera can't see anything in that pixel.
  </p>

  <figure>
    <img
      src="/assets/blog/microbit-raytracer/raytrace-6.jpg"
      alt="The grid has been filled in so that it displays something vaguely resembling a pyramid."
      title="The Egyptians would be proud"
    />
  </figure>

  <p>
    Bear in mind that this is the absolute simplest version of ray tracing.
    More advanced versions simulate the light as it bounces off objects or refracts through glass.
    They also consider the location of virtual lights within the 3D scene, allowing objects to cast shadows that appear in the resulting renders.
    Considering that the Micro:Bit already struggled with the simple version, that may have been a bit much to ask.
  </p>

  <h2>Conclusion</h2>

  <p>
    Frankly, I think this was an outstanding success.
    It works well enough on the Micro:Bit, it's accurate, and it works really well as a learning tool.
    I understand ray tracers much better, and it was a great excuse to play with the Micro:Bit!
  </p>

  <p>
    In <a href="/raytracer-how-to">Part 2</a>, I discuss how you actually implement a ray tracer, and how I approached programming the Micro:Bit for maximum performance.
  </p>
</BlogPost>
<script lang="ts">
  import BlogPost from "$lib/blog/BlogPost.svelte";
import Snippet from "$lib/blog/snippets/Snippet.svelte";
  import snippets from "./snippets";
</script>

<BlogPost id="minesweeper-optimisation">

  <p>
    <em>This post explores my experience optimising a web app through iterative improvement.</em>
    <em>The app uses <a href="https://svelte.dev">Svelte</a>, but you don't need any prior experience, and most of what I discuss applies to any web app.</em>
  </p>
  
  <p>
   <em>It follows on from <a href="https://blog.scottlogic.com/2020/02/10/embrace-your-obsessions.html">Embrace your Obsessions!</a> so if you want to learn more about Minesweeper and the context of this post, give it a read.</em>
  </p>
  
  <p>
    After my <a href="https://www.youtube.com/watch?v=2ibiA5TEsxw">NE:Tech talk</a>, I was upset at how slow <a href="https://stevenwaterman.uk/Minesweeper-Constrained">Minesweeper Constrained</a> was, especially when its auto-solver was enabled.
    Trying to solve a 10x10 board would result in the app freezing for a few seconds, and anything bigger than 15x15 would probably crash the tab.
  </p>

  <p>
    Now, I could've just optimised the React-Redux version.
    I knew exactly <a href="https://github.com/stevenwaterman/Minesweeper-Constrained/blob/master/README.md#technology">why it was slow and how to fix it</a> - but where's the fun in that?
    Instead, I decided to learn <a href="https://svelte.dev">Svelte</a> an up-and-coming web framework that puts performance first.
    Svelte code adds extra features and syntax to JavaScript, as well as changing the meaning of some default JavaScript syntax.
    It doesn't add any runtime libraries to your site, meaning less overhead and smaller page sizes.
    Instead, it sits in your build pipeline transpiling your Svelte code to plain JavaScript.
    In this sense, it is similar to <a href="https://babeljs.io/">Babel</a> and <a href="https://www.typescriptlang.org/">TypeScript</a>. 
  </p>
  
  <p>
    <em>All related code is <a href="https://github.com/stevenwaterman/Minesweeper-Optimisation">stored in the GitHub repository</a>.</em>
    <em>You can try each iteration of the app <a href="https://stevenwaterman.uk/Minesweeper-Optimisation/">on my website</a>.</em>
  </p>
  
  <h2>Rewrite it in Svelte</h2>
  
  <p>
    The app is very simple, displaying a 100x100 Minesweeper board and automatically solving it.
    The board visually updates as the solver progresses.
    The algorithm is basic and often gets stuck on boards that humans could easily solve.
    It applies the same rules as the solver in Minesweeper Constrained: 
  </p>

  <ul>
    <li>If a clear cell already has all of its surrounding bombs revealed, clear the unknown cells around it.</li>
    <li>If every unknown cell around a clear cell must be a bomb to reach the number, flag them all.</li>
  </ul>
  
  <p>
    The app looks like this:
  </p>

  <figure>
    <img
      src="/assets/blog/minesweeper-optimisation/board-1.png"
      title="It took like 30 seconds to get this far"
      alt="A Minesweeper board that has only just started being completed"
    />
  </figure>
  
  <p>
    You probably noticed that only a small portion of the board has been solved.
    It's not that the solver got stuck, I just got bored of waiting.
    I'm grateful that it didn't crash my browser, but we have to admit that it's not very fast.
    The 'performance' tab of Chrome's developer tools reveals that it topped out at <strong>1.9 fps</strong>.
    It was around this time that I realised rewriting in Svelte didn't automatically make my app fast.
    I would still need to do some optimisation.
  </p>
  
  <p>
    In the below screenshot of the browser's developer tools, we can see that the app spent 6 seconds processing the solver before outputting one frame.
    The app's slowness can be attributed to the JavaScript, represented in yellow and blue, which took a very long time to run.
    Specifically, most of the time was spent running the <code>update</code> function, which is part of Svelte's global state management.
    If we want to improve the speed of the app, we need to look there.
  </p>
  
  <figure>
    <img
      src="/assets/blog/minesweeper-optimisation/devtools-1.png"
      title="So speedy"
      alt="The entire screen is taken up with javascript running, and a single frame is output at the very end"
    />
  </figure>
  
  <h3>Snapshots</h3>
  
  <ul>
    <li><a href="https://github.com/stevenwaterman/Minesweeper-Optimisation/tree/eeb2fb5e5719ffcf64c93fe80ecf45a25e82d4a8">Source Code</a></li>
    <li><a href="https://stevenwaterman.uk/Minesweeper-Optimisation/initial/index.html">Live Version</a></li>
  </ul>
  
  <h2>Derive Bottom-Up</h2>
  
  <p>
    Before we start our deep-dive optimising the global state management in the app, we need to understand <em>how</em> Svelte deals with global state.
    Like Redux, Svelte holds its data in <a href="https://svelte.dev/docs#svelte_store">stores</a> that can be subscribed to.
    When a store's value changes, any components subscribed to that store are re-rendered.
  </p>

  <p>
    We can also use the <code>derived</code> function to create a new store based on the values of our existing stores.
    It takes two parameters:
  </p>

  <ol>
    <li>The list of parent stores that we are deriving from</li>
    <li>A function that calculates the value of the derived store based on the parent values</li>
  </ol>

  <p>
    For example, a derived store that adds the values of its two parent stores could be declared using:
  </p>

  <Snippet config={snippets.deriving}/>
  
  <p>
    Whenever the value of any parent store changes, the value of the derived store is recalculated.
    If the calculated value is the same as before, nothing happens.
    However, if the value has changed, then the derived store will trigger its own update and the process will continue down the chain to its subscribers.
  </p>
  
  <p>
    I used derived stores constantly in the app.
    The diagram below shows a rough outline of how I handled global state.
  </p>
  
  <ul>
    <li>Components (things that actually appear on the page) are shown as hexagons</li>
    <li>Stores are shown as rectangles</li>
    <li>Subscriptions to stores are shown as arrows.</li>
    <li>The direction of the arrows show the direction of data flow</li>
  </ul>

  <figure>
    <img
      src="/assets/blog/minesweeper-optimisation/original.png"
      title="Each cell's store was derived from the central store"
      alt="Originally, there was one central store from which each cell's individual store was derived"
    />
  </figure>
  
  <p>
    This pattern made it simple to update the global state.
    There was one large store which acted as the source of truth.
    Any changes to the state of the board got sent to the main store.
    The change filters through the derived stores to the cell components.
  </p>

  <p>
    Below is an animated version of the above diagram.
    It demonstrates how an update filters through the dependency network.
    Any node shown in red is one that had to be checked to see if it had changed.
  </p>

  <figure>
    <!-- svelte-ignore a11y-media-has-caption -->
    <video autoplay loop style="width: 100%">
      <source src="/assets/blog/minesweeper-optimisation/original-gif.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </figure>
  
  <p>
    When Cell 1 was revealed, the app sent an update to the main store.
    Since the value of the main store had changed, each derived store had to be checked to see if their value had been affected.
    We know that only Cell 1 had changed, meaning only the component for Cell 1 actually needed re-rendering.
    All of those checks were pointless!
  </p>
  
  <p>
    In small projects, that's not really a problem.
    <em>This app</em> has over 10,000 derived stores and (eventually) 60 updates per second.
    In our case, it is a problem.
  </p>

  <p>
    We have a single large top-level store, and we derive multiple smaller stores by extracting a slice of that large state.
    I call this pattern <em>Deriving Top-Down</em>.
    The inverse of this is <em>Deriving Bottom-Up</em>, where we derive a large store from multiple small stores each containing more specific information.
    If you're confused about the 'Bottom-Up' name, consider a pyramid of stores:
  </p>
  
  <figure>
    <img
      src="/assets/blog/minesweeper-optimisation/pyramid.png"
      title="It's not a very creative name"
      alt="There are many small stores at the bottom of the pyramid, forming the wide base. As you move up the pyramid, there are fewer, larger stores. The arrows all move from the bottom to the top"
    />
  </figure>
  
  <p>
    When the arrows are pointing from the bottom to the top, we are deriving the large stores from the small ones.
    Since the arrows are pointing from the bottom upwards, we are deriving bottom-up.
  </p>

  <p>
    In my app's diagram, making the switch just reverses the dependencies between the large store and the per-cell stores.
    Rather than deriving per-cell stores from the large store, we derive the large store from the per-cell stores.
    The per-cell stores now act as the source of truth for that cell's state.
  </p>

  <p>
    To reveal Cell 1, we now send the update to the Cell 1 store:
  </p>

  <figure>
    <!-- svelte-ignore a11y-media-has-caption -->
    <video autoplay loop style="width: 100%">
      <source src="/assets/blog/minesweeper-optimisation/better-gif.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </figure>
  
  <p>By Deriving Bottom-Up, we prevent 9,999 unnecessary checks!</p>

  <p>
    There <em>are</em> downsides to deriving bottom-up.
    Any action that updates multiple small stores becomes more complicated.
    In my app, I had to create functions to abstract away from the individual stores and update multiple stores with one method call.
  </p>
  
  <h3>Results</h3>
  
  <p>
  Changing the structure of the global state to derive bottom-up instead of top-down produced a <strong>1126%</strong> speedup, meaning the app now runs at 23.3fps.
  In developer tools, we can see that the JavaScript runs much faster, meaning the limiting factor is now the time to compute the HTML layout:
  </p>
  
  <figure>
    <img
      src="/assets/blog/minesweeper-optimisation/devtools-2.png"
      title="Much better!"
      alt="The Javascript is a small portion of the total time taken"
    />
  </figure>

  <p>
    In this image, it looks like the layout is suddenly much slower than before.
    However, nothing has changed, we are just more zoomed in since the app is running at a much higher framerate.
  </p>

  <h3>Snapshots</h3>

  <ul>
    <li><a href="https://github.com/stevenwaterman/Minesweeper-Optimisation/tree/db4b4cc5edebdd7ca49f2f4cd96d3ae459dd5502">Source Code</a></li>
    <li><a href="https://github.com/stevenwaterman/Minesweeper-Optimisation/commit/db4b4cc5edebdd7ca49f2f4cd96d3ae459dd5502">Code Changes</a></li>
    <li><a href="https://stevenwaterman.uk/Minesweeper-Optimisation/bottom-up/index.html">Live Version</a></li>
  </ul>
  
  <h2>Stop Unnecessary Layouts</h2>

  <p>
    At this point, we have to enter the scary world of *HTML Optimisation*.
    There's no point optimising our Svelte code more when it won't make a noticeable difference.
    As shown in developer tools, the app spends lots of time computing the HTML layout of the page.
    This step in the rendering pipeline decides where each node should appear on the page, calculating their position and size.
  </p>

  <p>
    When the solver reveals a cell, it adds text to it - a number (if clear) or an <code>X</code> (if flagged).
    This causes the browser to think the cell might have changed position, as adding a new node to the grid would usually cause every other node to shift along one.
    Since the text is overlaid on top of the cell, we know that it won't cause any changes to the layout.
    However, the browser isn't clever enough to know that.
  </p>
  
  <p>
    Thanks to our good friend Google, I found some really helpful documentation on <a href="https://csstriggers.com/">what triggers a layout</a>.
    There is a whole set of CSS properties that can be changed without triggering a layout, including the colour of text and backgrounds.
  </p>

  <p>
    Since the app knows what text will be displayed in each cell once revealed, it can simply add the text at the start with <code>color: transparent</code> (check your target browser's compatibility).
    Then, when the cell is revealed, the colour can be changed to make the text visible without triggering a layout.
  </p>

  <h3>Results</h3>
  
  <p>
    Preventing the layout step resulted in a respectable 57% speedup, allowing the app to reach 36.5fps.
    In developer tools, the once-painful layout step is nowhere to be seen.
    The new priority is the paint step, shown as the really long green bar below:
  </p>
  
  <figure>
    <img
      src="/assets/blog/minesweeper-optimisation/devtools-3.png"
      title="It's like an episode of Bob Ross over here"
      alt="The javascript and css run very fast, with the paint step taking the longest"
    />
  </figure>
  
  <h3>Snapshots</h3>

  <ul>
    <li><a href="https://github.com/stevenwaterman/Minesweeper-Optimisation/tree/7056af424c62c38bc38967b0c9e00922f7bea6e0">Source Code</a></li>
    <li><a href="https://github.com/stevenwaterman/Minesweeper-Optimisation/commit/7056af424c62c38bc38967b0c9e00922f7bea6e0">Code Changes</a></li>
    <li><a href="https://stevenwaterman.uk/Minesweeper-Optimisation/no-layout/index.html">Live Version</a></li>
  </ul>
  
  <h2>Paint Less</h2>
  
  <p>
    So why does painting take so long?
  </p>

  <p>
    Each frame, we need to paint an 800x800 pixel area.
    Eventually, we want to be able to do that 60 times per second.
    That's a big ask to begin with, and it's even worse when you consider the number of paint commands being executed.
  </p>
  
  <p>
    For each cell, we need to paint:
  </p>

  <ol>
    <li>The background</li>
    <li>The border</li>
    <li>The text</li>
  </ol>
  
  <p>
    That's 30,000 paint commands, and it gets slow.
    We can see them using Chrome's <a href="https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/reference#paint-profiler">advanced paint instrumentation</a>:
  </p>

  <figure>
    <img
      src="/assets/blog/minesweeper-optimisation/paint.jpg"
      title="It took minutes for the paint profiler to load..."
      alt="The paint profiler shows many steps, repeating the same 3 for each cell"
    />
  </figure>
  
  <p>
    Immediately, I see that we could remove the borders.
    That would reduce the number of paint steps for each cell from 3 to 2.
    We could replace the cell borders with a checkerboard pattern in the background.
  </p>

  <p>
    Subjectively, it doesn't look as nice, but we only care about performance!
  </p>

  <h3>Results</h3>
  
  <p>
    By simply removing the borders, we see a 37% improvement to 50.1fps.
    The developer tools look remarkably similar to last time.
    Despite reducing the number of paint steps, that stage of the rendering pipeline is still the slowest.
  </p>
  
  <figure>
    <img
      src="/assets/blog/minesweeper-optimisation/devtools-4.png"
      title="I demand 60 fps!"
      alt="It looks basically the same"
    />
  </figure>

  <h3>Snapshots</h3>

  <ul>
    <li><a href="https://github.com/stevenwaterman/Minesweeper-Optimisation/tree/90acd51f436a53b97fcbda90447211d5826995d7">Source Code</a></li>
    <li><a href="https://github.com/stevenwaterman/Minesweeper-Optimisation/commit/90acd51f436a53b97fcbda90447211d5826995d7">Code Changes</a></li>
    <li><a href="https://stevenwaterman.uk/Minesweeper-Optimisation/no-borders/index.html">Live Version</a></li>
  </ul>
  
  <h2>Skip Transparent Text</h2>

  <p>
    Every time there is a 0 or an unknown cell, we paint a transparent number.
    Instead of using the transparent colour, we could use <code>opacity: 0</code> and <code>will-change: opacity</code> (check your target browser's compatibility).
  </p>

  <p>
    When we set <code>opacity</code> instead of <code>color</code>, the browser knows not to paint the invisible text.
    By setting <code>will-change: opacity</code>, we tell the browser not to waste its time performing a useless layout pass, since all we change is the text's opacity.
  </p>

  <p>
    However, setting <code>will-change</code> causes the browser to split each cell into its own layer, resulting in 10,000 layers on the page.
    This is incredibly slow since the layers need to be combined together before rendering, in a step known as *layer compositing*.
  </p>

  <p>
    We'll just have to tolerate that the app paints transparent text, since the layers are just too slow.
    Well, they're slow if we have too many...
  </p>
  
  <h2>Split into layers</h2>

  <p>
    When rendering a frame, the app paints the entire board, even though only a few cells have changed.
    It would be more efficient if we could re-use the previous renders for the parts that haven't changed.
  </p>

  <p>
    We can do that by splitting the board into sections using layers.
    Then, any layers that haven't changed don't have to be re-painted and the old version can be reused.
  </p>

  <p>
    Adding too many layers can cause slowness during compositing, so we can't go too extreme.
    I found that the sweet spot was around 100 layers, each containing 100 cells.
    Each of these layers was 1% the original size and therefore roughly 100x as fast to paint.
  </p>

  <figure>
    <img
      src="/assets/blog/minesweeper-optimisation/header.png"
      title="It would be hard to play Minesweeper like this"
      alt="The board is split into 100 squares, each 10x10 cells. They are slightly overlapping in this view"
    />
  </figure>

  <p>
    Layers can be any rectangular shape, and the goal is the minimise how often a change affects multiple layers.
    In our case, since cells affect each other in all directions, I chose square layers.
    If cells only affected each other horizontally, we could use long rows instead.
  </p>

  <p>
    To create these layers, I replaced the 100x100 grid of cells with a 10x10 grid of containers.
    Each contained a 10x10 grid of cells, and was placed in its own HTML layer by setting <code>z-index</code>.
  </p>

  <p>
    I added <code>backface-visibility: hidden</code> to the containers which is designed for rendering 3D scenes in the browser.
    This was a bit hacky, but disabled some browser optimisation, forcing it to respect the <code>z-index</code> value and put the node in its own HTML layer.
  </p>

  <h3>Results</h3>

  <p>
    Finally, we hit our goal of running the app at 60fps!
    In developer tools, we can see that the paint step has been split into multiple shorter paint steps, each handling one layer:
  </p>

  <figure>
    <img
      src="/assets/blog/minesweeper-optimisation/devtools-5.png"
      title="Silky smooth 60 fps, finally"
      alt="Painting still takes a long time, but it's split into multiple smaller jobs"
    />
  </figure>

  <p>
    All was well in the world - until I tried it in Firefox...
  </p>

  <p>
    As it turns out, Firefox isn't nearly as optimised when it comes to rendering layers.
    In fact, splitting the board into layers had only made it slower.
    The app was sitting at around 30fps.
  </p>

  <h3>Snapshots</h3>

  <ul>
    <li><a href="https://github.com/stevenwaterman/Minesweeper-Optimisation/tree/33efa2db860f6872865c0cacfe8c254200fd8983">Source Code</a></li>
    <li><a href="https://github.com/stevenwaterman/Minesweeper-Optimisation/commit/33efa2db860f6872865c0cacfe8c254200fd8983">Code Changes</a></li>
    <li><a href="https://stevenwaterman.uk/Minesweeper-Optimisation/layers/index.html">Live Version</a></li>
  </ul>
  
  <h2>Use Canvas</h2>

  <p>
    The HTML rendering pipeline is very efficient, given that it needs to render arbitrary HTML.
    However, our last few optimisations have focussed on rearranging our code to convince the renderer that its checks are unnecessary.
    It's not that the renderer is bad, it's just that we know more about our app and what it displays.
  </p>

  <p>
    For example, we know that none of the cells ever move around the screen, meaning the layout is static.
  We also know that none of the cells overlap, and that cells are always opaque.
  The renderer doesn't have any of that contextual knowledge.
  </p>

  <p>
    Using <a href="https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API">HTML5 Canvas</a>, we get full control over the renderer, letting us specify exactly what paint steps to use.
    This lets us factor in our contextual knowledge about the app.
    We can skip painting transparent text, and we can just paint the cells that have changed.
  </p>

  <p>
    Since the app is a static, non-interactive grid, it's simple to generate the paint steps.
    Our canvas code is along the lines of:
  </p>

  <ul>
    <li>when a cell is created or updated:</li>
    <ul>
      <li>calculate the pixel coordinates for the cell</li>
      <li>fill a fixed-size square in background colour</li>
      <li>if cell state known and text != "0":</li>
      <ul>
        <li>draw the text in text colour</li>
      </ul>
    </ul>
  </ul>

  <p>
    Notice that the board is never cleared, we simply paint over the top.
    We know this is safe to do because the cells are opaque and never move or overlap.
  </p>

  <h3>Results</h3>
  
  <p>
    Using Canvas, we now hit 60fps in both Chrome <em>and</em> Firefox.
    In developer tools, we can see that the paint step has now been offloaded to the GPU, and there's no layout or layer composition steps.
  </p>
  
  <figure>
    <img
      src="/assets/blog/minesweeper-optimisation/devtools-6.png"
      title="Make that GPU work work work work work work!"
      alt="All of the painting has been offloaded to the GPU"
    />
  </figure>
  
  <p>
    Currently, we still have the Cell components, but their job is just to paint on the canvas.
    We <em>could</em> improve performance by just having one controller that handles rendering.
    I'm not going to do that though.
  </p>

  <p>
    Technical debt is inevitable when doing this kind of iterative process.
    My original goal was to learn Svelte, and ignoring 90% of its features in the name of performance makes that a bit pointless.
  </p>

  <h3>Snapshots</h3>

  <ul>
    <li><a href="https://github.com/stevenwaterman/Minesweeper-Optimisation/tree/34069831d34cde2080138650d96edda67aea6ede">Source Code</a></li>
    <li><a href="https://github.com/stevenwaterman/Minesweeper-Optimisation/commit/34069831d34cde2080138650d96edda67aea6ede">Code Changes</a></li>
    <li><a href="https://stevenwaterman.uk/Minesweeper-Optimisation/canvas/index.html">Live Version</a></li>
  </ul>
  
  <h2>Conclusion</h2>
  
  <p>
    I achieved everything I set out to do!
    My app ran at 60fps, I understood the browser's rendering pipeline, and I learnt Svelte.
  </p>
  
  <p>
    If you learn anything from this blog post, let it be this:
  </p>
  
  <ul>
    <li>Svelte is good but it doesn't make <em>you</em> good</li>
    <li>Browser rendering is well-documented magic</li>
    <li>Simple things are simple with HTML Canvas</li>
  </ul>
  
  <p>
    If you're interested in my first <em>real</em> project using Svelte, check out <a href="https://github.com/stevenwaterman/musetree">MuseTree</a>: a Human-AI collaborative music tool.
  </p>
</BlogPost>

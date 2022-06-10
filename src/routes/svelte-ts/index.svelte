<script lang="ts">
  import BlogPost from "$lib/blog/BlogPost.svelte";
  import Snippet from "$lib/blog/snippets/Snippet.svelte";
  import snippets from "./snippets";
</script>

<BlogPost id="svelte-ts">
  <p>
    Svelte is an up-and-coming web framework which removes the need for any runtime libraries by adding a transpilation step in its build process.
    I first started using Svelte in January, seen in <a href="/minesweeper-optimisation">my optimisation blog post</a>, and have since used it for my AI music generation tool <a href="https://www.stevenwaterman.uk/musetree/">MuseTree</a>.
    In my experience, Svelte was blazing-fast and super simple to use, making me more productive than ever before.
    There was just one problem:
  </p>

  <p>
    <strong>no TypeScript support</strong> 😱
  </p>

  <p>
    Thankfully, support has slowly been improving over time.
    You can see this evolution in MuseTree, with more and more of its code slowly becoming TypeScript as wider support was implemented.
    It has finally reached the point where I feel comfortable saying that you can use Svelte with TypeScript, so it's time to spread the word.
  </p>

  <p>
    Get excited because we're about to use my two favourite web technologies together.
    Find a spare 5 minutes and grab your nearest Svelte project (<a href="https://github.com/sveltejs/template">store-bought is fine</a>) - it's time to get stuck in.
  </p>

  <p>
    <em>All code samples in this post are taken from my <a href="https://github.com/stevenwaterman/svelte-ts">example repo on GitHub</a></em>
  </p>

  <h2>Update Your Build Config</h2>

  <p>
    <em>These steps assume that you are starting with the <a href="https://github.com/sveltejs/template">official Svelte template</a></em>
  </p>

  <h3>package.json</h3>

  <p>
    All that's changed in <code>package.json</code> is some new dev dependencies:
  </p>

  <ul>
    <li><code>svelte-preprocess</code> lets us define preprocessing steps in rollup</li>
    <li><code>@rollup/plugin-typescript</code> registers TypeScript transpilation as one of those steps</li>
    <li><code>typescript</code> is used by the TypeScript plugin</li>
    <li><code>svelte-check</code> gives us compile-time type checking</li>
  </ul>

  <p>
    You can install all of these at once with
    <code>npm i -D svelte-preprocess @rollup/plugin-typescript typescript svelte-check</code>
    then follow it up with <code>npm install</code> to make sure all your dependencies are installed.
  </p>

  <h3>rollup.config.js</h3>

  <p>
    This is where the real changes happen.
    First, <strong>update the <code>input</code> from <code>main.js</code> to <code>main.ts</code></strong>.
    Then import our two new plugins at the top of the file:
  </p>

  <Snippet config={snippets.imports}/>

  <p>
    Next, we need to write our own plugin, as seen below.
    This plugin runs <code>svelte-check</code>, which is a command-line utility and not available as a rollup plugin directly.
    Add this block to the bottom of your rollup config.
  </p>

  <Snippet config={snippets.typeCheck}/>

  <p>
    Finally, at the top of the plugins list, add this block to register the three new plugins:
  </p>

  <Snippet config={snippets.plugins}/>

  <p>
    If you already have a <code>svelte</code> section in your config, just replace it.
    Now, every time we build our project, it will first type-check your code and transpile any TypeScript code into JavaScript.
  </p>

  <h3>tsconfig.json</h3>

  <p>
    Since we're using TypeScript, we need a <code>tsconfig.json</code> file to configure it.
    Nothing special here, so if you're experienced with TypeScript then use it like normal.
    Otherwise, just create a file at the root of your project named <code>tsconfig.json</code> containing this config:
  </p>

  <Snippet config={snippets.tsConfig}/>

  <h3>main.js</h3>

  <p>
    Rename your entrypoint from <code>main.js</code> to <code>main.ts</code>.**
    The first line, <code>import App from './App.svelte';</code> will cause compilation errors as you can't import a Svelte component into a TypeScript file.
    Make the compiler ignore that error by adding <code>// @ts-ignore</code> on the line above the import.
  </p>

  <p>
    That's everything!
    Your Svelte project is now configured to work with TypeScript.
  </p>

  <h2>
    Start Using TypeScript in Svelte
  </h2>

  <p>
    First things first, use an IDE that supports the <a href="https://microsoft.github.io/language-server-protocol/">Language Server Protocol</a>.
    That includes VS Code, Atom, Sublime Text, and many others.
    It <strong>does not</strong> include JetBrains IDEs.
    Even as a die-hard JetBrains fan, I have resigned myself to using VS Code, which is the best supported.
    <a href="https://microsoft.github.io/language-server-protocol/implementors/tools/">A full list of supported IDEs is available here</a>.
  </p>

  <p>
    Get the relevant Svelte extension - such as <a href="https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode">Svelte for VS Code</a>.
    This adds in-IDE type checks for your Svelte code.
  </p>

  <p>
    Then simply <strong>change your <code>&lt;script&gt;</code> tag to <code>&lt;script lang="ts"&gt;</code></strong> in each Svelte component, and you're off!
    Start using TypeScript, and you'll see any type errors in your IDE.
    When you're running the project, you'll also get type errors in the terminal:
  </p>

  <figure>
    <img
      src="/assets/blog/svelte-ts/typeCheck.png"
      alt="Type errors are being written to the terminal"
      title="These checks run when you do a production build too"
    >
  </figure>

  <h3>Gotchas</h3>

  <p>
    The TypeScript support in Svelte isn't perfect.
    There's a few things you need to look out for:
  </p>

  <ul>
    <li>When importing a type into a Svelte component, you need to use the <code>import type</code> syntax. This means you might have two import statements for one file, like this:</li>
  </ul>

  <Snippet config={snippets.gotcha1}/>

  <ul>
    <li>To add types to a reactive declaration (<code>$:</code>), you have to do it in two steps. First, declare the variable using let with the correct type. Then add a reactive declaration like normal, without any types.</li>
  </ul>

  <Snippet config={snippets.gotcha2}/>

  <ul>
    <li>The type definitions for the inline <code>style</code> on a DOM component are lying. They say they support JSX-like style objects, but really only support strings. If you want to use JSX, try the <code>react-style-object-to-css</code> library.</li>
    <li>Types are only checked inside the <code>&lt;script&gt;</code> tags, meaning you can have a text input with <code>bind:value=&#123;stringVariable&#125;</code>.</li>
    <li>The app won't live-reload when you change a <code>.ts</code> file, only when you change the <code>.svelte</code> files.</li>
  </ul>

  <h3>Conclusion</h3>

  <p>
    Svelte is amazing, and it's even better with TypeScript.
    While support isn't perfect, it's good enough that I'd recommend it to anyone that's used Svelte and TypeScript before.
    If you've been waiting for TypeScript support before learning Svelte, now's the time to get stuck in.
  </p>

  <p>
    Make sure you check out the <a href="https://github.com/stevenwaterman/svelte-ts">GitHub Repo</a> which contains a working example project.
  </p>
</BlogPost>

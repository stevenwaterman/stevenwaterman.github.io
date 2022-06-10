import { SnippetConfig } from "../../lib/blog/blogData";

const imports: SnippetConfig = {
  name: "Imports",
  language: "ts",
  snippet: `import typescript from "@rollup/plugin-typescript";
  import sveltePreprocess from "svelte-preprocess";`
};

const typeCheck: SnippetConfig = {
  name: "TypeCheck",
  language: "ts",
  snippet: `function typeCheck() {
    return {
      writeBundle() {
        require('child_process').spawn('svelte-check', {
          stdio: ['ignore', 'inherit', 'inherit'],
          shell: true
        });
      }
    }
  }`
}

const plugins: SnippetConfig = {
  name: "Plugins",
  language: "ts",
  snippet: `typeCheck(),
  typescript({ sourceMap: !production }),
  svelte({
    preprocess: sveltePreprocess(),
    dev: !production,
    css: css => {
      css.write("public/build/bundle.css");
    }
  })`
}

const tsConfig: SnippetConfig = {
  name: "tsConfig.json",
  language: "json",
  snippet: `{
    "include": ["src/**/*"],
    "exclude": ["node_modules/*", "public/*"],
    "compilerOptions": {
      "target": "ESNEXT",
      "lib": ["ESNEXT", "dom"],
      "module": "ESNEXT",
      "moduleResolution": "node",
  
      "esModuleInterop": true,
      "allowSyntheticDefaultImports": true,
      "strict": true,
      "forceConsistentCasingInFileNames": true,
      
      "resolveJsonModule": true,
      "isolatedModules": true,
      "noEmit": true,
      "strictNullChecks": true
    }
  }`
}

const gotcha1: SnippetConfig = {
  name: "Gotch #1",
  language: "ts",
  snippet: `import {searchBinaryTree} from "./tree"
  import type {BinaryTree, BinaryTreeNode} from "./tree"`
};

const gotcha2: SnippetConfig = {
  name: "Gotch #2",
  language: "svelte",
  snippet: `let inverseSliderValue: number;
  $: inverseSliderValue = 10 - sliderValue;`
};

export default { imports, typeCheck, plugins, tsConfig, gotcha1, gotcha2 }

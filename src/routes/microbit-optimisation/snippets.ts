import { SnippetConfig } from "../../lib/blog/blogData";

const simpleBench: SnippetConfig = {
  name: "Simple Test Bench",
  language: "html",
  snippet: `<html>
  <head>
      <script src="./myCode.js"></script>
  </head>
</html>`
}

const stubs: SnippetConfig = {
  name: "Test Bench Stubs",
  language: "ts",
  snippet: `const Button = {
    A: "a",
    B: "b",
    AB: "ab"
};

let aPressed = () => {};
let bPressed = () => {};
let abPressed = () => {};

const input = {
    onButtonPressed: (button: string, func: () => void) => {
        if (button === Button.A) aPressed = func;
        if (button === Button.B) bPressed = func;
        if (button === Button.AB) abPressed = func;
    }
}`
}

const bench: SnippetConfig = {
  name: "Test Bench",
  language: "html",
  snippet: `<html>
  <head>
      <script src="./myCode.js"></script>
  </head>

  <body>
      <button onClick="aPressed()">A</button>
      <button onClick="bPressed()">B</button>
      <button onClick="abPressed()">AB</button>
  </body>
</html>`
}

const highMemory: SnippetConfig = {
  name: "High Memory Usage",
  language: "ts",
  snippet: `function getRange(values: number[]) {
    return {
        min: Math.min(values),
        max: Math.max(values)
    }
}`
}

const lowMemory: SnippetConfig = {
  name: "Low Memory Usage",
  language: "ts",
  snippet: `let minResult: number = 0;
  let maxResult: number = 0;
  
  function getRange(values: number[]) {
      minResult = Math.min(values);
      maxResult = Math.max(values);
  }`
}

const globalState: SnippetConfig = {
  name: "Global State",
  language: "ts",
  snippet: `const rangeResult = {
    min: 0,
    max: 0
};

function getRange(values: number[]) {
    rangeResult.min = Math.min(values);
    rangeResult.max = Math.max(values);
}`
}

export default { simpleBench, stubs, bench, highMemory, lowMemory, globalState };

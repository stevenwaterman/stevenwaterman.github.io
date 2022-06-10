import { SnippetConfig } from "../../lib/blog/blogData";

const deriving: SnippetConfig = {
  name: "Deriving Stores",
  language: "ts",
  snippet: `  const added = derived(
    [store1, store2],
    ([$store1, $store2]) => $store1 + $store2
);`
}

export default { deriving };

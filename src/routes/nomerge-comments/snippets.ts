import { SnippetConfig } from "../../lib/blog/blogData";

const ignoredTodo: SnippetConfig = {
	name: "core.ts",
	language: "ts",
	snippet: `
  function centralMethodUsedEverywhere(opt: Options) {
      // TODO IMPORTANT: add validations for all options

      /* ... */
  }

  /*
  > git blame
  > 3176a8d9611 frontend/core.ts  (steven waterman   2019-02-21 11:35:33 +0000    2)
  */
  `
};

const actions: SnippetConfig = {
	name: "nomerge.yml",
	language: "yaml",
	snippet: `
  name: "Check for NoMerge comments"

concurrency:
  group: nomerge-\${{ github.ref }}
  cancel-in-progress: true

on:
  pull_request:
    types:
      - synchronize
      - opened
      - reopened
      - labeled

jobs:
  search:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      # Way faster than grep
      - run: sudo apt install silversearcher-ag
      # Fail whenever it finds 'NoMerge' case-insensitive
      # Ignore the .git folder
      # Ignore this file
      # Look in .github .husky etc but not ../
      # This also listens to .gitignore etc
      - run: "! ag -i --ignore=git --ignore=nomerge.yml NoMerge .[^.]* ."
`
};

export default {
	ignoredTodo,
	actions
};

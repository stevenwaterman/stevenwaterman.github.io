import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import svelte from "eslint-plugin-svelte";
import globals from "globals";
import ts from "typescript-eslint";
import svelteConfig from "./svelte.config.js";

export default ts.config(
	{
		ignores: [".svelte-kit/", "build/", "static/applause/"]
	},
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs.recommended,
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	},
	{
		files: ["**/*.svelte"],
		languageOptions: {
			parserOptions: {
				parser: ts.parser,
				svelteConfig
			}
		},
		rules: {
			"svelte/no-at-html-tags": "off",
			"svelte/no-navigation-without-resolve": "off",
			"svelte/no-not-function-handler": "off",
			"svelte/no-unused-svelte-ignore": "off",
			"svelte/no-useless-mustaches": "off",
			"svelte/require-each-key": "off"
		}
	},
	prettier,
	...svelte.configs.prettier
);

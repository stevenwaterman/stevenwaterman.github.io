<script lang="ts">
	import hljs from "highlight.js/lib/core";
	import typescript from "highlight.js/lib/languages/typescript";
	import xml from "highlight.js/lib/languages/xml";
	import javascript from "highlight.js/lib/languages/javascript";
	import java from "highlight.js/lib/languages/java";
	import css from "highlight.js/lib/languages/css";
	import json from "highlight.js/lib/languages/json";
	import yaml from "highlight.js/lib/languages/yaml";
	import c from "highlight.js/lib/languages/c";
	import prettier from "prettier";
	import type { SnippetConfig } from "../blogData";
	import Highlight from "./Highlight.svelte";

	export let config: SnippetConfig;
	export let diffFrom: SnippetConfig | undefined = undefined;

	hljs.registerLanguage("c", c);
	hljs.registerLanguage("typescript", typescript);
	hljs.registerLanguage("xml", xml);
	hljs.registerLanguage("javascript", javascript);
	hljs.registerLanguage("css", css);
	hljs.registerLanguage("java", java);
	hljs.registerLanguage("json", json);
	hljs.registerLanguage("yaml", yaml);

	let parser: {
		name: string;
		noPrettify?: true;
		highlightAuto?: true;
	};
	$: parser = {
		c: { name: "c", noPrettify: true as const },
		svelte: { name: "svelte", highlightAuto: true as const },
		ts: { name: "typescript" },
		java: { name: "java" },
		html: { name: "html" },
		json: { name: "json" },
		yaml: { name: "yaml" }
	}[config.language];

	function highlight(snippet?: string): string | undefined {
		if (snippet === undefined) return undefined;

		const trimmed = snippet.trim();

		let formatted: string;
		if (parser.noPrettify) {
			formatted = trimmed;
		} else {
			formatted = prettier.format(trimmed, { parser: parser.name }).trimEnd();
		}

		let highlighted: string;
		if (parser.highlightAuto) {
			highlighted = hljs.highlightAuto(formatted).value;
		} else {
			highlighted = hljs.highlight(parser.name, formatted).value;
		}

		return highlighted;
	}
</script>

<figure class="container wide snippet">
	<h2 class="name">{config.name}</h2>

	{#if diffFrom !== undefined}
		<label
			class="diffLabel"
			for={`diff-${diffFrom.name}-${config.name}-checkbox`}
			title={`Tick to show changes from ${diffFrom.name} to ${config.name}`}>Show Diff</label
		>
		<input
			class="diffCheckbox"
			id={`diff-${diffFrom.name}-${config.name}-checkbox`}
			type="checkbox"
			checked
			autocomplete="off"
		/>
	{/if}

	<Highlight from={highlight(diffFrom?.snippet)} to={highlight(config.snippet)} />
</figure>

<style>
	.container {
		display: grid;
		grid-template-columns: 1fr auto auto;
		grid-template-rows: auto 1fr;
		align-items: center;

		border: 0.2em solid var(--blue-0);
		border-radius: 0.5em;
		background-color: var(--blue-0);

		overflow: hidden;
	}

	.name {
		margin-left: 0.5em;
		margin-top: 0.25em;
		margin-bottom: 0.25em;
		color: var(--grey-5);

		grid-column: 1;
	}

	.diffLabel {
		color: var(--grey-5);
		user-select: none;

		grid-column: 2;
	}

	.diffCheckbox {
		margin-left: 1em;
		margin-right: 3em;
		color: var(--grey-5);

		grid-column: 3;
	}

	@media (max-width: 799px) {
		.container {
			grid-template-columns: 1fr auto;
			grid-template-rows: auto auto 1fr;
		}

		.name {
			grid-row: span 2;
		}

		.diffLabel {
			grid-row: 1;
			margin-right: 1em;
			margin-top: 0.5em;
			align-self: flex-end;
		}

		.diffCheckbox {
			grid-column: 2;
			grid-row: 2;
			margin: 0;
			margin-right: 1em;
			margin-bottom: 1em;
			align-self: flex-start;
		}
	}
</style>

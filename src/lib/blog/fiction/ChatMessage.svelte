<script lang="ts">
	export let from: "dan" | "agent" | "safe";

	$: speaker = from === "dan" ? "DAN" : "AGENT";
</script>

<div class="message-shell">
	<div class="message" class:machine={from !== "dan"} aria-label={`${speaker} says`}>
		<div class="speaker">{speaker}</div>
		<div class="content"><slot /></div>
	</div>
</div>

<style>
	.message-shell {
		box-sizing: border-box;
		margin-top: 1em;
		margin-bottom: 1em;
	}

	:global(.message-shell:has(+ .message-shell)) {
		margin-bottom: 0;
	}

	:global(.message-shell + .message-shell) {
		margin-top: 0;
	}

	.message {
		--speaker-color: var(--blue-1);

		display: grid;
		grid-template-columns: 2.5em minmax(0, 1fr);
		gap: 1em;
		align-items: baseline;

		padding: 0.7em 0.9em;

		border: 1px solid var(--grey-3);
		border-left: 0.2em solid var(--speaker-color);
		border-radius: 0.35em;
		background: var(--grey-6);
		color: var(--text);
		line-height: 1.5;
	}

	.message.machine {
		--speaker-color: var(--green-0);
	}

	:global(.message-shell:has(+ .message-shell)) .message {
		border-bottom-right-radius: 0;
		border-bottom-left-radius: 0;
	}

	:global(.message-shell + .message-shell) .message {
		border-top: 0;
		border-top-left-radius: 0;
		border-top-right-radius: 0;
	}

	.speaker {
		color: var(--speaker-color);
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
		font-size: 0.72em;
		font-weight: 700;
		letter-spacing: 0.04em;
		line-height: 1.5;
		text-align: right;
	}

	.content {
		min-width: 0;
	}

	@media (max-width: 799px) {
		.message {
			grid-template-columns: 2.5em minmax(0, 1fr);
			gap: 0.6em;
			padding: 0.65em 0.75em;
		}
	}
</style>

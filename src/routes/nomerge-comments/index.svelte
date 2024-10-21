<script lang="ts">
	import BlogPost from "$lib/blog/BlogPost.svelte";
	import Snippet from "$lib/blog/snippets/Snippet.svelte";
	import snippets from "./snippets";
</script>

<BlogPost id="nomerge-comments">
	<p>
		How many times have you left a console log in prod? Do you ever forget what you still need to do
		before releasing some code? How often do you comment something out and forget to re-add it
		before releasing?
	</p>

	<p>
		For me, constantly. Hopefully it's pretty common for you too. This blog post won't be very
		popular if it turns out that I'm the only one.
	</p>

	<p>
		At TalkJS we solved it with <code>NOMERGE</code> comments. Think of them like <code>TODO</code>s
		you can't forget. Because I think we've all experienced this:
	</p>

	<Snippet config={snippets.ignoredTodo} />

	<h2>How?</h2>

	<p>
		We use GitHub actions for CI. It was as simple as adding a new job which greps the codebase for
		`NOMERGE`. If found, the CI job will fail, making it clear that there's something that you
		forgot to do.
	</p>

	<Snippet config={snippets.actions} />

	<h2>Why?</h2>

	<p>
		I use nomerge comments any time there's something that <strong>must</strong> happen before the code
		is released:
	</p>

	<ul>
		<li>
			To track the things I haven't implemented yet:<br /><code
				>// NOMERGE add pagination support</code
			>
		</li>

		<li>
			To stop myself from committing my debug logs:<br /><code
				>console.log("NOMERGE batching ran")</code
			>
		</li>

		<li>
			When deliberately breaking things to reproduce bugs:<br /><code
				>NOMERGE this terminates the connection whenever immediately</code
			>
		</li>

		<li>When reviewing big PRs<br /><code>// NOMERGE Does this code ever run?</code></li>

		<li>
			When I'm deep in flow but have a concerning thought<br /><code
				>// NOMERGE I think these events could happen out of order</code
			>
		</li>
	</ul>

	<p>Hope it's useful.</p>

	<hr />

	<p style="font-size: 0.8em">
		Also, I can't believe it's been over a year since I last posted. Apparently my last post was <a
			href="/burden-deliberate-choice/"
			>a depressing mologue about how overwhelming society is, and how I wanted to become a medieval
			shepherd</a
		>. Things are better. I got therapy. I'll update at some point. I have exciting shepherd
		thoughts.
	</p>
</BlogPost>

<style>
	li {
		margin-top: 1em;
	}
</style>

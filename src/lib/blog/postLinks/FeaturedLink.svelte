<script lang="ts">
	import { toDateString } from "$lib/utils/date";

	import type { AuthorDetails, BlogId, BlogPost } from "../blogData";
	import { authors, blogPosts } from "../blogData";

	export let id: BlogId;

	let post: BlogPost;
	$: post = blogPosts[id];

	let authorDetails: AuthorDetails;
	$: authorDetails = authors[post.author];

	let fit: BlogPost["header"]["fit"];
	$: fit = post.header?.fit ?? "cover";

	let position: BlogPost["header"]["position"];
	$: position = post.header?.position ?? "center";
</script>

<a
	href={`/${id}`}
	class:life={post.type === "life"}
	class:coaching={post.type === "coaching"}
	class:technical={post.type === "technical"}
	class:projects={post.type === "projects"}
	class:media={post.type === "media"}
>
	<div class="type">
		{post.type}
	</div>

	<div class="container">
		<img
			class="headerImage"
			src={`/assets/blog/${id}/th_header.jpg`}
			style={`object-fit: ${fit}; object-position: ${position};`}
			alt="Header"
		/>
		<div class="padded">
			<div class="meta">
				<p>{toDateString(post.date)}</p>
				<p>{authorDetails.longName}</p>
			</div>

			<h3>
				{#if post.stylisedTitle}
					{@html post.stylisedTitle}
				{:else}
					{post.title}
				{/if}
			</h3>
			<summary>{post.longDescription}</summary>
		</div>
	</div>
</a>

<style>
	a {
		position: relative;
		color: var(--text);
	}

	.container {
		border-radius: 2em;

		display: grid;
		grid-template-rows: 16em 1fr;
		font-size: 0.8em;

		background-color: var(--grey-5);
		overflow: hidden;

		box-shadow: 0 0 0.5em 0 var(--type-color);
		transition: 0.1s box-shadow;
	}

	a:hover .container {
		box-shadow: 0 0 1em 0 var(--type-color);
	}

	.headerImage {
		width: 100%;
		height: 100%;

		object-fit: contain;
		object-position: center;
	}

	.padded {
		padding: 1em;
		padding-top: 0.5em;
		padding-bottom: 2em;

		display: flex;
		flex-direction: column;
	}

	a {
		text-decoration: unset;
	}

	h3 {
		font-size: 2em;
		margin-top: 0.5em;
	}

	.meta {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
		font-style: italic;
		font-weight: 300;
	}

	.meta p {
		margin-bottom: 0;
	}

	.type {
		position: absolute;
		padding: 0.5em 1em;
		border-radius: 1em;
		text-transform: uppercase;
		font-weight: 600;

		left: -1em;
		top: -1em;
		transform: rotate(-10deg);
		background-color: var(--type-color);
		color: var(--type-text-color);
	}

	.life {
		--type-color: var(--blue-0);
		--type-text-color: var(--grey-5);
	}

	.coaching {
		--type-color: var(--yellow-3);
	}

	.technical {
		--type-color: var(--blue-4);
	}

	.projects {
		--type-color: var(--green-3);
	}

	.media {
		--type-color: var(--red-4);
	}

	@media (max-width: 1199px) {
		.container {
			grid-template-columns: 20em 1fr;
			grid-template-rows: auto;
		}
	}

	@media (max-width: 799px) {
		.container {
			grid-template-columns: auto;
			grid-template-rows: 12em 1fr;
		}
	}
</style>

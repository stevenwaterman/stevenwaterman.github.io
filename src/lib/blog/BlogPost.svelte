<script lang="ts">
  import Template from "$lib/template/Template.svelte";
  import TextContainer from "$lib/template/TextContainer.svelte";
  import { toDateString } from "$lib/utils/date";
  import AuthorColumn from "./AuthorColumn.svelte";
  import type { AuthorDetails, BlogId, BlogPost } from "./blogData";
  import { authors, blogPosts } from "./blogData";

  export let id: BlogId;

  let post: BlogPost;
  $: post = blogPosts[id];

  let dateString: string;
  $: dateString = toDateString(post.date);

  let authorDetails: AuthorDetails;
  $: authorDetails = authors[post.author];

  let fit: BlogPost["header"]["fit"];
  $: fit = post.header?.fit ?? "cover"

  let position: BlogPost["header"]["position"];
  $: position = post.header?.position ?? "center";

  /*
  TODO list
  - recommended posts
  */
</script>

<style>
  .grid {
    display: grid;
    grid-template-columns: 1fr 20em;
    gap: 2em;
    align-items: flex-start;
    justify-items: center;

    margin-bottom: -6em;

    width: 100%;
    max-width: 64em;
    z-index: 20;
  }
  
  .headerImage {
    max-height: 20em;
    width: 100%;
  }

  .padded {
    padding: 1em 2em 4em 2em;
  }

  .padded > :global(*) {
    padding-left: 30pt;
    padding-right: 30pt;
  }

  .padded > :global(ol),
  .padded > :global(ul) {
    padding-left: 60pt;
  }

  .padded > :global(figure) {
    padding-left: 0;
    padding-right: 0;
    margin-top: 2em;
    margin-bottom: 2em;
  }

  .padded > :global(figure img) {
    margin: auto;
    max-width: 100%;
  }

  .padded > :global(figure video) {
    margin: auto;
    max-width: 100%;
  }

  .padded > :global(figure table) {
    margin: auto;
    text-align: center;
  }

  .padded > :global(figure) :global(th), :global(td) {
    padding-left: 1em;
    padding-right: 1em;
  }

  .padded > :global(figure) :global(th) {
    padding-bottom: 0.5em;
  }

  .metadata {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-items: stretch;
    align-items: center;
    
    margin-bottom: 1em;
    font-weight: 300;
  }

  .metadata p {
    margin-bottom: 0;
  }

  .type {
    text-transform: uppercase;
  }

  .date {
    text-align: center;
  }

  .author {
    text-align: right;
  }

  summary {
    margin-top: 1em;
    color: var(--grey-0);
  }

  hr {
    margin-bottom: 2em;
  }

  h1 {
    padding-left: 0;
    padding-right: 0;
  }

  .original {
    padding-top: 1em;
  }

  .padded :global(p code) {
    background-color: var(--blue-6);
    color: var(--blue-0);
    font-size: 0.85em;
    padding: 0.1em 0.2em;
  }

  .padded :global(ul code) {
    background-color: var(--blue-6);
    color: var(--blue-0);
    font-size: 0.85em;
    padding: 0.1em 0.2em;
  }

  .padded :global(ol code) {
    background-color: var(--blue-6);
    color: var(--blue-0);
    font-size: 0.85em;
    padding: 0.1em 0.2em;
  }

  .padded :global(blockquote code) {
    background-color: var(--blue-6);
    color: var(--blue-0);
    font-size: 0.85em;
    padding: 0.1em 0.2em;
  }

  .padded :global(cite) {
    display: block;
    text-align: right;
  }

  @media (max-width: 1599px) {
    .grid {
      grid-template-columns: auto;
      grid-template-rows: auto auto;
      max-width: 40em;
    }
  }

  @media (max-width: 799px) {
    .grid {
      width: 100vw;
    }

    .padded {
      padding: 1em 0;
    }

    .padded > :global(*) {
      padding-left: 0.5em;
      padding-right: 0.5em;
    }

    h1 {
      padding-left: 0.5em;
      padding-right: 0.5em;
    }

    .padded > :global(ol),
    .padded > :global(ul) {
      padding-left: calc(0.5em + 30pt);
    }
  }

  applause-button {
    width: 4em;
    height: 4em;
    margin-top: 2em;
    margin-bottom: 1em;
  }

  .topSection {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 1em;
    align-items: center;
  }

  .bottomClapContainer {
    display: flex;
    justify-content: center;
    margin-top: 3em;
    margin-bottom: -2em;
  }
</style>

<svelte:head>
	<meta name="description" content={post.longDescription}>
  <link rel="alternate" type="application/rss+xml" href="https://stevenwaterman.uk/rss.xml" title="Steven Waterman's Blog">
  <link rel="canonical" href={`https://stevenwaterman.uk/${id}`}>
	<meta property="og:title" content={post.title}>
	<meta property="og:description" content={post.longDescription}>
	<meta property="og:image" content={`https://stevenwaterman.uk/assets/blog/${id}/header.png`}>
	<meta property="og:type" content="article">
	<meta property="og:site_name" content="Steven Waterman">
	<meta property="og:url" content={`https://stevenwaterman.uk/${id}`}>
	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:site" content="@SteWaterman">
	<meta name="twitter:image" content={`https://stevenwaterman.uk/assets/blog/${id}/header.png`}>
  <link rel="stylesheet" href="/applause/applause-button.css" />
  <script src="/applause/applause-button.js"></script>
</svelte:head>

<Template title={post.title}>
  <div class="grid">
    <TextContainer>
      <article>
        <a href={`/assets/blog/${id}/header.png`}>
          <img class="headerImage" src={`/assets/blog/${id}/header.png`} style={`object-fit: ${fit}; object-position: ${position};`} alt="Header"/>
        </a>
        <div class="padded">
          <div class="metadata">
            <p class="type">{post.type}</p>
            <p class="date">Published <time>{dateString}</time></p>
            <p class="author">By {authorDetails.longName}</p>
          </div>

          <h1>
            {#if post.stylisedTitle}
              {@html post.stylisedTitle}
            {:else}
              {post.title}
            {/if}
          </h1>

          <div class="topSection">
            <div class="left">
              <summary>{post.longDescription}</summary>

              {#if post.original !== undefined}
                <p class="original">Originally posted on <a href={post.original.link}>{post.original.text}</a></p>
              {/if}

              <slot name="updates"></slot>
            </div>

            {#if post.original === undefined}
              <applause-button url={`https://stevenwaterman.uk/${id}`} color="var(--blue-1)" multiclap="true"/>
            {:else}
              <applause-button url={post.original?.link} color="var(--blue-1)" multiclap="true"/>
            {/if}

          </div>

          <hr/>

          <slot></slot>

          <div class="bottomClapContainer">
            {#if post.original === undefined}
              <applause-button url={`https://stevenwaterman.uk/${id}`} color="var(--blue-1)" multiclap="true"/>
            {:else}
              <applause-button url={post.original?.link} color="var(--blue-1)" multiclap="true"/>
            {/if}
          </div>
        </div>
      </article>
    </TextContainer>

    <AuthorColumn author={post.author}/>
  </div>
</Template>
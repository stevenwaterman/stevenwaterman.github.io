<script lang="ts">
  import type { BlogId, BlogPost } from "$lib/blog/blogData";
  import { blogPosts } from "$lib/blog/blogData";
  import PostLink from "$lib/blog/postLinks/PostLink.svelte";
  import FeaturedLink from "$lib/blog/postLinks/FeaturedLink.svelte";
  import Template from "$lib/template/Template.svelte";
  import Fa from "svelte-fa/src/fa.svelte";
  import { faRss } from "@fortawesome/free-solid-svg-icons";

  const posts = Object.entries(blogPosts).filter(post => post[1].published) as Array<[BlogId, BlogPost]>;
  posts.sort((a,b) => b[1].date.valueOf() - a[1].date.valueOf());

  const featured = posts.filter(post => post[1].featured);
  const featuredPosts = featured.slice(0, 3).map(tup => tup[0]);
</script>

<style>
  .title {
    align-self: flex-start;
    margin-bottom: 2em;
  }

  ol {
    padding: 0;
  }

  h2 {
    margin-top: 1em;
    font-size: 2em;
  }

  .subtitle {
    font-size: 1.5em;
    font-weight: 300;
    max-width: 15em;
  }

  .featured {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 4em;
    list-style: none;
    width: 100%;
    padding-left: 4em;
    padding-right: 4em;

    margin-top: 2em;
    margin-bottom: 2em;
  }

  .recent {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 1em;
    row-gap: 2em;
    list-style: none;
    width: 100%;
    margin-top: 2em;
    margin-bottom: 4em;
  }

  li {
    display: contents;
  }

  .rss {
    margin-left: 0.25em;
    color: var(--yellow-1)
  }

  @media (max-width: 1599px) {
    .featured {
      gap: 2em;
      padding-left: 0;
      padding-right: 0;
    }
  }

  @media (max-width: 1199px) {
    .featured {
      grid-template-columns: 1fr;
      gap: 2em;
      padding-left: 0;
      padding-right: 0;
    }

    .recent {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 799px) {
    .recent {
      grid-template-columns: 1fr;
    }
  }

  
</style>

<svelte:head>
  <link rel="alternate" type="application/rss+xml" href="https://stevenwaterman.uk/rss.xml" title="Steven Waterman's Blog">
</svelte:head>

<Template title="Steven Waterman">
  <div class="title">
    <h1>My Blog <a class="rss" href="/rss.xml" title="RSS feed"><Fa icon={faRss}/></a></h1>
    <p class="subtitle">Assorted thoughts on agility, tech, and existing in this world</p>
  </div>

  <ol class="featured">
    {#each featuredPosts as id (id)}
      <li><FeaturedLink {id}/></li>
    {/each}
  </ol>

  <h2>All Posts</h2>

  <ol class="recent">
    {#each posts as [id, _] (id)}
      <li><PostLink {id}/></li>
    {/each}
  </ol>
</Template>

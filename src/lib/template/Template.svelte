<script lang="ts">
  import AnimatedGradient from "./AnimatedGradient.svelte";
  import Footer from "./Footer.svelte";
  import Menu from "./nav/Menu.svelte";

  export let title: string = "Steven Waterman";
</script>

<style>
  :global(body) {
    display: flex;
    flex-direction: column;

    --col-width: min(1200pt, 90vw);
    --col-margin: calc(50vw - var(--col-width) / 2);
  }

  :global(h1) {
    filter: drop-shadow(1px 1px 1px var(--page-background));
  }

  .column {
    margin: auto;
    width: var(--col-width);
    flex-grow: 1;
    z-index: 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }

  .gradient {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;

    --topHeight: 6em;
    height: calc(var(--topHeight) + 12.5vw);

    contain: strict;

    z-index: -1;

    clip-path: polygon(
      0 0,
      100% 0,
      100% 100%,
      0 var(--topHeight)
    );
  }
</style>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="gradient">
  <AnimatedGradient/>
</div>

<Menu/>

<div class="column">
  <slot/>
</div>

<Footer/>

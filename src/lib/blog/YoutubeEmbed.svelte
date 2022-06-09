<script lang="ts">
  export let code: string;
</script>

<style>
  iframe {
    margin-bottom: 1em;
  }
</style>

<iframe width="100%" height="417.5" src={`https://www.youtube.com/embed/${code}`} title="YouTube video player" frameborder="0" allow="picture-in-picture" allowfullscreen></iframe>

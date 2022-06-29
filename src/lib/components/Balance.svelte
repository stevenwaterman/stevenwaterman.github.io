<script lang="ts">
  export let height: string = "8em";
</script>

<style>
  .container {
    position: relative;
    width: 100%;
  }

  .overlay, iframe {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }

  .overlay {
    z-index: 1;
  }

  iframe {
    border: none;
  }
</style>

<div class="container" style={`height: ${height};`}>
  <a href="https://stevenwaterman.uk/Balance"><div class="overlay"></div></a>
  <iframe title="Balance Scores" src="https://stevenwaterman.uk/Balance"></iframe>
</div>


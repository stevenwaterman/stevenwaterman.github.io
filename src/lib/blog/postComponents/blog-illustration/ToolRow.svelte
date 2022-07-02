<script lang="ts">
  export let name: string;
  export let link: string;
  export let description: string;
  export let alt: string;
  export let sample: string;
  export let source: string;
</script>

<style>
  .sample {
    display: inline-block;
    max-height: 10em;
    max-width: 20em;
  }

  .expanded {
    position: absolute;
    right: 0;
    transform: translateY(-50%);
    opacity: 0;
    transition-property: opacity;
    transition-duration: 200ms;
    pointer-events: none;
    max-width: 100%;
    max-height: 70vh;
  }

  .sample:hover .expanded {
    opacity: 1;
  }
</style>

<tr>
  <td><a href={link}>{name}</a></td>
  <td>{description}</td>
  <td>
    <a class="sample" href={source}>
      <img
        alt={alt}
        src={`/assets/blog/blog-illustration/samples/${sample}`}
      />
      <img class="expanded"
        aria-hidden="true"
        alt={alt}
        src={`/assets/blog/blog-illustration/samples/${sample}`}
      />
    </a>
  </td>
</tr>

<script>
	let weight = 400;
  let width = 100;
</script>

<div class="c-vf">

  <div
    class="c-vf__text-sample ts-page-title u-margin-bottom-xlarge"
    style='font-variation-settings: "wght" {weight}, "wdth" {width};'
  >
    AaBbCcDdEeFfGg...
    <em>...TtUuVvWwXxYyZz</em>
  </div>

  <label class="ts-label u-display-block u-margin-bottom-tiny">
    <input type="range" min="400" max="700" bind:value={weight} class="u-margin-right-tiny">
    Weight {weight}
  </label>

  <label class="ts-label u-display-block">
    <input type="range" min="85" max="100" step="0.1" bind:value={width} class="u-margin-right-tiny">
    Width {width.toFixed(1)}
  </label>
</div>

<style>
.c-vf {
  background-color: rgba(var(--color-background-code), 1);
  padding: var(--spacing-unit);
  overflow-x: auto;
  border-radius: var(--rounded-radius);
  transition:
    background-color .3s cubic-bezier(0, 0, .2, 1),
    color-color .3s cubic-bezier(0, 0, .2, 1);
}

@media (min-width: 41.25em) {

  .c-vf {
    padding: calc(var(--spacing-unit) * 1.5);
  }
}

.c-vf__text-sample {
  color: #3fad9c;
  transition: color .3s cubic-bezier(0, 0, .2, 1);
}

:global(.t-dark) .c-vf__text-sample {
  color: #5cbcae;
}
</style>

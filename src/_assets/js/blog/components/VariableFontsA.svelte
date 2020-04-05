<script>
  let weight = 400;
  let width = 100;
</script>

<div class="c-demo">

  <div
    class="c-text-sample ts-display-1 u-margin-bottom-xlarge"
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
.c-text-sample {
  color: #3fad9c;
}

input {
  vertical-align: middle;
}

:global(.t-dark) .c-text-sample {
  color: #5cbcae;
}
</style>

<script>
	let weight = 400;
  let width = 100;
</script>

<label class="ts-label u-display-block u-margin-bottom-tiny">
	<input type="range" min="400" max="700" bind:value={weight} class="u-margin-right-tiny">
	Weight {weight}
</label>

<label class="ts-label u-display-block u-margin-bottom-tiny">
	<input type="range" min="85" max="100" bind:value={width} class="u-margin-right-tiny">
	Width {width}
</label>

<div style='font-variation-settings: "wght" {weight}, "wdth" {width};' class="ts-page-title">
  AaBbCcDdEeFfGg...
  <em>...TtUuVvWwXxYyZz</em>
</div>

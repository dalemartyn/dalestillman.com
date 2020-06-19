---
title: "Color Palettes"
tagline: "The Material Design colour palette tool"
date: 2020-06-14T22:10:00+00:00
tags: blog
image:
  main: /blog/color-palette.svg
color_light: "#e4e8eb"
color_dark: "#b0bec5"
---

I use this tool all the time to get different shades of colour. The tool is part of the [Material Design Foundation](https://material.io/design/color/the-color-system.html#tools-for-picking-colors), which is a fantastic resource for learning UI design.


<style>
.c-color-palette {
  border: 1px solid rgba(0, 0, 0, .12);
  overflow: hidden;
  height: 480px;
}

@media screen and (min-width: 759px) {

  .c-color-palette {
    height: 773px;
  }
}

@media screen and (min-width: 840px) {

  .c-color-palette {
    margin-left: calc(var(--spacing-unit-large) * -1);
    margin-right: calc(var(--spacing-unit-large) * -1);
  }
}
</style>

<figure class="c-color-palette u-rounded">
  <iframe src="https://material.io/inline-tools/color/" style="width: 100%; height: 100%; border: none;" id="colorPaletteFrame" class=""></iframe>
</figure>


<script type="module">
  const iframe = document.getElementById('colorPaletteFrame');
  iframe.onload = () => {
    iframe.contentWindow.postMessage({
      animate: !0
    }, "*");
  };
</script>

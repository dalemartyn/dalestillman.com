---
title: "Color Palettes"
tagline: "The Material Design color palette tool"
date: 2020-06-14T22:10:00+00:00
tags: blog
image:
  main: /blog/color-palette.svg
color_light: "#e4e8eb"
color_dark: "#b0bec5"
---

I use this tool all the time to get different shades of colour. The tool is part of the [Material Design Foundation](https://material.io/design/color/the-color-system.html#tools-for-picking-colors), which is a fantastic resource for learning UI design.

<iframe src="https://material.io/inline-tools/color/" style="width: 100%; height: 773px; border: 1px solid rgba(0, 0, 0, .12);" id="colorPaletteFrame"></iframe>


<script type="module">
  const iframe = document.getElementById('colorPaletteFrame');
  iframe.onload = () => {
    iframe.contentWindow.postMessage({
      animate: !0
    }, "*");
  };
</script>

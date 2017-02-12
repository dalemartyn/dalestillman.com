---
layout: post
title:  "Seamlessly scale your designs from Sketch to&nbsp;Framer"
categories: blog
excerpt_separator: "##"
image:
  src: /img/sketch.jpg
  show: true
---

Sketch and Framer are powerful together. Draw your static assets in Sketch, import and immediatly explore interactions in Framer. Our newest release makes this workflow even more seamless.

Do you start your [Sketch](http://www.sketchapp.com/) designs at 1x with multiple artboards? We do, too. Today’s release is a workflow overhaul to seamlessly work on any scale or artboard. Read on to learn more or start with this [guide](http://framerjs.com/learn/import/) about importing.

## Scale Control

If you're used to designing at @1x resolution — you don't have to scale your designs before importing. Within the import sheet, you can specify at which scale to import. Design for high-density displays without having to work in native resolutions. Framer makes sure your assets are always crisp.

## Layer Flattening

Large design files can contain a lot of nested layers. If you're leaving these static, you could flatten them before importing. This improves the loading times of your prototypes, especially when shared online. Flattened layers can't be selected in Framer, they're merged with their superLayer. Appending an asterisk (*) to a layer group or artboard will flatten its subLayers.

<figure>
  <img src="https://cdn-images-1.medium.com/max/1600/0*2eU98TxCYh0oEZZz.png" alt="image">
</figure>

## JPG & PDF Export

By default, images are imported as PNGs. We now also support JPG and PDF layers. Simply add the file format to the layer name, and Framer will take care of the rest. The extension is automatically removed after importing.

<figure>
  <img src="https://cdn-images-1.medium.com/max/1600/0*4XDa3H8ggUDjKgE7.png" alt="image">
</figure>

With PDF support, you're able to use vector graphics that can be infinitely scaled, by adjusting the `width` and `height` properties. Download this example to learn how you can infinitely scale an imported icon in Framer.

{% highlight coffee %}
# Import file "cloud"
sketch = Framer.Importer.load("imported/cloud@1x")

# Set width and height, scale 2x
sketch.icon.width *= 2
sketch.icon.height *= 2
{% endhighlight %}


## Artboard Positioning

Previously, Framer stacked all artboards on top of eachother, and all but the first one was hidden. Now, the x and y positions of your artboards are respected, and they're all visible by default. The most left artboard on your canvas in Sketch is set to 0,0. All others are positioned relative to this.

<figure>
  <img src="https://cdn-images-1.medium.com/max/1600/0*WPMOvPVcHLLZ37Ti.png" alt="image">
</figure>

We've also improved the importing stability, and tackled a few known bugs. Positioning issues caused by using multiple masks and hidden layers have been fixed. We hope these new features speed up your design workflow, and would love to hear your thoughts in our Facebook Community.

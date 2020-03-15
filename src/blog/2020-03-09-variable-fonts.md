---
title: "Variable fonts"
tagline: "What variable fonts are and how can they be used to improve typesetting on the web"
date: 2020-03-09T20:22:00+00:00
image:
  main: /img/blog/variable-fonts.svg
color_light: "#2b917f"
color_dark: "#227060"
---

Traditionally each web font has had a single style. We'd typically need at least two web fonts – a regular and italic. We'd then want a bold version too, which would take us up to three web fonts, or four including bold italic. The number of fonts quickly balloon, which is problematic as they're slow to load and delay the rendering of web pages. It's these performance constraints that lead us to use fewer web fonts than we'd like to.

## Enter variable fonts

Variable fonts allow a single font file to behave like a whole bunch. They can contain _axes of variation_ for things we'd like to play around with like font weight, font width, slant, and optical size.

<div id="variable-fonts-a" class="u-margin-vertical-xlarge"></div>

Variable fonts also allow font designers to expose custom axes of variation. Try out the custom axes on [Buffalo Gals][9]. Or play with the serifs on [Amstelvar][12].

## Performance

When we're are using more than a couple of styles, variable fonts give us a lower file size and faster download performance.

<blockquote>
<p>The reason for the savings is that fonts are stored as a set of mathematical curves. Variable fonts give you the ability to interpolate between two or more set of curves called masters and as a result generate a number of intermediate weights without storing additional data.</p>
<cite><a href="https://blog.prototypr.io/an-exploration-of-variable-fonts-37f85a91a048">Mathieu Triay</a>, who created the awesome variable font <a href="https://www.readvisions.com/marvin">Marvin Visions</a>.</cite>
</blockquote>

I'm using [IBM Plex Sans][2] on this site, which contains axes for weight and width. I used the source code on [Github][11] to build a version of the font that doesn't include the lighter font weights (100 up to 400). My version comes in at 21KB for the roman version and 25KB for the italic, making a 36KB total. A single regular woff2 web font for Plex Sans with the same set of glyphs would be 10KB, or 11KB for the italic. Using three font weights would take us to 63KB, 75% larger than the variable font version. The more styles we use, the more the savings add up.

## Typesetting

It's usual for typesetters to make adjustments to type depending on its context. One example is tracking. If you have an optically small type style like a for caption or button, you open it up slightly to improve its legibility. A large type style like a display title is tightened so it's not too loose. It's small tweaks like these that add polish to design, and variable fonts give us more control than we've ever had before.

Some micro-adjustments we can make to our typography include:

- changing the font-weight in light theme vs. dark theme so they look the same
- condensing the font width on narrow viewports to fit more on a line
- making smaller headings in our type scale slightly heavier so they stand out from the body text
- changing the grade or weight based on ambient lighting conditions
- using the optical size axis to make text legible at small sizes

Try adjusting the type on this page to see how it affects the legibility.

<div id="variable-fonts-b" class="u-margin-vertical-large"></div>

## Finding and using variable fonts

Variable fonts already have excellent [browser support][1], however, they are a relatively new technology and there aren't all that many high-quality variable fonts around. [v-fonts.com][6] contains a directory of variable fonts, although most are low quality or experimental. [Google fonts][10] was recently updated to support variable fonts and contains 32 variable fonts to choose from at the time of writing. I like [Work Sans][13], [Public Sans][14] and [Literata][15].

<script src="/js/variable-fonts.js"></script>

## Further reading

- [Introducing OpenType Variable Fonts][3]
- [OpenType Font Variations Overview][4]
- [How to use variable fonts in the real world][5]
- [Typographic Potential of Variable Fonts][7]
- [An Exploration of Variable Fonts][8]

[1]: https://caniuse.com/#feat=variable-fonts
[2]: https://www.ibm.com/plex/
[3]: https://medium.com/variable-fonts/https-medium-com-tiro-introducing-opentype-variable-fonts-12ba6cd2369
[4]: https://docs.microsoft.com/en-us/typography/opentype/spec/otvaroverview
[5]: https://medium.com/clear-left-thinking/how-to-use-variable-fonts-in-the-real-world-e6d73065a604
[6]: https://v-fonts.com/
[7]: http://www.alphabettes.org/responsive-variable-fonts/
[8]: https://blog.prototypr.io/an-exploration-of-variable-fonts-37f85a91a048
[9]: https://www.axis-praxis.org/specimens/buffalo-gal
[10]: https://fonts.google.com/?vfonly
[11]: https://github.com/IBM/plex
[12]: https://v-fonts.com/fonts/amstelvar
[13]: https://fonts.google.com/specimen/Work+Sans?vfonly
[14]: https://fonts.google.com/specimen/Public+Sans?vfonly
[15]: https://fonts.google.com/specimen/Literata?vfonly

---
title: "Google Earth Plotter"
date: 2009-06-10T08:00:00.000Z
tagline: "Using coordinate transformations to plot surveying data in <span class=\"u-no-break\">Google Earth</span>"
image:
  json: /google-earth-plotter/google-earth-plotter.json
color_light: "#4C81BF"
color_dark: "#37538C"
---

This was my final year project for my Civil Engineering degree at Loughbrough University. I created a computer program to plot surveying data measured with a [total station][1] (a digital measuring tool on a tripod) in Google Earth.

The program transformed data captured in local cooridinate systems to the global coordinate system [WGS84][2].

<figure>
  <div class="c-image-background u-rounded">
    {% image "/google-earth-plotter/google-earth-plotter.json" %}
  </div>
  <figcaption>
    The total station was set up at each of the points marked with a triangle, and measured the circular points. The lines between points represent the order in which the data was gathered.
  </figcaption>
</figure>

I wrote a dissertation and journal paper about the project. They discussed the development of the program, the accuracy of the aerial imagery used in Google Earth, and the accuracy of the [Helmert transformation][3] used by the program.

- [Final year report][4]
- [Journal paper][5]

[1]: https://en.wikipedia.org/wiki/Total_station "Total station on Wikipedia"
[2]: https://en.wikipedia.org/wiki/World_Geodetic_System "World Geodetic System on Wikipedia"
[3]: https://en.wikipedia.org/wiki/Helmert_transformation "Helmert transformation on Wikipedia"
[4]: https://drive.google.com/open?id=1kkMI9dDiy3w4DaTmG9UvNJO5ReWGfLG9 "Plotting Surveying Data in Google Earth – Final year report"
[5]: https://drive.google.com/open?id=1T1JZ-E6xS4kG7JKPL-yGgJH2z_gDZXL5 "Plotting Surveying Data in Google Earth – Journal paper"

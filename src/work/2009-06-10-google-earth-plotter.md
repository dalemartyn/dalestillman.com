---
title: "Google Earth Plotter"
date: 2009-06-10T08:00:00.000Z
tagline: "Using coordinate transformations to plot surveying data in <span class=\"u-no-break\">Google Earth</span>"
image:
  json: /google-earth-plotter/google-earth-plotter.json
color_light: "#4C81BF"
color_dark: "#37538C"
---

This was my final year project for my Civil Engineering degree at Loughbrough University. I created a computer program to plot survey data measured with a total station (digital measuring tool on a tripod) in Google Earth.

To be able to visualise the data from the detail survey in Google Earth, the application had to transform the coordinates from local cooridate systems to a global coordinate system, WGS84.

<figure>
  <div class="c-image-background u-rounded">
    {% image "/google-earth-plotter/google-earth-plotter.json" %}
  </div>
  <figcaption>
    The total station was set up at each of the points marked with a triangle, and measured the circular points. The lines between points represent the order in which the data was gathered.
  </figcaption>
</figure>

I wrote a dissertation and journal paper on the the development of the program, as well as accuracy tests which assessed the accuracy of the aerial imagery used in Google Earth, as well as the accuracy of the Helmert transformation used by the program.

<ul>
  <li>
    <a href="https://drive.google.com/open?id=1wJ9ogtOm4-zhMnOq_-wlF7dPzRjz5e6W" target="_blank">
      Final year report
    </a>
  </li>
  <li>
    <a href="https://drive.google.com/open?id=1T1JZ-E6xS4kG7JKPL-yGgJH2z_gDZXL5" target="_blank">
      Journal paper
    </a>
  </li>
</ul>

---
device: tablet
title: "Athlete Profiles"
date: 2016-10-06T22:05:19+01:00
tagline: "Using Google Sheets as backend to rapidly generate athlete stats"
image:
  json: /athlete-profiles/athlete-profiles.json
color_light: "#ce4e65"
color_dark: "#8c2e44"
work_for: The ASA
---

By creating a new automated system, the laborious process of updating profiles was transformed into one that would enable quick and easy changes. The new system, backed by Google Sheets, enabled us create a larger amount of profiles, each one including more comprehensive stats. We also used the same backend to generate editorial 'ones to watch' widgets for a range of aquatic competitions.

<figure>
  <div class="c-image-background u-rounded">
    {% image "/athlete-profiles/diving-historic.json" %}
  </div>
  <figcaption>Diver Tonia Couch’s profile page as it was in 2013 (<a href="/img/athlete-profiles/diving-historic-full.jpg">full image</a>, via <a href="https://archive.is/O9Cyg">archive.is</a>). At the time, all stats had to be manually researched and updated in the Content Management System.</figcaption>
</figure>

## A better way of doing it

To curate statistics for profile pages, [Chris][1], our Content Manager would browse handful of third party sites. After a competition he would have to go in to each and every profile page in the <abbr title="Content Management System">CMS</abbr> and enter in any changes. The process was particularly tedious when it came to calculating the swimmer's <abbr title="Personal Bests">PBs</abbr>, as the stats had to be cross-referenced.

To speed up the process we created an array of Google Sheets. They covered all swimming disciplines, many competitions, and had relevant stats to all the athletes we were covering. Updating the spreadsheets simply involved copy and pasting in new stats.

The profiles were then updated by running [Gulp][2] command.

``` text
gulp save-stats
```

This command would download the relevant spreadsheets and normalize the data. It would then proceed to generate a <abbr title="JavaScript Object Notation">JSON</abbr> document for each athlete profile, and upload it to our static file server using <abbr title="File Transfer Protocol">FTP</abbr>. The [Nodejs][3] scripts made heavy use of [lodash][4] and [async][5], with [google-spreadsheet][6] used to download the stats.

<figure>
  <div class="c-image-background u-rounded">
    {% image "/athlete-profiles/diving-profile.json" %}
  </div>
  <figcaption>The main content of Tonia’s profile page (<a href="https://web.archive.org/web/20161005195709/http://www.swimming.org/diving/tonia-couch/">webarchive.org</a>). The new profile stats widget, sits under the profile copy. An action shot, out of view in the screenshot, serves as the headline image.</figcaption>
</figure>

## Redesigning the profiles

The automated system allowed us to cover more athletes and show more stats. So it was worthwhile spending the time to make them really nice. By adding in the tabs, the profile page became cleaner and more coherent. The stats also became easier to browse. Where we had stats for athletes from multiple domestic or interantional competitions, we further divided the stats up by using a dropdown to switch between competitions.

To make the stats clear and accessible, I spent time optimising the typography. I switched the font to [Source Sans Pro][9], used by the ASA in the marketing materials and event programmes, for its excellent legibility in small sizes and the performance of its lining figures. Next, I divided up the results into multiple smaller tables, making them easier to digest (it also allowed us to show the location of the venue in the title). Finally, I made sure that the table columns aligned accross results and tabs, so there wasn't the appearance of the content shifting around as you browse.

<figure>
  <div class="c-image-background u-rounded">
    {% image "/athlete-profiles/swimming-and-synchro.json" %}
  </div>
  <figcaption>Profile stats for swimming (left) and synchronised swimming (right). Using <a href="http://getbootstrap.com/javascript/#tabs" title="Bootstrap 3 tabs">Bootstrap tabs</a>, along with the <a href="https://paypal.github.io/bootstrap-accessibility-plugin/" title="Bootstrap accessibility plugin"> accessibility plugin</a> made the tabs keyboard-navigable and screen reader compatible.</figcaption>
</figure>

## Collaborating on new widgets

The spreadsheets of stats were also be used to create new 'ones to watch' widgets for aquatic competitions. Our Content Manager would write additional copy in a new sheet, as I worked on the design and implementation. (I later learned that The Verge used [a very similar technique][7] to build [The Verge 50][8]).

<figure>
  <div class="c-image-background u-rounded">
    {% image "/athlete-profiles/ones-to-watch.json" %}
  </div>
  <figcaption>Ones to watch widget for the ASA National Swimming Championships. <a href="https://en.wikipedia.org/wiki/Non-breaking_space">Non-breaking spaces</a> are used for the ‘events&nbsp;entered’, so that the line doesn’t break between distance and event.</figcaption>
</figure>


[1]: https://twitter.com/ChristoCottrell "Chris Cottrell on Twitter"
[2]: http://gulpjs.com/ "gulp.js homepage"
[3]: https://nodejs.org/en/ "Node.js homepage"
[4]: https://lodash.com/ "Lodash homepage"
[5]: https://caolan.github.io/async/ "async homepage"
[6]: https://github.com/theoephraim/node-google-spreadsheet "google-spreadsheet on GitHub"
[7]: http://product.voxmedia.com/2014/7/29/5863004/take-a-peek-at-the-code-that-powered-the-verge-50 "Take a peek at the code that powered The Verge 50"
[8]: http://www.theverge.com/a/the-verge-50 "The Verge 50"
[9]: http://blog.typekit.com/2012/08/02/source-sans-pro/ "Source Sans Pro: Adobe’s first open source type family"

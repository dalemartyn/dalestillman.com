---
layout: work
device: laptop
title: "Off the Blocks"
date: 2016-10-07T09:49:35+01:00
category: work
bgcolor: "blue"
excerpt_separator: "##"
image:
  src: /img/offtheblocks.jpg
  show: true
  cap: /img/offtheblocks/main.jpg
  main: /img/offtheblocks/offtheblocks-main.jpg
tagline: A video site for swimming coaches
---

British Swimming exists to win medals in the pool. To do so they need the best coaching.  As part of their National Development Syllabus they were producing a range of video resources to make available to all coaches in Great Britain. This post will look how I created a low maintenance, easy to use site that was in line with the British Swimming brand.


## A flexible site for future growth

I developed the site in parallel with the first batch of videos. The site was designed to be able to add more content as it was developed, starting with the Techinical videos.

<figure class="highlight"><pre><code class="language-text" data-lang="text">.
├── Technical
│   ├── Starts
│   │   ├── Backstroke
│   │   ├── Breaststroke
│   │   ├── Butterfly
│   │   └── Freestyle
│   ├── Turns
│   │   ├── Backstroke
│   │   ├── Breaststroke
│   │   ├── Butterfly
│   │   └── Freestyle
│   └── Underwaters
│       ├── Backstroke
│       ├── Breaststroke
│       ├── Butterfly
│       └── Freestyle
├── Tactical (TBC)
└── Physical (TBC)</code></pre>
<figcaption>
Each lesson (e.g. Backstroke Starts) contains 4 videos and a PDF factsheet.
</figcaption>
</figure>

## Making the content discoverable

I wanted the content to surface to the top page, making it the first thing a coach sees when they log in. Using a [container model][1], with the videos represented by their thumbnails, the breadth of content becomes immediately clear. It allows the coach to jump right in to a lesson, or drill down futher in the site heirachy using the "View All" links.

<style>
.safari-fix {
  padding-top: 116.583748%;
  position: relative;
  width: 100%;
  height: auto;
}
.safari-fix svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>

<figure>
  <div class="safari-fix">
  <?xml version="1.0" encoding="UTF-8" standalone="no"?>
  <svg width="1206px" height="1406px" viewBox="0 0 1206 1406" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <!-- Generator: Sketch 39.1 (31720) - http://www.bohemiancoding.com/sketch -->
      <title>Off the Blocks</title>
      <desc>Created with Sketch.</desc>
      <defs>
          <rect id="path-1" x="0" y="0" width="252" height="141"></rect>
          <mask id="mask-2" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="252" height="141" fill="white">
              <use xlink:href="#path-1"></use>
          </mask>
          <rect id="path-3" x="0" y="0" width="252" height="141"></rect>
          <mask id="mask-4" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="252" height="141" fill="white">
              <use xlink:href="#path-3"></use>
          </mask>
          <rect id="path-5" x="0" y="0" width="252" height="141"></rect>
          <mask id="mask-6" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="252" height="141" fill="white">
              <use xlink:href="#path-5"></use>
          </mask>
          <rect id="path-7" x="0" y="0" width="252" height="141"></rect>
          <mask id="mask-8" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="252" height="141" fill="white">
              <use xlink:href="#path-7"></use>
          </mask>
          <rect id="path-9" x="0" y="0" width="252" height="141"></rect>
          <mask id="mask-10" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="252" height="141" fill="white">
              <use xlink:href="#path-9"></use>
          </mask>
          <rect id="path-11" x="0" y="0" width="252" height="141"></rect>
          <mask id="mask-12" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="252" height="141" fill="white">
              <use xlink:href="#path-11"></use>
          </mask>
          <rect id="path-13" x="0" y="0" width="252" height="141"></rect>
          <mask id="mask-14" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="252" height="141" fill="white">
              <use xlink:href="#path-13"></use>
          </mask>
          <rect id="path-15" x="0" y="0" width="252" height="141"></rect>
          <mask id="mask-16" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="252" height="141" fill="white">
              <use xlink:href="#path-15"></use>
          </mask>
          <rect id="path-17" x="0" y="0" width="252" height="141"></rect>
          <mask id="mask-18" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="252" height="141" fill="white">
              <use xlink:href="#path-17"></use>
          </mask>
          <rect id="path-19" x="0" y="0" width="252" height="141"></rect>
          <mask id="mask-20" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="252" height="141" fill="white">
              <use xlink:href="#path-19"></use>
          </mask>
          <rect id="path-21" x="0" y="0" width="252" height="141"></rect>
          <mask id="mask-22" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="252" height="141" fill="white">
              <use xlink:href="#path-21"></use>
          </mask>
          <rect id="path-23" x="0" y="0" width="252" height="141"></rect>
          <mask id="mask-24" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="252" height="141" fill="white">
              <use xlink:href="#path-23"></use>
          </mask>
      </defs>
      <g id="Off-the-Blocks-wireframe" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="Group" transform="translate(3.000000, 3.000000)">
              <rect id="Rectangle" stroke="#757575" stroke-width="5" x="0" y="0" width="1200" height="150"></rect>
              <text id="HOME-&gt;-SECTION-&gt;" font-size="18" font-weight="bold" fill="#757575">
                  <tspan x="60" y="45">HOME &gt;   SECTION &gt;</tspan>
              </text>
              <text id="PAGE-HEADING" font-size="64" font-weight="bold" letter-spacing="-0.5" fill="#757575">
                  <tspan x="60" y="117">PAGE HEADING</tspan>
              </text>
          </g>
          <g id="Group-3" transform="translate(3.000000, 153.000000)">
              <rect id="Rectangle-Copy" stroke="#757575" stroke-width="5" x="0" y="0" width="1200" height="300"></rect>
              <text id="CONTAINER-TITLE-/-Vi" font-size="24" font-weight="bold" fill="#757575">
                  <tspan x="60" y="50">CONTAINER TITLE</tspan>
                  <tspan x="262.136719" y="50" font-size="18" font-weight="normal"> / View All &gt;</tspan>
                  <tspan x="356.144531" y="50"> </tspan>
              </text>
              <g id="Group-2" transform="translate(60.000000, 80.000000)">
                  <use id="Rectangle-2" stroke="#757575" mask="url(#mask-2)" stroke-width="10" fill="#D8D8D8" xlink:href="#path-1"></use>
                  <rect id="Rectangle-3" fill="#757575" x="0" y="140" width="252" height="50"></rect>
                  <text id="VIDEO-TITLE" fill="#FFFFFF" font-size="18" font-weight="bold">
                      <tspan x="16" y="170">VIDEO TITLE</tspan>
                  </text>
              </g>
              <g id="Group-2" transform="translate(336.000000, 80.000000)">
                  <use id="Rectangle-2" stroke="#757575" mask="url(#mask-4)" stroke-width="10" fill="#D8D8D8" xlink:href="#path-3"></use>
                  <rect id="Rectangle-3" fill="#757575" x="0" y="140" width="252" height="50"></rect>
                  <text id="VIDEO-TITLE" fill="#FFFFFF" font-size="18" font-weight="bold">
                      <tspan x="16" y="170">VIDEO TITLE</tspan>
                  </text>
              </g>
              <g id="Group-2" transform="translate(612.000000, 80.000000)">
                  <use id="Rectangle-2" stroke="#757575" mask="url(#mask-6)" stroke-width="10" fill="#D8D8D8" xlink:href="#path-5"></use>
                  <rect id="Rectangle-3" fill="#757575" x="0" y="140" width="252" height="50"></rect>
                  <text id="VIDEO-TITLE" fill="#FFFFFF" font-size="18" font-weight="bold">
                      <tspan x="16" y="170">VIDEO TITLE</tspan>
                  </text>
              </g>
              <g id="Group-2" transform="translate(888.000000, 80.000000)">
                  <use id="Rectangle-2" stroke="#757575" mask="url(#mask-8)" stroke-width="10" fill="#D8D8D8" xlink:href="#path-7"></use>
                  <rect id="Rectangle-3" fill="#757575" x="0" y="140" width="252" height="50"></rect>
                  <text id="VIDEO-TITLE" fill="#FFFFFF" font-size="18" font-weight="bold">
                      <tspan x="16" y="170">VIDEO TITLE</tspan>
                  </text>
              </g>
          </g>
          <g id="Group-3" transform="translate(3.000000, 453.000000)">
              <rect id="Rectangle-Copy" stroke="#757575" stroke-width="5" x="0" y="0" width="1200" height="300"></rect>
              <text id="CONTAINER-TITLE-/-Vi" font-size="24" font-weight="bold" fill="#757575">
                  <tspan x="60" y="50">CONTAINER TITLE</tspan>
                  <tspan x="262.136719" y="50" font-size="18" font-weight="normal"> / View All &gt;</tspan>
                  <tspan x="356.144531" y="50"> </tspan>
              </text>
              <g id="Group-2" transform="translate(60.000000, 80.000000)">
                  <use id="Rectangle-2" stroke="#757575" mask="url(#mask-10)" stroke-width="10" fill="#D8D8D8" xlink:href="#path-9"></use>
                  <rect id="Rectangle-3" fill="#757575" x="0" y="140" width="252" height="50"></rect>
                  <text id="VIDEO-TITLE" fill="#FFFFFF" font-size="18" font-weight="bold">
                      <tspan x="16" y="170">VIDEO TITLE</tspan>
                  </text>
              </g>
              <g id="Group-2" transform="translate(336.000000, 80.000000)">
                  <use id="Rectangle-2" stroke="#757575" mask="url(#mask-12)" stroke-width="10" fill="#D8D8D8" xlink:href="#path-11"></use>
                  <rect id="Rectangle-3" fill="#757575" x="0" y="140" width="252" height="50"></rect>
                  <text id="VIDEO-TITLE" fill="#FFFFFF" font-size="18" font-weight="bold">
                      <tspan x="16" y="170">VIDEO TITLE</tspan>
                  </text>
              </g>
              <g id="Group-2" transform="translate(612.000000, 80.000000)">
                  <use id="Rectangle-2" stroke="#757575" mask="url(#mask-14)" stroke-width="10" fill="#D8D8D8" xlink:href="#path-13"></use>
                  <rect id="Rectangle-3" fill="#757575" x="0" y="140" width="252" height="50"></rect>
                  <text id="VIDEO-TITLE" fill="#FFFFFF" font-size="18" font-weight="bold">
                      <tspan x="16" y="170">VIDEO TITLE</tspan>
                  </text>
              </g>
              <g id="Group-2" transform="translate(888.000000, 80.000000)">
                  <use id="Rectangle-2" stroke="#757575" mask="url(#mask-16)" stroke-width="10" fill="#D8D8D8" xlink:href="#path-15"></use>
                  <rect id="Rectangle-3" fill="#757575" x="0" y="140" width="252" height="50"></rect>
                  <text id="VIDEO-TITLE" fill="#FFFFFF" font-size="18" font-weight="bold">
                      <tspan x="16" y="170">VIDEO TITLE</tspan>
                  </text>
              </g>
          </g>
          <g id="Group-3" transform="translate(3.000000, 753.000000)">
              <rect id="Rectangle-Copy" stroke="#757575" stroke-width="5" x="0" y="0" width="1200" height="300"></rect>
              <text id="CONTAINER-TITLE-/-Vi" font-size="24" font-weight="bold" fill="#757575">
                  <tspan x="60" y="50">CONTAINER TITLE</tspan>
                  <tspan x="262.136719" y="50" font-size="18" font-weight="normal"> / View All &gt;</tspan>
                  <tspan x="356.144531" y="50"> </tspan>
              </text>
              <g id="Group-2" transform="translate(60.000000, 80.000000)">
                  <use id="Rectangle-2" stroke="#757575" mask="url(#mask-18)" stroke-width="10" fill="#D8D8D8" xlink:href="#path-17"></use>
                  <rect id="Rectangle-3" fill="#757575" x="0" y="140" width="252" height="50"></rect>
                  <text id="VIDEO-TITLE" fill="#FFFFFF" font-size="18" font-weight="bold">
                      <tspan x="16" y="170">VIDEO TITLE</tspan>
                  </text>
              </g>
              <g id="Group-2" transform="translate(336.000000, 80.000000)">
                  <use id="Rectangle-2" stroke="#757575" mask="url(#mask-20)" stroke-width="10" fill="#D8D8D8" xlink:href="#path-19"></use>
                  <rect id="Rectangle-3" fill="#757575" x="0" y="140" width="252" height="50"></rect>
                  <text id="VIDEO-TITLE" fill="#FFFFFF" font-size="18" font-weight="bold">
                      <tspan x="16" y="170">VIDEO TITLE</tspan>
                  </text>
              </g>
              <g id="Group-2" transform="translate(612.000000, 80.000000)">
                  <use id="Rectangle-2" stroke="#757575" mask="url(#mask-22)" stroke-width="10" fill="#D8D8D8" xlink:href="#path-21"></use>
                  <rect id="Rectangle-3" fill="#757575" x="0" y="140" width="252" height="50"></rect>
                  <text id="VIDEO-TITLE" fill="#FFFFFF" font-size="18" font-weight="bold">
                      <tspan x="16" y="170">VIDEO TITLE</tspan>
                  </text>
              </g>
              <g id="Group-2" transform="translate(888.000000, 80.000000)">
                  <use id="Rectangle-2" stroke="#757575" mask="url(#mask-24)" stroke-width="10" fill="#D8D8D8" xlink:href="#path-23"></use>
                  <rect id="Rectangle-3" fill="#757575" x="0" y="140" width="252" height="50"></rect>
                  <text id="VIDEO-TITLE" fill="#FFFFFF" font-size="18" font-weight="bold">
                      <tspan x="16" y="170">VIDEO TITLE</tspan>
                  </text>
              </g>
          </g>
          <g id="Group-3" transform="translate(3.000000, 1053.000000)">
              <rect id="Rectangle-Copy" stroke="#757575" stroke-width="5" fill="#D8D8D8" x="0" y="0" width="1200" height="200"></rect>
              <text id="SITEMAP" font-size="24" font-weight="bold" fill="#757575">
                  <tspan x="60" y="50">SITEMAP</tspan>
              </text>
          </g>
          <g id="Group-3" transform="translate(3.000000, 1253.000000)">
              <rect id="Rectangle-Copy" stroke="#757575" stroke-width="5" fill="#757575" x="0" y="0" width="1200" height="150"></rect>
              <text id="SPONSORS" fill="#FFFFFF" font-size="24" font-weight="bold">
                  <tspan x="544" y="85">SPONSORS</tspan>
              </text>
          </g>
      </g>
  </svg>
  </div>

  <figcaption>
    Containers are stacked on the page. The prominent page heading reminds the user know where they are. Breadcrumbs allow them to jump back up the heirachy. A sitemap at the bottom can be used to skip to anywhere in the site.
  </figcaption>
</figure>

The design also helps to cut site admin down to a minimum. No superfluous copy or images are needed. Video thumbnails, generated automatically, and titles, serve as the UI.

## The Django app

I chose [Django][6] for the app, having used it on similar projects before. The web app is hosted on a small [DigitalOcean][7] droplet. Site content itself is served from [S3][10] via [CloudFront][11], using [signed URLs][12] to keep the content private. Files are uploaded directly to S3 using [django-storages][8] and [django-filetransfers][9].


## Videos, even on poolside

The "container model" design described above easily scales down to mobile. But I also needeed to take into account the bandwidth-constrained nature of poolside. Videos needed to be transcoded to multiple resolutions.

<figure>
  <img src="/img/offtheblocks/tablet.jpg" alt="Tablet displaying a video page">
</figure>

For this job I used the [AWS elastic transcoder][2], making use of [django elastic transcoder][3] -- a small wrapper around the excellent [boto][4] AWS library.


## User registration

British Swimming wanted any coach to be able to register for the site. But they wanted a verification stage. I used a customised version of [django-inspectional-registration][5] to manage the 5 registration steps. The process includes automated emails, sent to the the site administrator and the coach signing up.

[1]: http://next.theguardian.com/blog/container-model-blended-content/ "The container model and blended content – a new approach to how we present content on the Guardian"
[2]: https://aws.amazon.com/elastictranscoder/ "Amazon Elastic Transcoder"
[3]: https://github.com/StreetVoice/django-elastic-transcoder "Django Elastic Transcoder"
[4]: https://aws.amazon.com/sdk-for-python/ "Boto3"
[5]: https://github.com/lambdalisue/django-inspectional-registration
[6]: https://www.djangoproject.com/
[7]: https://www.digitalocean.com
[8]: https://django-storages.readthedocs.io/en/latest/backends/amazon-S3.html
[9]: https://www.allbuttonspressed.com/projects/django-filetransfers
[10]: http://docs.aws.amazon.com/AmazonS3/latest/dev/Welcome.html "Amazon S3"
[11]: https://aws.amazon.com/cloudfront/ "Amazon CloudFront"
[12]: http://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-signed-urls.html "Using signed URLs on CloudFront"

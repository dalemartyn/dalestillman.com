---
device: laptop
title: "Off the Blocks"
date: 2016-10-07T09:49:35+01:00
excerpt_separator: "##"
tagline: A video site for swimming coaches
image:
  json: /off-the-blocks/off-the-blocks.json
color_light: "#3282C1"
color_dark: "#19609C"
work_for: British Swimming
freelance: true
---

British Swimming exists to win medals in the pool. To do so they need the best coaching.  As part of their National Development Syllabus they were producing a range of video resources to make available to all coaches in Great Britain. This post will look how I created a low maintenance, easy to use site that was in line with the British Swimming brand.


## A flexible site for future growth

I developed the site in parallel with the first batch of videos. The site was designed to be able to add more content as it was developed, starting with the Techinical videos.

The content structure had several categories of lessons - Starts, Turns and Underwaters. Each category in turn had lessons for each of the four swimming strokes. And each lesson (e.g. Backstroke Starts) comprised of 4 videos and a PDF factsheet.

## Making the content discoverable

I wanted the content to surface to the top page, making it the first thing a coach sees when they log in. Using a [container model][1], with the videos represented by their thumbnails, the breadth of content becomes immediately clear. It allows the coach to jump right in to a lesson, or drill down futher in the site heirachy using the "View All" links.

<figure>
  <div class="c-image-background u-rounded">
    {% image "/off-the-blocks/off-the-blocks-window.json" %}
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
  <div class="c-image-background u-rounded">
    {% image "/off-the-blocks/off-the-blocks-video-page.json" %}
  </div>
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

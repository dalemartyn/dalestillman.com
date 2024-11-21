---
title: "Helter Skelter"
tagline: "A quirky website for enchanting circus performers"
image:
  json: /helter-skelter/helter-skelter.json
color_light: "#dd497f"
color_dark: "#9c275a"
date: 2018-08-10T12:00:00+01:00
work_for: a dozen eggs
---

[Helter Skelter][1] is one of the most fun projects we’ve worked on in my time at _[a dozen eggs][2]_. The client, Loughborough duo Helena and Tor, run a circus entertainment company that offer loads of different acts, for a variety of events, with a choice of themes. They came to us for branding and a website, and the design team were delighted with their moodboard feedback. They wanted a brand that communicated how quirky and fun they are. It was really fun to see some of the things the team ([Michelle][3], [Jo][4], and [Beth][5]) came up with. A personal favourite was Michelle’s illustration of a fish coming out of a trumpet.

I really like the [result of the branding process][6]. I love the contrast between the bright colours and the black and white illustrations and serif logo. Jo’s website designs carried across this brand work, and Michelle and I also got to play with some animations.

<figure>
  <div class="c-image-background u-rounded">
    {% image "/helter-skelter/helter-skelter-phone-animations.json" %}
  </div>
  <figcaption>
    Weeeeeeeeee! The the child rides the helter skelter.
  </figcaption>
</figure>

We used a variety of animation techniques to bring some life to the homepage. Michelle initially created the animations in After Effects, animating the position of the mask and hat, and the rotation of the mermaid tail. When we were happy with how they looked, I then converted them into CSS keyframe animations. We also used this method to animate a child riding down the helter skelter on the contact page.

For the Ferris wheel, I used an image sprite which contained an illustration for each frame of the animation at 24fps. This gave it a slightly-jerky and cinematic feel, while also keeping the filesize down.

<figure>
  <div class="c-image-background u-rounded">
    {% image "/helter-skelter/helter-skelter-parallax-bubbles.json" %}
  </div>
  <figcaption>
    As you scroll the homepage the acts, events, and themes are introduced. The photo bubbles float up the page at with a parallax effect.
  </figcaption>
</figure>

<figure>
  <div class="c-image-background u-rounded">
    {% image "/helter-skelter/helter-skelter-acts-page.json" %}
  </div>
  <figcaption>
    The top-level pages – acts, events, and themes – each contain dozens of image galleries for all the services Helter Skelter offer.
  </figcaption>
</figure>

<figure>
  <div class="c-image-background u-rounded">
    {% image "/helter-skelter/helter-skelter-gallery.json" %}
  </div>
  <figcaption>
    The image gallery pages are combine a variety of image and testimonial layouts giving them a magazine-like feel.
  </figcaption>
</figure>

You can read more about the [branding and illustrations we created for Helter Skelter][6] on the _a dozen eggs_ website.

[1]: https://www.helterskelterarts.co.uk/
[2]: https://www.adozeneggs.co.uk/
[3]: https://www.adozeneggs.co.uk/insights/author/michelle/ "Michelle Barnett"
[4]: https://www.adozeneggs.co.uk/insights/author/jo/ "Jo Wdowiak"
[5]: https://www.adozeneggs.co.uk/insights/author/beth/ "Beth Evans"
[6]: https://www.adozeneggs.co.uk/portfolio/project/helter-skelter/ "Helter Skelter branding on a dozen eggs website"

---
title: "Charnwood Brewery"
date: 2017-05-12T12:00:00+01:00
tagline: "A webshop for Loughborough’s family-run brewery"
image:
  json: /charnwood-brewery/charnwood-brewery.json
color_light: "#99c5cc"
color_dark: "#628e96"
---

I was a big fan of Charnwood Brewery, having sampled their beers in local pubs. I liked the artwork and branding, which did a great job of conveying 'local' with its use of their mascot Clarence the fox (foxes being used as a symbol of the region). It's fun and playful, a well-designed brand that isn't taking itself too seriously. In fact, Charnwood Brewery was the main reason I joined _[a dozen eggs][1]_. So I was happy when I got the opportunity to build their new website not long after I joined.

<figure>
  <div class="c-image-background u-rounded">
    {% image "/charnwood-brewery/charnwood-brewery-shop.json" %}
  </div>
</figure>

As we were adding a shop to the website, we used it as a chance to move over from the bespoke Ruby on Rails CMS that was being used to WordPress and Woocommerce. Woocommerce gives you a lot of functionality out of the box, including tax calculations, shipping options, and payment gateways. Woocommerce is also free and open-source, although premium plugins can be purchased to extend its functionality. We used the Table Rate Shipping and Royal Mail plugins, as the cases of beer were to be delivered by courier at £8 per case, with the merchandise and posters being delivered by Royal Mail based on their package size and weight.

<figure>
  <div class="c-image-background u-rounded">
    {% image "/charnwood-brewery/charnwood-brewery-product-page.json" %}
  </div>
</figure>

The design of the site was largely based on the previous version of the site. Our designer [Beth][2] and I worked on the design of the shop, and we freshened up the rest of the site and improved the navigation and structure.

<figure>
  <div class="c-image-background u-rounded">
    {% image "/charnwood-brewery/charnwood-brewery-beers-page.json" %}
  </div>
  <figcaption>
    We used a grid system to improve the consistency of layouts between pages and across screen sizes. I also made use of responsive image sizes to make the artwork look super sharp and crispy.
  </figcaption>
</figure>

<figure>
  <div class="c-image-background u-rounded">
    {% image "/charnwood-brewery/charnwood-brewery-phones-header-and-footer.json" %}
  </div>
  <figcaption>
    We added a footer navigation to help discoverability of pages that would otherwise be hidden behind the menu button.
  </figcaption>
</figure>

<figure>
  <div class="c-image-background u-rounded">
    {% image "/charnwood-brewery/charnwood-brewery-home.json" %}
  </div>
  <figcaption>
    The illustrations were by <a href="https://www.adozeneggs.co.uk/insights/author/michelle/" title="Michelle Barnett">Michelle</a>. Beth designed the layout of the scene, similar to the box she’d designed for the cases of beer. I added some subtle animations to the people drinking outside.
  </figcaption>
</figure>

[1]: https://www.adozeneggs.co.uk/
[2]: https://www.adozeneggs.co.uk/insights/author/beth/ "Beth Evans"

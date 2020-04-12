const fs = require('fs');
const nunjucks = require('nunjucks');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const fetch = require('node-fetch');

nunjucks.configure('src/_includes/images/');

const env = process.env.ELEVENTY_ENV;
const baseUrl = "https://img.dalestillman.com/v1";

async function getImageData(file) {
  let data;

  if (env === "production") {
    const res = await fetch(baseUrl + file);
    data = await res.json();
  } else {
    const imageFile = await readFile('./dist/img' + file)
    data = JSON.parse(imageFile);
  }

  return {
    webpSrcset: getSrcset(data.webpSizes),
    pngSrcset: getSrcset(data.pngSizes),
    src: getSrc(data.src),
    alt: data.alt,
    width: data.size.width,
    height: data.size.height
  };
}

function getSrcset(sizes) {
  return sizes.map(function(i) {
    const src = getSrc(i.src);
    const size = i.size[0];
    return `${src} ${size}w`;
  }).join(",");
}

function getSrc(src) {
  if (env === 'production') {
    return baseUrl + src;
  }
  return '/img' + src;
}

async function renderImage(imageDataFile, template) {
  const image = await getImageData(imageDataFile);
  return nunjucks.render(template, { image });
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addNunjucksAsyncShortcode('image', f => renderImage(f, "image.regular.html"));
  eleventyConfig.addNunjucksAsyncShortcode('work_main_image', f => renderImage(f, "image.work-image.html"));
  eleventyConfig.addNunjucksAsyncShortcode('main_image', f => renderImage(f, "image.main-image.html"));
  eleventyConfig.addNunjucksAsyncShortcode('card_image', f => renderImage(f, "image.card-image.html"));
  eleventyConfig.addNunjucksAsyncShortcode('instagram_image', f => renderImage(f, "image.instagram-image.html"));
  eleventyConfig.addNunjucksFilter('src', src => getSrc(src));
}

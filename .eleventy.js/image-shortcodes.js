const fs = require('fs');
const nunjucks = require('nunjucks');

nunjucks.configure('src/_includes/images/');

const env = process.env.ELEVENTY_ENV;

function getImageData(file) {
  const imageFile = fs.readFileSync('./dist/img' + file);
  const data = JSON.parse(imageFile);

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
    return "https://img.dalestillman.com/v0" + src;
  }
  return src;
}

function renderImage(imageDataFile, template) {
  const image = getImageData(imageDataFile);
  return nunjucks.render(template, { image });
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addShortcode('image', f => renderImage(f, "image.regular.html"));
  eleventyConfig.addShortcode('work_main_image', f => renderImage(f, "image.work-image.html"));
  eleventyConfig.addShortcode('main_image', f => renderImage(f, "image.main-image.html"));
  eleventyConfig.addShortcode('card_image', f => renderImage(f, "image.card-image.html"));
  eleventyConfig.addShortcode('instagram_image', f => renderImage(f, "image.instagram-image.html"));
}

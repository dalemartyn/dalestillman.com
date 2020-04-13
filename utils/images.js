const fs = require('fs');
const nunjucks = require('nunjucks');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const fetch = require('node-fetch');

nunjucks.configure('src/_includes/images/');

const env = process.env.ELEVENTY_ENV;
const baseUrl = getBaseUrl();

async function getImageData(file) {
  let data;

  if (env === "production") {
    const res = await fetch(baseUrl + file);
    data = await res.json();
  } else {
    const imageFile = await readFile('./dist' + baseUrl + file)
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
  return sizes.map(function (i) {
    const src = getSrc(i.src);
    const size = i.size[0];
    return `${src} ${size}w`;
  }).join(",");
}

function getBaseUrl() {
  if (env === "production") {
    return "https://img.dalestillman.com/v1";
  }
  return "/img";
}

function getSrc(src) {
  return baseUrl + src;
}

async function renderImage(imageDataFile, template) {
  const image = await getImageData(imageDataFile);
  return nunjucks.render(template, {
    image
  });
}

module.exports = {
  baseUrl,
  getSrc,
  renderImage
};

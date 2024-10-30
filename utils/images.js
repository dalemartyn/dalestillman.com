import fs from 'fs/promises';
import nunjucks from 'nunjucks';

nunjucks.configure('src/_includes/images/');

const env = process.env.ELEVENTY_ENV;
const baseUrl = getBaseUrl();

async function getImageData(file) {
  let data;

  const res = await fetch(baseUrl + file);
  data = await res.json();

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
  return sizes.map((i) => {
    const src = getSrc(i.src);
    const size = i.size[0];
    return `${src} ${size}w`;
  }).join(",");
}

function getBaseUrl() {
  return env === "production"
    ? "https://img.dalestillman.com/v1"
    : "http://0.0.0.0:8081/img";
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

export { baseUrl, getSrc, renderImage };

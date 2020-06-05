const fs = require('fs');
const imageSizes = require('./image-sizes');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);
const fetch = require('node-fetch');
const figmaApi = require('../apis/figma');
const resizeImage = require('./resize-image');
const { resizeLocalImage } = require('./local-images');
const {
  getLocalImagePath,
  getImageFilename,
  getDistImageDir
} = require('./image-path-utils');
const asyncMap = require('./utils/async-map');


const figmaImages = require('../../src/_data/figma_images.json');


async function resizeFigmaImage(image) {
  await resizeLocalImage(image, './src/_assets/figma/');
}

/**
 * Uses the figma API image stream directly, instead
 * of saving it to disk first
 */
async function downloadAndResizeFigmaImage(image) {
  const imageUrl = await figmaApi.getImageUrl(image.node);
  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error(`unexpected response ${response.statusText}`);
  }

  const imageStream = response.body;

  await resizeImage(
    imageStream,
    {
      dest: getDistImageDir(image.project, image.title),
      filename: getImageFilename(image.title),
      alt: image.alt,
      title: image.title,
    },
    imageSizes.site_image_sizes
  );
}


async function saveFigmaImage(image) {
  const imageUrl = await figmaApi.getImageUrl(image.node);
  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error(`unexpected response ${response.statusText}`);
  }

  image.format = 'png';

  const filePath = getLocalImagePath(image, './src/_assets/figma/');
  const buffer = await response.buffer();
  await writeFile(filePath, buffer);
}


function downloadAndResizeFigmaImages() {
  return asyncMap(figmaImages, downloadAndResizeFigmaImage, 'downloading ');
}


function saveFigmaImages() {
  return asyncMap(figmaImages, saveFigmaImage, 'saving ');
}


function resizeFigmaImages() {
  return asyncMap(figmaImages, resizeFigmaImage, 'optimizing ');
}


module.exports = {
  saveFigmaImage,
  resizeFigmaImage,
  saveFigmaImages,
  resizeFigmaImages,
  downloadAndResizeFigmaImages
};

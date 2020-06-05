/**
 * Script to easily add a new figma image.
 *
 * Usage:
 *
 * npm run add_figma_img 40 42
 */

const {
  saveFigmaImage,
  resizeFigmaImage
} = require('./figma-images');
const asyncMap = require('./utils/async-map');

const figmaImages = require('../../src/_data/figma_images.json');

let start = Number( process.argv[2] );
let end =  Number( process.argv[3] ) ? Number( process.argv[3] ) : start + 1;

const images = figmaImages.slice(start, end);


function saveFigmaImages() {
  return asyncMap(images, saveFigmaImage, 'saving ');
}

function resizeFigmaImages() {
  return asyncMap(images, resizeFigmaImage, 'optimizing ');
}

saveFigmaImages(images)
  .then(() => {
    resizeFigmaImages(images);
  });

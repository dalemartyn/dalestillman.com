const {
  resizeLocalImage,
  resizeFigmaImage,
  saveFigmaImage,
  resizeLocalFigmaImage
} = require('./resize-image');

const localImages = require('../../src/_data/local_images.json');
const figmaImages = require('../../src/_data/figma_images.json');

function resizeImages(images, resizeFunction, logString) {
  return async function() {
    for (let image of images) {
      console.log(logString + image.title);
      try {
        await resizeFunction(image);
      } catch (e) {
        console.log(e);
      }
    }
  }
}

const resizeFigmaImages = resizeImages(figmaImages, resizeFigmaImage, 'downloading ');
const saveFigmaImages = resizeImages(figmaImages, saveFigmaImage, 'saving ');
const resizeLocalImages = resizeImages(localImages, resizeLocalImage, 'resizing ');
const resizeLocalFigmaImages = resizeImages(figmaImages, resizeLocalFigmaImage, 'optimizing ');

module.exports = {
  resizeFigmaImages,
  saveFigmaImages,
  resizeLocalImages,
  resizeLocalFigmaImages
};

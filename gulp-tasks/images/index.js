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

function resize_figma_images() { return resizeImages(figmaImages, resizeFigmaImage, 'downloading ')(); }
function save_figma_images() { return resizeImages(figmaImages, saveFigmaImage, 'saving ')(); }
function resize_local_images() { return resizeImages(localImages, resizeLocalImage, 'resizing ')(); }
function resize_local_figma_images() { return resizeImages(figmaImages, resizeLocalFigmaImage, 'optimizing ')(); }

module.exports = {
  resize_figma_images,
  save_figma_images,
  resize_local_images,
  resize_local_figma_images
};

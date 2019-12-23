const { resizeLocalImage, resizeFigmaImage } = require('./resize-image');

const localImages = require('../../src/_data/images.json');
const figmaImages = require('../../src/_data/figma-images.json');

async function resizeLocalImages() {
  for (let image of localImages) {
    console.log('resizing ' + image.title);
    try {
      await resizeLocalImage(image);
    } catch (e) {
      console.log(e);
    }
  }
}

async function resizeFigmaImages() {
  for (let image of figmaImages) {
    console.log('downloading ' + image.title);
    try {
      await resizeFigmaImage(image);
    } catch (e) {
      console.log(e);
    }
  }
}


module.exports = {
  local: resizeLocalImages,
  figma: resizeFigmaImages
};

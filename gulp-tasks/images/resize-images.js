const resizeImage = require('./resize-image');

const images = require('../../src/_data/images.json');

async function resizeImages() {
  for (let image of images) {
    console.log('resizing ' + image.title);
    try {
      await resizeImage(image);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = resizeImages;

const { resizeLocalImages } = require('./local-images');
const {
  saveFigmaImages,
  resizeFigmaImages
} = require('./figma-images');
const {
  resizeInstagramImages
} = require('./instagram-images');


module.exports = {
  save_figma_images: saveFigmaImages,
  resize_local_images: resizeLocalImages,
  resize_figma_images: resizeFigmaImages,
  resize_instagram_images: resizeInstagramImages
};

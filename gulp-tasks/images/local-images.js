const fs = require('fs');
const imageSizes = require('./image-sizes');
const resizeImage = require('./resize-image');
const {
  getLocalImagePath,
  getImageFilename,
  getDistImageDir
} = require('./image-path-utils');
const asyncMap = require('./utils/async-map');


const localImages = require('../../src/_data/local_images.json');


async function resizeLocalImage(image, src = './src/_assets/img/') {
  const filename = getLocalImagePath(image, src);
  const imageStream = fs.createReadStream(filename);

  await resizeImage(
    imageStream,
    {
      dest: getDistImageDir(image.project, image.title),
      filename: getImageFilename(image.title),
      alt: image.alt,
      title: image.title,
    },
    imageSizes.site_image_sizes);
}


function resizeLocalImages() {
  return asyncMap(localImages, resizeLocalImage, 'resizing ');
}


module.exports = {
  resizeLocalImage,
  resizeLocalImages
};

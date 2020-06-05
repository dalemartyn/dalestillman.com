/**
 * Script to easily add a new figma image.
 *
 * Usage:
 *
 * npm run add_local_img 40 42
 */


const {
  resizeLocalImage
} = require('./local-images');
const asyncMap = require('./utils/async-map');

const localImages = require('../../src/_data/local_images.json');

let start = Number( process.argv[2] );
let end =  Number( process.argv[3] ) ? Number( process.argv[3] ) : start + 1;

const images = localImages.slice(start, end);


function resizeLocalImages() {
  return asyncMap(images, resizeLocalImage, 'optimizing ');
}

resizeLocalImages(images);

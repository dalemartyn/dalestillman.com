const {
  resizeLocalImage
} = require('./gulp-tasks/images/local-images');
const asyncMap = require('./gulp-tasks/images/utils/async-map');

const localImages = require('./src/_data/local_images.json');

let start = Number( process.argv[2] );
let end =  Number( process.argv[3] ) ? Number( process.argv[3] ) : start + 1;

const images = localImages.slice(start, end);


function resizeLocalImages() {
  return asyncMap(images, resizeLocalImage, 'optimizing ');
}

resizeLocalImages(images);

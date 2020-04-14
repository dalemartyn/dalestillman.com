const {
  saveFigmaImage,
  resizeFigmaImage
} = require('./gulp-tasks/images/figma-images');
const asyncMap = require('./gulp-tasks/images/utils/async-map');

const figmaImages = require('./src/_data/figma_images.json');

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

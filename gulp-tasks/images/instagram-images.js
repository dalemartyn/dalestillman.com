const fs = require('fs');
const path = require('path');
const imageSizes = require('./image-sizes');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);
const fetch = require('node-fetch');
const resizeImage = require('./resize-image');
const asyncMap = require('./utils/async-map');


const instagramImages = require('../../src/_data/instagram.json');


async function saveInstagramImage(id, imageUrl) {
  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error(`unexpected response ${response.statusText}`);
  }

  const filePath = path.join(
    './src/_assets/instagram/',
    `${id}.jpg`,
  );
  const buffer = await response.buffer();
  await writeFile(filePath, buffer);
}


async function resizeLocalInstagramImage(image) {
  const imageDir = `./dist/img/instagram/`;

  if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir, {
      recursive: true
    });
  }

  const filePath = path.join(
    './src/_assets/instagram/',
    `${image.id}.jpg`,
  );

  const imageStream = fs.createReadStream(filePath);

  await resizeImage(
    imageStream,
    {
      dest: imageDir,
      filename: image.id,
      alt: image.caption ? image.caption : '',
    },
    imageSizes.instagram_image_sizes
  );
}


async function resizeInstagramImages() {
  // resize main images
  await asyncMap(instagramImages, resizeLocalInstagramImage, 'resizing instagram image ');

  for (let image of instagramImages) {
    if (image.children) {
      await asyncMap(image.children, resizeLocalInstagramImage, 'resizing instagram album image ');
    }
  }
}


module.exports = {
  saveInstagramImage,
  resizeInstagramImages
};

require('dotenv').config();

// packages
const fetch = require('node-fetch');
const util = require('util');
const fs = require('fs');
const path = require('path');
const slugify = require('@sindresorhus/slugify');
const streamPipeline = util.promisify(require('stream').pipeline);

// keys
const api_key = process.env.FIGMA_API_KEY;
const file_key = process.env.FIGMA_FILE_KEY;

// image data
const images = require('../src/_data/figma-images.json');

const distDir = './dist/figma-img/';

async function downloadFigmaImages() {
  for (let image of images) {
    try {
      await getFigmaImageUrl(image.node)
        .then(url => downloadFigmaImage(url, image.title));
    } catch (e) {
      console.log(e);
    }
  }
}

/**
 * Get the Figma Image URL.
 *
 * @see https://www.figma.com/developers/api#get-images-endpoint
 */
function getFigmaImageUrl(nodeId) {
  const endpoint = `https://api.figma.com/v1/images/${file_key}`;

  const url = new URL(endpoint);
  const params = url.searchParams;

  params.set('ids', nodeId);
  params.set('scale', '3');
  params.set('format', 'png');

  return fetch(url, {
      method: 'GET',
      headers: {
        'X-Figma-Token': api_key
      }
    })
    .then(res => res.json())
    .then(data => data.images[nodeId]);
}

async function downloadFigmaImage(imageUrl, imageTitle) {
  const slug = slugify(imageTitle);
  const imageDir = path.join(distDir, slug);
  const imagePath = path.join(imageDir, slug + '.png');

  if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir, { recursive: true });
  }

  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error(`unexpected response ${response.statusText}`);
  }

  await streamPipeline(response.body, fs.createWriteStream(imagePath));
}

module.exports = {
  download: downloadFigmaImages
};

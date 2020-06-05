require('dotenv').config();

const fetch = require('node-fetch');

const FIGMA_API_KEY = process.env.FIGMA_API_KEY;
const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY;

/**
 * Get the Figma Image URL.
 *
 * @see https://www.figma.com/developers/api#get-images-endpoint
 */
function getImageUrl(nodeId) {
  const endpoint = `https://api.figma.com/v1/images/${FIGMA_FILE_KEY}`;

  const url = new URL(endpoint);
  const params = url.searchParams;

  params.set('ids', nodeId);
  params.set('scale', '4');
  params.set('format', 'png');

  return fetch(url, {
      method: 'GET',
      headers: {
        'X-Figma-Token': FIGMA_API_KEY
      }
    })
    .then(res => res.json())
    .then(data => data.images[nodeId]);
}

module.exports = {
  getImageUrl
};

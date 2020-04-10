require('dotenv').config();

const fetch = require('node-fetch');
const writeFile = require('../utils/write-file');

const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;

async function get_instagram_data() {
  const url = new URL('https://graph.instagram.com/me/media');
  const params = url.searchParams;

  /*
   * https: //developers.facebook.com/docs/instagram-basic-display-api/reference/media
   */
  params.set('fields', [
    'caption',
    'id',
    'media_type',
    'media_url',
    'permalink',
  ]);

  params.set('access_token', INSTAGRAM_ACCESS_TOKEN);
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function save_instagram_data() {
  const data = await get_instagram_data();
  const filename = './src/_data/instagram.json';

  const images = data.data.slice(0, 10);

  await writeFile(filename, JSON.stringify(images, null, 2));
}

module.exports = {
  save_instagram_data
};

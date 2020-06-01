require('dotenv').config();

const fetch = require('node-fetch');
const writeFile = require('../utils/write-file');
const {
  saveInstagramImage
} = require('../images/instagram-images');

const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;

async function get_instagram_data() {
  const url = new URL('https://graph.instagram.com/me/media');
  const params = url.searchParams;

  /*
   * https://developers.facebook.com/docs/instagram-basic-display-api/reference/media
   */
  params.set('fields', [
    'caption',
    'id',
    'media_type',
    'permalink',
    'children'
  ]);

  params.set('access_token', INSTAGRAM_ACCESS_TOKEN);
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function get_instagram_item_data(id) {
  const url = new URL('https://graph.instagram.com/' + id);
  const params = url.searchParams;

  /*
   * https://developers.facebook.com/docs/instagram-basic-display-api/reference/media
   */
  params.set('fields', [
    'id',
    'media_type',
    'thumbnail_url',
    'media_url',
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

  const instagramData = await Promise.all(
    images.map(downloadInstagramItem)
  );

  await writeFile(filename, JSON.stringify(instagramData, null, 2));
}

async function downloadInstagramItem(data) {
  await downloadInstagramMedia(data.id);

  if (data.media_type === "CAROUSEL_ALBUM") {
    data.children = await downloadInstagramChildren(data);
  }

  return data;
}

async function downloadInstagramChildren(data) {
  console.log("Downloading Instagram Album", JSON.stringify({ id: data.id, media_type: data.media_type }, null, 2));
  const childMedia = await Promise.all( data.children.data.map( c => downloadInstagramMedia(c.id) ) );
  return [
    ...childMedia
  ];
}

async function downloadInstagramMedia(id) {
  const media = await get_instagram_item_data(id);
  const data = {
    media_type: media.media_type,
    id: media.id
  };

  console.log("Downloading Instagram Media", JSON.stringify(data, null, 2));

  if (media.media_type === "IMAGE" || media.media_type === "CAROUSEL_ALBUM") {
    await saveInstagramImage(id, media.media_url);
  } else if (media.media_type === "VIDEO") {
    await saveInstagramImage(id, media.thumbnail_url);
  } else {
     console.log('test', id, media);
  }

  return data;
}


module.exports = {
  save_instagram_data,
  get_instagram_item_data
};

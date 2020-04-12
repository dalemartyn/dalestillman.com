const fs = require('fs');
const path = require('path');
const slugify = require('@sindresorhus/slugify');
const sharp = require('sharp');
const imageSizes = require('./image-sizes');
const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);
const fetch = require('node-fetch');
const figmaApi = require('../apis/figma');

function getImageDir(projectName) {
  const dist = './dist/img/';
  const imageDir = path.join(dist, slugify(projectName, { decamelize: false }));

  if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir, {
      recursive: true
    });
  }

  return imageDir;
}

function getImagePath(imageDir, imageSizeName, imageFilename) {
  const imageSizeDir = path.join(imageDir, imageSizeName);

  if (!fs.existsSync(imageSizeDir)) {
    fs.mkdirSync(imageSizeDir);
  }

  return path.join(imageSizeDir, imageFilename);
}

function getImageFilename(imageTitle) {
  return slugify(imageTitle, { decamelize: false });
}

function getLocalImageDir(image, src = './src/_assets/img/') {
  const filename =  slugify(image.title, { decamelize: false });

  const imageDir = path.join(
    src,
    slugify(image.project,  { decamelize: false })
  );

  if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir, {
      recursive: true
    });
  }

  return imageDir;
}

function getLocalImagePath(image, src = './src/_assets/img/') {
  const filename =  slugify(image.title, { decamelize: false });
  const format = image.format ? image.format : 'png';

  return path.join(
    src,
    slugify(image.project,  { decamelize: false }),
    `${filename}.${format}`,
  );
}

async function resizeImage(imageStream, image, sizes) {
  const mainSrc = getImagePath(image.dest, sizes[0].name, image.filename);

  /**
   * Data for the image json file that we will use for our 11ty <img>s.
   */
  const imageData = {
    src: `${mainSrc.replace('dist/img', '')}.png`,
    alt: image.alt,
    pngSizes: [],
    webpSizes: []
  };

  if (image.title) {
    imageData.title = image.title;
  }

  const pipeline = sharp();
  const pipelines = [pipeline];
  pipeline.clone()
    .metadata()
    .then(function(metadata) {
      imageData.size = {
        width: metadata.width,
        height: metadata.height
      };
    });

  for (let size of sizes) {
    const imagePath = getImagePath(image.dest, size.name, image.filename);
    const sizePipeline = pipeline.clone()
      .resize(size.options);

    const pngPipeline = sizePipeline.clone()
      .png()
      .toBuffer({ resolveWithObject: true })
      .then(({ data, info }) => {
        console.log(`saving ${image.title ? image.title : 'image'} at ${info.width}x${info.height} as ${info.format}`);
        imageData.pngSizes.push({
          src: `${imagePath.replace('dist/img', '')}.png`,
          size: [info.width, info.height]
        });
        return imagemin.buffer(data, {
          plugins: [
            imageminPngquant({quality: [0.6, 1]})
          ]
        })
      })
      .then(buffer => {
        return writeFile(`${imagePath}.png`, buffer);
      })
      .catch(err => {
        console.log(err);
      });

    const webpPipeline = sizePipeline.clone()
      .webp({
        quality: 80,
        nearLossless: true
      })
      .toFile(`${imagePath}.webp`)
      .then(info => {
        imageData.webpSizes.push({
          src: `${imagePath.replace('dist/img', '')}.webp`,
          size: [info.width, info.height]
        });
      })
      .catch(err => {
        console.log(err);
      });

    pipelines.push(pngPipeline, webpPipeline);
  }

  imageStream.pipe(pipeline);

  await Promise.all(pipelines);

  const dataFilePath = path.join(image.dest, image.filename + '.json');
  await writeFile(dataFilePath, JSON.stringify(imageData, null, 2));
}

async function resizeLocalImage(image, src = './src/_assets/img/') {
  const filename = getLocalImagePath(image, src);
  const imageStream = fs.createReadStream(filename);

  await resizeImage(
    imageStream,
    {
      dest: getImageDir(image.project, image.title),
      filename: getImageFilename(image.title),
      alt: image.alt,
      title: image.title,
    },
    imageSizes.site_image_sizes);
}

async function resizeLocalFigmaImage(image) {
  await resizeLocalImage(image, './src/_assets/figma/');
}

async function resizeFigmaImage(image) {
  const imageUrl = await figmaApi.getImageUrl(image.node);
  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error(`unexpected response ${response.statusText}`);
  }

  const imageStream = response.body;

  await resizeImage(
    imageStream,
    {
      dest: getImageDir(image.project, image.title),
      filename: getImageFilename(image.title),
      alt: image.alt,
      title: image.title,
    },
    imageSizes.site_image_sizes
  );
}

async function saveFigmaImage(image) {
  const imageUrl = await figmaApi.getImageUrl(image.node);
  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error(`unexpected response ${response.statusText}`);
  }

  getLocalImageDir(image, './src/_assets/figma/');
  image.format = 'png';

  const filePath = getLocalImagePath(image, './src/_assets/figma/');
  const buffer = await response.buffer();
  await writeFile(filePath, buffer);
}

async function saveInstagramImage(image) {
  const imageUrl = image.media_url;
  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error(`unexpected response ${response.statusText}`);
  }

  const filePath = path.join(
    './src/_assets/instagram/',
    `${image.id}.jpg`,
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

module.exports = {
  resizeLocalImage,
  resizeFigmaImage,
  saveFigmaImage,
  resizeLocalFigmaImage,
  saveInstagramImage,
  resizeLocalInstagramImage
};

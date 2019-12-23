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
const figmaApi = require('./figma-api');

function getImageDir(projectName) {
  const dist = './dist/img/';
  const imageDir = path.join(dist, slugify(projectName));

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
  return `${slugify(imageTitle)}`;
}

function getLocalImagePath(image) {
  const src = './src/_assets/img/';

  return path.join(
    src,
    slugify(image.project),
    `${slugify(image.title)}.${image.format}`,
  );
}

async function resizeImage(imageStream, image) {
  const imageDir = getImageDir(image.project, image.title);
  const imageFilename = getImageFilename(image.title);

  const pipeline = sharp();
  const pipelines = [pipeline];
  const pngSizes = [];
  const webpSizes = [];

  for (let size of imageSizes) {
    const imagePath = getImagePath(imageDir, size.name, imageFilename);
    const sizePipeline = pipeline.clone()
      .resize(size.options);

    const pngPipeline = sizePipeline.clone()
      .png()
      .toBuffer({ resolveWithObject: true })
      .then(({ data, info }) => {
        console.log(`saving ${image.title} at ${info.width}x${info.height} as ${info.format}`);
        pngSizes.push(`${imagePath.replace('dist', '')}.png ${info.width}w`);
        return imagemin.buffer(data, {
          plugins: [
            imageminPngquant({quality: [0.3, 0.7]})
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
      .webp()
      .toFile(`${imagePath}.webp`)
      .then(info => {
        webpSizes.push(`${imagePath.replace('dist', '')}.webp ${info.width}w`);
      })
      .catch(err => {
        console.log(err);
      });

    pipelines.push(pngPipeline, webpPipeline);
  }

  imageStream.pipe(pipeline);

  await Promise.all(pipelines);

  const mainSrc = getImagePath(imageDir, imageSizes[0].name, imageFilename);
  const imageData = {
    src: `${mainSrc.replace('dist', '')}.png`,
    pngSrcset: pngSizes.join(", "),
    webpSrcset: webpSizes.join(", "),
    alt: image.alt,
    title: image.title
  };
  const dataFilePath = path.join(imageDir, imageFilename + '.json');
  await writeFile(dataFilePath, JSON.stringify(imageData, null, 2));
}

async function resizeLocalImage(image) {
  const filename = getLocalImagePath(image);

  const imageStream = fs.createReadStream(filename);
  await resizeImage(imageStream, image);
}

async function resizeFigmaImage(image) {
  const imageUrl = await figmaApi.getImageUrl(image.node);
  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error(`unexpected response ${response.statusText}`);
  }

  const imageStream = response.body;
  await resizeImage(imageStream, image);
}

module.exports = {
  resizeLocalImage,
  resizeFigmaImage
};

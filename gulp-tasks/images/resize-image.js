const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);


/**
 * Get the path to save an image at at a given size.
 *
 * @param {string} imageDir
 * @param {string} imageSizeName
 * @param {string} imageFilename
 */
function getImagePathForSize(imageDir, imageSizeName, imageFilename) {
  const imageSizeDir = path.join(imageDir, imageSizeName);

  if (!fs.existsSync(imageSizeDir)) {
    fs.mkdirSync(imageSizeDir);
  }

  return path.join(imageSizeDir, imageFilename);
}


/**
 * Use sharp to resize the images to our specified sizes
 * as png and webp and saves a json file with the image data.
 *
 * @param {ReadableStream} imageStream
 * @param {object} image Image data { dest, filename, alt }
 * @param {array} sizes Array of sharp image size options.
 * @returns {Promise}
 */
async function resizeImage(imageStream, image, sizes) {
  const mainSrc = getImagePathForSize(image.dest, sizes[0].name, image.filename);

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
    const imagePath = getImagePathForSize(image.dest, size.name, image.filename);
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


module.exports = resizeImage;

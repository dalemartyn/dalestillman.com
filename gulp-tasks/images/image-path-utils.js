const fs = require('fs');
const path = require('path');
const slugify = require('@sindresorhus/slugify');


/**
 * Get the path to save a full-size image at locally.
 * Creates the folder if it doesn't exist.
 *
 * @param {object} image { project, title, format }
 * @param {string} src source directory
 */
function getLocalImagePath(image, src = './src/_assets/img/') {
  const imageDir = path.join(
    src,
    slugify(image.project, { decamelize: false })
  );

  if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir, {
      recursive: true
    });
  }

  const filename =  slugify(image.title, { decamelize: false });
  const format = image.format ? image.format : 'png';

  return path.join(
    imageDir,
    `${filename}.${format}`,
  );
}


/**
 * Slugify a title to get an image filename (without extension).
 *
 * @param {string} imageTitle Title of the image
 */
function getImageFilename(imageTitle) {
  return slugify(imageTitle, {
    decamelize: false
  });
}


/**
 * Get the destination image directory based on the project name
 * and create it if it doesn't exist.
 *
 * @param {string} projectName
 */
function getDistImageDir(projectName) {
  const dist = './dist/img/';
  const imageDir = path.join(dist, slugify(projectName, { decamelize: false }));

  if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir, {
      recursive: true
    });
  }

  return imageDir;
}


module.exports = {
  getLocalImagePath,
  getImageFilename,
  getDistImageDir
};

// packages
const fs = require("fs");
const path = require("path");
const glob = require("glob");
const sharp = require("sharp");
const sizeOf = require('image-size');

const srcDir = './src/_assets/img/';
const distDir = './dist/img/';

// specify transforms https://sharp.pixelplumbing.com/en/stable/api-resize/#parameters
const transforms = [
  {
    src: "**/*.{jpg,png}",
    options: {
      fit: "cover"
    }
  },
  {
    src: "**/*.{jpg,png}",
    options: {
      width: 810,
      height: 456,
      fit: "cover"
    }
  },
  {
    src: "**/*.{jpg,png}",
    options: {
      width: 540,
      height: 304,
      fit: "cover"
    }
  }
];

// resize images
async function resizeImages() {
  for (const transform of transforms) {
    const srcBase = path.join(process.cwd(), srcDir);
    const src = path.join(srcBase, transform.src);

    const files = glob.sync(src);

    await Promise.all(files.map(file => createImage(file, transform.options)));
  }
}

async function createImage(inputImage, options) {
  const srcPath = path.dirname(inputImage).replace(
    path.join(process.cwd(), srcDir),
    ''
  );

  const dims = sizeOf(inputImage);

  if (
    ( options.width && options.width > dims.width )
    ||
    ( options.height && options.height > dims.height )
  ) {
    return false;
  }

  const ext = path.extname(inputImage);
  const name = path.basename(inputImage, ext);

  let filename = name;
  if (options.width) {
    filename += '_' + options.width;
    if (options.height) {
      filename += 'x' + options.height;
    }
  }
  filename += ext;

  const file = path.join(
    process.cwd(),
    distDir,
    srcPath,
    filename,
  );

  const dir = path.dirname(file);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, {
      recursive: true
    });
  }

  return sharp(inputImage)
    .resize(options)
    .png()
    .toFile(file)
    .catch(err => {
      console.log(err);
    });
}

module.exports = {
  resize: resizeImages
};

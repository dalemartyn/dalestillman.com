module.exports = async function asyncMap(images, resizeFunction, logString) {
  for (let image of images) {
    console.log(logString + (image.title ? image.title : image.id));
    try {
      await resizeFunction(image);
    } catch (e) {
      console.log(e);
    }
  }
}

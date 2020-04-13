const { renderImage } = require('./images');

module.exports = {
  image:           f => renderImage(f, "image.regular.html"),
  work_main_image: f => renderImage(f, "image.work-image.html"),
  main_image:      f => renderImage(f, "image.main-image.html"),
  card_image:      f => renderImage(f, "image.card-image.html"),
  instagram_image: f => renderImage(f, "image.instagram-image.html")
};

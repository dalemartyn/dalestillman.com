import Rellax from "rellax";

new Rellax('.js-polaroid-1', {
  speed: 1,
  center: true,
});

new Rellax('.js-polaroid-2', {
  speed: 1.75,
  center: true,
});

new Rellax('.js-polaroid-3', {
  speed: 2.5,
  center: true,
});

let images = document.querySelectorAll('img');
const fadeIn = function() {
  this.classList.remove('invisible');
}

images.forEach(function(img) {
  if (!img.complete) {
    img.classList.add('invisible');
    img.addEventListener('load', fadeIn.bind(img));
  }
});

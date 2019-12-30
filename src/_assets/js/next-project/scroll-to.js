export default function scrollTo(offset, callback) {
  const onScroll = function () {
    if (window.pageYOffset === offset) {
      window.removeEventListener('scroll', onScroll);
      callback();
    }
  }
  window.addEventListener('scroll', onScroll)
  window.scrollTo({
    top: offset,
    behavior: 'smooth'
  });
}

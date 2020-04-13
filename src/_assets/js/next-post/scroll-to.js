export default function scrollTo(offset, callback) {
  console.log("SMOOTH SCROLLING TO " + offset)
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

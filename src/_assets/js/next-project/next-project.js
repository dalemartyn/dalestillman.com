import scrollTo from "./scroll-to.js";

const element = document.querySelector('.js-next-project');
const linkElement = element.querySelector('.js-next-project-link');
const url = linkElement.getAttribute('href');

let headElement;
let bodyElement;


function preload() {
  fetch(url)
    .then(res => res.text())
    .then(html => {
      const element = document.createElement("html");
      element.innerHTML = html;
      return element;
    })
    .then(htmlElement => {
      headElement = htmlElement.querySelector("head");
      bodyElement = htmlElement.querySelector("body") || document.createElement("body");
    });
}

function load(e) {
  e.preventDefault();
  const article = bodyElement.querySelector('.js-work-article');
  element.replaceWith(article);

  const nextArticle = bodyElement.querySelector('.js-next-article');
  if (nextArticle) {
    const parent = article.parentElement;
    const divider = nextArticle.previousSibling;
    parent.appendChild(divider);
    parent.appendChild(nextArticle);
  }

  const headerHeight = document.getElementById('site-header').offsetHeight;
  const top = article.offsetTop - headerHeight;
  scrollTo(top, function () {
    console.log("scrolled");
  });
}

function init() {
  preload();
  linkElement.addEventListener('click', load);
}

init();

import scrollTo from "./scroll-to.js";

let current_project;
let preview_ele;
let preview_link_ele;
let next_project_url;

let head_ele;
let body_ele;

function preload_next_project() {
  return fetch(next_project_url)
    .then(res => res.text())
    .then(html => {
      const html_ele = document.createElement("html");
      html_ele.innerHTML = html;
      head_ele = html_ele.querySelector("head");
      body_ele = html_ele.querySelector("body") || document.createElement("body");
    });
}

function load_next_project() {

  const project = body_ele.querySelector('.js-project');
  const project_inner = project.querySelector('.js-project-inner');
  const next_preview = project.nextElementSibling;

  preview_link_ele.replaceWith(project_inner);
  if (next_preview && next_preview.classList.contains('js-project')) {
    project_inner.parentElement.parentElement.appendChild(next_preview);
  }


  requestAnimationFrame(function() {
    requestAnimationFrame(function() {
      preview_ele.classList.remove('is-next-project');

      const headerHeight = document.getElementById('site-header').offsetHeight;
      const top = preview_ele.offsetTop - headerHeight;
      scrollTo(top, function () {
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            remove_last_project();
            setup_loader();
          })
        });
      });
    })
  });


}

function remove_last_project() {
  current_project.remove();
}

function on_next_project_click(e) {
  e.preventDefault();
  load_next_project();
}

function add_next_project_event_listener() {
  preview_link_ele.addEventListener('click', on_next_project_click);
}

function setup_loader() {
  current_project = document.querySelector('.js-project:not(.is-next-project)');
  preview_ele = document.querySelector('.js-project.is-next-project');

  if (preview_ele) {
    preview_link_ele = preview_ele.querySelector('.js-project-link');
    next_project_url = preview_link_ele.getAttribute('href');
    preload_next_project()
      .then(add_next_project_event_listener);
  }
}

export default setup_loader;

import scrollTo from "./scroll-to.js";
import draf from "./double-raf.js";
import debounce from "lodash/debounce";

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
  update_history();
  update_head();

  const project = body_ele.querySelector('.js-project');
  const project_inner = project.querySelector('.js-project-inner');
  const next_preview = project.nextElementSibling;

  preview_link_ele.replaceWith(project_inner);
  if (next_preview && next_preview.classList.contains('js-project')) {
    project_inner.parentElement.parentElement.appendChild(next_preview);
  }

  const headerHeight = document.getElementById('site-header').offsetHeight;
  const top = preview_ele.offsetTop - headerHeight;
  preview_ele.classList.replace('is-next-project', 's-article');

  draf(function() {
    setTimeout(function() {
      scrollTo(top, function() {
        draf(() => {
          remove_last_project();
          setup_loader();
        });
      });
    }, 100);
  });

}

function update_head() {
  const title = head_ele.querySelector('title').textContent;
  document.title = title;

  const new_description_ele = head_ele.querySelector('meta[name="description"]')
  const dom_description_ele = document.querySelector('meta[name="description"]')
  if (new_description_ele && dom_description_ele) {
    const new_description = new_description_ele.getAttribute('content');
    dom_description_ele.setAttribute('content', new_description);
  }
}

function update_history() {
  save_scroll_state();

  history.pushState({
    scrollX: window.scrollX,
    scrollY: 0
  }, '', next_project_url);
};


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
  history.scrollRestoration = 'manual';
  current_project = document.querySelector('.js-project:not(.is-next-project)');
  preview_ele = document.querySelector('.js-project.is-next-project');

  if (preview_ele) {
    preview_link_ele = preview_ele.querySelector('.js-project-link');
    next_project_url = preview_link_ele.getAttribute('href');
    preload_next_project()
      .then(add_next_project_event_listener);
  }
}

function popstate_event_handler(event) {
  const url = location.href;
  fetch(url)
    .then(res => res.text())
    .then(html => {
      const html_ele = document.createElement("html");
      html_ele.innerHTML = html;
      head_ele = html_ele.querySelector("head");
      body_ele = html_ele.querySelector("body") || document.createElement("body");
      const current_main = document.querySelector(".js-main");
      const new_main = body_ele.querySelector(".js-main");
      update_head();
      current_main.replaceWith(new_main);
      setup_loader();
      restore_scroll_state(event.state);
    });
}

function restore_scroll_state(state = history.state) {
  if (state && 'scrollY' in state) {
    let scrollX = ('scrollX' in state) ? state.scrollX : 0;
    let scrollY = state.scrollY;
    // double raf helps firefox go back to right position.
    draf(function () {
      // force a slight scroll on chrome so that smooth scroll works if you
      // immediately hit the next project link after going back.
      window.scrollTo({
        top: scrollY - 1,
        left: scrollX
      });
      window.scrollBy(0, 1);
    });
  }
}

function save_scroll_state() {
  history.replaceState({
    scrollX: window.scrollX,
    scrollY: window.scrollY
  }, '', location.href);
}

function init() {
  window.addEventListener('popstate', popstate_event_handler);

  history.scrollRestoration = 'manual';
  restore_scroll_state();

  window.addEventListener('scroll', debounce(save_scroll_state, 200));
  setup_loader();
}


export default init;

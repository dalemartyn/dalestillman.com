import path from 'path';
import camelCase from 'camelcase';
import { dev_bundler } from './dev-bundler.js';
import { prod_bundler } from './prod-bundler.js';

const entries = [
  'src/_assets/js/main.js',
  'src/_assets/js/next-post.js',
  'src/_assets/js/parallax-images.js',
  'src/_assets/js/twitter/twitter-feed.js',
  'src/_assets/js/instagram/instagram-grid.js',
  'src/_assets/js/blog/variable-fonts.js'
];

const dist = './dist/js/';

function get_output_file(entry) {
  return path.join(dist, path.basename(entry));
}

function get_output_name(entry) {
  return camelCase(path.basename(entry, '.js'));
}

function bundle_all(bundler) {
  function bundle(entry) {
    const output_file = get_output_file(entry);
    const output_name = get_output_name(entry);
    return bundler(entry, output_file, output_name);
  }

  return Promise.all(entries.map(bundle));
}

export function scriptsDev() {
  return bundle_all(dev_bundler);
}

export function scriptsBuild() {
  return bundle_all(prod_bundler);
}

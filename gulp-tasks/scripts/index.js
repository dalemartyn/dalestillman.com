const path = require('path');
const camelCase = require('camelcase');

const dev_bundler = require('./dev-bundler');
const prod_bundler = require('./prod-bundler');

const entries = [
  'src/_assets/js/main.js',
  'src/_assets/js/work-article.js'
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
    return bundler(entry, output_file, output_name)
  }

  return Promise.all(entries.map(bundle));
}

function scripts_dev() {
  return bundle_all(dev_bundler);
}

function scripts_build() {
  return bundle_all(prod_bundler);
}

module.exports = {
  dev: scripts_dev,
  build: scripts_build
};

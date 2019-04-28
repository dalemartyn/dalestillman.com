const spawn = require('child_process').spawn;

function build_and_watch(done) {
  return spawn('bundle', ['exec', 'jekyll', 'build', '--watch'], { stdio: 'inherit' })
    .on('close', done);
}

function build_and_watch_drafts(done) {
  return spawn('bundle', ['exec', 'jekyll', 'build', '--watch', '--drafts'], { stdio: 'inherit' })
    .on('close', done);
}

function build(done) {
  return spawn('bundle', ['exec', 'jekyll', 'build'], { stdio: 'inherit' })
    .on('close', done);
}

module.exports = {
  init: build_and_watch,
  init_drafts: build_and_watch_drafts,
  build
};

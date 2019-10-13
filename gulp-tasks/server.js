const superstatic = require('superstatic').server;
const chalk = require('chalk');

function firebase_server(done) {
  // use superstatic (which firebase tools uses)
  // https://github.com/firebase/firebase-tools/blob/master/commands/serve.js

  var options = {
    stack: 'strict',
    host: '0.0.0.0',
    port: 5000
  };

  options.config = require('../firebase.json').hosting;

  var server = superstatic(options);

  server.listen(function (err) {
    if (err) { console.log(err); }

    console.log('Starting Firebase development server...');
    console.log(chalk.bold('Public Directory:'), options.config.public);
    console.log(chalk.bold('Project Directory:'), options.config.projectDir || process.cwd());
    console.log('Server listening at: ' + chalk.underline(chalk.bold('http://' + options.host + ':' + options.port)));
    done();
  });
}

module.exports = {
  init: firebase_server
};

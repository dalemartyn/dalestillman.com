const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const markdownIt = require('markdown-it');
const imageShortcodes = require('./utils/image-shortcodes');
const filters = require('./utils/filters');

module.exports = function (config) {
  config.addLayoutAlias('page', 'layouts/layouts.page.html');
  config.addLayoutAlias('post', 'layouts/layouts.post.html');
  config.addLayoutAlias('work', 'layouts/layouts.work.html');
  config.addLayoutAlias('default', 'layouts/layouts.default.html');

  config.addPassthroughCopy('src/css');
  config.addPassthroughCopy('src/js');
  config.addPassthroughCopy({'src/_assets/fonts': 'fonts'});
  config.addPassthroughCopy('src/favicon.png');
  config.addPassthroughCopy('src/twitter.svg');
  config.addPassthroughCopy('src/twitter-wide.svg');

  config.addPlugin(syntaxHighlight, {
    templateFormats: ["njk", "md"],
  });

  // Image Shortcodes
  Object.keys(imageShortcodes).forEach(function(shortcodeName) {
    config.addNunjucksAsyncShortcode(shortcodeName, imageShortcodes[shortcodeName]);
  });

  // Filters
  Object.keys(filters).forEach(function(filterName) {
    config.addFilter(filterName, filters[filterName]);
  });

  config.setLibrary('md', markdownIt({
    html: true,
    typographer: true
  }));

  return {
    dir: {
      input: './src',
      output: './dist'
    },
    passthroughFileCopy: true,
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};

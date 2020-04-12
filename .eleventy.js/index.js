const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const moment = require('moment');
const markdownIt = require('markdown-it');
const slugify = require('@sindresorhus/slugify');
const addImageShortcodes = require('./image-shortcodes');

module.exports = function (eleventyConfig) {
  eleventyConfig.addLayoutAlias('page', 'layouts/layouts.page.html');
  eleventyConfig.addLayoutAlias('post', 'layouts/layouts.post.html');
  eleventyConfig.addLayoutAlias('work', 'layouts/layouts.work.html');
  eleventyConfig.addLayoutAlias('default', 'layouts/layouts.default.html');

  eleventyConfig.addPassthroughCopy('src/css');
  eleventyConfig.addPassthroughCopy('src/js');
  eleventyConfig.addPassthroughCopy({'src/_assets/fonts': 'fonts'});
  eleventyConfig.addPassthroughCopy('src/favicon.png');
  eleventyConfig.addPassthroughCopy('src/twitter.svg');

  eleventyConfig.addPlugin(syntaxHighlight, {
    templateFormats: ["njk", "md"],
  });

  eleventyConfig.addFilter('cssrev', function cssrev(asset) {
    if (process.env.ELEVENTY_ENV === 'production'){
      const manifest = require('../dist/css/css-manifest.json');
      return manifest[asset];
    }
    return asset;
  });

  eleventyConfig.addFilter('slugify', input => {
    if (!input) {
      return false;
    }
    return slugify(input, {
      customReplacements: [
        ["'", ''],
        ['’', ''],
        ['‘', '']
      ]
    });
  });

  addImageShortcodes(eleventyConfig);

  eleventyConfig.addFilter('slice', function(array, i=0, j=array.length) {
    return array.slice(i, j);
  });

  eleventyConfig.addFilter('format_post_date', function(time) {
    const m = moment(time);
    return m.format('MMMM YYYY');
  });

  eleventyConfig.addFilter('to_rgb', function(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    if (!result) return null;

    let r = parseInt(result[1], 16);
    let g = parseInt(result[2], 16);
    let b = parseInt(result[3], 16);

    return `${r}, ${g}, ${b}`;
  });

  eleventyConfig.setLibrary('md', markdownIt({
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

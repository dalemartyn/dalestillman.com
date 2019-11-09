const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (eleventyConfig) {
  eleventyConfig.addLayoutAlias('work-archive', 'layouts/work-archive.html');
  eleventyConfig.addLayoutAlias('post', 'layouts/post.html');
  eleventyConfig.addLayoutAlias('work', 'layouts/work.html');
  eleventyConfig.addLayoutAlias('default', 'layouts/default.html');

  eleventyConfig.addPassthroughCopy('src/css');
  eleventyConfig.addPassthroughCopy('src/js');
  eleventyConfig.addPassthroughCopy({'src/_assets/img': 'img'});
  eleventyConfig.addPassthroughCopy({'src/_assets/fonts': 'fonts'});
  eleventyConfig.addPassthroughCopy('src/favicon.png');

  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addFilter("cssrev", function cssrev(asset) {
    if (process.env.ELEVENTY_ENV === 'production'){
      const manifest = require('./dist/css/css-manifest.json');
      return manifest[asset];
    }
    return asset;
  });

  return {
    dir: {
      input: "./src",
      output: "./dist"
    },
    passthroughFileCopy: true
  };
};

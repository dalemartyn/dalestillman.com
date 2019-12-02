const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (eleventyConfig) {
  eleventyConfig.addLayoutAlias('page', 'layouts/layouts.page.html');
  eleventyConfig.addLayoutAlias('post', 'layouts/layouts.post.html');
  eleventyConfig.addLayoutAlias('work', 'layouts/layouts.work.html');
  eleventyConfig.addLayoutAlias('default', 'layouts/layouts.default.html');

  eleventyConfig.addPassthroughCopy('src/css');
  eleventyConfig.addPassthroughCopy('src/js');
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

  eleventyConfig.addFilter("autop", function autoParagraph(text) {
    return '<p>' + text.split(/\n\n+/).join('</p>\n<p>') + '</p>';
  });

  const markdownIt = require("markdown-it");
  const options = {
    html: true,
    typographer: true
  };

  eleventyConfig.setLibrary("md", markdownIt(options));

  return {
    dir: {
      input: "./src",
      output: "./dist"
    },
    passthroughFileCopy: true
  };
};

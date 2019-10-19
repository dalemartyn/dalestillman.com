const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (eleventyConfig) {
  eleventyConfig.addLayoutAlias('home', 'layouts/home.html');
  eleventyConfig.addLayoutAlias('post', 'layouts/post.html');
  eleventyConfig.addLayoutAlias('work', 'layouts/work.html');
  eleventyConfig.addLayoutAlias('default', 'layouts/default.html');

  eleventyConfig.addPassthroughCopy('css');
  eleventyConfig.addPassthroughCopy('js');
  eleventyConfig.addPassthroughCopy('img');

  eleventyConfig.addPlugin(syntaxHighlight);

  return {
    dir: {
      input: "./",
      output: "./_site"
    },
    passthroughFileCopy: true
  };
};

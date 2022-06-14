const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const eleventySyntaxHighlightPlugin = require("@11ty/eleventy-plugin-syntaxhighlight");

const externalAnchorPlugin = require('@orchidjs/eleventy-plugin-ids');
const externalPicturePlugin = require("eleventy-plugin-img2picture");

module.exports = function (eleventyConfig) {
  // Collect all tags
  eleventyConfig.addCollection("tagList", function (collection) {
    let tags = new Set();
    collection.getAll().forEach(item => {
      (item.data.tags || []).forEach(tag => tags.add(tag));
    });
    
    return [...tags];
  });

  // Plugins
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(eleventySyntaxHighlightPlugin);

  // 3rd Party Plugins
  eleventyConfig.addPlugin(externalAnchorPlugin);
  eleventyConfig.addPlugin(externalPicturePlugin, {
    eleventyInputDir: "posts",
    imagesOutputDir: "_site/assets",
    urlPath: "/assets/",
    fetchRemote: true
  });
};

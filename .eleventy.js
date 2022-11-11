const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const eleventySyntaxHighlightPlugin = require("@11ty/eleventy-plugin-syntaxhighlight");

const externalAnchorPlugin = require("@orchidjs/eleventy-plugin-ids");
const externalPicturePlugin = require("eleventy-plugin-img2picture");

module.exports = function (eleventyConfig) {
  // Deploy
  eleventyConfig.addPasstroughCopy("./CNAME");

  // Plugins
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(eleventySyntaxHighlightPlugin);

  // 3rd Party Plugins
  eleventyConfig.addPlugin(externalAnchorPlugin);
  eleventyConfig.addPlugin(externalPicturePlugin, {
    eleventyInputDir: "posts",
    imagesOutputDir: "_site/assets",
    urlPath: "/assets/",
    fetchRemote: true,
  });

  // Collections
  eleventyConfig.addCollection("post", (collection) => {
    return collection.getFilteredByGlob("./posts/*.md");
  });

  eleventyConfig.addCollection("tags", (collections) => {
    const tags = collections
      .getAll()
      .reduce((tags, item) => tags.concat(item.data.tags), [])
      .filter((tag) => !!tag)
      .filter((tag) => tag !== "post");
    return Array.from(new Set(tags));
  });
};

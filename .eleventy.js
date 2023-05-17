const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const eleventySyntaxHighlightPlugin = require("@11ty/eleventy-plugin-syntaxhighlight");

const externalAnchorPlugin = require("@orchidjs/eleventy-plugin-ids");
const externalPicturePlugin = require("eleventy-plugin-img2picture");

module.exports = function(eleventyConfig) {
  // Deploy
  eleventyConfig.addPassthroughCopy("./CNAME");

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
  eleventyConfig.addCollection("articles", (collection) => {
    return collection.getFilteredByGlob("./articles/*.md");
  });

  eleventyConfig.addCollection("tags", (collections) => {
    const tags = collections
      .getAll()
      .reduce((tags, item) => tags.concat(item.data.tags), [])
      .filter((tag) => !!tag)
      .filter((tag) => tag !== "post" || tag !== "articles");
    return Array.from(new Set(tags));
  });

  // Filters

  eleventyConfig.addFilter('date', function(value) {
    const date = new Date(value);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  });

};

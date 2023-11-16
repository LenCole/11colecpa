const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const fs = require('fs');

module.exports = function (eleventyConfig) {

  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPassthroughCopy('src/img');

  // to use the data in contact.json
  eleventyConfig.addNunjucksShortcode("sitedata", function () {
    return require("_data/sitedata.json");
  });

  const {
    DateTime
  } = require("luxon");

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {
      zone: 'utc-6'
    }).toFormat('yy-MM-dd');
  });

  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {
      zone: 'utc-6'
    }).toFormat("dd-MM-yy");
  });

  eleventyConfig.addFilter("postDate", dateObj => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });

  // Create a collection for FAQs
  eleventyConfig.addCollection("faqs", function (collection) {
    return collection.getFilteredByGlob("src/faqs/*.md");
  });

  // Create a collection for All Posts
  eleventyConfig.addCollection("posts", function (collection) {
    return collection.getFilteredByGlob("src/blog/*.md");
  });

  // Draft posts will not build in production - Set 'draft: true'

  // When `permalink` is false, the file is not written to disk
  eleventyConfig.addGlobalData("eleventyComputed.permalink", function () {
    return (data) => {
      // Always skip during non-watch/serve builds
      if (data.draft && !process.env.BUILD_DRAFTS) {
        return false;
      }

      return data.permalink;
    }
  });

  // When `eleventyExcludeFromCollections` is true, the file is not included in any collections
  // `addGlobalData` acts like a global data file and runs the top level function it receives.
  eleventyConfig.addGlobalData("eleventyComputed.eleventyExcludeFromCollections", function () {
    return (data) => {
      // Always exclude from non-watch/serve builds
      if (data.draft && !process.env.BUILD_DRAFTS) {
        return true;
      }

      return data.eleventyExcludeFromCollections;
    }
  });

  eleventyConfig.on("eleventy.before", ({ runMode }) => {
    // Set the environment variable
    if (runMode === "serve" || runMode === "watch") {
      process.env.BUILD_DRAFTS = true;
    }
  });

  // short codes

  eleventyConfig.addShortcode("tabler", function (file) {
    const iconPath = `./node_modules/@tabler/icons/icons/${file}.svg`;

    try {
      // Read the SVG content from the file
      let svgContent = fs.readFileSync(iconPath, 'utf-8');

      return svgContent;
    } catch (error) {
      console.error(`Error reading SVG file: ${error}`);
      return '';
    }
  })


  return {
    dir: { input: 'src', output: '_site' }
  };
};
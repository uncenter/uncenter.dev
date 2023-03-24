const {
    createCallout,
    getExcerpt,
    insertYear,
    insertDate,
    insertIcon,
    insertIconSheet,
    insertGiscusScript,
    createStaticToot,
    insertImage,
} = require("./utils/shortcodes/index.js");
const {
    getPosts,
    getAllPosts,
    getArchivedPosts,
    getCustomCollections,
    getAllTags,
    getRecentChangesByDate,
} = require("./utils/collections/index.js");
const {
    toDateTime,
    toShortDate,
    toMedDate,
    toFullDate,
    toShortDateTime,
    toMedDateTime,
    toFullDateTime,
    toArray,
    toHTML,
    getCommitCategory,
    getCommitMessage,
    getReadingTime,
    getWordCount,
    getIndex,
    isRecent,
    dumpContents,
    includes,
    cleanFeed,
} = require("./utils/filters/index.js");

const { markdownLibrary } = require("./utils/plugins/markdown.js");
const inProduction = process.env.NODE_ENV === "production";
require('dotenv').config()

const pluginTOC = require("eleventy-plugin-toc");
const pluginExternalLinks = require("@aloskutov/eleventy-plugin-external-links");
const pluginRSS = require("@11ty/eleventy-plugin-rss");
const pluginShikier = require("./utils/plugins/shikier.js");

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
module.exports = function (eleventyConfig) {
    /* Collections */
    eleventyConfig.addCollection("posts", getPosts);
    eleventyConfig.addCollection("allPosts", getAllPosts);
    eleventyConfig.addCollection("archivedPosts", getArchivedPosts);
    eleventyConfig.addCollection("custom", getCustomCollections);
    eleventyConfig.addCollection("allTags", getAllTags);
    eleventyConfig.addCollection("recentChanges", getRecentChangesByDate);

    /* Filters */
    eleventyConfig.addFilter("toDateTime", toDateTime);
    eleventyConfig.addFilter("toShortDate", toShortDate);
    eleventyConfig.addFilter("toMedDate", toMedDate);
    eleventyConfig.addFilter("toFullDate", toFullDate);
    eleventyConfig.addFilter("toShortDateTime", toShortDateTime);
    eleventyConfig.addFilter("toMedDateTime", toMedDateTime);
    eleventyConfig.addFilter("toFullDateTime", toFullDateTime);
    eleventyConfig.addFilter("toArray", toArray);
    eleventyConfig.addFilter("toHTML", toHTML);
    eleventyConfig.addFilter("getCommitCategory", getCommitCategory);
    eleventyConfig.addFilter("getCommitMessage", getCommitMessage);
    eleventyConfig.addFilter("readingTime", getReadingTime);
    eleventyConfig.addFilter("wordCount", getWordCount);
    eleventyConfig.addFilter("getIndex", getIndex);
    eleventyConfig.addFilter("isRecent", isRecent);
    eleventyConfig.addFilter("dumpContents", dumpContents);
    eleventyConfig.addFilter("includes", includes);
    eleventyConfig.addFilter("cleanFeed", cleanFeed);

    /* Shortcodes */
    eleventyConfig.addNunjucksAsyncShortcode("stoot", createStaticToot);
    eleventyConfig.addPairedShortcode("callout", createCallout);
    eleventyConfig.addShortcode("icon", insertIcon);
    eleventyConfig.addShortcode("iconSheet", insertIconSheet);
    eleventyConfig.addShortcode("excerpt", getExcerpt);
    eleventyConfig.addShortcode("date", insertDate);
    eleventyConfig.addShortcode("year", insertYear);
    eleventyConfig.addShortcode("giscus", insertGiscusScript);
    eleventyConfig.addShortcode("image", insertImage);

    /* Plugins */
    eleventyConfig.addPlugin(pluginTOC, { ul: true });
    eleventyConfig.addPlugin(pluginExternalLinks, {
        url: "https://uncenter.org",
        rel: ["noreferrer", "noopener", "external"],
        overwrite: false,
    });
    eleventyConfig.addPlugin(pluginShikier);
    eleventyConfig.addPlugin(pluginRSS);

    /* Layouts */
    eleventyConfig.addLayoutAlias("base", "base.njk");
    eleventyConfig.addLayoutAlias("post", "post.njk");

    /* Passthrough Copy */
    eleventyConfig.addPassthroughCopy({ "src/assets/images/favicon": "." });
    eleventyConfig.addPassthroughCopy({ "src/assets/css": "/assets/css" });
    eleventyConfig.addPassthroughCopy({
        "src/assets/images/content": "/assets/images/content",
    });

    /* Other Config */
    eleventyConfig.addTransform("minify", function (content) {
        if (this.page.outputPath && this.page.outputPath.endsWith(".html")) {
            let minified = require("html-minifier").minify(content, {
                useShortDoctype: true,
                removeComments: true,
                collapseWhitespace: true,
            });
            return minified;
        }
        return content;
    });

    eleventyConfig.setLibrary("md", markdownLibrary);
    eleventyConfig.setQuietMode(!inProduction);

    return {
        dir: {
            input: "src/content",
            includes: "../_includes",
            layouts: "../_includes/layouts",
            data: "../_data",
            output: "dist",
        },
        templateFormats: ["md", "njk", "html", "css"],
        markdownTemplateEngine: "njk",
    };
};

const {
    createCallout,
    insertIcon,
    insertIconSheet,
    getExcerpt,
    insertYear,
    insertDate,
    insertGiscusScript,
    createStaticToot
} = require("./utils/shortcodes/index.js");
const {
    getPosts,
    getCustomCollections,
    getAllTags,
    getRecentChangesByDate,
} = require("./utils/collections/index.js");
const {
    getShortenedJSDate,
    getShortenedISODate,
    dropContentFolder,
    toCaseUpper,
    toCaseLower,
    toArray,
    getCommitCategory,
    getCommitMessage,
    printFileContents,
    getReadingTime,
    getWordCount,
    mdify,
} = require("./utils/filters/index.js");

const { markdownLibrary } = require("./utils/index.js");
const inProduction = process.env.NODE_ENV === "production";

const pluginTOC = require("eleventy-plugin-toc");
const pluginExternalLinks = require("@aloskutov/eleventy-plugin-external-links");
const pluginRSS = require("@11ty/eleventy-plugin-rss");
const pluginShikier = require("./utils/plugins/shikier/index.cjs");

module.exports = function (eleventyConfig) {
    /* Collections */
    eleventyConfig.addCollection("blog", getPosts);
    eleventyConfig.addCollection("custom", getCustomCollections);
    eleventyConfig.addCollection("allTags", getAllTags);
    eleventyConfig.addCollection("recentChanges", getRecentChangesByDate);

    /* Filters */
    eleventyConfig.addFilter("shortenedJSDate", getShortenedJSDate);
    eleventyConfig.addFilter("shortenedISODate", getShortenedISODate);
    eleventyConfig.addFilter("dropContentFolder", dropContentFolder);
    eleventyConfig.addFilter("caseUpper", toCaseUpper);
    eleventyConfig.addFilter("caseLower", toCaseLower);
    eleventyConfig.addFilter("toArray", toArray);
    eleventyConfig.addFilter("getCommitCategory", getCommitCategory);
    eleventyConfig.addFilter("getCommitMessage", getCommitMessage);
    eleventyConfig.addFilter("printFileContents", printFileContents);
    eleventyConfig.addFilter("readingTime", getReadingTime);
    eleventyConfig.addFilter("wordCount", getWordCount);
    eleventyConfig.addFilter("mdify", mdify);

    /* Shortcodes */
    eleventyConfig.addShortcode("callout", createCallout);
    eleventyConfig.addShortcode("icon", insertIcon);
    eleventyConfig.addShortcode("iconSheet", insertIconSheet);
    eleventyConfig.addShortcode("excerpt", getExcerpt);
    eleventyConfig.addShortcode("year", insertYear);
    eleventyConfig.addShortcode("date", insertDate);
    eleventyConfig.addShortcode("giscus", insertGiscusScript);
    eleventyConfig.addShortcode("stoot", createStaticToot);

    /* Plugins */
    eleventyConfig.addPlugin(pluginTOC, { ul: true });
    eleventyConfig.addPlugin(pluginExternalLinks, { url: "https://uncenter.org", rel: ["noreferrer", "noopener", "external"], overwrite: false });
    eleventyConfig.addPlugin(pluginShikier);
    eleventyConfig.addPlugin(pluginRSS);

    /* Layouts */
    eleventyConfig.addLayoutAlias("base", "base.njk");
    eleventyConfig.addLayoutAlias("post", "post.njk");

    /* Passthrough Copy */
    eleventyConfig.addPassthroughCopy({ "src/assets/images/favicon": "." });
    eleventyConfig.addPassthroughCopy({ "src/assets/js": "/assets/js" });
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

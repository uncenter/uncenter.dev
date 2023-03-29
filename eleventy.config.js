const {
    getExcerpt,
    getCollectionWordCount,
    getCollectionReadingTime,
    getCollectionWordCountAverage,
    getCollectionAverageWordLength,
    createCallout,
    createStaticToot,
    insertGiscusScript,
    insertImage,
} = require("./src/_11ty/shortcodes.js");
const {
    getPosts,
    getAllPosts,
    getArchivedPosts,
    getCustomCollections,
    getAllTags,
    getRecentChangesByDate,
} = require("./src/_11ty/collections.js");
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
} = require("./src/_11ty/filters.js");

const { markdownLibrary } = require("./utils/plugins/markdown.js");
const inProduction = process.env.NODE_ENV === "production";
require('dotenv').config()
const Chalk = require("chalk");

const pluginTOC = require("eleventy-plugin-toc");
const pluginExternalLinks = require("@aloskutov/eleventy-plugin-external-links");
const pluginRSS = require("@11ty/eleventy-plugin-rss");
const pluginShikier = require("./utils/plugins/shikier.js");
const pluginIcons = require("eleventy-plugin-icons");

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
    eleventyConfig.addShortcode("excerpt", getExcerpt);
    eleventyConfig.addShortcode("totalWordCount", getCollectionWordCount);
    eleventyConfig.addShortcode("totalReadingTime", getCollectionReadingTime);
    eleventyConfig.addShortcode("wordCountAverage", getCollectionWordCountAverage);
    eleventyConfig.addShortcode("wordLengthAverage", getCollectionAverageWordLength);
    eleventyConfig.addNunjucksAsyncShortcode("stoot", createStaticToot);
    eleventyConfig.addPairedShortcode("callout", createCallout);
    eleventyConfig.addShortcode("giscus", insertGiscusScript);
    eleventyConfig.addNunjucksAsyncShortcode("image", insertImage);

    /* Plugins */
    eleventyConfig.addPlugin(pluginTOC, { ul: true });
    eleventyConfig.addPlugin(pluginExternalLinks, {
        url: "https://uncenter.org",
        rel: ["noreferrer", "noopener", "external"],
        overwrite: false,
    });
    eleventyConfig.addPlugin(pluginShikier);
    eleventyConfig.addPlugin(pluginRSS);
    eleventyConfig.addPlugin(pluginIcons, {
        mode: 'inline',
        sources: {
            devicon: "./src/_assets/icons/devicon",
            social: "./src/_assets/icons/social",
        },
        enable: ["lucide", "devicon", "social"],
        default: "lucide",
        insertSpriteSheet: {
            shortcode: "iconSheet",
        },
    });

    /* Layouts */
    eleventyConfig.addLayoutAlias("base", "base.njk");
    eleventyConfig.addLayoutAlias("post", "post.njk");

    /* Passthrough Copy */
    eleventyConfig.addPassthroughCopy({ "src/_assets/images/favicon": "." });
    eleventyConfig.addPassthroughCopy({"src/_assets/scripts": "/assets/scripts"});
    eleventyConfig.addPassthroughCopy({
        "src/_assets/images/content": "/assets/images/content",
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
    eleventyConfig.setServerOptions({
        port: process.env.PORT || 8080,
        portReassignmentRetryCount: 0,
    });

    eleventyConfig.on('eleventy.after', async ({ dir, results, runMode, outputMode }) => {
        if (runMode === 'serve' && process.env.NODE_ENV === 'development') {
            console.log();
            console.log(`[11ty] ${Chalk.blue('Server running at')} ${Chalk.cyan('http://localhost:8080')} ${Chalk.blue('and watching for changes...')}`);
            // console.log(`${Chalk.green('[11ty]')} ${Chalk.dim('Opening browser...')}`);
            // setTimeout(() => {
            //     require('openurl').open('http://localhost:8080');
            // }, 1000);
            console.log();
        }
    });

    return {
        dir: {
            input: "src",
            output: "dist",
            includes: "_includes",
            layouts: "_layouts",
            data: "_data",
        },
        templateFormats: ["md", "njk", "html", "css", "11ty.js"],
        markdownTemplateEngine: "njk",
    };
};

const gitlog = require("gitlog").default;
const htmlmin = require("html-minifier");
const htmlpretty = require("html-prettify");
const shiki = require("shiki");
const shikier = require('./utils/shikier/index.cjs');
const { DateTime } = require("luxon");

const filters = require("./utils/filters.js");
const shortcodes = require("./utils/shortcodes.js");
const inProduction = process.env.NODE_ENV === "production";

const markdownIt = require("markdown-it");
const markdownItChecklist = require("markdown-it-task-checkbox");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItAttrs = require("markdown-it-attrs");
const markdownItLinkAttributes = require("markdown-it-link-attributes");
const markdownItFootnote = require("markdown-it-footnote");
const markdownItMark = require("markdown-it-mark");
const markdownItAbbr = require("markdown-it-abbr");
const markdownItSup = require("markdown-it-sup");
const markdownItSub = require("markdown-it-sub");
const markdownItContainer = require("markdown-it-container");
const markdownItKBD = require("markdown-it-kbd");
const markdownItEmoji = require("markdown-it-emoji");

// const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const eleventyTOC = require("eleventy-plugin-toc");
const eleventyExternalLinks = require("@aloskutov/eleventy-plugin-external-links");
const eleventyRSS = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig) {
    Object.keys(filters).forEach((filter) => {
        eleventyConfig.addFilter(filter, filters[filter]);
    });
    eleventyConfig.addPlugin(shortcodes);
    eleventyConfig.addPlugin(eleventyTOC, { ul: true });
    eleventyConfig.addPlugin(eleventyExternalLinks, {
        url: "https://uncenter.org",
        rel: ["noreferrer", "noopener", "external"],
        overwrite: false,
    });
    eleventyConfig.addPlugin(shikier);
    eleventyConfig.addPlugin(eleventyRSS);

    eleventyConfig.addCollection("blog", (collection) => {
        return [
            ...collection.getFilteredByGlob("./src/content/posts/*.md"),
        ].reverse();
    });
    eleventyConfig.addCollection("customCollections", (collectionApi) => {
        const collections = new Map();

        for (const p of collectionApi.getAll()) {
            const { collection } = p.data;
            if (collection === undefined) {
                continue;
            }
            if (!collections.has(collection)) {
                collections.set(collection, []);
            }
            collections.get(collection).push(p);
        }
        return Object.fromEntries(collections.entries());
    });
    function filterTagList(tags) {
        return (tags || []).filter((tag) => ["all"].indexOf(tag) === -1);
    }
    eleventyConfig.addFilter("filterTagList", filterTagList);
    eleventyConfig.addCollection("tagList", function (collection) {
        let tagSet = new Set();
        collection.getAll().forEach((item) => {
            (item.data.tags || []).forEach((tag) => tagSet.add(tag));
        });

        return filterTagList([...tagSet]);
    });
    eleventyConfig.addCollection("recentChangesByDate", () => {
        const settings = {
            repo: __dirname,
            number: 35,
            fields: [
                "hash",
                "abbrevHash",
                "subject",
                "authorName",
                "authorDate",
                "committerDate",
                "committerDateRel",
            ],
        };
        const recentChanges = gitlog(settings);

        const grouped = new Map();

        for (const change of recentChanges) {
            let { subject, authorDate } = change;
            if (
                /^(fix|feat|docs|style|refactor|perf|test|chore|content)\b/i.test(
                    subject
                )
            ) {
                subject = subject.replace(/[<>]/g, "");
                authorDate = DateTime.fromISO(
                    new Date(authorDate).toISOString()
                ).toFormat("LLL dd yyyy");
                if (!grouped.has(authorDate)) {
                    grouped.set(authorDate, []);
                }
                const forThisDate = grouped.get(authorDate);
                if (
                    !forThisDate.some(({ subject: subj }) => subj === subject)
                ) {
                    forThisDate.push({ ...change, subject });
                }
            }
        }
        return Array.from(grouped.entries());
    });

    eleventyConfig.addLayoutAlias("base", "base.njk");
    eleventyConfig.addLayoutAlias("post", "post.njk");

    eleventyConfig.addPassthroughCopy({ "src/assets/images/favicon": "." });
    eleventyConfig.addPassthroughCopy({ "src/assets/js": "/assets/js" });
    eleventyConfig.addPassthroughCopy({ "src/assets/css": "/assets/css" });
    eleventyConfig.addPassthroughCopy({ "src/assets/images/content": "/assets/images/content" });

    eleventyConfig.addTransform("minify", function (content) {
        if (
            this.page.outputPath &&
            this.page.outputPath.endsWith(".html")
        ) {
            let minified = htmlmin.minify(content, {
                useShortDoctype: true,
                removeComments: true,
                collapseWhitespace: true,
            });
            return minified;
        }
        return content;
    });

    // eleventyConfig.addTransform("prettify", function (content, outputPath) {
    //     if (!inProduction && outputPath && outputPath.endsWith(".html")) {
    //         return htmlpretty(content, { char: "    ", count: 1 });
    //     }
    //     return content;
    // });

    let markdownLibrary = markdownIt({
        html: true,
        breaks: true,
    })
        .use(markdownItChecklist, {
            disabled: true,
            divWrap: false,
            idPrefix: "",
            ulClass: "checklist",
            liClass: "checklist-item",
        })
        .use(markdownItAnchor, {
            permalink: true,
            permalinkClass: "direct-link",
            permalinkSymbol: "#",
        })
        .use(markdownItLinkAttributes, [
            {
                matcher(href) {
                    return href.match(/^https?:\/\//);
                },
                attrs: {
                    target: "_blank",
                    rel: "noopener noreferrer",
                },
            },
        ])
        .use(markdownItAttrs)
        .use(markdownItFootnote)
        .use(markdownItMark)
        .use(markdownItAbbr)
        .use(markdownItSup)
        .use(markdownItSub)
        .use(markdownItContainer, "card")
        .use(markdownItKBD)
        .use(markdownItEmoji);
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
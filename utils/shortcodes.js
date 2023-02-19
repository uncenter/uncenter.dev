const markdownIt = require("markdown-it");
const markdownItEmoji = require("markdown-it-emoji");

module.exports = function (eleventyConfig) {
    // Legacy shortcode for backwards compatibility
    eleventyConfig.addPairedShortcode("note", (content, type = "info") => {
        const md = new markdownIt({
            html: true,
        }).use(markdownItEmoji);
        if (["info", "warning", "danger", "tip"].includes(type) === false)
            type = "info";
        return (
            `<div class="note note--${type}">\n` +
            `${md.renderInline(content)}\n` +
            "</div>"
        );
    });

    // New shortcode for more flexibility
    eleventyConfig.addPairedShortcode("callout", (emoji, title, content, type) => {
        const md = new markdownIt({
            html: true,
        }).use(markdownItEmoji);
        const titleEmoji = md.renderInline(`:${emoji}:`);
        const titleText = md.renderInline(`**${title}**`);
        const contentHtml = md.render(content);

        if (["info", "warning", "archived", "future", "tip", "quote"].includes(type) === false) {
            type = "info";
        }
        return (
            `<div class="note note--${type}">\n` +
            `<div class="note__title">\n` +
            `${titleEmoji} ${titleText}\n` +
            `</div>\n` +
            `<div class="note__content">\n` +
            `${contentHtml}\n` +
            `</div>\n` +
            `</div>`
        )
    });

    // Legacy shortcode for backwards compatibility
    eleventyConfig.addShortcode("insertSVG", function (def) {
        const svgRef = "icon-" + def;
        const svgClass = "icon " + svgRef;
        return `<svg class="${svgClass}"><use xlink:href="#${svgRef}"></use></svg>`;
    });

    // New shortcode for more flexibility
    // Combined with https://bennypowers.dev/posts/11ty-svg-sprites/ and previous snippet
    eleventyConfig.addShortcode("icon", function icon(name, kwargs) {
        this.ctx.page.icons ||= new Set();
        this.ctx.page.icons.add(name);
        const { __keywords, ...attrs } = kwargs ?? {};
        const attributes = Object.entries(attrs)
            .map(([name, value]) => `${name}="${value}"`)
            .join(" ");
        return `<svg class="icon icon-${name}" ${attributes}><use href="#icon-${name}"></use></svg>`;
    });

    // Modified from https://www.jonathanyeong.com/garden/excerpts-with-eleventy/
    // FUTURE: https://www.belenalbeza.com/articles/better-excerpts-in-eleventy/
    eleventyConfig.addShortcode("excerpt", (page) => {
        if (!page.hasOwnProperty("content")) {
            return null;
        }

        let excerpt = page.content.trim();

        // Remove the first <h2> tag.
        const match = excerpt.match(/^<h2.*?>.*?<\/h2>/i);
        if (match) {
            excerpt = excerpt.replace(match[0], "");
        }

        // Find the index any following <h2> tags (if any)
        const headingIndex = excerpt.search(/<h2.*?>/i);
        if (headingIndex > 0) {
            excerpt = excerpt.substring(0, headingIndex);
        }

        excerpt = excerpt.replace(/<(?!\/?(p|strong|em))[^>]+>/gi, ""); // Remove non-<p> tags

        excerpt = striptags(excerpt).trim(); // Remove HTML tags and get rid of whitespace

        // Truncate excerpt to 200 characters
        if (excerpt.length >= 200) {
            excerpt = excerpt.substring(0, 200);
            const lastSpaceIndex = excerpt.lastIndexOf(" ");
            excerpt = excerpt.substring(0, lastSpaceIndex).trim();

            excerpt = excerpt.concat("...");
        }
        if (excerpt.charAt(excerpt.length - 1) === ",") {
            excerpt = excerpt.substring(0, excerpt.length - 1);
            excerpt = excerpt.concat("...");
        }
        if (excerpt.charAt(excerpt.length - 1) !== ".") {
            excerpt += ".";
        }
        return excerpt;
    });
};

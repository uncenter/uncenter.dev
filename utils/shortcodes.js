const markdownIt = require("markdown-it");
const markdownItEmoji = require("markdown-it-emoji");
const fs = require("fs");
const path = require("path");

module.exports = function (eleventyConfig) {
    eleventyConfig.addPairedShortcode(
        "callout",
        (content, title, emoji, type) => {
            const md = new markdownIt({
                html: true,
            }).use(markdownItEmoji);
            const titleEmoji = md.renderInline(`:${emoji}:`);
            const titleText = md.renderInline(`**${title}**`);
            const contentHtml = md.render(content);

            if (
                [
                    "info",
                    "warning",
                    "archived",
                    "future",
                    "tip",
                    "quote",
                ].includes(type) === false
            ) {
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
            );
        }
    );

    // Combined with https://bennypowers.dev/posts/11ty-svg-sprites/ and previous snippet
    eleventyConfig.addShortcode("icon", function icon(name) {
        if (!this.ctx.page.icons) {
            this.ctx.page.icons = [];
        }
        if (!this.ctx.page.icons.includes(name)) {
            this.ctx.page.icons.push(name);
        }
        return `<svg class="icon icon-${name}"><use href="#icon-${name}"></use></svg>`;
    });

    eleventyConfig.addShortcode("iconSheet", function iconSheet() {
        const sourceDir = path.join(__dirname, "../src/assets/icons");
        const icons = fs.readdirSync(sourceDir); // Thanks ChatGPT :D
        let pageIcons = this.ctx.page.icons || [];
        pageIcons = pageIcons.filter(icon => icon !== undefined);

        let sprite =
            '<svg class="hidden-svg-sprite-sheet" aria-hidden="true" style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n<defs>\n';

        let symbols = "";
        icons.forEach((icon) => {
            const iconPath = path.join(sourceDir, icon);
            const iconName = path.parse(icon).name;
            const content = fs.readFileSync(iconPath, "utf8");
            const viewBox = content.match(/viewBox="(.+?)"/)[1];  // Thanks ChatGPT :D
            const symbol = content
                .replace(
                    /<svg([^>]+)>/,
                    `<symbol id="icon-${iconName}" viewBox="${viewBox}">`
                )
                .replace("</svg>", "</symbol>").replace(/<!--(.*?)-->/g, ""); // Remove comments thanks to https://stackoverflow.com/q/5653207/17378715
            if (pageIcons.includes(iconName)) {
                symbols += symbol + "\n";
            }
        });
        if (symbols !== "") {
            sprite += symbols + "</defs>\n</svg>\n";
            return sprite;
        }
        return "";
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
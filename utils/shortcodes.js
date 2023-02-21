const markdownIt = require("markdown-it");
const markdownItEmoji = require("markdown-it-emoji");
const fs = require("fs");
const path = require("path");
const { htmlToText } = require("html-to-text");
const meta = require("../src/_data/meta.json");

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
        const icons = fs.readdirSync(sourceDir);
        let pageIcons = this.ctx.page.icons || [];
        pageIcons = pageIcons.filter((icon) => icon !== undefined);

        let sprite =
            '<svg class="hidden-svg-sprite-sheet" aria-hidden="true" style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n<defs>\n';

        let symbols = "";
        icons.forEach((icon) => {
            const iconPath = path.join(sourceDir, icon);
            const iconName = path.parse(icon).name;
            const content = fs.readFileSync(iconPath, "utf8");
            const viewBox = content.match(/viewBox="(.+?)"/)[1];
            let classname = content.match(/class="(.+?)"/);
            if (classname) {
                classname = classname[1];
            } else {
                classname = "";
            }
            const symbol = content
                .replace(
                    /<svg([^>]+)>/,
                    `<symbol id="icon-${iconName}" viewBox="${viewBox}"${classname ? "" : ' fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"'}>`
                )
                .replace("</svg>", "</symbol>")
                .replace(/<!--(.*?)-->/g, "");
                
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

        let content = page.content.trim();

        return excerptBetter(content);
    });

    eleventyConfig.addShortcode("year", () => {
        return new Date().getFullYear();
    });

    eleventyConfig.addShortcode("date", (date) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    });

    eleventyConfig.addShortcode("giscus", () => {
        const repo = "R_kgDOHSjhjQ";
        const category = "DIC_kwDOHSjhjc4CTQUr";
        const reactions = "1";
        return `
        <script>
        let giscusTheme = "light";
        let giscusAttributes = {
            "src": "https://giscus.app/client.js",
            "data-repo": "${meta.github.username}/${meta.github.repo}",
            "data-repo-id": "${repo}",
            "data-category-id": "${category}",
            "data-mapping": "title",
            "data-reactions-enabled": "${reactions}",
            "data-emit-metadata": "0",
            "data-input-position": "top",
            "data-theme": giscusTheme,
            "data-lang": "en",
            "crossorigin": "anonymous",
            "async": ""
        };
        let giscusScript = document.createElement("script");
        Object.entries(giscusAttributes).forEach(([key, value]) => giscusScript.setAttribute(key, value));
        document.body.appendChild(giscusScript);
        </script>`;
    });
};

function excerptBetter(content) {
    // Remove the first HTML heading if it exists
    content = content.replace(/^(\s*\n*)?<h\d[^>]*>.*?<\/h\d>(\s*\n*)?/i, "");

    // Truncate content before the next heading (if any)
    const nextHeadingIndex = content.search(/<h\d[^>]*>/i);
    if (nextHeadingIndex !== -1) {
        content = content.substring(0, nextHeadingIndex);
    }

    // Convert content to plain text
    const plainText = htmlToText(content, {
        wordwrap: false,
        ignoreHref: true,
        ignoreImage: true,
        uppercaseHeadings: false,
    });

    // Split plain text into phrases and concatenate until length cutoff [From https://github.com/mpcsh/eleventy-plugin-description]

    // Copyright (c) 2020, Mark Cohen

    // All rights reserved.

    // Redistribution and use in source and binary forms, with or without modification,
    // are permitted provided that the following conditions are met:

    //     * Redistributions of source code must retain the above copyright notice,
    //       this list of conditions and the following disclaimer.
    //     * Redistributions in binary form must reproduce the above copyright notice,
    //       this list of conditions and the following disclaimer in the documentation
    //       and/or other materials provided with the distribution.
    //     * Neither the name of bin nor the names of its contributors
    //       may be used to endorse or promote products derived from this software
    //       without specific prior written permission.

    // THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
    // "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
    // LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
    // A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
    // CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
    // EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
    // PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
    // PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
    // LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
    // NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
    // SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
    const phrases = plainText.split(
        /(\p{Terminal_Punctuation}\p{White_Space})/gu
    );
    let excerpt = "";
    while (phrases.length > 0 && excerpt.length < 200) {
        excerpt += phrases.shift();
    }

    // Append ending characters and return excerpt
    excerpt += "...";
    return excerpt;
}

function excerpt(excerpt) {
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
}

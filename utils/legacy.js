const markdownIt = require("markdown-it");
const markdownItEmoji = require("markdown-it-emoji");

module.exports = function (eleventyConfig) {
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

    eleventyConfig.addShortcode("insertSVG", function (def) {
        const svgRef = "icon-" + def;
        const svgClass = "icon " + svgRef;
        return `<svg class="${svgClass}"><use xlink:href="#${svgRef}"></use></svg>`;
    });
}

const markdownIt = require("markdown-it");

module.exports = function (eleventyConfig) {
    eleventyConfig.addPairedShortcode('note', (content, type = "info") => {
        const md = new markdownIt({
            html: true
        });
        if (['info', 'warning', 'danger', 'tip'].includes(type) === false) type = "info";

        return (
            `<div class="note note--${type}">\n`
            + `${md.renderInline(content.trim())}\n`
            + "</div>"
        );
    })

    eleventyConfig.addShortcode("insertSVG", function (def) {
        const svgRef = 'icon-' + def
        const svgClass = 'icon ' + svgRef
        return `<svg class="${svgClass}"><use xlink:href="#${svgRef}"></use></svg>`;
    });

    eleventyConfig.addShortcode('excerpt', article => {
        if (!article.hasOwnProperty('templateContent')) {
            console.warn('Failed to extract excerpt: Document has no property "templateContent".');
            return null;
        }

        let excerpt = null;
        const content = article.templateContent;

        const separatorsList = [
            { start: '<!--START-->', end: '<!--END-->' },
            { start: '<p>', end: '</p>' }
        ];

        separatorsList.some(separators => {
            const startPosition = content.indexOf(separators.start);
            const endPosition = content.indexOf(separators.end);

            if (startPosition !== -1 && endPosition !== -1) {
                excerpt = content.substring(startPosition + separators.start.length, endPosition).trim();
                return true; // Exit out of array loop on first match
            }
        });
        return excerpt;
    });

}
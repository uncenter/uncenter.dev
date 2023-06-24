const htmlmin = require('html-minifier');
const { parseHTML } = require('linkedom');
const log = require('./utils/log.js');

module.exports = {
	// Minify HTML.
	minifyHtml: (content) => {
		return htmlmin.minify(content, {
			useShortDoctype: true,
			removeComments: true,
			collapseWhitespace: true,
		});
	},
	// Wrap Shiki code blocks in a div and apply counter IDs to provide anchor links.
	wrapShiki: (content) => {
		const { document } = parseHTML(content);
		document.querySelectorAll('pre.shiki').forEach((block, index) => {
			if (document.querySelector(`#code-${index}`)) {
				log.error({
					category: 'transform:wrapShiki',
					message: `Duplicate code block ID found: #code-${index}`,
				});
			}
			block.outerHTML = `<div class="shiki-wrapper" id="code-${index}">${block.outerHTML}</div>`;
		});
		return document.documentElement.outerHTML;
	},
};

const { minify } = require('html-minifier');
const { parseHTML } = require('linkedom');

module.exports = {
	// Minify HTML.
	minifyHtml: (content) => {
		return minify(content, {
			useShortDoctype: true,
			removeComments: true,
			collapseWhitespace: true,
		});
	},
	// Wrap Shiki code blocks in a div and apply counter IDs to provide anchor links.
	wrapShiki: (content) => {
		const { document } = parseHTML(content);
		for (const block of document.querySelectorAll('pre.shiki')) {
			const code = block.querySelector('code').innerHTML;
			const genUniqueId = (content) => {
				return require('node:crypto')
					.createHash('md5')
					.update(content)
					.digest('hex');
			};
			let uniqueId = genUniqueId(code).slice(0, 6);
			while (document.querySelector(`#${uniqueId}`)) {
				uniqueId = genUniqueId(uniqueId).slice(0, 6);
			}
			block.outerHTML = `<div class="shiki-wrapper" id="${uniqueId}">${block.outerHTML}</div>`;
		}
		return `<!DOCTYPE html>\n${document.documentElement.outerHTML}`;
	},
};

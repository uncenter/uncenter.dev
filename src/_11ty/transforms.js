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
			const code = block.querySelector('code').textContent;
			const genUniqueId = (content) => {
				return require('crypto')
					.createHash('md5')
					.update(content)
					.digest('hex');
			};
			let uniqueId = genUniqueId(code).slice(0, 6);
			while (document.getElementById(uniqueId)) {
				uniqueId = genUniqueId(uniqueId).slice(0, 6);
			}
			const wrapper = document.createElement('div');
			wrapper.classList.add('shiki-wrapper');
			wrapper.setAttribute('id', uniqueId);
			block.parentNode.replaceChild(wrapper, block);
			wrapper.appendChild(block);

			const codeToolbar = document.createElement('div');
			codeToolbar.classList.add(
				'code-toolbar',
				'absolute',
				'right-0',
				'top-0',
				'flex',
				'gap-1',
				'hidden',
			);
			codeToolbar.setAttribute('aria-hidden', 'true');
			const copyButton = document.createElement('button');
			copyButton.classList.add('copy-button');
			copyButton.setAttribute('aria-label', 'Copy code to clipboard');
			const linkButton = document.createElement('button');
			linkButton.classList.add('link-button');
			linkButton.setAttribute('aria-label', 'Go to code block');
			codeToolbar.appendChild(linkButton);
			codeToolbar.appendChild(copyButton);
			wrapper.appendChild(codeToolbar);
		});
		return document.documentElement.outerHTML;
	},
};

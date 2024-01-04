const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const markdownItAttrs = require('markdown-it-attrs');
const markdownItFootnote = require('markdown-it-footnote');
const markdownItKbd = require('markdown-it-kbd-better');
const markdownItEmoji = require('markdown-it-emoji').full;
const markdownItSub = require('markdown-it-sub');
const markdownItSup = require('markdown-it-sup');
const markdownItContainer = require('markdown-it-container');
const codeToolbarPlugin = require('./code-toolbar.js');

const markdownLibrary = markdownIt({
	html: true,
	breaks: true,
	linkify: true,
})
	.use(markdownItAnchor, {
		permalink: markdownItAnchor.permalink.headerLink({
			safariReaderFix: true,
		}),
	})
	.use(markdownItAttrs)
	.use(markdownItFootnote)
	.use(markdownItKbd, {
		presets: [{ name: 'icons', prefix: 'icon:' }],
		transform: (content) => {
			return content[0].toUpperCase() + content.slice(1);
		},
	})
	.use(markdownItEmoji)
	.use(markdownItSub)
	.use(markdownItSup)
	.use(markdownItContainer, 'dynamic', {
		validate: function () {
			return true;
		},
		render: function (tokens, index) {
			const token = tokens[index];
			return token.nesting === 1
				? '<div class="container ' + token.info.trim() + '">'
				: '</div>';
		},
	})
	.use(codeToolbarPlugin);

module.exports = markdownLibrary;

const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const markdownItAttrs = require('markdown-it-attrs');
const markdownItFootnote = require('markdown-it-footnote');
const markdownItMark = require('markdown-it-mark');
const markdownItAbbr = require('markdown-it-abbr');
const markdownItSup = require('markdown-it-sup');
const markdownItSub = require('markdown-it-sub');
const markdownItKbd = require('markdown-it-kbd-better');
const markdownItEmoji = require('markdown-it-emoji');

const markdownLibrary = markdownIt({
	html: true,
	breaks: true,
	linkify: true,
})
	.use(markdownItAnchor, {
		permalink: markdownItAnchor.permalink.headerLink({
			class: 'anchor',
			safariReaderFix: true,
		}),
	})
	.use(markdownItAttrs)
	.use(markdownItFootnote)
	.use(markdownItMark)
	.use(markdownItAbbr)
	.use(markdownItSup)
	.use(markdownItSub)
	.use(markdownItKbd, {
		presets: [{ name: 'icons', prefix: 'icon:' }],
		transform: (content) => {
			return content[0].toUpperCase() + content.slice(1);
		},
	})
	.use(markdownItEmoji);

module.exports = {
	markdownLibrary,
};

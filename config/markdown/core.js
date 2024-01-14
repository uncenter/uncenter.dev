import markdownIt from 'markdown-it';
import markdownItAnchor from 'markdown-it-anchor';
import markdownItAttrs from 'markdown-it-attrs';
import markdownItFootnote from 'markdown-it-footnote';
import markdownItKbd from 'markdown-it-kbd-better';
import { full as markdownItEmoji } from 'markdown-it-emoji';
import markdownItSub from 'markdown-it-sub';
import markdownItSup from 'markdown-it-sup';
import markdownItContainer from 'markdown-it-container';
import markdownItShikiji from 'markdown-it-shikiji';

import codeToolbarPlugin from './code-toolbar.js';

import {
	transformerNotationDiff,
	transformerNotationFocus,
	transformerNotationHighlight,
	transformerNotationErrorLevel,
	transformerMetaHighlight,
} from 'shikiji-transformers';

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
	.use(markdownItAttrs, {
		leftDelimiter: '[',
		rightDelimiter: ']',
	})
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
	.use(
		await markdownItShikiji({
			themes: { light: 'github-light', dark: 'github-dark' },
			defaultColor: false,
			transformers: [
				transformerNotationDiff(),
				transformerNotationFocus(),
				transformerNotationHighlight(),
				transformerNotationErrorLevel(),
				transformerMetaHighlight(),
			],
		}),
	)
	.use(codeToolbarPlugin);

export default markdownLibrary;

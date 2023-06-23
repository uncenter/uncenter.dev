const shortcodes = require('./src/_11ty/shortcodes.js');
const collections = require('./src/_11ty/collections.js');
const filters = require('./src/_11ty/filters.js');
const utils = require('./src/_11ty/utils.filters.js');

const { markdownLibrary } = require('./utils/plugins/markdown.js');
const { EleventyRenderPlugin } = require('@11ty/eleventy');

const { parseHTML } = require('linkedom');
const { blue } = require('kleur/colors');
const fs = require('fs');
const pluginTOC = require('@uncenter/eleventy-plugin-toc');
const pluginExternalLinks = require('@aloskutov/eleventy-plugin-external-links');
const pluginRSS = require('@11ty/eleventy-plugin-rss');
const pluginShikier = require('./utils/plugins/shikier.js');
const pluginIcons = require('eleventy-plugin-icons');

const inProduction = process.env.NODE_ENV === 'production';
require('dotenv').config();

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
module.exports = function (eleventyConfig) {
	eleventyConfig.addPlugin(shortcodes);
	eleventyConfig.addPlugin(collections);
	eleventyConfig.addPlugin(filters);
	eleventyConfig.addPlugin(utils);

	/* Plugins */
	eleventyConfig.addPlugin(pluginTOC, {
		ul: true,
		wrapper: function (toc) {
			return `<nav class="toc" aria-label="table of contents">${toc}</nav>`;
		},
	});
	eleventyConfig.addPlugin(pluginExternalLinks, {
		url: 'https://uncenter.org',
		rel: ['noreferrer', 'noopener', 'external'],
		overwrite: false,
	});
	eleventyConfig.addPlugin(pluginShikier, {
		theme: 'github-dark',
	});
	eleventyConfig.addPlugin(pluginRSS);
	eleventyConfig.addPlugin(pluginIcons, {
		mode: 'inline',
		sources: {
			si: 'node_modules/simple-icons/icons',
			lucide: 'node_modules/lucide-static/icons',
			custom: 'src/_assets/icons',
		},
		default: 'custom',
		icon: {
			overwriteExistingAttributes: true,
			ignoreNotFound: false,
			class: function (name, source) {
				return `icon icon-${name} icon-${source}`;
			},
		},
	});
	eleventyConfig.addPlugin(EleventyRenderPlugin);

	/* Layouts */
	eleventyConfig.addLayoutAlias('page', 'page.njk');
	eleventyConfig.addLayoutAlias('post', 'post.njk');

	/* Passthrough Copy */
	eleventyConfig.addPassthroughCopy({ 'src/_assets/favicon': '.' });
	eleventyConfig.addPassthroughCopy({
		'src/_assets/fonts/*.woff2': '/assets/fonts',
	});

	/* Other Config */
	eleventyConfig.addTransform('minify-and-wrap-shiki', function (content) {
		if (this.page.outputPath && this.page.outputPath.endsWith('.html')) {
			let minified = require('html-minifier').minify(content, {
				useShortDoctype: true,
				removeComments: true,
				collapseWhitespace: true,
			});
			const { document } = parseHTML(minified);
			document.querySelectorAll('pre.shiki').forEach((block) => {
				block.outerHTML = `<div class="shiki-wrapper">${block.outerHTML}</div>`;
			});
			return document.documentElement.outerHTML;
		}
		return content;
	});

	eleventyConfig.setLibrary('md', markdownLibrary);
	eleventyConfig.setQuietMode(!inProduction);
	eleventyConfig.setServerOptions({
		port: process.env.PORT || 8080,
		portReassignmentRetryCount: 0,
	});
	(fs.readdirSync('./src/_assets/styles') || []).forEach((style) => {
		eleventyConfig.addWatchTarget(`./src/_assets/styles/${style}`);
	});

	let notFirstRun = false;
	eleventyConfig.on(
		'eleventy.after',
		async ({ dir, results, runMode, outputMode }) => {
			if (runMode === 'serve' && process.env.NODE_ENV === 'development') {
				if (notFirstRun)
					console.log(blue('\n[11ty] Server at http://localhost:8080/\n'));

				notFirstRun = true;
			}
		},
	);

	return {
		dir: {
			input: 'src',
			output: 'dist',
			includes: '_includes',
			layouts: '_layouts',
			data: '_data',
		},
		templateFormats: ['md', 'njk', 'html', 'css', '11ty.js'],
		markdownTemplateEngine: 'njk',
	};
};

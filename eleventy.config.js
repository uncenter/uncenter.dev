const shortcodes = require('./src/_11ty/shortcodes.js');
const collections = require('./src/_11ty/collections.js');
const filters = require('./src/_11ty/filters.js');
const utils = require('./src/_11ty/utils.filters.js');
const transforms = require('./src/_11ty/transforms.js');

const pluginTOC = require('@uncenter/eleventy-plugin-toc');
const pluginExternalLinks = require('@aloskutov/eleventy-plugin-external-links');
const pluginRSS = require('@11ty/eleventy-plugin-rss');
const pluginShikier = require('./utils/plugins/shikier.js');
const pluginIcons = require('eleventy-plugin-icons');

const { markdownLibrary } = require('./utils/plugins/markdown.js');
const inProduction = process.env.NODE_ENV === 'production';
const fs = require('fs');
require('dotenv').config();

const { blue } = require('kleur/colors');

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
			return toc;
		},
	});
	eleventyConfig.addPlugin(pluginExternalLinks, {
		url: 'https://uncenter.org',
		rel: ['noreferrer'],
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
		},
		default: false,
		icon: {
			overwriteExistingAttributes: true,
			ignoreNotFound: false,
			class: function (name, source) {
				return `icon icon-${name} icon-${source}`;
			},
		},
	});

	/* Passthrough Copy */
	eleventyConfig.addPassthroughCopy({ 'src/_assets/root': '.' });
	eleventyConfig.addPassthroughCopy({
		'src/_assets/fonts/*.woff2': '/assets/fonts',
	});

	/* Other Config */
	eleventyConfig.addTransform('html', function (content) {
		if (this.page.outputPath && this.page.outputPath.endsWith('.html')) {
			content = transforms.minifyHtml(content);
			content = transforms.wrapShiki(content);
			return content;
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
			if (runMode === 'serve') {
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

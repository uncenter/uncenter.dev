const shortcodes = require('./src/_11ty/shortcodes.js');
const collections = require('./src/_11ty/collections.js');
const filters = require('./src/_11ty/filters.js');
const utils = require('./src/_11ty/utils.filters.js');
const transforms = require('./src/_11ty/transforms.js');

const pluginTOC = require('@uncenter/eleventy-plugin-toc');
const pluginExternalLinks = require('@aloskutov/eleventy-plugin-external-links');
const pluginRSS = require('@11ty/eleventy-plugin-rss');
const pluginShiki = require('./utils/plugins/shiki.js');
const pluginIcons = require('eleventy-plugin-icons');

const { markdownLibrary } = require('./utils/plugins/markdown.js');
const isProduction = process.env.NODE_ENV === 'production';

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
		url: require('./package.json').author.url,
		rel: ['noreferrer'],
		overwrite: false,
	});
	eleventyConfig.addPlugin(pluginShiki, {
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
	eleventyConfig.addPassthroughCopy({ 'src/assets/root': '.' });
	eleventyConfig.addPassthroughCopy('src/assets/fonts/*.woff2');

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
	eleventyConfig.setQuietMode(!isProduction);
	eleventyConfig.setServerOptions({
		port: process.env.PORT || 8080,
		portReassignmentRetryCount: 0,
	});
	eleventyConfig.addWatchTarget('./src/assets/styles/');

	let notFirstRun = false;
	eleventyConfig.on('eleventy.after', async ({ runMode }) => {
		if (runMode === 'serve') {
			if (notFirstRun)
				console.log(blue('\n[11ty] Server at http://localhost:8080/\n'));
			notFirstRun = true;
		}
	});

	return {
		dir: {
			input: 'src',
			output: 'dist',
			includes: '_includes',
			layouts: '_layouts',
			data: '_data',
		},
		templateFormats: ['md', 'njk', 'css', '11ty.js'],
		markdownTemplateEngine: 'njk',
	};
};

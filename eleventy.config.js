const shortcodes = require('./utils/11ty/shortcodes.js');
const collections = require('./utils/11ty/collections.js');
const filters = require('./utils/11ty/filters.js');
const transforms = require('./utils/11ty/transforms.js');

const pluginTOC = require('@uncenter/eleventy-plugin-toc');
const pluginExternalLinks = require('@aloskutov/eleventy-plugin-external-links');
const pluginRSS = require('@ryanccn/eleventy-plugin-rss');
const pluginShiki = require('./utils/plugins/shikiji.js');
const pluginIcons = require('eleventy-plugin-icons');

const path = require('node:path');
const sass = require('sass');
const postcss = require('postcss');

const markdownLibrary = require('./utils/plugins/md-library.js');
const isDevelopment = process.env.NODE_ENV !== 'production';
const site = require('./site.config.js');
require('dotenv').config();

const { blue } = require('kleur/colors');

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
module.exports = function (eleventyConfig) {
	eleventyConfig.addGlobalData('site', site);
	eleventyConfig.addPlugin(shortcodes);
	eleventyConfig.addPlugin(collections);
	eleventyConfig.addPlugin(filters);

	/* Plugins */
	eleventyConfig.addPlugin(pluginTOC, {
		ul: true,
		wrapper: function (toc) {
			return toc;
		},
	});
	eleventyConfig.addPlugin(pluginExternalLinks, {
		url: site.author.url,
		rel: ['noreferrer'],
		overwrite: false,
		enableTarget: false,
	});
	eleventyConfig.addPlugin(pluginShiki, {
		themes: { light: 'github-light', dark: 'github-dark' },
	});
	eleventyConfig.addPlugin(pluginRSS);
	eleventyConfig.addPlugin(pluginIcons, {
		mode: 'inline',
		sources: [
			{ name: 'si', path: 'node_modules/simple-icons/icons' },
			{ name: 'lucide', path: 'node_modules/lucide-static/icons' },
		],
		icon: {
			errorNotFound: false,
			class: function (name, source) {
				return `icon icon-${name} icon-${source}`;
			},
		},
	});

	/* Passthrough Copy */
	eleventyConfig.addPassthroughCopy({ 'public/': '.' });

	/* Other Config */
	eleventyConfig.addTransform('html', function (content) {
		if (this.page.outputPath && this.page.outputPath.endsWith('.html')) {
			content = transforms.minifyHtml(content);
			return content;
		}
		return content;
	});

	eleventyConfig.setLibrary('md', markdownLibrary);
	eleventyConfig.setQuietMode(isDevelopment);
	eleventyConfig.setServerOptions({
		port: process.env.PORT || 8080,
		portReassignmentRetryCount: 0,
	});

	eleventyConfig.addTemplateFormats('scss');
	eleventyConfig.addExtension('scss', {
		outputFileExtension: 'css',
		compile: async function (inputContent, inputPath) {
			let { css, loadedUrls } = sass.compileString(inputContent, {
				loadPaths: [path.parse(inputPath).dir || '.'],
				sourceMap: false,
			});

			this.addDependencies(inputPath, loadedUrls);

			return async () => {
				let plugins = [
					require('tailwindcss/nesting'),
					require('tailwindcss'),
					require('autoprefixer'),
					require('cssnano'),
				];

				const { content } = await postcss(plugins).process(css, {
					from: undefined,
				});

				return content;
			};
		},
	});

	let notFirstRun = false;
	eleventyConfig.on('eleventy.after', async ({ runMode }) => {
		if (runMode === 'serve') {
			if (notFirstRun)
				console.log(
					blue('\n[11ty] Server at http://localhost:8080/\n'),
				);
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
		templateFormats: ['md', 'njk', '11ty.js'],
		markdownTemplateEngine: 'njk',
	};
};

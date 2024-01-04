import {
	collections,
	filters,
	shortcodes,
	transforms,
} from './utils/11ty/index.js';

import pluginTOC from '@uncenter/eleventy-plugin-toc';
import pluginExternalLinks from '@aloskutov/eleventy-plugin-external-links';
import pluginRSS from '@ryanccn/eleventy-plugin-rss';
import pluginShiki from './utils/plugins/shikiji.js';
import pluginIcons from 'eleventy-plugin-icons';

import path from 'node:path';
import * as sass from 'sass';
import postcss from 'postcss';

import markdownLibrary from './utils/plugins/md-library.js';

import site from './site.config.js';
const isDevelopment = process.env.NODE_ENV !== 'production';
import 'dotenv/config';

import { blue } from 'kleur/colors';

import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default function (eleventyConfig) {
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
}

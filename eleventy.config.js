import { collections, filters, shortcodes } from './config/11ty/index.js';

import pluginExternalLinks from '@aloskutov/eleventy-plugin-external-links';
import pluginRSS from '@ryanccn/eleventy-plugin-rss';
import pluginTOC from '@uncenter/eleventy-plugin-toc';
import pluginIcons from 'eleventy-plugin-icons';
import pluginValidate from 'eleventy-plugin-validate';

import markdownLibrary from './config/markdown/core.js';

import {
	processCss,
	processSass,
	processTailwindCss,
} from './config/transforms/css.js';
import { minifyHtml } from './config/transforms/html.js';

import { z } from 'zod';

import 'dotenv/config';
const isDevelopment = process.env.NODE_ENV !== 'production';

import colors from 'picocolors';
import site from './site.config.js';

import eleventy from '11ty.ts';

export default eleventy(function (eleventyConfig) {
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
	eleventyConfig.addPlugin(pluginValidate, {
		validator: 'zod',
		schemas: [
			{
				collections: ['posts'],
				schema: z
					.object({
						tags: z.array(z.string()),
						title: z.string(),
						description: z.string(),
						date: z.date(),
						edited: z.date().optional(),
						comments: z.boolean(),
					})
					.strict(),
			},
		],
	});

	/* Passthrough Copy */
	eleventyConfig.addPassthroughCopy({ 'public/': '.' });

	/* Other Config */
	eleventyConfig.addTransform('html', function (content) {
		if (this.page.outputPath && this.page.outputPath.endsWith('.html')) {
			return minifyHtml(content);
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
		compile: async function (inputContent) {
			return async () => {
				return processCss(
					await processTailwindCss(await processSass(inputContent)),
				);
			};
		},
	});

	// Give me the localhost URL after every rebuild so I don't have to scroll up to find it.
	let notFirstRun = false;
	eleventyConfig.on('eleventy.after', async ({ runMode }) => {
		if (runMode === 'serve') {
			if (notFirstRun)
				console.log(colors.blue('\n[11ty] Server at http://localhost:8080/\n'));
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
});

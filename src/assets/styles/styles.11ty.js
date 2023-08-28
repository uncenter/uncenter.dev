const fs = require('node:fs/promises');
const postcss = require('postcss');
const sass = require('sass');
const { Blob } = require('node:buffer');

const log = require('../../../utils/log');

class Page {
	data() {
		return {
			permalink: '/assets/styles.css',
			eleventyExcludeFromCollections: true,
		};
	}

	async render() {
		let source = `${__dirname}/styles.scss`;
		let result = sass.compile(source);
		let content = result.css.toString();
		log({
			category: 'styles',
			message: 'styles.scss',
			extra: `${new Blob([fs.readFile(source)]).size / 1000}kb -> ${
				new Blob([content]).size / 1000
			}kb`,
		});
		source = `${__dirname}/styles.css`;

		let plugins = [
			require('tailwindcss/nesting'),
			require('tailwindcss'),
			require('autoprefixer'),
			require('cssnano'),
		];

		const css = await postcss(plugins).process(content, {
			from: source,
			to: source,
		});
		log({
			category: 'styles',
			message: 'styles.css',
			extra: `${new Blob([content]).size / 1000}kb -> ${
				new Blob([css.content]).size / 1000
			}kb`,
		});

		return css.content;
	}
}

module.exports = Page;

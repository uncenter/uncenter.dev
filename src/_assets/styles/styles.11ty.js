const postcss = require('postcss');
const fs = require('fs');
const Blob = require('buffer').Blob;
const sass = require('sass');

const logOutput = require('../../_11ty/utils/logOutput.js');

module.exports = class {
	data() {
		return {
			permalink: '/assets/styles.css',
			eleventyExcludeFromCollections: true,
			layout: '',
		};
	}

	async render() {
		let source = `${__dirname}/styles.scss`;
		let result = sass.compile(source);
		let content = result.css.toString();
		logOutput({
			type: 'styles',
			file: 'styles.scss',
			extra: `${new Blob([fs.readFileSync(source)]).size / 1000}kb -> ${
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
		logOutput({
			type: 'styles',
			file: 'styles.css',
			extra: `${new Blob([content]).size / 1000}kb -> ${
				new Blob([css.content]).size / 1000
			}kb`,
		});

		return css.content;
	}
};

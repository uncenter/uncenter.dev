const postcss = require('postcss');
const fs = require('fs');
const Blob = require('buffer').Blob;
const sass = require('sass');

const logOutput = require('../../_11ty/utils/logOutput.js');
const logSize = require('../../_11ty/utils/logSize.js');

class Page {
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
			prefix: 'assets:styles',
			action: 'compiling',
			file: 'styles.scss',
			extra: {
				content: `${logSize(
					new Blob([fs.readFileSync(source)]).size / 1000,
				)} --> ${logSize(new Blob([content]).size / 1000)}`,
				size: false,
			},
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
			prefix: 'assets:styles',
			action: 'Tailwindifying',
			file: 'styles.css',
			extra: {
				content: `${logSize(new Blob([content]).size / 1000)} --> ${logSize(
					new Blob([css.content]).size / 1000,
				)}`,
				size: false,
			},
		});

		return css.content;
	}
}

module.exports = Page;

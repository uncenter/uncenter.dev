const { Blob } = require('node:buffer');
const { readFile } = require('node:fs/promises');

const postcss = require('postcss');
const UglifyJS = require('uglify-js');

const log = require('../../utils/log');

module.exports = async () => {
	const fonts = await readFile('./src/assets/fonts/fonts.css', 'utf-8');

	const { content: css } = await postcss([
		require('autoprefixer'),
		require('cssnano'),
	]).process(fonts, {
		from: undefined,
		to: undefined,
	});
	log({
		category: 'styles',
		message: 'fonts.css',
		extra: `${new Blob([fonts]).size / 1000}kb -> ${
			new Blob([css]).size / 1000
		}kb`,
	});

	const afterJs = await readFile('./src/assets/scripts/after.js', 'utf-8');
	const beforeJs = await readFile('./src/assets/scripts/before.js', 'utf-8');

	const uglified = {
		before: UglifyJS.minify(beforeJs).code,
		after: UglifyJS.minify(afterJs).code,
	};
	log({
		category: 'scripts',
		message: 'before.js',
		extra: `${new Blob([beforeJs]).size / 1000}kb -> ${
			new Blob([uglified.before]).size / 1000
		}kb`,
	});
	log({
		category: 'scripts',
		message: 'after.js',
		extra: `${new Blob([afterJs]).size / 1000}kb -> ${
			new Blob([uglified.after]).size / 1000
		}kb`,
	});

	return {
		css,
		js: {
			before: uglified.before,
			after: uglified.after,
		},
	};
};

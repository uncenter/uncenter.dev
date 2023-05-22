const postcss = require('postcss');
const { readFile } = require('fs/promises');
const UglifyJS = require('uglify-js');
const logOutput = require('../_11ty/utils/logOutput.js');

module.exports = async () => {
	const fonts = await readFile('./src/_assets/fonts/fonts.css', 'utf-8');

	const { content: css } = await postcss([
		require('autoprefixer'),
		require('cssnano'),
	]).process(fonts, {
		from: undefined,
		to: undefined,
	});
	logOutput({
		type: 'styles',
		file: 'fonts.css',
		extra: `${new Blob([fonts]).size / 1000}kb -> ${
			new Blob([css]).size / 1000
		}kb`,
	});

	const afterJs = await readFile('./src/_assets/scripts/after.js', 'utf-8');
	const beforeJs = await readFile('./src/_assets/scripts/before.js', 'utf-8');

	const uglified = {
		before: UglifyJS.minify(beforeJs).code,
		after: UglifyJS.minify(afterJs).code,
	};
	logOutput({
		type: 'scripts',
		file: 'before.js',
		extra: `${new Blob([beforeJs]).size / 1000}kb -> ${
			new Blob([uglified.before]).size / 1000
		}kb`,
	});
	logOutput({
		type: 'scripts',
		file: 'after.js',
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

const postcss = require('postcss');
const { readFile } = require('fs/promises');
const UglifyJS = require('uglify-js');

module.exports = async () => {
	const fonts = await readFile('./src/_assets/fonts/fonts.css', 'utf-8');

	const { content: css } = await postcss([
		require('autoprefixer'),
		require('cssnano'),
	]).process(fonts, {
		from: undefined,
		to: undefined,
	});

	const afterJs = await readFile('./src/_assets/scripts/after.js', 'utf-8');
	const beforeJs = await readFile('./src/_assets/scripts/before.js', 'utf-8');
	return {
		css,
		js: {
			before: UglifyJS.minify(beforeJs).code,
			after: UglifyJS.minify(afterJs).code,
		},
	};
};

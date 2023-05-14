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

	const copyScript = await readFile('./src/_assets/scripts/copy.js', 'utf-8');

	const result = UglifyJS.minify(copyScript);
	if (result.error) {
		throw result.error;
	}
	return {
		css,
		js: result.code,
	};
};

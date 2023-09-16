const { readFile } = require('node:fs/promises');
const postcss = require('postcss');
const terser = require('terser');

module.exports = async () => {
	const fonts = await readFile('./src/assets/fonts.css', 'utf-8');
	const js = {
		before: await readFile('./src/assets/scripts/before.js', 'utf-8'),
		after: await readFile('./src/assets/scripts/after.js', 'utf-8'),
	};

	const { content: css } = await postcss([
		require('autoprefixer'),
		require('cssnano'),
	]).process(fonts, { from: undefined });

	return {
		css,
		js: {
			before: (await terser.minify(js.before)).code,
			after: (await terser.minify(js.after)).code,
		},
	};
};

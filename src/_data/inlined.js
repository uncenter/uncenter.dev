const { readFile, readdir } = require('node:fs/promises');
const path = require('node:path');
const postcss = require('postcss');
const terser = require('terser');

module.exports = async () => {
	const fonts = await readFile('./src/assets/fonts.css', 'utf-8');
	const scripts = await readdir('./src/assets/scripts/');

	const js = {};
	scripts.forEach(async (script) => {
		const file = await readFile(`./src/assets/scripts/${script}`, 'utf-8');
		const { code } = await terser.minify(file);
		const { name } = path.parse(script);
		js[name] = code;
	});

	const { content: css } = await postcss([
		require('autoprefixer'),
		require('cssnano'),
	]).process(fonts, { from: undefined });

	return {
		css,
		js,
	};
};

import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import postcss from 'postcss';
import { minify } from 'terser';

import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

export default async () => {
	const fonts = await readFile('./src/assets/fonts.css', 'utf-8');
	const scripts = await readdir('./src/assets/scripts/');

	const js = {};
	for (const script of scripts) {
		const file = await readFile(`./src/assets/scripts/${script}`, 'utf-8');
		const { code } = await minify(file);
		const { name } = path.parse(script);
		js[name] = code;
	}

	const { content: css } = await postcss([
		require('autoprefixer'),
		require('cssnano'),
	]).process(fonts, { from: undefined });

	return {
		css,
		js,
	};
};

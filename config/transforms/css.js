import browserslist from 'browserslist';
import { browserslistToTargets, transform } from 'lightningcss';
import postcss from 'postcss';
import * as sass from 'sass';

import { createRequire } from 'node:module';
import path from 'node:path';
const require = createRequire(import.meta.url);

const targets = browserslistToTargets(browserslist('defaults'));
const decoder = new TextDecoder('utf-8');

export function processCss(content) {
	const transformed = transform({
		code: Buffer.from(content),
		minify: true,
		sourceMap: false,
		targets,
	});

	return decoder.decode(transformed.code);
}

export async function processTailwindCss(content) {
	const processed = await postcss([
		require('tailwindcss/nesting'),
		require('tailwindcss'),
	]).process(content, {
		from: undefined,
	});

	return processed.content;
}

export async function processSass(content) {
	const processed = await sass.compileStringAsync(content, {
		sourceMap: false,
		loadPaths: [path.join(import.meta.dirname, '../../node_modules/')],
	});

	return processed.css;
}

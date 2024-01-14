import { transform, browserslistToTargets } from 'lightningcss';
import browserslist from 'browserslist';
import postcss from 'postcss';
import * as sass from 'sass';

import { createRequire } from 'node:module';
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
	});

	return processed.css;
}

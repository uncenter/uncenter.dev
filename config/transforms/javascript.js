import { minify } from 'terser';

export async function minifyJavascript(content) {
	const minified = await minify(content);

	return minified.code;
}

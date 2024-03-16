import { minify } from 'terser';
import site from '../../site.config.js';

export async function minifyJavascript(content) {
	const minified = await minify(content, {
		compress: {
			global_defs: {
				site: site,
			},
		},
	});

	return minified.code;
}

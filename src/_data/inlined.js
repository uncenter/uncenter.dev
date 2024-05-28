import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { processCss } from '../../config/transforms/css.js';
import { minifyJavascript } from '../../config/transforms/javascript.js';

const SCRIPTS_PATH = './src/assets/scripts/';
const STYLES_PATH = './src/assets/styles/';

export default async () => {
	const js = {};
	for (const file of await readdir(SCRIPTS_PATH)) {
		js[path.parse(file).name] = await minifyJavascript(
			await readFile(path.join(SCRIPTS_PATH, file), 'utf-8'),
		);
	}

	const css = {};
	for (const file of await readdir(STYLES_PATH)) {
		css[path.parse(file).name] = processCss(
			await readFile(path.join(STYLES_PATH, file), 'utf-8'),
		);
	}

	return {
		css,
		js,
	};
};

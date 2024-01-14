import site from '../site.config.js';

export default (path, base) => {
	if (!base) base = new URL(site.url);
	return new URL(path, base).href;
};

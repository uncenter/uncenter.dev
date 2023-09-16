const site = require('../site.config.js');

module.exports = (path, base) => {
	if (!base) base = new URL(site.url);
	return new URL(path, base).href;
};

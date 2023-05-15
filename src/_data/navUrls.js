const nav = require('./nav.json');

module.exports = () => {
	const urls = {
		top: [],
		bottom: [],
	};
	nav.top.forEach((item) => {
		item.urls.forEach((url) => {
			urls.top.push(url);
		});
	});
	nav.bottom.forEach((item) => {
		urls.bottom.push(item.url);
	});
	return urls;
};

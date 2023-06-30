const meta = require('./meta');
const data = {
	top: [
		{
			title: 'Articles',
			url: '/',
		},
		{
			title: 'Projects',
			url: '/projects/',
		},
		{
			title: 'Uses',
			url: '/uses/',
		},
		{
			title: 'Colophon',
			url: '/colophon/',
		},
	],
	bottom: [
		{
			relme: true,
			url: `https://${meta.author.mastodon.instance}/@${meta.author.mastodon.username}`,
			icon: 'si:mastodon',
			color: '#6364FF',
		},
		{
			relme: true,
			url: `https://github.com/${meta.author.github.username}`,
			icon: 'si:github',
			color: '#181717',
		},
		{
			url: 'https://matrix.to/%23/#uncenter:matrix.org',
			icon: 'si:element',
			color: '#0DBD8B',
		},
		{
			url: `https://ko-fi.com/${meta.author.kofi.username}`,
			icon: 'si:kofi',
			color: '#FF5E5B',
		},
		{
			url: '/feed.xml',
			icon: 'si:rss',
			color: '#FFA500',
		},
	],
};

module.exports = () => {
	['top', 'bottom'].forEach((key) => {
		data[key].urls = [];
		data[key].forEach((item) => {
			data[key].urls.push(item.url);
		});
	});
	return data;
};

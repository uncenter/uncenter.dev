const meta = require('./meta');
const data = {
	top: [
		{
			title: 'Articles',
			urls: ['/'],
		},
		{
			title: 'Projects',
			urls: ['/projects/'],
		},
		{
			title: 'Uses',
			urls: ['/uses/'],
		},
		{
			title: 'Colophon',
			urls: ['/colophon/'],
		},
	],
	bottom: [
		{
			title: 'Visit my GitHub profile!',
			url: `https://github.com/${meta.author.github.username}`,
			icon: 'custom:github',
		},
		{
			title: 'Follow me on Mastodon!',
			url: `https://${meta.author.mastodon.instance}/@${meta.author.mastodon.username}`,
			icon: 'custom:mastodon',
		},
		{
			title: 'Subscribe to my RSS feed!',
			url: '/feed.xml',
			icon: 'custom:rss',
		},
		{
			title: 'Contact me via Element/Matrix!',
			url: 'https://matrix.to/%23/#uncenter:matrix.org',
			icon: 'custom:elementio',
		},
	],
};

module.exports = () => {
	data.top.urls = [];
	data.top.forEach((item) => {
		item.urls.forEach((url) => {
			data.top.urls.push(url);
		});
	});
	data.bottom.urls = [];
	data.bottom.forEach((item) => {
		data.bottom.urls.push(item.url);
	});
	return data;
};

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
	['top', 'bottom'].forEach((key) => {
		data[key].urls = [];
		data[key].forEach((item) => {
			data[key].urls.push(item.url);
		});
	});
	return data;
};

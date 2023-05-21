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
			url: 'https://github.com/uncenter/',
			icon: 'social:github',
		},
		{
			title: 'Follow me on Mastodon!',
			url: 'https://fosstodon.org/@uncenter',
			icon: 'social:mastodon',
		},
		{
			title: 'Subscribe to my RSS feed!',
			url: '/feed.xml',
			icon: 'social:rss',
		},
		{
			title: 'Contact me via Element/Matrix!',
			url: 'https://matrix.to/%23/#uncenter:matrix.org',
			icon: 'social:elementio',
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

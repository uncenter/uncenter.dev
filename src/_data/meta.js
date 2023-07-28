const analytics = {
	url: 'https://stats.uncenter.org',
	shareId: 'LRerfjMi',
	websiteId: 'dea82084-7eb8-4337-b02c-23f6ace1afc1',
	websiteName: 'uncenter',
	trackerScript: 'script.js',
};

analytics.shareLink = `${analytics.url}/share/${analytics.shareId}/${analytics.websiteName}`;

module.exports = {
	lang: 'en',
	repo: require('../../package.json').name,
	description: 'Software developer, rookie linguist, and student.',
	keywords: [
		'Software',
		'Developer',
		'Programming',
		'Technology',
		'JavaScript',
	],
	author: {
		name: 'uncenter',
		github: {
			username: 'uncenter',
		},
		mastodon: {
			username: 'uncenter',
			instance: 'fosstodon.org',
		},
		discord: {
			username: 'uncenter',
		},
		kofi: {
			username: 'uncenter',
		},
		liberapay: {
			username: 'uncenter',
		},
	},
	analytics,
};

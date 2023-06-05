const analytics = {
	url: 'https://stats.uncenter.org',
	shareId: 'LRerfjMi',
	websiteId: 'dea82084-7eb8-4337-b02c-23f6ace1afc1',
	websiteName: 'uncenter',
	trackerScript: 'beepboop',
};
analytics.shareLink = `${analytics.url}/share/${analytics.shareId}/${analytics.websiteName}`;

module.exports = {
	lang: 'en',
	domain: 'uncenter.org',
	url:
		process.env.NODE_ENV === 'production'
			? 'https://uncenter.org'
			: 'http://localhost:8080',
	repo: 'uncenter.org',
	description: 'Software developer and rookie linguist.',
	author: {
		name: 'uncenter',
		email: {
			plain: 'contact@uncenter.org',
			obfuscated: 'contact[at]uncenter[dot]org',
		},
		github: {
			username: 'uncenter',
		},
		mastodon: {
			username: 'uncenter',
			instance: 'fosstodon.org',
		},
		discord: {
			username: 'uncenter#1078',
		},
	},
	analytics,
};

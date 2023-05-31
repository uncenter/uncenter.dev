require('dotenv').config();
module.exports = {
	name: 'uncenter',
	lang: 'en',
	domain: 'uncenter.org',
	url:
		process.env.NODE_ENV === 'production'
			? 'https://uncenter.org'
			: 'http://localhost:8080',
	analytics: {
		domain: 'stats.uncenter.org',
		url: 'https://stats.uncenter.org',
		shareLink: 'https://stats.uncenter.org/share/LRerfjMi/uncenter',
		shareId: 'LRerfjMi',
		websiteId: 'dea82084-7eb8-4337-b02c-23f6ace1afc1',
		trackerScript: process.env.UMAMI_TRACKER_SCRIPT,
	},
	description: 'Software developer and rookie linguist.',
	github: {
		username: 'uncenter',
		repo: 'uncenter.org',
	},
	social: {
		email: {
			main: 'contact@uncenter.org',
			obfuscated: 'contact[at]uncenter[dot]org',
		},
		mastodon: {
			username: 'uncenter',
			instance: 'fosstodon.org',
		},
		discord: {
			username: 'uncenter',
			tag: '1078',
		},
	},
};

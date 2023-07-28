const author = {
	name: 'uncenter',
	github: {
		username: 'uncenter',
	},
	mastodon: {
		url: 'https://fosstodon.org/@uncenter',
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
};

module.exports = {
	lang: 'en',
	name: require('../../package.json').name,
	repository: `${author.github.username}/${require('../../package.json').name}`,
	description: 'Software developer, rookie linguist, and student.',
	keywords: [
		'Software',
		'Developer',
		'Programming',
		'Technology',
		'JavaScript',
	],
	author,
};

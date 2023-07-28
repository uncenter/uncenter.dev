const packageJson = require('../../package.json');

const author = {
	name: packageJson.author.name,
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

author.github.url = new URL(author.github.username, 'https://www.github.com');

module.exports = {
	lang: 'en',
	name: packageJson.name,
	repository: `${author.github.username}/${packageJson.name}`,
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

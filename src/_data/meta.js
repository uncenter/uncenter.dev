const { getPackageJson } = require('../_11ty/utils/pkgJson');

const packageJson = getPackageJson();

const author = {
	name: packageJson.author.name,
	github: {
		username: 'uncenter',
	},
	mastodon: {
		username: '@uncenter',
		instance: 'https://fosstodon.org/',
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
author.mastodon.url = new URL(
	author.mastodon.username,
	author.mastodon.instance,
);
author.kofi.url = new URL(author.kofi.username, 'https://ko-fi.com');
author.liberapay.url = new URL(
	author.liberapay.username,
	'https://liberapay.com',
);

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

const { getPackageJson } = require('../_11ty/utils/pkgJson');
const packageJson = getPackageJson();
const urlize = require('../_11ty/utils/urlize');

const author = {
	name: packageJson.author.name,
	github: {
		username: 'uncenter',
		url: urlize('uncenter', 'https://www.github.com'),
	},
	mastodon: {
		username: '@uncenter',
		instance: 'https://fosstodon.org/',
		url: urlize('@uncenter', 'https://fosstodon.org/'),
	},
	discord: {
		username: 'uncenter',
	},
	kofi: {
		username: 'uncenter',
		url: urlize('uncenter', 'https://ko-fi.com'),
	},
	liberapay: {
		username: 'uncenter',
		url: urlize('uncenter', 'https://liberapay.com'),
	},
};

module.exports = {
	lang: 'en',
	site: {
		domain: urlize().hostname,
		url: urlize().href,
	},
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
	feed: {
		description: 'Articles about programming, linguistics, and other things.',
	},
};

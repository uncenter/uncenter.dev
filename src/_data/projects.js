const YAML = require('yaml');
const EleventyFetch = require('@11ty/eleventy-fetch');

const projects = {
	maintained: [
		{
			name: 'uncenter.dev',
			link: 'https://github.com/uncenter/uncenter.dev',
			featured: true,
		},
		{
			name: 'octotree',
			link: 'https://github.com/uncenter/octotree',
			featured: true,
		},
		{
			name: 'npm-on-github',
			link: 'https://github.com/uncenter/npm-on-github',
			featured: true,
		},
		{
			name: 'create-eleventy-app',
			link: 'https://github.com/uncenter/create-eleventy-app',
		},
		{
			name: 'fn',
			link: 'https://github.com/uncenter/fn',
		},
		{
			name: 'gh-stats',
			link: 'https://github.com/uncenter/gh-stats',
		},
		{
			name: 'dotfiles',
			link: 'https://github.com/uncenter/dotfiles',
		},
		{
			name: 'eleventy-plugin-icons',
			link: 'https://github.com/uncenter/eleventy-plugin-icons',
		},
		{
			name: 'markdown-it-kbd-better',
			link: 'https://github.com/uncenter/markdown-it-kbd-better',
		},
		{
			name: '@uncenter/eleventy-plugin-toc',
			link: 'https://github.com/uncenter/eleventy-plugin-toc',
		},
		{
			name: 'wifi-password',
			link: 'https://github.com/uncenter/wifi-password',
		},
	],
	archived: [
		{
			name: 'learn-eleventy',
			link: 'https://github.com/uncenter/learn-eleventy',
		},
		{
			name: 'phonetic-alphabet',
			link: 'https://github.com/uncenter/phonetic-alphabet',
		},
		{
			name: 'chemic',
			description:
				'A Python library, GUI, and CLI for chemical formulas and equations.',
			link: 'https://github.com/uncenter/chemic',
		},
	],
};

async function fetchRepository(username, repository, fetchOptions) {
	const response = await EleventyFetch(
		`https://api.github.com/repos/${username}/${repository}`,
		{
			duration: '12h',
			type: 'json',
			fetchOptions,
		},
	);
	return {
		description: response?.description || '',
		homepage: response?.homepage || false,
		language: response.language,
	};
}

async function getLanguageColors(languages) {
	const res = await EleventyFetch(
		'https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml',
		{
			duration: '2w',
			type: 'text',
		},
	);
	const data = YAML.parse(res);
	return Object.fromEntries(
		Array.from(languages).map((language) => [language, data[language]?.color]),
	);
}

module.exports = async function () {
	const headers = {};
	if (process.env.GITHUB_TOKEN) {
		headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
	} else {
		console.warn('GITHUB_TOKEN environment variable is not set');
	}

	const languages = new Set();
	for (const category in projects) {
		for (const project of projects[category]) {
			let [username, repository] = new URL(project.link).pathname
				.slice(1)
				.split('/');

			const data = await fetchRepository(username, repository, { headers });
			project.description = project.description || data.description;
			project.language = data.language;
			languages.add(data.language);
			if (data.homepage) project.live = data.homepage;
		}
	}
	const languagesWithColors = await getLanguageColors(languages);
	for (const category in projects) {
		for (const project of projects[category]) {
			project.color = languagesWithColors[project.language];
		}
	}
	return projects;
};

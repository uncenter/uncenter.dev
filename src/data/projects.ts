import yaml from 'yaml';
import { fetchBuilder, FileSystemCache } from 'node-fetch-cache';

const fetch = fetchBuilder.withCache(
	new FileSystemCache({
		cacheDirectory: '.cache/', // Specify where to keep the cache. If undefined, '.cache' is used by default. If this directory does not exist, it will be created.
		ttl: 43200000, // Time to live. How long (in ms) responses remain cached before being automatically ejected. If undefined, responses are never automatically ejected from the cache.
	}),
);

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

async function getRepoData(
	username: string,
	repository: string,
	fetchOptions: any,
) {
	const res = await fetch(
		`https://api.github.com/repos/${username}/${repository}`,
		fetchOptions,
	);
	const data = await res.json();
	return {
		description: data?.description || '',
		homepage: data?.homepage || false,
		language: data.language,
	};
}

async function getLanguageColors(languages: Set<string>) {
	const res = await fetch(
		'https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml',
	);
	const data = yaml.parse(await res.text());
	return Object.fromEntries(
		Array.from(languages).map((language) => [language, data[language]?.color]),
	);
}

export default async function () {
	const headers: Record<string, string> = {};
	if (import.meta.env.GITHUB_TOKEN) {
		headers['Authorization'] = `Bearer ${import.meta.env.GITHUB_TOKEN}`;
	}
	const languages = new Set();
	for (const category in projects) {
		for (const project of projects[category]) {
			let [username, repository] = new URL(project.link).pathname
				.slice(1)
				.split('/');
			const data = await getRepoData(username, repository, { headers });
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
}

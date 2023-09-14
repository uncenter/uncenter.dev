import yaml from 'yaml';
import { fetchBuilder, FileSystemCache } from 'node-fetch-cache';

const fetch = fetchBuilder.withCache(
	new FileSystemCache({
		cacheDirectory: '.cache/',
		ttl: 43200000,
	}),
);

type BareProject = {
	name: string;
	link: string;
	description?: string;
	featured?: boolean;
};

type Project = BareProject & {
	language: string;
	color: string;
	live?: string;
};

const bareProjects: Record<string, BareProject[]> = {
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

async function getRepositoryData(
	username: string,
	repository: string,
	headers: { [key: string]: string },
): Promise<{
	description: string;
	homepage: string | undefined;
	language: string;
}> {
	const res = await fetch(
		`https://api.github.com/repos/${username}/${repository}`,
		{ headers },
	);
	const data = await res.json();
	return {
		description: (data?.description as string) || '',
		homepage: (data?.homepage as string) || undefined,
		language: data.language as string,
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

export default async function (): Promise<
	Record<'maintained' | 'archived', Project[]>
> {
	const headers: Record<string, string> = {};
	if (import.meta.env.GITHUB_TOKEN) {
		headers['Authorization'] = `Bearer ${import.meta.env.GITHUB_TOKEN}`;
	}
	const languages: Set<string> = new Set();

	const projects: Record<string, Project[]> = {};
	for (const category in bareProjects) {
		projects[category] = await Promise.all(
			bareProjects[category].map(async (project: BareProject) => {
				const [username, repository] = new URL(project.link).pathname
					.slice(1)
					.split('/');
				const data = await getRepositoryData(username, repository, headers);

				languages.add(data.language);
				return {
					name: project.name,
					link: project.link,
					description: project.description || data.description,
					language: data.language,
					featured: project.featured,
					live: data.homepage,
				} as Project;
			}),
		);
	}

	const languagesWithColors = await getLanguageColors(languages);
	for (const category in projects) {
		projects[category] = projects[category].map(
			(project) => (project.color = languagesWithColors[project.language]),
		);
	}
	return projects;
}

// @ts-check
import EleventyFetch from '@11ty/eleventy-fetch';
import { z } from 'zod';

const schema = z.record(
	z.array(
		z
			.object({
				name: z.string().min(1),
				link: z.string().url().startsWith('https://github.com'),
				featured: z.boolean().default(false).optional(),

				stack: z.array(z.string()).default([]).optional(),

				description: z.string().optional(),
				live: z.string().optional(),
			})
			.strict(),
	),
);

/** @type {z.infer<typeof schema>} */
const projects = schema.parse({
	current: [
		{
			name: 'kittysay',
			link: 'https://github.com/uncenter/kittysay',
			featured: true,
			stack: ['rust'],
		},
		{
			name: 'octotree',
			link: 'https://github.com/uncenter/octotree',
			featured: true,
			stack: ['typescript', 'solid', 'tailwindcss'],
		},
		{
			name: 'npm-on-github',
			link: 'https://github.com/uncenter/npm-on-github',
			featured: true,
			stack: ['typescript', 'mockserviceworker', 'vitest'],
		},
		{
			name: 'ascii-to-lua-table',
			link: 'https://github.com/uncenter/ascii-to-lua-table',
			featured: true,
			stack: ['typescript', 'vuedotjs'],
		},
		{
			name: 'eleventy-plugin-icons',
			link: 'https://github.com/uncenter/eleventy-plugin-icons',
			stack: ['typescript', 'vitest'],
		},
		{
			name: 'eleventy-plugin-validate',
			link: 'https://github.com/uncenter/eleventy-plugin-validate',
			stack: ['typescript'],
		},
		{
			name: 'mailtolink',
			link: 'https://github.com/uncenter/mailtolink',
			stack: ['javascript', 'eleventy', 'tailwindcss'],
		},
		{
			name: 'json-to-nix',
			link: 'https://github.com/uncenter/json-to-nix',
			stack: ['typescript', 'vuedotjs'],
		},
		{
			name: 'icnsify',
			link: 'https://github.com/uncenter/icnsify',
			stack: ['rust'],
		},
		{
			link: 'https://github.com/uncenter/sttr-rs',
			stack: ['rust'],
		},
	],
	old: [
		{
			name: 'phonetic-alphabet',
			link: 'https://github.com/uncenter/phonetic-alphabet',
			stack: ['typescript', 'solid'],
		},
		{
			name: 'canvas-grade-calculator',
			link: 'https://github.com/uncenter/canvas-grade-calculator',
			stack: ['javascript'],
		},
		{
			name: 'fn',
			link: 'https://github.com/uncenter/fn',
			stack: ['gnubash'],
		},
		{
			name: 'gh-stats',
			link: 'https://github.com/uncenter/gh-stats',
			stack: ['python'],
		},
		{
			name: 'create-eleventy-app',
			link: 'https://github.com/uncenter/create-eleventy-app',
			stack: ['javascript'],
		},
		{
			name: 'learn-eleventy',
			link: 'https://github.com/uncenter/learn-eleventy',
			stack: ['eleventy'],
		},
	],
});

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
	};
}

export default async function () {
	const headers = {};
	if (process.env.GITHUB_TOKEN) {
		headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
	} else {
		console.warn('GITHUB_TOKEN environment variable is not set');
	}

	for (const category in projects) {
		for (const project of projects[category]) {
			let [username, repository] = new URL(project.link).pathname
				.slice(1)
				.split('/');

			const data = await fetchRepository(username, repository, {
				headers,
			});
			project.description = project.description || data.description;
			if (data.homepage) project.live = data.homepage;
		}
	}
	return projects;
}

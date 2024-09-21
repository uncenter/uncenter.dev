// @ts-check
// Credit to https://github.com/ryanccn/ryanccn.dev/blob/5b94e8fc428779880e6a727b85e64496dafdcee1/src/_data/uses.js#L352 for the structure.

import { z } from 'zod';

const tags = z.union([
	z.literal('open-source'),
	z.literal('freemium'),
	z.literal('paid'),
]);

const schema = z.record(
	z.record(
		z.array(
			z
				.object({
					name: z.string().min(1),
					description: z.string().min(1),
					icon: z.string().optional(),
					url: z.string().url(),
					tags: z.array(tags).default([]).optional(),
					since: z
						.string()
						.regex(/\d\d\d\d-\d\d-\d\d/)
						.optional(),

					accessories: z
						.array(
							z
								.object({
									name: z.string().min(1),
									url: z.string().url(),
								})
								.strict(),
						)
						.optional(),
				})
				.strict(),
		),
	),
);

/** @type {z.infer<typeof schema>} */
const data = {
	Apps: {
		General: [
			{
				name: '1Password',
				url: 'https://1password.com/',
				icon: '1password',
				description: 'for password management',
				tags: ['paid'],
			},
			{
				name: 'Arc',
				url: 'https://arc.net/',
				icon: 'arc',
				description: 'for browsing the web',
			},
			{
				name: 'Cleanshot X',
				url: 'https://cleanshot.com/',
				description: 'for screenshots',
				tags: ['paid'],
			},
			{
				name: 'Discord',
				url: 'https://discord.com/',
				icon: 'discord',
				description: 'for messaging',
				accessories: [
					{
						name: 'Vencord',
						url: 'https://vencord.dev/',
					},
				],
			},
			{
				name: 'Spotify',
				url: 'https://spotify.com/',
				icon: 'spotify',
				description: 'for music',
				tags: ['freemium'],
			},
		],
		Development: [
			{
				name: 'Visual Studio Code',
				url: 'https://code.visualstudio.com/',
				description: 'as my primary IDE',
				tags: ['open-source'],
			},
			{
				name: 'Helix',
				url: 'https://helix-editor.com/',
				description: 'as my potentially new primary IDE',
				tags: ['open-source'],
			},
			{
				name: 'Ghostty',
				url: 'https://mitchellh.com/ghostty',
				description:
					'for a fast, feature-rich, and actively developed terminal',
				tags: ['open-source'],
			},
		],
		Utilities: [
			{
				name: 'Raycast',
				url: 'https://raycast.com/',
				icon: 'raycast',
				description: 'for an improved Spotlight search',
			},
			{
				name: 'Loop',
				url: 'https://github.com/MrKai77/Loop',
				description: 'for *elegant* window snapping',
				tags: ['open-source'],
			},
			{
				name: 'System Color Picker',
				url: 'https://sindresorhus.com/system-color-picker',
				description: 'for a supercharged color picker',
			},
			{
				name: 'MediaMate',
				url: 'https://wouter01.github.io/MediaMate/',
				description: 'for modern, iOS-like volume and brightness controls',
				tags: ['paid'],
			},
			{
				name: 'Ice',
				url: 'https://github.com/jordanbaird/Ice',
				description: 'for menu bar customization',
				tags: ['open-source'],
			},
		],
		'Browser Extensions': [
			{
				name: '1Password',
				url: 'https://1password.com/downloads/browser-extension/',
				icon: '1password',
				description: 'for passwords',
				tags: ['paid'],
			},
			{
				name: 'uBlock Origin',
				url: 'https://github.com/gorhill/uBlock/',
				icon: 'ublockorigin',
				description: 'for advertisement and tracker blocking',
				tags: ['open-source'],
			},
			{
				name: 'Bypass Paywalls',
				url: 'https://github.com/iamadamdev/bypass-paywalls-chrome',
				description: 'for bypassing annoying news paywalls',
				tags: ['open-source'],
			},
			{
				name: 'Refined GitHub',
				url: 'https://github.com/refined-github/refined-github',
				description: 'for GitHub enhancements',
				tags: ['open-source'],
			},
			{
				name: 'Control Panel for Twitter',
				url: 'https://github.com/insin/control-panel-for-twitter',
				description: 'for Twitter enhancements',
			},
			{
				name: 'Stylus',
				url: 'https://github.com/openstyles/stylus',
				description: 'for theming websites with Catppuccin',
				tags: ['open-source'],
			},
			{
				name: 'Violentmonkey',
				url: 'https://violentmonkey.github.io',
				description: 'for managing userscripts',
			},
			{
				name: 'Catppuccin for GitHub File Explorer',
				url: 'https://github.com/catppuccin/github-file-explorer-icons',
				description: 'for soothing pastel icons',
				tags: ['open-source'],
			},
		],
	},
	Services: {
		General: [],
		Development: [
			{
				name: 'Cloudflare Pages',
				url: 'https://pages.cloudflare.com/',
				icon: 'cloudflarepages',
				description: 'for hosting static sites',
			},
			{
				name: 'Cloudflare',
				url: 'https://cloudflare.com/',
				icon: 'cloudflare',
				description: 'for DNS',
			},

			{
				name: 'GitHub',
				url: 'https://github.com/',
				icon: 'github',
				description: 'for project source code hosting',
			},

			{
				name: 'Railway',
				url: 'https://railway.app/',
				icon: 'railway',
				description: 'for some hosting (my analytics, for instance)',
			},

			{
				name: 'Umami',
				url: 'https://umami.is/',
				icon: 'umami',
				description: 'for simple, privacy-respecting analytics',
				tags: ['open-source'],
			},

			{
				name: 'Vercel',
				url: 'https://vercel.com/',
				icon: 'vercel',
				description: 'for some web-app hosting',
			},
		],
	},
	Hardware: {
		General: [
			{
				name: 'MacBook Pro 13" (2020 M1)',
				url: 'https://www.apple.com/macbook-pro-13/',
				icon: 'apple',
				description: 'as my daily driver',
			},
		],
		Peripherals: [
			{
				name: 'DT 770 Pro',
				url: 'https://north-america.beyerdynamic.com/dt-770-pro.html',
				description: 'headphones',
			},
			{
				name: 'Glorious Model O (white)',
				url: 'https://www.gloriousgaming.com/products/glorious-model-o-white',
				description: 'mouse',
			},
			{
				name: 'Custom-built Bakeneko 65%',
				url: 'https://cannonkeys.com/products/bakeneko65/',
				description:
					'keyboard, with Akko Pink switches and white/lavender keycaps',
			},
		],
	},
};

export default schema.parse(data);

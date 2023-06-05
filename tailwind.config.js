/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.{11ty.js,js,md,njk,html}',
		'./utils/**/*.js',
		'./eleventy.config.js',
	],
	darkMode: ['class', '[theme="dark"]'],
	theme: {
		extend: {
			colors: {
				bg: 'var(--bg)',
				fg: 'var(--fg)',
				accent: 'var(--accent)',
			},
			fontFamily: {
				display: [
					'"General Sans"',
					'ui-sans-serif',
					'system-ui',
					'Inter',
					'Roboto',
					'Helvetica Neue',
				],
			},
			lineHeight: {
				none: 'unset',
			},
		},
	},
	corePlugins: {
		preflight: false,
		container: false,
	},
	plugins: [],
};

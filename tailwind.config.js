/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.{11ty.js,js,md,njk}',
		'./utils/**/*.js',
		'./eleventy.config.js',
	],
	darkMode: ['class', '[theme="dark"]'],
	theme: {
		extend: {
			colors: {
				bg: 'var(--bg)',
				fg: 'var(--fg)',
				lightGray: 'var(--light-gray)',
				darkGray: 'var(--dark-gray)',
				currentGray: 'var(--current-gray)',
				oppositeGray: 'var(--gray-opposite)',
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

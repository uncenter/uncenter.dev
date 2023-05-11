/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{11ty.js,js,md,njk,html}', './utils/**/*.js'],
	theme: {
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			bg: 'var(--bg)',
			fg: 'var(--fg)',
			accent: 'var(--accent)',
		},
		extend: {
			fontFamily: {
				sans: [
					'ui-sans-serif',
					'system-ui',
					'Inter',
					'Roboto',
					'Helvetica Neue',
				],
				serif: ['"Berenis ADF Pro"', 'Georgia', 'Cambria'],
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

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{11ty.js,js,md,njk,html}', './utils/**/*.js'],
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
			animation: {
				'fade-out': 'fade-out 200ms ease-out',
				'fade-in': 'fade-in 200ms ease-out',
			},
		},
	},
	corePlugins: {
		preflight: false,
		container: false,
	},
	plugins: [],
};

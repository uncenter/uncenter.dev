const disabled = {
	'code::before': false,
	'code::after': false,
	pre: false,
	code: false,
	'pre code': false,
	'h1 code': false,
	'h2 code': false,
	'h3 code': false,
	'h4 code': false,
	'h5 code': false,
	'h6 code': false,
	'a code': false,
	'pre code': false,
	'code::before': false,
	'code::after': false,
	a: false,
};

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
			surface: 'var(--surface)',
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
				serif: ['ui-serif', 'Georgia'],
				display: ['"Inter"', 'sans-serif'],
			},
			typography: {
				DEFAULT: { css: disabled },
				sm: { css: disabled },
				lg: { css: disabled },
				xl: { css: disabled },
				'2xl': { css: disabled },
			},
			lineHeight: {
				none: 'unset',
			},
		},
	},
	corePlugins: {
		container: false,
	},
	plugins: [require('@tailwindcss/typography')],
};

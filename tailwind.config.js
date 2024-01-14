const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{11ty.js,js,md,njk}'],
	darkMode: ['class', '[theme="dark"]'],
	theme: {
		fontSize: {
			xs: '0.875rem',
			sm: '1rem',
			base: '1.125rem',
			lg: '1.25rem',
			xl: '1.5rem',
			'2xl': '1.875rem',
			'3xl': '2.25rem',
			'4xl': '3rem',
			'5xl': '3.75rem',
		},
		extend: {
			colors: {
				bg: 'var(--bg)',
				fg: 'var(--fg)',
			},
			fontFamily: {
				display: ['"General Sans"', ...defaultTheme.fontFamily.sans],
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

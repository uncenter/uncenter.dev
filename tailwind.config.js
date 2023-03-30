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

module.exports = {
	content: ['./src/**/*.{11ty.js,js,md,njk,html}', './utils/**/*.js'],
	theme: {
		extend: {
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
	plugins: [require('tailwind-nord'), require('@tailwindcss/typography')],
};

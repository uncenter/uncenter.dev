const disabledCSS = {
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
}

module.exports = {
    content: ["./dist/**/*.html"],
    theme: {
        extend: {
            typography: {
                DEFAULT: { css: disabledCSS },
                sm: { css: disabledCSS },
                lg: { css: disabledCSS },
                xl: { css: disabledCSS },
                '2xl': { css: disabledCSS },
            },
            lineHeight: {
                none: 'unset'
            },
        },
    },
    corePlugins: {
        container: false,
    },
    plugins: [require("tailwind-nord"), require("@tailwindcss/typography")],
};

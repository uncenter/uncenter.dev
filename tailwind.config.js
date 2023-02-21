const disabledCSS = {
	'code::before': false,
	'code::after': false,
	pre: false,
	code: false,
	'pre code': false,
	'code::before': false,
	'code::after': false,
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
        },
    },
    plugins: [require("tailwind-nord"), require("@tailwindcss/typography")],
};

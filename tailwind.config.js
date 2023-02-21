/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./dist/**/*.html"],
    theme: {
        extend: {},
    },
    plugins: [require("tailwind-nord"), require("@tailwindcss/typography")],
};

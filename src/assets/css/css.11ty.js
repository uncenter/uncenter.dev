const postcss = require('postcss');
const fs = require('fs/promises');
const sass = require('sass');

const logSize = require('../../../utils/logSize.js');

class Page {
    data() {
        return {
            permalink: '/assets/styles.css',
            eleventyExcludeFromCollections: true,
        };
    }

    async render() {
        const source = `${__dirname}/styles.scss`;
        let css = sass.compile(source);

        let plugins = [
            require('tailwindcss/nesting'),
            require('tailwindcss'),
            require('autoprefixer'),
            require('cssnano'),
        ];

        css = await postcss(plugins).process(await fs.readFile(source), {
            from: source,
            to: source,
        });

        logSize(css.content.length, 'styles.css');

        return css.content;
    }
}

module.exports = Page;
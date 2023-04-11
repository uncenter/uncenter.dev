[![Netlify Status](https://api.netlify.com/api/v1/badges/0be102c8-f30f-48ad-a0f0-7fb84eea2740/deploy-status)](https://app.netlify.com/sites/uncenter/deploys)
![Last Commit Date](https://img.shields.io/github/last-commit/uncenter/uncenter.org?color=pink)
[![Wakatime](https://wakatime.com/badge/user/44269a44-02c2-486c-a2ea-494b7071737e/project/37a0a8c7-515a-4f8e-90bc-cfab440d9035.svg)](https://wakatime.com/badge/user/44269a44-02c2-486c-a2ea-494b7071737e/project/37a0a8c7-515a-4f8e-90bc-cfab440d9035)
![](https://img.shields.io/badge/spaghetti%20code-yes-success)

# uncenter.org

![GitHub](https://img.shields.io/github/license/uncenter/uncenter.org)
![Website Status](https://img.shields.io/website?down_color=red&down_message=down&up_color=green&up_message=online&url=https%3A%2F%2Funcenter.org)
![W3C Validation](https://img.shields.io/w3c-validation/html?targetUrl=https%3A%2F%2Funcenter.org)

This is my personal website, made with [11ty](https://www.11ty.dev/), Shiki, and [Tailwind CSS](https://tailwindcss.com/).

## About

### Features

- **Syntax highlighting** for posts using [`shiki.js`](https://github.com/shikijs/shiki), configured based on [Raphael Höser's implementation](https://www.hoeser.dev/blog/2023-02-01-syntax-highlight/)
- **Optimized icons** by selectively loading icons on a per-page basis using my [`eleventy-plugin-icons`](https://github.com/uncenter/eleventy-plugin-icons) plugin
- **RSS feed** for blog posts using [`eleventy-plugin-rss`](https://github.com/11ty/eleventy-plugin-rss)
- **Open Graph images** through Vercel's [OG Image API](https://og-image.vercel.app/)

### Structure

- `utils/`: scripts, utilities, & plugins for the website
- `src/`: the source code for the website
- `src/posts/*.md`: blog posts, written in Markdown
- `src/static/`: static pages, written in Nunjucks
- `src/_assets/`: static assets such as images, fonts, and icons, as well as the CSS and JS files
- `src/_data/`: data files for the website
- `src/_includes/`
  - `src/_layouts/`: layouts for the website
  - `src/_includes/`: micro-components for the website
- `src/_11ty/`: 11ty filters, shortcodes, collections, and utilities (`src/_11ty/utils/`)

## Credits

Many thanks to the 11ty community for their contributions to the community, without which this website would not be possible.
Many thanks to [Raphael Höser](https://www.hoeser.dev/), Stephanie Eckles for [11ty.rocks](https://11ty.rocks/), [Learn Eleventy from Scratch](https://learneleventyfromscratch.com/), [11ty.recipes](https://11ty.recipes/) by Mike Aparicio, [Bernard Nijenhuis' notes](https://bnijenhuis.nl/), and more.

Generic icons sourced from [Lucide](https://lucide.dev/), technology and development icons from [Devicons](https://devicon.dev/), and brand icons from [SVG Logos by Gil Barbara](https://github.com/gilbarbara/logos).

## License

[MIT](LICENSE.md)

# uncenter.dev

[![Eleventy](https://img.shields.io/badge/Eleventy-2.0.1-333333.svg?style=flat-square)](https://11ty.dev)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)

## Features

- **Syntax highlighting** for posts using [`shikiji`](https://github.com/antfu/shikiji)
- **Optimized images** with [`@11ty/eleventy-img`](https://github.com/11ty/eleventy-img)
- **RSS feed** using [`@ryanccn/eleventy-plugin-rss`](https://github.com/ryanccn/eleventy-plugin-rss)
- **Spell-checking** for posts through [`cspell`](http://cspell.org/)
- **Optimized CSS, JS, and HTML** using [`postcss`](https://postcss.org/), [`terser`](https://github.com/terser/terser), and [`html-minifier`](https://github.com/kangax/html-minifier)

## Development

```sh
pnpm install  # install dependencies
pnpm dev      # start development server
pnpm build    # run production build
pnpm clean    # clean up build artifacts
pnpm format   # format files
```

## Structure

- `src/_layouts/`, `src/_includes/`: nunjucks templates for layouts and components
- `src/_data/`: data used in templates
- `src/generated`: root files (feeds, sitemap, robots.txt)
- `src/assets/`: static assets (styling, scripts, fonts)
- `src/posts/`: blog posts
- `images/`: images for blog posts
- `public/`: favicons and fonts
- `utils/11ty/`: collections, shortcodes, filters, and transforms for 11ty
- `utils/plugins`: markdown + syntax highlighting plugins

## License

Source code is under [MIT](LICENSE), blog posts (and other written content) are under [CC BY-SA 4.0](LICENSE-content).

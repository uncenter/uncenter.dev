# uncenter.dev

[![Eleventy](https://img.shields.io/npm/v/@11ty/eleventy?style=flat-square&logo=eleventy&logoColor=white&label=&labelColor=222222&color=111111)](https://11ty.dev)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Cloudflare](https://img.shields.io/badge/Cloudflare_Pages-F38020?style=flat-square&logo=cloudflare&logoColor=white)](https://pages.cloudflare.com/)

## Features

-   **Syntax highlighting** with [Shiki](https://shiki.style/packages/markdown-it).
-   **Optimized images** with [`@11ty/eleventy-img`](https://github.com/11ty/eleventy-img).
-   **RSS feed** using [`@11ty/eleventy-plugin-rss`](https://github.com/11ty/eleventy-plugin-rss).
-   **Spell-checking** through [`cspell`](http://cspell.org/).
-   **Optimized CSS, JS, and HTML** using [PostCSS](https://postcss.org/), [Lightning CSS](https://lightningcss.dev/), [terser](https://github.com/terser/terser), and [HTMLMinifier](https://github.com/kangax/html-minifier).

## Development

```sh
pnpm install  # install dependencies
pnpm dev      # start development server
pnpm build    # run production build
pnpm clean    # clean up build artifacts
pnpm format   # format files
```

## Structure

-   `src/_data/`: data used in templates
-   `src/layouts/`, `src/components/`: [Vento](https://vento.js.org/) layout and component templates
-   `src/generated`: root files (feeds, sitemap, robots.txt)
-   `src/assets/`: static assets (styling, scripts, fonts)
-   `src/posts/`: blog posts
-   `images/`: images for blog posts
-   `public/`: favicons and fonts
-   `config/11ty/`: collections, shortcodes, and filters for 11ty
-   `config/markdown/`: markdown configuration
-   `config/transforms/`: various functions for transforming/processing CSS, HTML, and JS

## License

Source code is under [MIT](LICENSE), blog posts (and other written content) are under [CC BY-SA 4.0](LICENSE-content).

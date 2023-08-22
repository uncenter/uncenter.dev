<h1>uncenter.dev</h1>

[![Eleventy](https://img.shields.io/badge/Eleventy-2.0.1-333333.svg?style=flat-square)](https://11ty.dev)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)

My personal website!

## Structure

- `src/_11ty/`: collections, shortcodes, filters, and transforms for 11ty
- `src/_layouts/`, `src/_includes/`: nunjucks templates for layouts and components
- `src/_data/`: global data
- `src/assets/`: static assets (CSS, JS, and icons)
- `src/posts/*.md`: blog posts
- `utils/`: scripts & plugins
- `images/`: images for the blog posts

## Development

```sh
pnpm install  # install dependencies
pnpm dev      # start development server
pnpm build    # run production build
pnpm clean    # clean up build artifacts
pnpm format   # format project files
pnpm spell    # run spell-checking
```

## Contributing

If you see any issues or have any suggestions for the website, please open an issue or pull request. If you have any questions, feel free to reach out via the contact methods listed on my website or on my GitHub profile.

## About

### Features

- **Syntax highlighting** for posts using [`shikiji`](https://github.com/antfu/shikiji) (a fork of [`shiki`](https://github.com/shikijs/shiki))
- **Optimized images** with [`@11ty/eleventy-img`](https://github.com/11ty/eleventy-img)
- **RSS feed** using [`@ryanccn/eleventy-plugin-rss`](https://github.com/ryanccn/eleventy-plugin-rss)
- **Spell-checking** for posts through [`cspell`](http://cspell.org/)
- **Optimized CSS, JS, and HTML** using [`postcss`](https://postcss.org/), [`UglifyJS`](https://github.com/mishoo/UglifyJS), and [`html-minifier`](https://github.com/kangax/html-minifier)

### Environment variables

- `UMAMI_TOKEN` (_optional_, created with `UMAMI_USERNAME` and `UMAMI_PASSWORD` if missing)
- `UMAMI_USERNAME`
- `UMAMI_PASSWORD`

## Credits

Many thanks to the 11ty community for their contributions to the community, without which this website would not be possible- thanks to Stephanie Eckles for [11ty.rocks](https://11ty.rocks/), [Learn Eleventy from Scratch](https://learneleventyfromscratch.com/), [11ty.recipes](https://11ty.recipes/) by Mike Aparicio, [Bernard Nijenhuis' notes](https://bnijenhuis.nl/), and more.

Generic icons sourced from [Lucide](https://lucide.dev/) and brand icons from [Simple Icons](https://simpleicons.org/).

## License

Source code is under [MIT](LICENSE), blog posts (and other written content) are under [CC BY-SA 4.0](LICENSE-content).

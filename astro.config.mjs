import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// import rehypeShikiji from 'rehype-shikiji';
// import rehypeSlug from 'rehype-slug';
// import rehypeAutolinkHeadings from 'rehype-autolink-headings';
// import rehypeToc from 'rehype-toc';
import unpluginIcons from 'unplugin-icons/vite';

import { url } from './src/data/site';

// https://astro.build/config
export default defineConfig({
	integrations: [
		tailwind({
			configFile: './tailwind.config.ts',
		}),
		sitemap(),
		mdx({
			gfm: true,
		}),
	],
	markdown: {
		remarkPlugins: [],
		rehypePlugins: [
			// rehypeSlug(),
			// rehypeAutolinkHeadings({ behavior: 'prepend' }),
			// rehypeToc({ headings: ['h2', 'h3', 'h4'] }),
			// rehypeShikiji({
			// 	themes: { light: 'github-light', dark: 'github-dark' },
			// }),
		],
	},
	vite: {
		plugins: [
			unpluginIcons({
				compiler: 'astro',
			}),
		],
	},
	site: url,
	output: 'static',
	compressHTML: true,
});

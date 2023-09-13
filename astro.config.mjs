import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

import rehypeShikiji from 'rehype-shikiji';
import unpluginIcons from 'unplugin-icons/vite';

import * as site from '@/data/site';

// https://astro.build/config
export default defineConfig({
	integrations: [
		tailwind(),
		sitemap(),
		mdx({
			remarkPlugins: [],
			rehypePlugins: [
				rehypeShikiji({
					themes: { light: 'github-light', dark: 'github-dark' },
				}),
			],
			gfm: true,
		}),
	],
	vite: {
		plugins: [
			unpluginIcons({
				compiler: 'astro',
			}),
		],
	},
	site: site.url,
	compressHTML: true,
});

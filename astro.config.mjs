import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

import rehypeShikiji from 'rehype-shikiji';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeToc from 'rehype-toc';
import unpluginIcons from 'unplugin-icons/vite';

import * as site from '@/data/site';

// https://astro.build/config
export default defineConfig({
	integrations: [
		tailwind(),
		sitemap(),
		mdx({
			rehypePlugins: [
				rehypeSlug(),
				rehypeAutolinkHeadings({ behavior: 'prepend' }),
				rehypeToc({ headings: ['h2', 'h3', 'h4'] }),
				rehypeShikiji({
					themes: { light: 'github-light', dark: 'github-dark' },
				}),
			],
			remarkPlugins: [],
			gfm: true,
		}),
	],
	markdown: {
		remarkPlugins: ['remark-code-titles'],
		rehypePlugins: [
			'rehype-slug',
			['rehype-autolink-headings', { behavior: 'prepend' }],
			['rehype-toc', { headings: ['h2', 'h3', 'h3', 'h4'] }],
			[
				'rehype-shikiji',
				{
					themes: { light: 'github-light', dark: 'github-dark' },
				},
			],
		],
	},
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

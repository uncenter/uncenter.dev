import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

import rehypeShikiji from 'rehype-shikiji';

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
	site: 'https://uncenter.dev',
	compressHTML: true,
});

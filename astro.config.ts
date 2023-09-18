import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

import unpluginIcons from 'unplugin-icons/vite';

import { url } from './src/data/site';

// https://astro.build/config
export default defineConfig({
	integrations: [
		tailwind({
			configFile: './tailwind.config.ts',
		}),
		mdx({
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
	site: url,
	output: 'static',
});

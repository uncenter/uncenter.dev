import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
	schema: z.object({
		title: z.string(),
		description: z.string(),
		tags: z.array(z.string()),
		date: z.date(),
		edited: z.optional(z.date()),
		comments: z.optional(z.boolean()).default(true),
	}),
});

export const collections = { posts };

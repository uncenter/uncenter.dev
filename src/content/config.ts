import { defineCollection, z } from 'astro:content';

export const collections = {
	posts: defineCollection({
		schema: z.object({
			title: z.string(),
			description: z.string(),
			tags: z.array(z.string()),
			createdAt: z.date(),
			modifiedAt: z.optional(z.date()),
			comments: z.optional(z.boolean()).default(true),
		}),
	}),
};

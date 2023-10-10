const isDevelopment = process.env.NODE_ENV !== 'production';
require('dotenv').config();

const { DateTime } = require('luxon');
const getViewsForPage = require('../../utils/umami');

// const { z } = require('zod');

// const schema = z.object({
// 	title: z.string(),
// 	description: z.string(),
// 	tags: z.array(z.string()),
// 	published: z.date(),
// 	edited: z.optional(z.date()),
// 	comments: z.optional(z.boolean()).default(true),
// });

module.exports = {
	eleventyComputed: {
		views: async (data) => {
			if (isDevelopment || process.env.UMAMI_SKIP)
				return Math.floor(Math.random() * 100);

			return getViewsForPage(data.page.url, data.page.date);
		},
		date: (data) => {
			return DateTime.fromJSDate(new Date(data.date))
				.setZone('utc')
				.toISO();
		},
	},
};

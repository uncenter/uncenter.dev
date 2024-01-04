const isDevelopment = process.env.NODE_ENV !== 'production';
import 'dotenv/config';

import { DateTime } from 'luxon';
import getViewsForPage from '../../utils/umami.js';

export default {
	eleventyComputed: {
		views: async (data) => {
			if (isDevelopment || process.env.UMAMI_SKIP) return;

			return getViewsForPage(data.page.url, data.page.date);
		},
		date: (data) => {
			return DateTime.fromJSDate(new Date(data.date))
				.setZone('utc')
				.toISO();
		},
		eleventyExcludeFromCollections: (data) => {
			return !!data.archived;
		},
	},
};

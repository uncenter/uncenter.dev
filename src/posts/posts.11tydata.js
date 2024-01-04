const isDevelopment = process.env.NODE_ENV !== 'production';
require('dotenv').config();

const { DateTime } = require('luxon');
const getViewsForPage = require('../../utils/umami');

module.exports = {
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

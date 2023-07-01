const { DateTime } = require('luxon');
const EleventyFetch = require('@11ty/eleventy-fetch');

const log = require('../_11ty/utils/log.js');
const isProd = process.env.NODE_ENV === 'production';
const meta = require('../_data/meta.js');
require('dotenv').config();

async function getUmamiToken() {
	const url = `${meta.analytics.url}/api/auth/login`;

	const data = {
		username: process.env.UMAMI_USERNAME,
		password: process.env.UMAMI_PASSWORD,
	};

	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	};

	fetch(url, options)
		.then((res) => res.json())
		.then((json) => {
			return json.token;
		});
}

async function getPageViews(originalUrl, originalDate) {
	const url = `${meta.analytics.url}/api/websites/${
		meta.analytics.websiteId
	}/pageviews?url=${originalUrl}&start_at=${Date.parse(
		originalDate,
	)}&end_at=${Date.now()}&unit=day&tz=America/New_York`;

	return await EleventyFetch(url, {
		duration: '12h',
		type: 'json',
		fetchOptions: {
			headers: {
				Authorization: `Bearer ${process.env.UMAMI_TOKEN}`,
			},
		},
	});
}

module.exports = {
	eleventyComputed: {
		eleventyExcludeFromCollections: (data) => {
			if ((data.unlisted && isProd) || data.hide) {
				return true;
			}
			return data.eleventyExcludeFromCollections;
		},
		permalink: (data) => {
			if (data.hide && isProd) return false;
			return data.permalink;
		},
		views: async (data) => {
			if (!data.page.url || data.views === false) return;
			if (!isProd) return Math.floor(Math.random() * 100);

			views = 0;
			const res = await getPageViews(data.page.url, data.page.date);
			for (let i = 0; i < res.pageviews.length; i++) {
				views += res.pageviews[i].y;
			}
			log.output({
				category: 'views',
				file: data.page.url,
				extra: views,
			});
			return views;
		},
		description: (data) => {
			if (data.description) return data.description;
			log.error({
				category: '',
				message: `No description found for ${data.page.url || '/'}!`,
			});
		},
		date: (data) => {
			return DateTime.fromJSDate(new Date(data.date)).setZone('utc').toISO();
		},
	},
};

const { DateTime } = require('luxon');
const fetch = require('node-fetch-commonjs');

const logOutput = require('../_11ty/utils/logOutput.js');
const isDev = process.env.NODE_ENV === 'development';
const meta = require('../_data/meta.json');
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

	const options = {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${process.env.UMAMI_TOKEN}`,
		},
	};

	const res = await fetch(url, options);
	const json = await res.json();
	return json;
}

module.exports = {
	eleventyComputed: {
		eleventyExcludeFromCollections: (data) => {
			if ((data.unlisted && !isDev) || data.hide) {
				return true;
			}
			return data.eleventyExcludeFromCollections;
		},
		permalink: (data) => {
			if (data.hide) return false;
			return data.permalink;
		},
		views: async (data) => {
			if (!data.page.url || data.views === false) return;
			if (isDev) return Math.floor(Math.random() * 100);

			views = 0;
			const res = await getPageViews(data.page.url, data.page.date);
			for (let i = 0; i < res.pageviews.length; i++) {
				views += res.pageviews[i].y;
			}
			logOutput({
				prefix: 'data:views',
				file: data.page.url,
				extra: views,
			});
			return views;
		},
		description: (data) => {
			if (data.description) {
				return data.description;
			}
			return 'A post about a thing.';
		},
		date: (data) => {
			return DateTime.fromJSDate(new Date(data.date)).setZone('utc').toISO();
		},
		post: (data) => {
			if (!data.post) {
				return;
			}
			if (data.archived) {
				return {
					tags: data.post.tags,
					return: { link: '/archive/', text: 'Back to archive' },
				};
			}
			return data.post;
		},
	},
};

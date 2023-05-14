const fetch = require('node-fetch');
const { DateTime } = require('luxon');

const logOutput = require('../_11ty/utils/logOutput.js');
const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
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
			// If the post is a draft and we're in production, or if the post is unlisted, exclude it from collections
			if ((isProd && data.draft) || data.unlisted) {
				return true;
			}
			return data.eleventyExcludeFromCollections;
		},
		permalink: (data) => {
			// If the post is a draft and we're in production and it's not unlisted, don't build it
			if (data.draft && isProd && !data.unlisted) {
				return false;
			}
			return data.permalink;
		},
		views: async (data) => {
			if (!data.page.url || data.views === false) {
				return;
			}
			if ((isProd && data.draft) || data.eleventyExcludeFromCollections) {
				logOutput({
					prefix: 'data:views',
					file: data.page.url,
				});
				return;
			}
			if (isDev) {
				logOutput({
					prefix: 'data:views',
					file: data.page.url,
				});
				return Math.floor(Math.random() * 100);
			}
			const originalUrl = data.page.url;
			const originalDate = data.page.date;
			const res = await getPageViews(originalUrl, originalDate);
			views = 0;
			for (let i = 0; i < res.pageviews.length; i++) {
				views += res.pageviews[i].y;
			}
			logOutput({
				prefix: 'data:views',
				file: data.page.url,
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

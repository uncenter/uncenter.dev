const { DateTime } = require('luxon');
const EleventyFetch = require('@11ty/eleventy-fetch');

const log = require('../_11ty/utils/log.js');
const isProduction = process.env.NODE_ENV === 'production';
const meta = require('../_data/meta.js');
require('dotenv').config();

async function getUmamiToken(username, password) {
	const url = `${analytics.url}/api/auth/login`;

	const data = {
		username,
		password,
	};

	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	};

	const res = await fetch(url, options);
	const json = await res.json();
	return json.token;
}

async function validateUmamiToken(token) {
	const url = `${analytics.url}/api/auth/verify`;

	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	};

	const res = await fetch(url, options);
	if (res.status === 401) return false;
	if (res.status === 200) return true;
	throw new Error(`Received unexpected response: ${res}`);
}

async function getPageViews(originalUrl, originalDate, token) {
	const url = `${analytics.url}/api/websites/${
		analytics.websiteId
	}/pageviews?url=${originalUrl}&startAt=${Date.parse(
		originalDate,
	)}&endAt=${Date.now()}&unit=day&timezone=America/New_York`;

	return await EleventyFetch(url, {
		duration: '12h',
		type: 'json',
		fetchOptions: {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	});
}

module.exports = {
	eleventyComputed: {
		views: async (data) => {
			if (!data.page.url || data.views === false) return;
			if (!isProduction || process.env.UMAMI_SKIP)
				return Math.floor(Math.random() * 100);

			let authToken = process.env.UMAMI_TOKEN;
			if (!authToken || !(await validateUmamiToken(authToken))) {
				const username = process.env.UMAMI_USERNAME;
				const password = process.env.UMAMI_PASSWORD;
				if (username && password)
					authToken = await getUmamiToken(username, password);
				if (!authToken || !(await validateUmamiToken(authToken))) {
					throw new Error('[views] No auth token for Umami!');
				}
			}
			let views = 0;
			const response = await getPageViews(
				data.page.url,
				data.page.date,
				authToken,
			);
			for (let index = 0; index < response.pageviews.length; index++) {
				views += response.pageviews[index].y;
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
			throw new Error(
				`[posts] No description found for ${data.page.url || '/'}`,
			);
		},
		date: (data) => {
			return DateTime.fromJSDate(new Date(data.date)).setZone('utc').toISO();
		},
	},
};

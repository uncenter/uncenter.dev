const fetch = require('node-fetch');
const spawn = require('cross-spawn');
const { DateTime } = require('luxon');

const logOutput = require('../_11ty/utils/logOutput.js');
const isDevelopment = process.env.NODE_ENV === 'development';
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

// https://github.com/11ty/eleventy/blob/master/src/Util/DateGitLastUpdated.js
// MIT License: https://github.com/11ty/eleventy/blob/master/LICENSE
function getGitLastUpdated(filePath) {
	return (
		parseInt(
			spawn
				.sync('git', ['log', '-1', '--format=%at', filePath])
				.stdout.toString('utf-8'),
		) * 1000
	);
}

module.exports = {
	eleventyComputed: {
		eleventyExcludeFromCollections: (data) => {
			if (!isDevelopment && data.draft) {
				return true;
			} else {
				return data.eleventyExcludeFromCollections;
			}
		},
		views: async (data) => {
			if (!data.page.url || data.views === false) {
				return;
			}
			if (
				(!isDevelopment && data.draft) ||
				data.eleventyExcludeFromCollections
			) {
				logOutput({
					prefix: 'data:views',
					file: data.page.url,
				});
				return;
			}
			if (process.env.NODE_ENV !== 'production') {
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
			if (data.micro) {
				return 'A tiny post about a tiny thing.';
			}
			return 'A post about a thing.';
		},
		permalink: (data) => {
			if (data.permalink) {
				return data.permalink;
			}
			if (data.micro) {
				return `micro/${data.page.fileSlug}/`;
			}
		},
		date: (data) => {
			return DateTime.fromJSDate(new Date(data.date)).setZone('utc').toISO();
		},
	},
};

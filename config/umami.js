import EleventyFetch from '@11ty/eleventy-fetch';

import analytics from '../src/_data/analytics.js';

async function getToken(username, password) {
	const { token } = await EleventyFetch(`${analytics.url}/api/auth/login`, {
		duration: '0s',
		type: 'json',
		fetchOptions: {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username,
				password,
			}),
		},
	});

	return token;
}

async function validateToken(token) {
	const response = await fetch(`${analytics.url}/api/auth/verify`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});

	return response.status === 200;
}

async function getPageViews(originalUrl, originalDate, token) {
	const url = `${analytics.url}/api/websites/${
		analytics.websiteId
	}/pageviews?${new URLSearchParams({
		url: originalUrl,
		startAt: Date.parse(originalDate),
		endAt: Date.now(),
		unit: 'day',
		timezone: 'America/New_York',
	})}`;

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

async function getValidToken() {
	let token = process.env.UMAMI_TOKEN;

	if (token && (await validateToken(token))) {
		return token;
	}

	const username = process.env.UMAMI_USERNAME;
	const password = process.env.UMAMI_PASSWORD;

	if (username && password) {
		token = await getToken(username, password);
		if (token && (await validateToken(token))) {
			return token;
		} else {
			throw new Error('UMAMI_TOKEN is not set or is invalid');
		}
	}

	throw new Error(
		'no UMAMI_TOKEN and UMAMI_USERNAME or UMAMI_PASSWORD not set',
	);
}

export default async function (path, date) {
	const token = await getValidToken();
	const pageviews = await getPageViews(path, date, token);
	return pageviews['pageviews'].reduce((total, pv) => total + pv.y, 0);
}

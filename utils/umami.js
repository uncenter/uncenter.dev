const EleventyFetch = require('@11ty/eleventy-fetch');

const analytics = require('../src/_data/analytics');

async function getToken(username, password) {
	const res = await fetch(`${analytics.url}/api/auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			username,
			password,
		}),
	});

	const { token } = await res.json();
	return token;
}

async function validateToken(token) {
	const res = await fetch(`${analytics.url}/api/auth/verify`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});
	if (res.status === 200) return true;
	return false;
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

module.exports = async function (path, date) {
	let token = process.env.UMAMI_TOKEN;
	if (!token || !(await validateToken(token))) {
		const username = process.env.UMAMI_USERNAME;
		const password = process.env.UMAMI_PASSWORD;
		if (username && password) {
			token = await getToken(username, password);
		} else {
			throw new Error(
				'no UMAMI_TOKEN and UMAMI_USERNAME or UMAMI_PASSWORD not set',
			);
		}
		if (!token || !(await validateToken(token))) {
			throw new Error('UMAMI_TOKEN is not set or is invalid');
		}
	}
	return (await getPageViews(path, date, token))['pageviews'].reduce(
		(total, pv) => total + pv.y,
		0,
	);
};

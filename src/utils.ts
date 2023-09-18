import slug from '@sindresorhus/slugify';
import { analytics } from '@/data/site';

export const slugify = (string: string) => slug(string);
export const capitalize = (string: string) =>
	string.charAt(0).toUpperCase() + string.slice(1);

async function getUmamiToken(username: string, password: string) {
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

async function validateUmamiToken(token: string) {
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

async function getPageViews(page: string, createdAt: Date, token: string) {
	const res = await fetch(
		`${analytics.url}/api/websites/${
			analytics.websiteId
		}/pageviews?url=${page}&startAt=${createdAt}&endAt=${Date.now()}&unit=day&timezone=America/New_York`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	);
	return await res.json();
}

export async function getViewsForPath(path: string, createdAt: Date) {
	if (!import.meta.env.PROD || import.meta.env.UMAMI_SKIP)
		return Math.floor(Math.random() * 100);

	let token = process.env.UMAMI_TOKEN;
	if (!token || !(await validateUmamiToken(token))) {
		const username = import.meta.env.UMAMI_USERNAME;
		const password = import.meta.env.UMAMI_PASSWORD;
		if (username && password) token = await getUmamiToken(username, password);
		if (!token || !(await validateUmamiToken(token))) {
			throw new Error('No authorization token set for Umami');
		}
	}
	return (await getPageViews(path, createdAt, token))['pageviews'].reduce(
		(total: number, pv: Record<string, number>) => total + pv.y,
		0,
	);
}

const { DateTime } = require('luxon');

const posts = (collectionApi) => {
	return collectionApi
		.getFilteredByGlob('./src/posts/**/*.md')
		.filter((post) => post.data.archived !== true);
};

const archivedPosts = (collectionApi) => {
	return collectionApi
		.getFilteredByGlob('./src/posts/**/*.md')
		.filter((post) => post.data.archived === true);
};

const allPosts = (collectionApi) => {
	return collectionApi.getFilteredByGlob('./src/posts/**/*.md');
};

const allTags = (collectionApi) => {
	function filterTagList(tags) {
		return (tags || []).filter((tag) => ['all'].indexOf(tag) === -1);
	}
	let tagSet = new Set();
	collectionApi.getAll().forEach((item) => {
		(item.data.tags || []).forEach((tag) => tagSet.add(tag));
	});

	return filterTagList([...tagSet]);
};

const gitChangelog = () => {
	const recentChanges = require('gitlog').default({
		repo: __dirname,
		number: 100,
		fields: [
			'hash',
			'abbrevHash',
			'subject',
			'authorName',
			'authorDate',
			'committerDate',
			'committerDateRel',
		],
	});

	const grouped = new Map();

	for (const change of recentChanges) {
		let { subject, authorDate } = change;
		if (
			/^(fix|feat|docs|style|refactor|perf|test|chore|content)\b/i.test(subject)
		) {
			subject = subject.replace(/[<>]/g, '');
			authorDate = DateTime.fromISO(
				new Date(authorDate).toISOString(),
			).toFormat('LLL dd yyyy');
			if (!grouped.has(authorDate)) {
				grouped.set(authorDate, []);
			}
			const forThisDate = grouped.get(authorDate);
			if (!forThisDate.some(({ subject: subj }) => subj === subject)) {
				forThisDate.push({ ...change, subject });
			}
		}
	}
	return Array.from(grouped.entries());
};

const series = (collectionApi) => {
	const posts = collectionApi.getFilteredByGlob('./src/posts/**/*.md');

	const mapping = new Map();

	for (const post of posts) {
		const { series } = post.data;

		if (!series) continue;

		if (!mapping.has(series.title)) {
			mapping.set(series.title, {
				posts: [],
				description: series.description,
				date: post.date,
			});
		}

		const existing = mapping.get(series.title);
		existing.posts.push(post.url);
		existing.date = post.date;
	}

	const normalized = [];

	for (let [title, { posts, description, date }] of mapping.entries()) {
		if (posts.length > 1) {
			normalized.push({ title, posts, description, date });
		}
	}
	return normalized;
};

module.exports = (eleventyConfig) => {
	eleventyConfig.addCollection('posts', posts);
	eleventyConfig.addCollection('allPosts', allPosts);
	eleventyConfig.addCollection('archivedPosts', archivedPosts);
	eleventyConfig.addCollection('allTags', allTags);
	eleventyConfig.addCollection('recentChanges', gitChangelog);
	eleventyConfig.addCollection('series', series);
};

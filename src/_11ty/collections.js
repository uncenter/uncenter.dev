const { DateTime } = require('luxon');

const posts = (collectionApi) => {
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
	eleventyConfig.addCollection('allTags', allTags);
	eleventyConfig.addCollection('series', series);
};

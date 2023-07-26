const posts = (collectionApi) => {
	return collectionApi.getFilteredByGlob('./src/posts/**/*.md');
};

const allTags = (collectionApi) => {
	let tagSet = new Set();
	for (const item of collectionApi.getAll()) {
		for (const tag of item.data.tags || []) tagSet.add(tag);
	}

	return ([...tagSet] || []).filter((tag) => !['all'].includes(tag));
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

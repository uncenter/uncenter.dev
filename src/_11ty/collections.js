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

module.exports = (eleventyConfig) => {
	eleventyConfig.addCollection('posts', posts);
	eleventyConfig.addCollection('allTags', allTags);
};

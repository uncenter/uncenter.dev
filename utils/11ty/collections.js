const posts = (collectionApi) => {
	return collectionApi.getFilteredByGlob('./src/posts/**/*.md');
};

module.exports = (eleventyConfig) => {
	eleventyConfig.addCollection('posts', posts);
};

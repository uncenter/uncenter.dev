const posts = (collectionApi) => {
	return collectionApi.getFilteredByGlob('./src/posts/**/*.md');
};

export const collections = (eleventyConfig) => {
	eleventyConfig.addCollection('posts', posts);
};

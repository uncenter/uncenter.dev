export const shortcodes = (eleventyConfig) => {
	eleventyConfig.addShortcode('log', (...args) => {
		console.log(...args);
		return '';
	});
};

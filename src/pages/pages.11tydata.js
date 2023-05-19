module.exports = {
	eleventyComputed: {
		permalink: (data) => {
			if (data.permalink) return data.permalink;
			return `${data.page.filePathStem.replace(
				'/pages/',
				'/',
			)}/index.html`.replace(`/index/`, `/`);
		},
	},
};

module.exports = (eleventyConfig, { themes }) => {
	eleventyConfig.amendLibrary('md', () => {});

	eleventyConfig.on('eleventy.before', async () => {
		const { getHighlighter, bundledLanguages } = await import('shikiji');

		const shiki = await getHighlighter({
			themes: Object.values(themes),
			langs: Object.keys(bundledLanguages),
		});

		eleventyConfig.amendLibrary('md', (mdLibrary) => {
			return mdLibrary.set({
				highlight: (code, lang) => {
					return shiki.codeToHtml(code, {
						lang,
						themes,
						defaultColor: false,
					});
				},
			});
		});
	});
};

const shiki = require('shiki');

module.exports = (eleventyConfig, { theme }) => {
	if (!theme) throw new Error('Theme is required!');
	eleventyConfig.amendLibrary('md', () => {});

	eleventyConfig.on('eleventy.before', async () => {
		const highlighter = await shiki.getHighlighter({ theme });

		eleventyConfig.amendLibrary('md', (mdLib) => {
			return mdLib.set({
				highlight: (code, lang) => highlighter.codeToHtml(code, { lang }),
			});
		});
	});
};

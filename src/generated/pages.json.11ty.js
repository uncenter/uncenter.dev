// Via: https://github.com/ryanccn/ryanccn.dev/blob/main/src/generated/pages.json.11ty.js
// License: MIT
module.exports = class {
	data() {
		return {
			permalink: './pages.json',
			permalinkBypassOutputDir: true,
			eleventyExcludeFromCollections: true,
		};
	}

	render(data) {
		return JSON.stringify(
			[
				...data.collections.all.map((page) => {
					return {
						title: page.data.title,
						slug: this.slugify(page.data.title),
						date: page.data.date,
					};
				}),
			],
			undefined,
			2,
		);
	}
};

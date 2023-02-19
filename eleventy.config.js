const gitlog = require('gitlog').default;

const filters = require("./utils/filters.js");
const shortcodes = require("./utils/shortcodes.js");

module.exports = function (eleventyConfig) {
    Object.keys(filters).forEach((filter) => {
        eleventyConfig.addFilter(filter, filters[filter]);
    });
    eleventyConfig.addPlugin(shortcodes);

    // eleventyConfig.addCollection("recentChangesByDate", () => {
	// 	const settings = {
	// 		repo: __dirname,
	// 		number: 35,
	// 		fields: ['hash', 'abbrevHash', 'subject', 'authorName', 'authorDate', 'committerDate', 'committerDateRel']
	// 	}
	// 	const recentChanges = gitlog(settings)

	// 	const grouped = new Map();

	// 	for (const change of recentChanges) {
	// 		let { subject, authorDate } = change;
	// 		if (/^(fix|feat|docs|style|refactor|perf|test|chore|content)\b/i.test(subject)) {
	// 			subject = subject.replace(/[<>]/g, '');
	// 			authorDate = DateTime.fromISO(new Date(authorDate).toISOString()).toFormat('LLL dd yyyy');
	// 			if (!grouped.has(authorDate)) {
	// 				grouped.set(authorDate, []);
	// 			}
	// 			const forThisDate = grouped.get(authorDate);
	// 			if (!forThisDate.some(({ subject: subj }) => subj === subject)) {
	// 				forThisDate.push({ ...change, subject });
	// 			}
	// 		}
	// 	}
	// 	return Array.from(grouped.entries());
	// });
	// eleventyConfig.addCollection('icon', collection => {
	// 	return [...collection.getFilteredByGlob('/icons/*.svg')];
	// });

    eleventyConfig.addLayoutAlias('base', 'base.njk');
    eleventyConfig.addLayoutAlias('post', 'post.njk');

    eleventyConfig.addPassthroughCopy({ "src/assets/images/favicon": "." });
    eleventyConfig.addPassthroughCopy({"src/assets/js": "/assets/js"});
	eleventyConfig.addPassthroughCopy({"src/assets/css": "/assets/css"});

    return {
        dir: {
            input: "src/content",
            includes: "../_includes",
            layouts: "../_includes/layouts",
            data: "../_data",
            output: "dist",
        },
		templateFormats: [ 'md', 'njk', 'html', 'css' ],
		markdownTemplateEngine: 'njk',
    };
};
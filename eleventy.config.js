const markdownIt = require("markdown-it");
const markdownItAnchor = require('markdown-it-anchor');
const markdownItAttrs = require('markdown-it-attrs');
const markdownItLinkAttributes = require('markdown-it-link-attributes');
const markdownItFootnote = require('markdown-it-footnote');
const markdownItMark = require('markdown-it-mark');
const markdownItAbbr = require('markdown-it-abbr');
const markdownItSup = require('markdown-it-sup');
const markdownItSub = require('markdown-it-sub');
const markdownItContainer = require('markdown-it-container');
const markdownItKBD = require('markdown-it-kbd');
const markdownItEmoji = require('markdown-it-emoji');
const gitlog = require('gitlog').default;
const { DateTime } = require("luxon");

const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const codeClipboard = require("./plugins/code-clipboard/.eleventy");
const pluginTOC = require('eleventy-plugin-toc')
const emojiReadTime = require("@11tyrocks/eleventy-plugin-emoji-readtime");
const externalLinks = require("@aloskutov/eleventy-plugin-external-links");
const purgeCSS = require("eleventy-plugin-purgecss");

// utils
const filters = require("./utils/filters.js");

module.exports = function (eleventyConfig) {
	let markdownLibrary = markdownIt({
		html: true,
		breaks: true,
	})
		.use(require('markdown-it-task-checkbox'), {
			disabled: true,
			divWrap: false,
			divClass: 'checkbox',
			idPrefix: 'cbx_',
			ulClass: 'task-list',
			liClass: 'task-list-item'
		})
		.use(codeClipboard.markdownItCopyButton, {
			iconClass: 'icon icon-copy',
			iconDefinition: 'icon-copy',
			renderMode: 'svg-sprite',
			iconStyle: "",
		})
		.use(markdownItAnchor, {
			permalink: true,
			permalinkClass: "direct-link",
			permalinkSymbol: "#",
		})
		.use(markdownItLinkAttributes, [
			{
				matcher(href) {
					return href.match(/^https?:\/\//);
				},
				attrs: {
					target: '_blank',
					rel: 'noopener noreferrer'
				}
			}
		])
		.use(markdownItAttrs)
		.use(markdownItFootnote)
		.use(markdownItMark)
		.use(markdownItAbbr)
		.use(markdownItSup)
		.use(markdownItSub)
		.use(markdownItContainer,
			'card'
		)
		.use(markdownItKBD)
		.use(markdownItEmoji);
	eleventyConfig.setLibrary("md", markdownLibrary);

	eleventyConfig.addPlugin(codeClipboard);
	eleventyConfig.addPlugin(syntaxHighlight);
	eleventyConfig.addPlugin(pluginTOC);
	eleventyConfig.addPlugin(emojiReadTime, { showEmoji: false, label: "min read" });
	eleventyConfig.addPlugin(externalLinks, { url: 'https://uncenter.org', rel: ['noreferrer', 'noopener', 'external'], overwrite: false });
	eleventyConfig.addPlugin(purgeCSS, {
		config: "./purgecss.config.js",
		quiet: false,
	});

	// Shortcodes and Filters
	Object.keys(filters).forEach((filter) => {
		eleventyConfig.addFilter(filter, filters[filter]);
	});
	eleventyConfig.addPlugin(require("./utils/shortcodes"));

	// Collections
	eleventyConfig.addCollection("orderedDemos", function (collection) {
		return collection.getFilteredByTag("demos").sort((a, b) => {
			return a.data.order - b.data.order;
		});
	});
	eleventyConfig.addCollection('blog', collection => {
		return [...collection.getFilteredByGlob('./src/blog/*.md')].reverse();
	});
	eleventyConfig.addCollection("customCollections", (collectionApi) => {
		const collections = new Map();

		for (const p of collectionApi.getAll()) {
			const { collection } = p.data;
			if (collection === undefined) {
				continue;
			}
			if (!collections.has(collection)) {
				collections.set(collection, []);
			}
			collections.get(collection).push(p);
		}
		return Object.fromEntries(collections.entries());
	});
	function filterTagList(tags) {
		return (tags || []).filter(tag => ["all"].indexOf(tag) === -1);
	}
	eleventyConfig.addFilter("filterTagList", filterTagList)
	eleventyConfig.addCollection("tagList", function (collection) {
		let tagSet = new Set();
		collection.getAll().forEach(item => {
			(item.data.tags || []).forEach(tag => tagSet.add(tag));
		});

		return filterTagList([...tagSet]);
	});
	eleventyConfig.addCollection("recentChangesByDate", () => {
		const settings = {
			repo: __dirname,
			number: 35,
			fields: ['hash', 'abbrevHash', 'subject', 'authorName', 'authorDate', 'committerDate', 'committerDateRel']
		}
		const recentChanges = gitlog(settings)

		const grouped = new Map();

		for (const change of recentChanges) {
			let { subject, authorDate } = change;
			if (/^(fix|feat|docs|style|refactor|perf|test|chore|content)\b/i.test(subject)) {
				subject = subject.replace(/[<>]/g, '');
				authorDate = DateTime.fromISO(new Date(authorDate).toISOString()).toFormat('LLL dd yyyy');
				if (!grouped.has(authorDate)) {
					grouped.set(authorDate, []);
				}
				const forThisDate = grouped.get(authorDate);
				if (!forThisDate.some(({ subject: subj }) => subj === subject)) {
					forThisDate.push({ ...change, subject });
				}
			}
		}
		return Array.from(grouped.entries());
	});

	// Other Config
	eleventyConfig.addLayoutAlias('base', 'base.njk');
	eleventyConfig.addLayoutAlias('blog', 'blog.njk');

	['src/assets/styles/', 'src/assets/images/content', 'src/assets/scripts/', 'src/assets/fonts/'].forEach(path =>
		eleventyConfig.addPassthroughCopy(path)
	);

	eleventyConfig.addPassthroughCopy({ "src/assets/images/icons": "." })
	eleventyConfig.addWatchTarget("/src/assets/styles");

	return {
		dir: {
			input: 'src',
			output: 'dist',
			includes: '_includes',
			layouts: '_includes/layouts',
		}
	}
}
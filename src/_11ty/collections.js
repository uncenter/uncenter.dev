const gitlog = require('gitlog').default;
const { DateTime } = require('luxon');

const getPosts = (collectionApi) => {
	return collectionApi
		.getFilteredByGlob('./src/posts/**/*.md')
		.filter((post) => post.data.archived !== true && post.data.micro !== true);
};

const getArchivedPosts = (collectionApi) => {
	return collectionApi
		.getFilteredByGlob('./src/posts/**/*.md')
		.filter((post) => post.data.archived === true && post.data.micro !== true);
};

const getAllPosts = (collectionApi) => {
	return collectionApi.getFilteredByGlob('./src/posts/**/*.md');
};

const getCustomCollections = (collectionApi) => {
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
};

const getAllTags = (collectionApi) => {
	function filterTagList(tags) {
		return (tags || []).filter((tag) => ['all'].indexOf(tag) === -1);
	}
	let tagSet = new Set();
	collectionApi.getAll().forEach((item) => {
		(item.data.tags || []).forEach((tag) => tagSet.add(tag));
	});

	return filterTagList([...tagSet]);
};

const getRecentChangesByDate = () => {
	const settings = {
		repo: __dirname,
		number: 100,
		fields: [
			'hash',
			'abbrevHash',
			'subject',
			'authorName',
			'authorDate',
			'committerDate',
			'committerDateRel',
		],
	};
	const recentChanges = gitlog(settings);

	const grouped = new Map();

	for (const change of recentChanges) {
		let { subject, authorDate } = change;
		if (
			/^(fix|feat|docs|style|refactor|perf|test|chore|content)\b/i.test(subject)
		) {
			subject = subject.replace(/[<>]/g, '');
			authorDate = DateTime.fromISO(
				new Date(authorDate).toISOString(),
			).toFormat('LLL dd yyyy');
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
};

module.exports = (eleventyConfig) => {
	eleventyConfig.addCollection('posts', getPosts);
	eleventyConfig.addCollection('allPosts', getAllPosts);
	eleventyConfig.addCollection('archivedPosts', getArchivedPosts);
	eleventyConfig.addCollection('allTags', getAllTags);
	eleventyConfig.addCollection('recentChanges', getRecentChangesByDate);
	eleventyConfig.addCollection('custom', getCustomCollections);
};

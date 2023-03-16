const gitlog = require("gitlog").default;
const { DateTime } = require("luxon");

const getPosts = (collectionApi) => {
    return [...collectionApi.getFilteredByGlob("./src/content/posts/**/*.md"), ...collectionApi.getFilteredByGlob("./src/content/micro/**/*.md")].sort((a, b) => new Date(a.data.date) - new Date(b.data.date));
}

const getBlogPosts = (collectionApi) => {
    return collectionApi.getFilteredByGlob("./src/content/posts/**/*.md");
};

const getMicroPosts = (collectionApi) => {
    return collectionApi.getFilteredByGlob("./src/content/micro/**/*.md");
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
    let tagSet = new Set();
    collectionApi.getAll().forEach((item) => {
        (item.data.tags || []).forEach((tag) => tagSet.add(tag));
    });

    return filterTagList([...tagSet]);
};

const getRecentChangesByDate = () => {
    const settings = {
        repo: __dirname,
        number: 35,
        fields: [
            "hash",
            "abbrevHash",
            "subject",
            "authorName",
            "authorDate",
            "committerDate",
            "committerDateRel",
        ],
    };
    const recentChanges = gitlog(settings);

    const grouped = new Map();

    for (const change of recentChanges) {
        let { subject, authorDate } = change;
        if (
            /^(fix|feat|docs|style|refactor|perf|test|chore|content)\b/i.test(
                subject
            )
        ) {
            subject = subject.replace(/[<>]/g, "");
            authorDate = DateTime.fromISO(
                new Date(authorDate).toISOString()
            ).toFormat("LLL dd yyyy");
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

const getSeries = (collectionApi) => {
    const posts = [...collectionApi.getFilteredByGlob("./src/content/posts/**/*.md")].reverse()
    const mapping = new Map();

    for (const post of posts) {
        const { series, seriesDescription, date } = post.data;

        if (series === undefined) {
            continue;
        }

        if (!mapping.has(series)) {
            mapping.set(series, {
                posts: [],
                description: seriesDescription,
                date,
            });
        }

        const existing = mapping.get(series);

        existing.posts.push(post.url);
        existing.date = date;
    }

    const normalized = [];

    for (const [k, { posts, description, date }] of mapping.entries()) {
        if (posts.length > 1) {
            normalized.push({ title: k, posts, description, date });
        }
    }

    return normalized;
};

module.exports = {
    getPosts,
    getBlogPosts,
    getMicroPosts,
    getCustomCollections,
    getAllTags,
    getRecentChangesByDate,
};

function filterTagList(tags) {
    return (tags || []).filter((tag) => ["all"].indexOf(tag) === -1);
}

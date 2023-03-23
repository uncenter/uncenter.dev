const Chalk = require("chalk")
const fetch = require('node-fetch');
const isDevelopment = process.env.NODE_ENV === 'development';

function excludeDraft(data) {
	return !isDevelopment && data.draft;
}

async function getUmamiToken() {
    const url = `https://analytics.uncenter.org/api/auth/login`;

    const data = {
        username: process.env.UMAMI_USERNAME,
        password: process.env.UMAMI_PASSWORD,
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    fetch(url, options)
        .then((res) => res.json())
        .then((json) => {
            return json.token;
        });
}

async function getPageViews (originalUrl) {
    if (process.env.NODE_ENV !== 'production') {
        // console.log(`${Chalk.cyan('[data]')} Returning mock views for ${Chalk.blue(originalUrl)}`);
        return Math.floor(Math.random() * 100);
    }

    console.log(`${Chalk.cyan('[data]')} Fetching views for ${Chalk.blue(originalUrl)}`);

    const url = `https://analytics.uncenter.org/api/websites/dea82084-7eb8-4337-b02c-23f6ace1afc1/pageviews?url=${originalUrl}`;

    const res = await EleventyFetch(url, {
        fetchOptions: {
            headers: { Authorization: `Bearer ${process.env.UMAMI_TOKEN}` },
        },
        duration: '1d',
        type: 'json',
    });
    console.log(res);
    return res.results.pageviews.value;
};

module.exports = {
    eleventyComputed: {
        eleventyExcludeFromCollections: (data) => {
            if (excludeDraft(data)) {
                return true;
            } else {
                return data.eleventyExcludeFromCollections;
            }
        },
        views: async (data) => {
            return await getPageViews(data.url);
        }
    },
};
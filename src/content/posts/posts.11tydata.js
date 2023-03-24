const Chalk = require("chalk")
const fetch = require('node-fetch');
const spawn = require("cross-spawn");
const { DateTime } = require("luxon");

const isDevelopment = process.env.NODE_ENV === 'development';
require('dotenv').config()

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

async function getPageViews(originalUrl, originalDate) {

    const url = `https://analytics.uncenter.org/api/websites/dea82084-7eb8-4337-b02c-23f6ace1afc1/pageviews?url=${originalUrl}&start_at=${Date.parse(originalDate)}&end_at=${Date.now()}&unit=day&tz=America/New_York`;

    const options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${process.env.UMAMI_TOKEN}`,
        },
    };

    const res = await fetch(url, options)
    const json = await res.json();
    return json;
};

// https://github.com/11ty/eleventy/blob/master/src/Util/DateGitLastUpdated.js
// MIT License: https://github.com/11ty/eleventy/blob/master/LICENSE
function getGitLastUpdated(filePath) {
    return (
        parseInt(
            spawn
                .sync(
                    "git",
                    ["log", "-1", "--format=%at", filePath]
                )
                .stdout.toString("utf-8")
        ) * 1000
    );
}


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
            if (excludeDraft(data)) {
                console.log(Chalk.red(`Excluding draft: `) + Chalk.dim(data.title));
                return "N/A";
            }
            if (data.eleventyExcludeFromCollections) {
                // console.log(Chalk.red(`Excluding excluded page: `) + Chalk.dim(data.title));
                return;
            }
            if (process.env.NODE_ENV !== 'production') {
                // console.log(Chalk.blue(`Randomizing views for: `) + Chalk.dim(data.title));
                return Math.floor(Math.random() * 100);
            }
            if (data.page.url === undefined) {
                console.log(Chalk.red(`No URL for: `) + Chalk.dim(data.title));
                return 0;
            }
            const originalUrl = data.page.url;
            const originalDate = data.page.date;
            const res = await getPageViews(originalUrl, originalDate);
            views = 0;
            for (let i = 0; i < res.pageviews.length; i++) {
                views += res.pageviews[i].y;
            }
            return views;
        },
        updated: (data) => {
            let timestamp = getGitLastUpdated(data.page.inputPath);
            if (timestamp) {
                timestamp = new Date(timestamp);
                return DateTime.fromObject(DateTime.fromJSDate(timestamp).toObject(), { zone: 'utc' }).toISO();
            }
            return false;
        },
        published: (data) => {
            return DateTime.fromJSDate(data.date).setZone('utc').toISO()
        },
    },
};
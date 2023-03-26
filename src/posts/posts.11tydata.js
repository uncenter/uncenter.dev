const Chalk = require("chalk")
const fetch = require('node-fetch');
const spawn = require("cross-spawn");
const { DateTime } = require("luxon");

const logOutput = require("../_11ty/utils/logOutput.js");
const isDevelopment = process.env.NODE_ENV === 'development';
require('dotenv').config();

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
            if (!isDevelopment && data.draft) {
                return true;
            } else {
                return data.eleventyExcludeFromCollections;
            }
        },
        views: async (data) => {
            if (!data.page.url || data.views === false) {
                return;
            }
            if ((!isDevelopment && data.draft) || data.eleventyExcludeFromCollections) {
                logOutput({ prefix: 'data:views', action: 'skipping views for', file: data.page.url });
                return;
            }
            if (process.env.NODE_ENV !== 'production') {
                logOutput({ prefix: 'data:views', action: 'randomizing views for', file: data.page.url });
                return Math.floor(Math.random() * 100);
            }
            const originalUrl = data.page.url;
            const originalDate = data.page.date;
            const res = await getPageViews(originalUrl, originalDate);
            views = 0;
            for (let i = 0; i < res.pageviews.length; i++) {
                views += res.pageviews[i].y;
            }
            logOutput({ prefix: 'data:views', action: 'fetching views for', file: data.page.url, extra: { content: `${views} views`, size: false } });
            return views;
        },
        updated: (data) => {
            let timestamp = getGitLastUpdated(data.page.inputPath);
            if (timestamp) {
                timestamp = new Date(timestamp)
                if (timestamp.getTimezoneOffset() === 0) {
                    corrected = DateTime.fromJSDate(timestamp).setZone('America/New_York').setZone('utc', { keepLocalTime: true }).toISO();
                } else {
                    corrected = DateTime.fromJSDate(timestamp).setZone('utc', { keepLocalTime: true }).toISO();
                }
                // console.log(Chalk.blue(`[UPDATED] Raw: `) + `${timestamp} | ` + Chalk.blue(`Computed: `) + `${corrected}`);
                return corrected;
            }
            return false;
        },
        published: (data) => {
            // console.log(Chalk.blue(`[PUBLISHED] Raw: `) + `${data.date} | ` + Chalk.blue(`Computed: `) + `${DateTime.fromJSDate(data.date).setZone('utc').toISO()}`);
            return DateTime.fromJSDate(data.date).setZone('utc').toISO()
        },
        description(data) {
            if (data.description) {
                return data.description;
            }
            return "";
        },
    },
};
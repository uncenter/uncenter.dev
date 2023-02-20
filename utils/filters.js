const fs = require("fs");
const striptags = require("striptags");
const { DateTime } = require("luxon");
const markdownIt = require("markdown-it");
const markdownItEmoji = require("markdown-it-emoji");

module.exports = {
    shortenedJSDate: (dateObj) => {
        return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
    },

    shortenedISODate: (dateObj) => {
        return DateTime.fromISO(formatDateISO(dateObj)).toFormat("LLL dd yyyy");
    },

    dropContentFolder: (path, folder) => {
        return path.replace(new RegExp(folder + "/"), "");
    },

    caseUpper: (str) => {
        return str.toUpperCase();
    },

    caseLower: (str) => {
        return str.toLowerCase();
    },

    toArray: (value) => {
        if (Array.isArray(value)) {
            return value;
        }
        return [value];
    },

    getCommitCategory: (str) => {
        return str.split(":")[0];
    },

    getCommitMessage: (str) => {
        if (str.split(":").length > 2) {
            let emoji = "";
            for (let i = 2; i < str.split(":").length; i++) {
                emoji += ":" + str.split(":")[i];
            }
            const md = new markdownIt({
                html: true,
            }).use(markdownItEmoji);
            return md.renderInline(emoji.trim());
        }
        return str.split(":")[1];
    },

    // Example: {{ '/icons/example.svg' | printFileContents }}
    // Taken from https://bnijenhuis.nl/notes/load-file-contents-in-eleventy/
    printFileContents: (filePath) => {
        const relativeFilePath = `.` + filePath;
        const fileContents = fs.readFileSync(relativeFilePath, (err, data) => {
            if (err) throw err;
            return data;
        });
        return fileContents.toString("utf8");
    },

    grabInnerSVG: (html) => {
        return striptags(html, ["path", "g", "defs", "title"]);
    },

    // Adapted from https://github.com/johanbrook/eleventy-plugin-reading-time
    readingTime: (content, { useSeconds = false, format = true, speed = 235, preText = "", postText = "min" } = {}) => {
        const htmlContent = typeof content === "string" ? content : content.content; // If content is a raw already, use it directly. If it's a page object, use the content.

        if (!htmlContent) {
            return combineText(preText, "0", postText);
        }

        content = striptags(content)
        const matches = content.match(/[\u0400-\u04FF]+|\S+\s*/g);
        const count = matches !== null ? matches.length : 0;

        let est = "";

        if (useSeconds === true) {
            const min = Math.floor(count / speed);
            const sec = Math.floor((count % speed) / (speed / 60));

            if (format === true) {
                const mins = min + " minute" + (min === 1 ? "" : "s") + ", ";
                const secs = sec + " second" + (sec === 1 ? "" : "s");
                est = min > 0 ? mins + secs : secs;
            } else {
                est = min * 60 + sec;
            }
        } else {
            const min = Math.ceil(count / speed);

            if (format === true) {
                est = combineText(preText, min, postText);
            } else {
                est = min;
            }
        }
        return est;
    },

    wordCount: (content, { preText = "", postText = "words" } = {}) => {
        const htmlContent = typeof content === "string" ? content : content.content; // If content is a raw already, use it directly. If it's a page object, use the content.

        if (!htmlContent) {
            return combineText(preText, "0", postText);
        }

        content = striptags(content)
        const matches = content.match(/[\u0400-\u04FF]+|\S+\s*/g);
        const count = matches !== null ? matches.length : 0;


        return combineText(preText, count, postText);
    },

    renderMarkdown: (content) => {
        const md = new markdownIt({
            html: true,
        }).use(markdownItEmoji);
        return md.render(content);
    }
};

function formatDateISO(dateString) {
    return new Date(dateString).toISOString();
}

function combineText(pre, value, post) {
    if (pre !== "" && postText !== "") {
        return pre + " " + value + " " + post;
    }
    else if (post !== "") {
        return value + " " + post;
    }
    else if (pre !== "") {
        return pre + " " + value;
    }
    else {
        return value;
    }
}
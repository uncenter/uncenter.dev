const { DateTime } = require("luxon");
const markdownIt = require("markdown-it");
const markdownItEmoji = require("markdown-it-emoji");

module.exports = {
    shortenedJSDate: (dateObj) => {
        return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
    },

    shortenedISODate: (dateObj) => {
        return DateTime.fromISO(formatDateISO(dateObj)).toFormat('LLL dd yyyy');
    },

    dropContentFolder: (path, folder) => {
        return path.replace(new RegExp(folder + "\/"), "");
    },

    caseUpper: (str) => {
        return str.toUpperCase();
    },

    caseLower: (str) => {
        return str.toLowerCase();
    },
    
    toArray: (value) =>{
        if (Array.isArray(value)) {
            return value;
        }
        return [value];
    },
    splitColonFirst: (str) => {
        return str.split(":")[0]
    },
    splitColonSecond: (str) => {
        if (str.split(":").length > 2) {
            let emoji = ''
            for (let i = 2; i < str.split(":").length; i++) {
                emoji += ":" + str.split(":")[i]
            }
            const md = new markdownIt({
                html: true
            }).use(markdownItEmoji);
            return md.renderInline(emoji.trim())
        }
        return str.split(":")[1]
    },
    charLength: (str) => {
        return str.length + 'ch'
    }
};

function formatDateISO(dateString) {
    return new Date(dateString).toISOString()

}
const { DateTime } = require("luxon");

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
};

function formatDateISO(dateString) {
    return new Date(dateString).toISOString()

}
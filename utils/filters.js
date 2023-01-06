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
    }
};

function formatDateISO(dateString) {
    return new Date(dateString).toISOString()

}
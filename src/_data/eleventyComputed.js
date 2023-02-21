const meta = require("../_data/meta.json");

module.exports = {
    title(data) {
        if (data.title) return data.title; // If 'title' is defined in the front matter, use it.
        return toTitleCase(data.page.fileSlug.replace("-", " ")); // Otherwise, use the file name.
    },
    description(data) {
        return data.description || meta.description;
    }
};

function toTitleCase(str) {
    str = str.toLowerCase().split(" ");
    for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(" ");
}
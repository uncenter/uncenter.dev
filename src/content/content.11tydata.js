const meta = require("../_data/meta.json");

module.exports = {
    eleventyComputed: {
        description: (data) => {
            if (data.description) {
                return data.description;
            }
            return meta.description;
        }
    }
};
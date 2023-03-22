const isDevelopment = process.env.NODE_ENV === 'development';

function excludeDraft(data) {
	return !isDevelopment && data.draft;
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
    },
};
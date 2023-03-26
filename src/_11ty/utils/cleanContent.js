const { convert } = require('html-to-text');

module.exports = (content) => {
    return convert(content, {
        selectors: [
            { selector: 'pre.shiki', format: 'skip' },
            { selector: 'a.anchor', format: 'skip' },
            { selector: 'picture', format: 'skip' },
            { selector: 'a', options: { ignoreHref: true } },
            { selector: 'section.footnotes', format: 'skip' },
        ],
        wordwrap: false,
    });
};
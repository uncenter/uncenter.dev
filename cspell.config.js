module.exports = {
    version: '0.2',
    language: 'en',
    words: [
        // Eleventy
        '11ty',
        'eleventy',
        'jamstack',
        'shortcode',
        'shortcodes',
        'pagination',
        'frontmatter',
        'webc',

        // Brands
        'Webmentions',
        'Webmention',
        'Giscus',
        'Pagefind',
        'Lucide',
        'Eleventy',
        'Netlify',
        '11ty',
        'Devicons',

        // Misc
        'dotfiles',
        'callout',
        'endcallout',
    ],
    flagWords: [],
    dictionaries: ["eleventy", "repos", "py", "njk", "brands"],
    dictionaryDefinitions: [
        { "name": "repos", "path": "./utils/plugins/cspell/dicts/repos.txt" },
        { "name": "njk", "path": "./utils/plugins/cspell/dicts/njk.txt" },
    ],
    ignoreRegExpList: ["nunjucksExpression", "importStatement", "markdownCodeBlock", "markdownInlineCode"],
    patterns: [
        {
            name: "nunjucksExpression",
            pattern: /\\{\\{.*?\\}\\}/gi
        },
        {
            name: "importStatement",
            pattern: /import.*?;/gi
        },
        {
            name: "markdownCodeBlock",
            pattern: /`{3}[\s\S]*?`{3}(?=\n|$)/gi
        },
        {
            name: "markdownInlineCode",
            pattern: /`[^`]*`/gi
        }
    ],
};
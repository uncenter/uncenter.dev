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
		'janky',
	],
	flagWords: [],
	dictionaries: ['repos'],
	dictionaryDefinitions: [{ name: 'repos', path: './utils/dicts/repos.txt' }],
	ignoreRegExpList: [
		'nunjucksExpression',
		'markdownCodeBlock',
		'markdownInlineCode',
	],
	patterns: [
		{
			name: 'nunjucksExpression',
			pattern: /{%.*?%}/gis,
		},
		{
			name: 'markdownCodeBlock',
			pattern: /`{3}[\s\S]*?`{3}(?=\n|$)/gi,
		},
		{
			name: 'markdownInlineCode',
			pattern: /`[^`]*`/gi,
		},
	],
};

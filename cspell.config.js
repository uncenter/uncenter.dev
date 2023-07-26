module.exports = {
	version: '0.2',
	language: 'en',
	words: [
		// Eleventy
		'11ty',
		'shortcode',
		'shortcodes',
		'pagination',
		'webc',

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
		'properNouns',
	],
	patterns: [
		{
			name: 'nunjucksExpression',
			pattern: /{%.*?%}/gis,
		},
		{
			name: 'markdownCodeBlock',
			pattern: /`{3}[\S\s]*?`{3}(?=\n|$)/gi,
		},
		{
			name: 'markdownInlineCode',
			pattern: /`[^`]*`/gi,
		},
		{
			name: 'properNouns',
			pattern: /(?<=\s|^|[^\s\w])[A-Z][a-z]+(?=\s|$|[^\s\w])/g,
		},
	],
};

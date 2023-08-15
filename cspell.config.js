module.exports = {
	version: '0.2',
	language: 'en',
	words: ['uncenter', 'eleventy', '11ty', 'umami', 'shortcodes', 'keycaps'],
	flagWords: [],
	dictionaries: [],
	dictionaryDefinitions: [],
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
			pattern: /(?<=\s|^|[^\s\w])[A-Z][A-zÀ-ú]+(?=\s|$|[^\s\w])/g,
		},
	],
};

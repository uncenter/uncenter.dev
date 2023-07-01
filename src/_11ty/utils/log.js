const {
	red,
	yellow,
	green,
	blue,
	cyan,
	magenta,
	bold,
} = require('kleur/colors');

function assemble(parts) {
	parts.category = parts.category ? `[${[parts.category]}]` : '';
	return `[11ty]${parts.category} ${parts.content}`;
}

module.exports = {
	output: ({ category, file = '', extra = '' }) => {
		const categories = {
			styles: blue,
			scripts: yellow,
			images: green,
			gitRev: magenta,
			views: cyan,
		};
		category = categories[category] ? categories[category](category) : category;
		console.log(
			assemble({
				category,
				content: `${bold(file)} ${extra ? `(${extra})` : ''}`,
			}),
		);
	},
	error: ({ category, message = '', extra = '' }) => {
		console.log(
			red(
				assemble({
					category,
					content: `${bold(message)} ${extra ? `(${extra})` : ''}`,
				}),
			),
		);
		process.exit(1);
	},
};

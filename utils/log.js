const {
	yellow,
	green,
	blue,
	cyan,
	magenta,
	bold,
	gray,
} = require('kleur/colors');

function assemble(parts) {
	parts.category = parts.category ? `[${[parts.category]}]` : '';
	return `[11ty]${parts.category} ${parts.content}`;
}

module.exports = ({ category, message = '', extra = '' }) => {
	const categories = {
		styles: blue,
		scripts: yellow,
		images: green,
		gitRev: magenta,
		views: cyan,
		env: magenta,
	};
	category = categories[category]
		? categories[category](category)
		: gray(category);
	console.log(
		assemble({
			category,
			content: `${bold(message)} ${extra ? `(${extra})` : ''}`,
		}),
	);
};

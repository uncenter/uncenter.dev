const {
	red,
	yellow,
	green,
	blue,
	cyan,
	magenta,
	gray,
	bold,
} = require('kleur/colors');

const types = {
	styles: blue,
	scripts: yellow,
	images: red,
	gitRev: green,
	views: cyan,
};

module.exports = ({ type, file = '', extra = '' }) => {
	const coloredType = types[type] ? types[type](type) : type;
	console.log(
		`${`[11ty][${coloredType}]`} ${bold(file)} ${extra ? `(${extra})` : ''}`,
	);
};

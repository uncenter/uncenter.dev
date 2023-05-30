const { red, yellow, green, blue, cyan, bold } = require('kleur/colors');

const types = {
	styles: blue,
	scripts: yellow,
	images: green,
	gitRev: red,
	views: cyan,
};

module.exports = ({ type, file = '', extra = '' }) => {
	const colorfulType = types[type] ? types[type](type) : type;
	console.log(
		`${`[11ty][${colorfulType}]`} ${bold(file)} ${extra ? `(${extra})` : ''}`,
	);
};

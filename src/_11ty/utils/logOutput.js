const Chalk = require('chalk');

const types = {
	styles: Chalk.hex('#FF00FF'),
	scripts: Chalk.yellow,
	images: Chalk.hex('#2A488D'),
	gitRev: Chalk.hex('#64B5F7'),
	views: Chalk.hex('#009688'),
	icons: Chalk.yellow,
	lighthouse: Chalk.hex('#FFA500'),
};

module.exports = ({ type, file = '', extra = '' }) => {
	const coloredType = types[type] ? types[type](type) : type;
	console.log(
		`${`[11ty][${coloredType}]`} ${Chalk.bold(file)} ${
			extra ? `(${extra})` : ''
		}`,
	);
};

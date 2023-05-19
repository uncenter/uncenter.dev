const Chalk = require('chalk');

const types = {
	styles: Chalk.hex('#FF00FF'),
	scripts: Chalk.yellow,
	images: Chalk.blue,
	views: Chalk.hex('#800080'),
	icons: Chalk.yellow,
	lighthouse: Chalk.hex('#FFA500'),
};

const categories = {
	assets: Chalk.green,
	data: Chalk.cyan,
};

module.exports = ({ prefix, file = '', extra = '' }) => {
	let [category = '', type = ''] = prefix.split(':');
	const categoryColor = categories[category];
	const typeColor = types[type];

	if (typeColor === undefined) {
		prefix = `[11ty][${categoryColor(category)}${
			type ? ':' + Chalk.dim(type) : ''
		}]`;
	} else {
		prefix = `[11ty][${categoryColor(category)}:${typeColor(type)}]`;
	}

	console.log(`${prefix} ${Chalk.bold(file)} ${extra ? `(${extra})` : ''}`);
};

const Chalk = require('chalk');

module.exports = (options) => {
	let { prefix, file } = options;
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
	if (prefix === undefined) {
		return;
	}
	let temp = prefix.split(':');
	if (temp.length === 1) {
		prefix = `[11ty][${temp}]`;
	}
	let [category, type] = temp;
	const categoryColor = categories[category];
	const typeColor = types[type];
	if (typeColor === undefined) {
		prefix = `[11ty][${categoryColor(category)}:${Chalk.dim(type)}]`;
	} else {
		prefix = `[11ty][${categoryColor(category)}:${typeColor(type)}]`;
	}
	console.log(
		`${prefix} ${Chalk.bold(file)} ${options.extra ? options.extra : ''}`,
	);
};

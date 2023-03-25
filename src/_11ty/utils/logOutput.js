const Chalk = require('chalk');
const logSize = require('./logSize');

module.exports = (options) => {
    let { prefix, action, file, extra } = options;
    const types = {
        styles: Chalk.magenta,
        scripts: Chalk.yellow,
        images: Chalk.blue,
    };
    const categories = {
        assets: Chalk.green,
        data: Chalk.cyan,
    };
    // TYPE: [11ty][category:type]
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
    // ACTION: <action>
    action = action.charAt(0).toUpperCase() + action.slice(1);

    if (!extra) {
        console.log(`${prefix} ${action} ${Chalk.bold(file)}`);
        return;
    } else {
        const { content, size } = extra;
        if (content === undefined) {
            console.log(`${prefix} ${action} ${Chalk.bold(file)}`);
            console.log(`\t${Chalk.red('WARNING:')} No content provided.`);
            console.log(`\t${Chalk.yellow('To fix, add a `content` property to the `extra` object or remove the `extra` object.')}`);
            return;
        }
        if (size === undefined) {
            console.log(`${prefix} ${action} ${Chalk.bold(file)}`);
            console.log(`\t${Chalk.red('WARNING:')} No size provided.`);
            console.log(`\t${Chalk.yellow('To fix, add a `size` property (boolean) to the `extra` object or remove the `extra` object.')}`);
            return;
        }
        if (!size) {
            console.log(`${prefix} ${action} ${Chalk.bold(file)} (${content})`);
            return;
        }
        const kb = parseFloat(content).toFixed(2);
        let sizeStr = `(${logSize(kb)})`;
        console.log(`${prefix} ${action} ${Chalk.bold(file)} ${sizeStr}`);
        return;
    }
};
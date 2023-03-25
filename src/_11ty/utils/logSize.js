const Chalk = require('chalk');

module.exports = (length, name) => {
    const kb = length / 1000;
    let sizeStr = `(${kb.toFixed(2)}KB)`;

    if (kb < 25) {
        sizeStr = Chalk.green(sizeStr);
    } else if (kb >= 25 && kb < 50) {
        sizeStr = Chalk.yellow(sizeStr);
    } else {
        sizeStr = Chalk.red(sizeStr);
    }

    console.log(`${Chalk.magenta('[assets]')} Creating ${bold(name)} ${sizeStr}`);
};
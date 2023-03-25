const Chalk = require('chalk');

module.exports =  (kb) => {
    if (kb < 1) {
        kb = (kb * 1000).toFixed(2);
        sizeStr = Chalk.green(`${kb}B`);
    } else if (kb >= 1000) {
        kb = (kb / 1000).toFixed(2);
        sizeStr = Chalk.red(`${kb}MB`)
    } else {
        if (kb < 25) {
            sizeStr = Chalk.green(`${kb}KB`);
        } else if (kb >= 25 && kb < 200) {
            sizeStr = Chalk.yellow(`${kb}KB`);
        } else {
            sizeStr = Chalk.red(`${kb}KB`);
        }
    }
    return sizeStr;
}
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const lodash = require('lodash');
const luxon = require('luxon');
const inquirer = require('inquirer');
const Chalk = require('chalk');

function fileExists(filePath) {
    const existingFiles = fs.readdirSync(path.join(__dirname, '../../src/content/posts'));
    for (let i = 0; i < existingFiles.length; i++) {
        if (filePath === existingFiles[i]) {
            return true;
        }
    }
    return false;
}


// from blakeembrey/change-case
// https://github.com/blakeembrey/change-case/blob/master/packages/title-case/src/index.ts
// license: MIT
function titleCase(input) {
    const SMALL_WORDS = /\b(?:an?d?|a[st]|because|but|by|en|for|i[fn]|neither|nor|o[fnr]|only|over|per|so|some|tha[tn]|the|to|up|upon|vs?\.?|versus|via|when|with|without|yet)\b/i;
    const TOKENS = /[^\s:–—-]+|./g;
    const WHITESPACE = /\s/;
    const IS_MANUAL_CASE = /.(?=[A-Z]|\..)/;
    const ALPHANUMERIC_PATTERN = /[A-Za-z0-9\u00C0-\u00FF]/;
    var result = "";
    var m;
    while ((m = TOKENS.exec(input)) !== null) {
        var token = m[0], index = m.index;
        if (!IS_MANUAL_CASE.test(token) &&
            (!SMALL_WORDS.test(token) ||
                index === 0 ||
                index + token.length === input.length) &&
            (input.charAt(index + token.length) !== ":" ||
                WHITESPACE.test(input.charAt(index + token.length + 1)))) {
            result += token.replace(ALPHANUMERIC_PATTERN, function (m) {
                return m.toUpperCase();
            });
            continue;
        }
        result += token;
    }
    return result;
}

async function run() {
    let title = process.argv.slice(2).join(' ');
    if (title === undefined || title.trim() === '') {
        const answer = await inquirer.prompt({
            type: 'input',
            name: 'title',
            message: 'Enter a title for the post:',
            validate: function (value) {
                if (value.trim() === '') {
                    return 'Please provide a title.';
                }
                let filename = lodash.kebabCase(value) + '.md';
                if (fileExists(filename)) {
                    return Chalk.red(`File already exists: `) + Chalk.underline(filename);
                }
                return true;
            }
        });
        title = titleCase(answer.title);
    } else {
        title = titleCase(title);
    }
    date = luxon.DateTime.local().toFormat('yyyy-MM-dd'); // 2023-03-05

    tags = [];
    keywords = [
        { '11ty': 'Eleventy' }, // <<< = value (alternate name, not a tag)
        //    ^^^^ = key (tag)
        'JavaScript',
        'Umami',
        'Python',
        'Tailwind'
    ];
    for (let word of title.split(' ')) {
        word = word.toLowerCase();
        for (let keyword of keywords) {
            if (typeof keyword === 'string') {
                if (word === keyword.toLowerCase()) {
                    tags.push(keyword);
                }
            } else {
                for (let [key, value] of Object.entries(keyword)) {
                    if (word === key.toLowerCase() || word === value.toLowerCase()) {
                        tags.push(key);
                    }
                }
            }
        }
    }
    tagString = "";
    for (let tag of tags) {
        tagString += `'${tag}', `;
    }
    tagString = tagString.slice(0, -2);

    const filename = `${lodash.kebabCase(title)}.md`;
    const filepath = path.join(__dirname, '../../src/content/posts', filename);

    content = `---
    tags: [${tagString}]
    title: ${title}
    date: ${date}
    description:
    draft: true
    # cspell:ignore 
    ---
    
    `;

    fs.writeFileSync(filepath, content);
    console.log(Chalk.green(`✔ Success!`) + ` Created ${Chalk.underline(filename)} (${Chalk.underline(filepath)})`);
}

run();
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const lodash = require('lodash');
const luxon = require('luxon');
const Chalk = require('chalk');

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

let title = process.argv.slice(2).join(' ');
if (title === undefined || title.trim() === '') {
    console.log(Chalk.red('Please provide a title for the post.'));
    process.exit(1);
} else {
    title = titleCase(title);
}
date = luxon.DateTime.local().toFormat('yyyy-MM-dd'); // 2023-03-05

content = `---
tags: []
title: ${title}
date: ${date}
description: ...
# cspell:ignore ...
---

Voluptate cupidatat ut consequat sunt sint consequat eu duis deserunt velit deserunt culpa ea.
`;

const filename = `${lodash.kebabCase(title)}.md`;
const filepath = path.join(__dirname, '../../src/content/posts', filename);
const existingFiles = fs.readdirSync(path.join(__dirname, '../../src/content/posts'));
for (let i = 0; i < existingFiles.length; i++) {
    if (filename === existingFiles[i]) {
        console.log(Chalk.red(`File already exists: ${Chalk.dim(filename)}`));
        process.exit(1);
    }
}
fs.writeFileSync(filepath, content);
console.log(Chalk.green(`Created file: ${Chalk.dim(filename)}`));
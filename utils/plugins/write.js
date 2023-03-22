#!/usr/bin/env node

const luxon = require('luxon');
const fs = require('fs');
const path = require('path');
const lodash = require('lodash');
const Chalk = require('chalk');

const utils = require('./utils.js');

let title = process.argv.slice(2).join(' ');
if (title === undefined || title.trim() === '') {
    console.log(Chalk.red('Please provide a title for the post.'));
    process.exit(1);
} else {
    title = utils.titleCase(title);
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
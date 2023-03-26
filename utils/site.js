#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const lodash = require('lodash');
const luxon = require('luxon');
const outdent = require('outdent');

const inquirer = require('inquirer');
const Chalk = require('chalk');

const POSTS_DIR = path.join(__dirname, '../src/posts');
const ASSETS_IMG_DIR = path.join(__dirname, '../src/_assets/images/content');

const IGNORE_FILES = [
    'posts.11tydata.js',
    'posts.json',
    'index.md',
];

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

function getPostTitle(filepath) {
    const content = fs.readFileSync(filepath, 'utf8');
    const title = content.match(/(?<=^title: ).*$/m);
    return title[0];
}

function getExistingPosts() {
    const existingFiles = fs.readdirSync(POSTS_DIR).filter(file => !IGNORE_FILES.includes(file));
    let existingPosts = [];
    for (file of existingFiles) {
        if (fs.statSync(path.join(POSTS_DIR, file)).isDirectory()) {
            let subFiles = fs.readdirSync(path.join(POSTS_DIR, file));
            for (subFile of subFiles) {
                if (subFile === 'index.md') {
                    existingPosts.push({ title:getPostTitle(path.join(POSTS_DIR, file, subFile)), path: path.join(POSTS_DIR, file, subFile) });
                }
            }
        } else {
            existingPosts.push({ title:getPostTitle(path.join(POSTS_DIR, file)), path: path.join(POSTS_DIR, file) });
        }
    }
    return existingPosts;
}

async function newPost() {
    title = await inquirer.prompt({
        type: 'input',
        name: 'answer',
        message: 'Enter a title for the post:',
        validate: function (value) {
            if (value.trim() === '') {
                return 'Please provide a title.';
            }
            let temp = lodash.kebabCase(value);
            if (fs.existsSync(path.join(POSTS_DIR, temp + '.md'))) {
                return Chalk.red(`File already exists: `) + Chalk.underline(temp + '.md');
            } else if (fs.existsSync(path.join(POSTS_DIR, temp, 'index.md'))) {
                return Chalk.red(`File already exists: `) + Chalk.underline(path.join(temp, 'index.md'));
            }
            return true;
        }
    });
    title = titleCase(title.answer);
    assets = await inquirer.prompt({
        type: 'confirm',
        name: 'answer',
        message: 'Create new post in directory (assets)?',
        default: false,
    });
    assets = assets.answer;
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

    content = outdent`---
    tags: [${tagString}]
    title: ${title}
    date: ${date}
    description:
    draft: true
    # cspell:ignore 
    ---\n`;

    if (assets) {
        const dirname = lodash.kebabCase(title);
        const dirpath = path.join(POSTS_DIR, dirname);
        fs.mkdirSync(dirpath);
        fs.writeFileSync(path.join(dirpath, 'index.md'), content);
        console.log(Chalk.green(`✔ Success!`) + ` Created ${Chalk.underline(path.join(dirname, 'index.md'))} (${Chalk.underline(dirpath)})`);
        return;
    }
    const filename = lodash.kebabCase(title) + '.md';
    const filepath = path.join(POSTS_DIR, filename);
    fs.writeFileSync(filepath, content);
    console.log(Chalk.green(`✔ Success!`) + ` Created ${Chalk.bold(filename)} (${Chalk.underline(filepath)})`);
}

async function renamePost() {
    const existingFiles = getExistingPosts();
    const file = await inquirer.prompt({
        type: 'list',
        name: 'answer',
        message: 'Which post would you like to rename?',
        choices: Object.values(existingFiles).map(post => post.title),
    });
    let oldPath = existingFiles.find(post => post.title === file.answer).path;
    const oldContent = fs.readFileSync(oldPath, 'utf8');
    const oldTitle = oldContent.match(/title: (.*)/)[1];
    const newTitle = await inquirer.prompt({
        type: 'input',
        name: 'answer',
        message: 'Enter a new title for the post:',
        validate: function (value) {
            if (value.trim() === '') {
                return 'Please provide a title.';
            }
            if (value === oldTitle) {
                return 'Please provide a new title.';
            }
            let temp = lodash.kebabCase(value);
            if (fs.existsSync(path.join(POSTS_DIR, temp + '.md'))) {
                return Chalk.red(`File already exists: `) + Chalk.underline(temp + '.md');
            } else if (fs.existsSync(path.join(POSTS_DIR, temp, 'index.md'))) {
                return Chalk.red(`File already exists: `) + Chalk.underline(path.join(temp, 'index.md'));
            }
            return true;
        }
    });
    if (oldPath.includes('index.md')) {
        oldPath = path.dirname(oldPath);
        console.log(oldPath);
    }
    let newPath;
    if (oldPath.endsWith('.md')) {
        newPath = path.join(POSTS_DIR, lodash.kebabCase(newTitle.answer) + '.md');
        newContentPath = path.join(POSTS_DIR, lodash.kebabCase(newTitle.answer) + '.md');
    } else {
        newPath = path.join(POSTS_DIR, lodash.kebabCase(newTitle.answer));
        newContentPath = path.join(POSTS_DIR, lodash.kebabCase(newTitle.answer), 'index.md');
    }
    fs.renameSync(oldPath, newPath);
    fs.writeFileSync(newContentPath, oldContent.replace(oldTitle, titleCase(newTitle.answer)));
    console.log(Chalk.green(`✔ Success!`) + ` Renamed ${Chalk.bold(file.answer)} to ${Chalk.bold(titleCase(newTitle.answer))} (${Chalk.underline(newPath)})`);
    return;
    }

async function deletePost() {
    const existingFiles = getExistingPosts();
    console.log(Chalk.red(`⚠ Warning: This will delete the post and all of its assets.`));
    const file = await inquirer.prompt({
        type: 'list',
        name: 'answer',
        message: 'Which post would you like to delete?',
        choices: Object.values(existingFiles).map(post => post.title),
    });
    let filepath = existingFiles.find(post => post.title === file.answer).path;
    const confirmation = await inquirer.prompt({
        type: 'confirm',
        name: 'answer',
        message: `Are you sure you want to delete "${Chalk.bold(file.answer)}"?`,
        default: false,
    });
    if (!confirmation.answer) {
        console.log(Chalk.yellow(`✖ Aborted.`));
        return;
    }
    if (filepath.includes('index.md')) {
        const EXISTING_ASSETS = fs.readdirSync(filepath.replace('index.md', '')).filter(file => file !== 'index.md');
        if (EXISTING_ASSETS.length > 0) {
            const keepAssets = await inquirer.prompt({
                type: 'confirm',
                name: 'answer',
                message: `Keep assets? (${EXISTING_ASSETS.join(', ')})`,
                default: true,
            });
            if (keepAssets.answer) {
                for (let asset of EXISTING_ASSETS) {
                    if (asset.includes('index.md')) {
                        continue;
                    }
                    let assetpath = path.join(filepath.replace('index.md', ''), asset);
                    if (!fs.existsSync(path.join(POSTS_DIR, asset))) {
                        fs.copyFileSync(assetpath, path.join(POSTS_DIR, asset));
                        console.log(Chalk.green(`✔ Copied `) + Chalk.underline(assetpath) + Chalk.green(` to `) + Chalk.underline(path.join(POSTS_DIR, asset)));
                    } else if (!fs.existsSync(path.join(ASSETS_IMG_DIR, asset))) {
                        fs.copyFileSync(assetpath, path.join(ASSETS_IMG_DIR, asset));
                        console.log(Chalk.green(`✔ Copied `) + Chalk.underline(filepath) + Chalk.green(` to `) + Chalk.underline(path.join(ASSETS_IMG_DIR, asset)));
                    } else {
                        console.log(Chalk.red('✖ Error: ') + Chalk.underline(asset) + Chalk.red(' already exists in ') + Chalk.underline(POSTS_DIR) + Chalk.red(' and ') + Chalk.underline(ASSETS_IMG_DIR));
                        const overwrite = await inquirer.prompt({
                            type: 'confirm',
                            name: 'answer',
                            message: `Overwrite ${Chalk.underline(asset)} (or abort)?`,
                            default: false,
                        });
                        const overwritePath = await inquirer.prompt({
                            type: 'list',
                            name: 'answer',
                            message: `Overwrite ${Chalk.underline(asset)} in which directory?`,
                            choices: [POSTS_DIR, ASSETS_IMG_DIR],
                        });
                        if (overwrite.answer) {
                            fs.copyFileSync(path.join(filepath, asset), path.join(overwritePath.answer, asset));
                            console.log(Chalk.green(`✔ Overwrote `) + Chalk.underline(path.join(overwritePath.answer, asset)));
                        } else {
                            console.log(Chalk.yellow(`✖ Aborted.`));
                            return;
                        }
                    }
                }
            }
        }
        fs.rmSync(filepath.replace('index.md', ''), { recursive: true });
    } else {
        fs.rmSync(filepath);
    }
    console.log(Chalk.green(`✔ Success!`) + ` Deleted ${Chalk.bold(file.answer)} (${Chalk.underline(filepath)})`);
}

async function run() {
    const action = await inquirer.prompt({
        type: 'list',
        name: 'answer',
        message: 'What would you like to do?',
        choices: [
            'New',
            'Rename',
            'Delete',
        ],
    });
    switch (action.answer) {
        case 'New':
            newPost();
            break;
        case 'Rename':
            renamePost();
            break;
        case 'Delete':
            deletePost();
            break;
    }
}

run();
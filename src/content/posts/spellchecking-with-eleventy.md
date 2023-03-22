---
tags: []
title: Spellchecking Posts with Eleventy
date: 2023-03-22
description: How to spellcheck your Eleventy blog posts with cSpell!
draft: true
# cspell:ignore
---

After I realized more than one other person was reading my blog, I panicked and proofread/edited all my posts. Turns out that I rely on autocorrect a little too much and I had way too many typos! I came across [an article](https://tjaddison.com/blog/2021/02/spell-checking-your-markdown-blog-posts-with-cspell/) by TJ Addison that explained how to do this with a tool called `cSpell` (the backbone of the [Code Spell Checker VSCode extension](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)). That article was super helpful and works perfectly, but I wanted to add a few things to it to improve the experience.

## Add a script to package.json

Self explanatory. I added a script to my `package.json` file to run the cSpell command:

```json
{
    // ...
    "scripts": {
        // ...
        "spell": "cspell src/content/posts/**/*.md"
    }
}
```

## The cSpell config file

The tool allows multiple filenames for its configuration but I went with `cspell.config.js` for consistency with my other config files.

The config file is a JavaScript file that exports an object with the following properties:
```js
module.exports = {
    version: '0.2', // Always 0.2
    language: 'en', // Can be either 'en' or 'en-GB' (defaults to 'en')
};
```

Next, you can define specific words to exclude/flag. I added some 11ty specific terminology and a few brand names that I have mentioned:

```js
    words: [ // Words to always be considered correct (case insensitive)
        // Eleventy
        '11ty',
        'eleventy',
        'jamstack',
        'shortcode',
        'shortcodes',
        'pagination',
        'frontmatter',
        'webc',

        // Brands
        'Eleventy',
        'Netlify',
        '11ty',
    ],
    flagWords: [], // Words to always be considered incorrect
```

In addition to the `words` property, you can also define dictionaries. There isn't a dictionary for `.njk` files by default so I scanned the docs and added a few common terms to a dictionary file. I also added a dictionary for my GitHub repos (I have a lot of repos and I don't want to add them all to the `words` property). I added the following to the config file:
```js
    dictionaries: ["repos", "njk"],
    dictionaryDefinitions: [
        { "name": "repos", "path": "./utils/plugins/cspell/dicts/repos.txt" },
        { "name": "njk", "path": "./utils/plugins/cspell/dicts/njk.txt" },
    ],
```
For the `repos` dictionary, I wrote a script to scan my GitHub repos and add them to a file:
```js
#!/usr/bin/env node

const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

function getRepos() {
    const reposFile = path.join(__dirname, '<PATH_TO_DICT_FILE>');
    const reposURL = 'https://api.github.com/users/<USERNAME>/repos';

    (async () => {
        const repos = await fetch(reposURL)
            .then(res => res.json())
            .then(json => json.map(repo => repo.name));

        fs.writeFileSync(reposFile, repos.join('\n'));
    })();
}

getRepos();
```

Finally, the config file allows you to define patterns to ignore. I added a few patterns to ignore code blocks and Nunjucks expressions:

```js
    // List the named patterns to ignor
    ignoreRegExpList: ["nunjucksExpression", "importStatement", "markdownCodeBlock", "markdownInlineCode"],
    patterns: [
        {
            name: "nunjucksExpression",
            pattern: /\\{\\{.*?\\}\\}/gi
        },
        {
            name: "importStatement",
            pattern: /import.*?;/gi
        },
        {
            name: "markdownCodeBlock",
            pattern: /`{3}[\s\S]*?`{3}(?=\n|$)/gi
        },
        {
            name: "markdownInlineCode",
            pattern: /`[^`]*`/gi
        }
    ],
};
```

I'm surprised that there isn't a pattern for Markdown code blocks by default; I was having issues with common libraries and methods being flagged as typos.

## The cSpell dictionary files

Each of the dictionary files is a simple text file with one word per line (and comments can be added with `#`).
Here are the contents of my `njk.txt` file:
```txt
if
endif
for
endfor
asyncEach
endeach
asyncAll
endall
macro
endmacro
set
endset
extends
block
endblock
include
import
raw
endraw
verbatim
endverbatim
filter
endfilter
call
endcall
abs
batch
capitalize
center
default
dictsort
dump
escape
first
float
forceescape
groupby
indent
int
join
last
length
list
lower
nl2br
random
reject
rejectattr
replace
reverse
round
safe
select
selectattr
slice
sort
string
striptags
sum
title
trim
truncate
upper
urlencode
urlize
wordcount
```

To be honest, the patterns I defined earlier should be enough to ignore Nunjucks expressions but I wanted to be extra sure :sweat_smile:.
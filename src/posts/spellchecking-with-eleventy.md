---
tags: ['11ty']
title: Spellchecking my blog posts with cSpell
date: 2023-03-23
description: A little magic to help me catch typos.
---

After I realized more than one other person was reading my blog, I panicked and proofread/edited all my posts. Turns out that I rely on autocorrect a little too much and I have way too many typos without it! I came across [an article](https://tjaddison.com/blog/2021/02/spell-checking-your-markdown-blog-posts-with-cspell/) by TJ Addison that explained how to do this with a tool called `cSpell` - the backbone of the [Code Spell Checker VSCode extension](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker). That article was super helpful and works perfectly, but I wanted to add a few things to it to improve the experience.

## Add a script to your package.json

Self explanatory. I added a script to my `package.json` file to run the cSpell command:

```json
{
    // ...
    "scripts": {
        // ...
        "spell": "cspell src/posts/**/*.md"
    }
}
```

## Add a config file

The tool allows multiple filenames for its configuration but I went with `cspell.config.js` for consistency with my other config files.

The config file starts with the `version` and `language` properties. Set the config version to `0.2` (currently always 0.2) and the language to either `en` or `en-GB` (default is `en`):
```js
module.exports = {
    version: '0.2', // [sh! ++]
    language: 'en', // [sh! ++]
};
```

Next, you can define specific words to exclude or flag. I excluded some 11ty specific terminology and a few brand names that I have written about in my posts. 

```js
module.exports = {
    version: '0.2',
    language: 'en',
    words: [ // [sh! focus:start]
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
    flagWords: [], // [sh! focus:end]
};
```

In addition to the `words` property, you can also define dictionaries. I also added a dictionary for my GitHub repos (I have a lot of repos and I don't want to add them all manually to the `words` property) so I can write about them without getting flagged for typos.

```js
module.exports = {
    version: '0.2',
    language: 'en',
    words: [
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
    flagWords: [],
    dictionaries: ["repos"], // [sh! focus:start]
    dictionaryDefinitions: [
        { "name": "repos", "path": "./utils/plugins/cspell/dicts/repos.txt" },
    ], // [sh! focus:end]
```

For the `repos` dictionary itself, I wrote a script to scan my GitHub repos and add them to a file.

```js
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
```

Finally, the config file allows you to define patterns to ignore. I added a few patterns to ignore code blocks and Nunjucks expressions.

```js
    {% raw %}// ... 
    ignoreRegExpList: ["nunjucksExpression", "markdownCodeBlock", "markdownInlineCode"],
    patterns: [
        {
            name: "nunjucksExpression",
            pattern: /{%.*?%}/gis
        },
        {
            name: "markdownCodeBlock",
            pattern: /`{3}[\s\S]*?`{3}(?=\n|$)/gi
        },
        {
            name: "markdownInlineCode",
            pattern: /`[^`]*`/gi
        }
    ], {% endraw %}
```

I'm surprised that there isn't a pattern for Markdown code blocks by default; I was having issues with common JavaScript libraries and methods being flagged as typos. Additionally, I use a custom shortcode, `callout`, that kept getting flagged as a typo, so the `nunjucksExpression` pattern was a must.

## Dictionaries

Each of the dictionary files, like my repos dictionary, is a simple text file with one word per line (and comments can be added with `#`). Before I added the `nunjucksExpression` pattern, I made a dictionary file for Nunjucks expressions (I used the [Nunjucks docs](https://mozilla.github.io/nunjucks/templating.html) to get a list of all the expressions).

If anyone is interested, here is the list of Nunjucks expressions I added to the dictionary file:

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

I'm pretty happy with how everything turned out! My next step is figuring out if I can hook it into my Eleventy build process instead of using a package script - there doesn't seem to be an API for it, but I'll keep looking.
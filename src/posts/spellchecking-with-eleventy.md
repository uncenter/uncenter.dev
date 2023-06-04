---
tags: ['11ty', 'markdown', 'blog']
title: Spell-checking Markdown with cSpell
description: A little magic to help catch typos in your blog posts.
date: 2023-03-23
edited: 2023-05-21
---

Though I haven't written much on this blog, I wanted to add some basic spell-checking to my posts. I looked up "spell-checking markdown" and found [an article by TJ Addison](https://tjaddison.com/blog/2021/02/spell-checking-your-markdown-blog-posts-with-cspell/) that explained how to do this with a tool called `cSpell` (the backbone of the somewhat popular [Code Spell Checker VSCode extension](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)). Definitely check out TJ's article for a more in-depth explanation of `cSpell` and how to use it, but here I'll explain how I set it up for my Eleventy blog.

## Using cSpell

You can use `cSpell` without installing it as a dependency by running it with `npx`:

```sh
npx cspell src/posts/**/*.md
```

But I opted for installing it permanently as a dev dependency and using an npm script to run it:

```sh
npm install cspell --save-dev
```

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

`cSpell` [allows multiple filenames](http://cspell.org/configuration/#configuration) for its configuration but I went with `cspell.config.js` for consistency with my other config files (like `eleventy.config.js` and `tailwind.config.js`).

To start, set the version to `0.2` (currently always 0.2) and the language to either `en` or `en-GB` (both are included by default).

```js
module.exports = {
	version: '0.2',
	language: 'en',
};
```

There are over 26 [other language dictionaries](https://github.com/streetsidesoftware/cspell-dicts) available, but I'm only writing in English so I didn't need to add any others.

An important step is to define specific words to exclude or flag. I told `cSpell` to ignore some 11ty-specific terminology and a few common developer brands and buzzwords.

```js
	words: [
		'11ty',
		'eleventy',
        'netlify',
		'jamstack',
		'shortcode',
		'shortcodes',
		'pagination',
		'frontmatter',
		'webc',
	],
	flagWords: [],
```

In addition to the `words` property, you can also define dictionaries - just longer lists of words. I added a dictionary for my GitHub repositories to prevent those from being spell-checked if I ever write about them.

```js
    dictionaries: ["repos"],
    dictionaryDefinitions: [
        { "name": "repos", "path": "./utils/dicts/repos.txt" },
    ],
```

Instead of manually updating my `repos.txt` dict, I wrote a script to fetch my repositories from the GitHub API and write them to the file.

```js
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function getRepos() {
const reposFile = path.join(\_\_dirname, './dicts/repos.txt');
const reposURL = 'https://api.github.com/users/<USERNAME>/repos';

    (async () => {
    	const response = await fetch(reposURL);
    	const json = await response.json();

    	if (Array.isArray(json)) {
    		const repos = json.map((repo) => repo.name);
    		fs.writeFileSync(reposFile, repos.join('\n'));
    	} else {
    		console.log('Invalid response format:', json);
    	}
    })();

}

getRepos();
```

{% tip "Running the script on Netlify" %}
If you're using Netlify, you can run this script and the spell-check script during the build process by adding it to the `build` command in your `netlify.toml` file (or the GUI on Netlify's website):

```toml
[build]
command = "node ./utils/get-repos.js && npm run spell && npm run build"
```

{% image "images/spellchecking-with-eleventy/netlify-build-command.png", "Screenshot of our new build command in the Netlify GUI" %}
{% endtip %}

Finally, the config file allows you to define regular expression patterns to ignore. I added a few to ignore Markdown code fences and Nunjucks expressions.

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

I'm surprised that there isn't a pattern for Markdown code blocks by default; I was having issues with common JavaScript libraries and methods being flagged as typos. Additionally, I use a few [custom shortcodes](https://www.11ty.dev/docs/shortcodes/) that kept getting flagged as a typo, so the `nunjucksExpression` pattern was a must.

## Ignore words in frontmatter

The neat thing about cSpell is you can also define words to ignore per file, so if you only use a word once, you can just ignore it in that file. For example, you could ignore the word `supercalifragilisticexpialidocious` in just one file by adding `cSpell:ignore supercalifragilisticexpialidocious` as a comment at the top of the file:

```md
---
tags: [...]
title: Magna voluptate officia cillum Lorem proident.
description: Cupidatat excepteur ullamco laboris in veniam qui officia tempor aliquip et commodo.
date: 2000-01-01
# cSpell:ignore supercalifragilisticexpialidocious
---
```

You don't have to put it in the frontmatter, but I like to keep my posts as clean & organized as possible and it looks nice there.

Let me know if you have any questions or suggestions!

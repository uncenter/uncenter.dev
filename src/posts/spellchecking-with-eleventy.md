---
tags: ['11ty', 'cspell', 'markdown', 'blog']
title: Spell-checking Markdown with cSpell
description: A little magic to help catch typos in your blog posts.
date: 2023-03-23
edited: 2023-05-21
---

Though I haven't written much on this blog, the quality of my writing is important to me. I love reading other people's blogs but I can't stand it when there are typos or grammatical errors. I'm not perfect and I'm sure I'll still have a few typos here and there, but I want to do my best to make sure my posts are as readable as possible. With that in mind, I wanted to add a few things to my website to make spell-checking easier. I looked up "spell-checking markdown" and found [an article by TJ Addison](https://tjaddison.com/blog/2021/02/spell-checking-your-markdown-blog-posts-with-cspell/) that explained how to do this with a tool called `cSpell` (the backbone of the somewhat popular [Code Spell Checker VSCode extension](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)). That article was super helpful and works perfectly, but I wanted to add a few things to it to make it even better.

## Using cSpell

You can use `cSpell` without installing it as a dependency by running it with `npx`:

```sh
npx cspell src/posts/**/*.md
```

But I wanted to add it as a script to my `package.json` so I could run it with `npm run spell`. To do that, install `cSpell` as a dev dependency:

```install
npm install cspell --save-dev
```

And add it as a script to your `package.json`:

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

Next, you can define specific words to exclude or flag. I told `cSpell` to ignore some 11ty-specific terminology and a few common developer brands and buzzwords.

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

In addition to the `words` property, you can also define dictionaries - just longer lists of words. I added a dictionary for my GitHub repositories to prevent those from being spell-checked if I ever write about them (who wants to manually add them all to the `words` list?!).

```js
    dictionaries: ["repos"],
    dictionaryDefinitions: [
        { "name": "repos", "path": "./utils/dicts/repos.txt" },
    ],
```

For the `repos` dictionary itself, I wrote a script to scan my GitHub repos and add them to a file.

```js
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function getRepos() {
	const reposFile = path.join(__dirname, './dicts/repos.txt');
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

{% image "images/spellchecking-with-eleventy/netlify-build-command.png", "Netlify build command" %}
{% endtip %}

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

You don't have to put it in the frontmatter, but I like to keep my posts as clean & organized as possible. Let me know if you have any questions or suggestions!

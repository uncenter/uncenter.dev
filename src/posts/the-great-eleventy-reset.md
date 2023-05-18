---
tags: ['11ty']
title: Rebuilding my website from scratch
description: A new structure, new icons, and new styling.
date: 2023-02-21
unlisted: true
# cspell:ignore Barabara Devries
---

I have been working on version 3.0 for a while now, and I am finally ready to release it! I have completely rebuilt my website from scratch, and I am very happy with the results. I found it increasingly more difficult to manage my hacky setup, so I decided to start over and do it right this time. I have learned a lot about Eleventy and web development in general over the past few months, and I am excited to put that knowledge to use.

## What's new?

### New design

For now, I am using [Tailwind's "Preflight" CSS reset](https://tailwindcss.com/docs/preflight) along with their [Typography plugin](https://tailwindcss.com/docs/typography-plugin). It looks quite nice without any work, though it is a little annoying to disable some of the styling. I haven't implemented dark/light mode or any color scheme yet, but thats on the menu for later.

### New icons

After months of constantly changing and tweaking the icons, I have finally settled on a set of icons that I am happy with. I am using [Lucide](https://lucide.dev), [Devicons](https://devicon.dev), and [SVG Logos by Gil Barabara](https://github.com/gilbarbara/logos). I initially used Feather Icons, but it turns out Lucide is more complete and has a better icon set. I am using the Devicons set for programming languages and the SVG Logos set for social media icons, and overall I am very happy with the results.

### Updated shortcodes and filters

I updated the `readingTime` filter and I created a new `wordCount` filter as well. I have also updated the `callout` (previously `note`) shortcode with new types and along with each type... new styling! One neat thing is each block has a text marker in the top right, inspired by [Bryan Devries](https://brianjdevries.com/style-guide/).
Finally, I spent more time than I would like to admit on a new `excerpt` shortcode that "intelligently" truncates the excerpt at 200 characters or less.

```js
eleventyConfig.addShortcode('excerpt', (page) => {
	// Make sure the page has content
	if (!page.hasOwnProperty('content')) {
		return null;
	}

	// Trim whitespace and remove first heading
	let content = page.content.trim();
	content = content.replace(/^(\s*\n*)?<h\d[^>]*>.*?<\/h\d>(\s*\n*)?/i, '');

	// Remove all content after next heading
	const nextHeadingIndex = content.search(/<h\d[^>]*>/i);
	if (nextHeadingIndex !== -1) {
		content = content.substring(0, nextHeadingIndex);
	}

	// Convert HTML to plain text
	const plainText = htmlToText(content, {
		wordwrap: false,
		ignoreHref: true,
		ignoreImage: true,
		uppercaseHeadings: false,
	});

	// Split plain text into phrases and concatenate until length cutoff
	// From https://github.com/mpcsh/eleventy-plugin-description
	const phrases = plainText.split(
		/(\p{Terminal_Punctuation}\p{White_Space})/gu,
	);
	let excerpt = '';
	while (phrases.length > 0 && excerpt.length < 200) {
		excerpt += phrases.shift();
	}

	// Append ending characters and return excerpt
	excerpt += '...';
	return excerpt;
});
```

There is one issue I'm still working out, which is that links are not being properly formatted. I'm not sure if it's an issue with the `html-to-text` library but I'm still looking into it.

{% info "Update"%}
I have since solved the issue! It turns out I wasn't configuring the `html-to-text` library properly. Here's what it looks like now:

```js
// _11ty/utils/cleanContent.js
const { convert } = require('html-to-text');

module.exports = (content) => {
	return convert(content, {
		selectors: [
			{ selector: 'pre.shiki', format: 'skip' },
			{ selector: 'a.anchor', format: 'skip' },
			{ selector: 'picture', format: 'skip' },
			{ selector: 'a', options: { ignoreHref: true } },
			{ selector: 'section.footnotes', format: 'skip' },
		],
		wordwrap: false,
	});
};
```

The library has a lot of options, so I'm still playing around with it to see what I can do. I'm mostly using selectors so that I can skip over certain elements, like code blocks (`pre.shiki`) and footnotes (`section.footnotes`). I also have to skip over the anchor links (`a.anchor`) because by default, the `href` is put after the text content of the link (e.g. `"This is a link [https://example.com]"`).

{% endinfo %}

## What's next?

I'm hoping to really round off the site soon with some of these features.

### Dark/light mode and color themes

I had a dark/light mode toggle in the last version, decently well implemented. It stored preference in localStorage and used `prefers-color-scheme` on initial visits. However, I want to expand this concept into a full site settings menu: a dark, light, and auto/reset toggle; a theme toggle; and maybe a language toggle if I decide to add i18n. I'm hoping to find a better way to implement it in v3, but I'm struggling to create the dropdown/popup menu in an elegant and accessible way.

### RSS feeds

I know it's easy - just add a plugin and I'm done. Not sure why I haven't done it yet...

### Webmentions and Mastodon comments

I already (sorta) have comments through Giscus, but I would love to implement some type of fetch-comments-from-Mastodon functionality. And Webmentions should be easy with a plugin or two.

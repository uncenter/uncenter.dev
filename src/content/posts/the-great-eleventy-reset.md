---
tags: ['11ty']
title: The Great Eleventy Reset
date: 2023-02-21
description: "v3.0: A new structure, new icons, and new styling."
archived: true
# cspell:ignore Barabara Devries
---

It's coming up on a year now that I have this website, and I released v2.0 on January 2nd, 2023 - exactly 50 days ago. As of that release, I have made **149 commits** to the repository. I think it's time for v3.0. 

## What's new?

### New design

For now, I am using [Tailwind's "Preflight" CSS reset](https://tailwindcss.com/docs/preflight) along with their [Typography plugin](https://tailwindcss.com/docs/typography-plugin). It looks quite nice without any work, though it is a little annoying to disable some of the styling. I haven't implemented dark/light mode or any color scheme yet, but thats on the menu for later. I'm still deciding between a minimalistic design with little to no accents, a rainbow-ish theme, or just one accent color. 

### New icons

After months of constantly changing and tweaking the icons, I have finally settled on a set of icons that I am happy with. I am using [Lucide](https://lucide.dev), [Devicons](https://devicon.dev), and [SVG Logos by Gil Barabara](https://github.com/gilbarbara/logos). I initially used Feather Icons, but it turns out Lucide is more complete and has a better icon set. I am using the Devicons set for programming languages and the SVG Logos set for social media icons, and overall I am very happy with the results.

### Updated shortcodes and filters

I updated the `readingTime` filter and I created a new `wordCount` filter as well. I have also updated the `callout` (previously `note`) shortcode with new types and along with each type... new styling! One neat thing is each block has a text marker in the top right, inspired by [Bryan Devries](https://brianjdevries.com/style-guide/).
Finally, I spent more time than I would like to admit on a new `excerpt` shortcode that "intelligently" truncates the excerpt at 200 characters or less. 

```js
eleventyConfig.addShortcode("excerpt", (page) => {
    // Make sure the page has content
    if (!page.hasOwnProperty("content")) {
        return null;
    }

    // Trim whitespace and remove first heading
    let content = page.content.trim();
    content = content.replace(/^(\s*\n*)?<h\d[^>]*>.*?<\/h\d>(\s*\n*)?/i, "");

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
    const phrases = plainText.split(/(\p{Terminal_Punctuation}\p{White_Space})/gu);
    let excerpt = "";
    while (phrases.length > 0 && excerpt.length < 200) {
        excerpt += phrases.shift();
    }

    // Append ending characters and return excerpt
    excerpt += "...";
    return excerpt;
});
```

The core of the shortcode is the RegEx to identify the first heading and each phrase in the content. It looks pretty simple in the end, but I spent untold hours on https://regexone.com/ attempting to make it work. There is one issue I'm still working out, which is that links are not being properly formatted. I'm not sure if it's an issue with the `htmlToText` library but I'm still looking into it.

## What's next?

I'm hoping to really round off the site soon with some of these features.

### Dark/light mode and color themes

I had a dark/light mode toggle in v2, decently well implemented. It stored preference in localStorage and used `prefers-color-scheme` on initial visits. However, I want to expand this concept into a full site settings menu: a dark, light, and auto/reset toggle; a theme toggle; and maybe a language toggle if I decide to add i18n. I'm hoping to find a better way to implement it in v3, but I'm struggling to create the dropdown/popup menu in an elegant and accessible way.

### Search
I have almost zero content on this site, but I still think it would be cool to add search functionality. I've heard good things about [Pagefind](https://pagefind.app/), which is a fully static search that runs after 11ty and has super easy integration.

### RSS feeds

I know it's easy - just add a plugin and I'm done. Not sure why I haven't done it yet...

### Webmentions and Mastodon comments

I already (sorta) have comments through Giscus, but I would love to implement some type of fetch-comments-from-Mastodon functionality. And Webmentions should be easy with a plugin or two.
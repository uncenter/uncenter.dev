---
tags: ['11ty', 'icons']
title: Icons, Icons, Icons
date: 2023-02-22
---

Icons pile up fast. You start with just the basics, but then you want to add more. And more. And more. And before you know it, you have a huge collection of icons that you don't even use. I've been there. I've done that. And it's easy enough to just include every icon you can find in your HTML, but that's not the best way to do it.

## Other implementations

While I was working on this project, I found a few other implementations of icon systems that I thought were worth mentioning. Benny Powers wrote about [a way to include sprites only when necessary](https://bennypowers.dev/posts/11ty-svg-sprites/) about a month ago, but sadly I couldn't get it to work, nor did I understand it enough to try to fix it. There are a few plugins for 11ty that do interesting things with SVGs[^1], but all I needed was a way to include SVGs on a page-by-page basis, which none of them did.

## The solution

The solution is quite simple. First, it starts with a folder of SVGs. I have a folder at `src/assets/icons` that contains all of my SVGs. Now we need a way to embed them on our site. 

### Adding icons to a page

Here is a shortcode that takes the name of the SVG and returns an SVG. It looks like this:

```js
eleventyConfig.addShortcode("icon", function icon(name) {
    return `<svg class="icon icon-${name}"><use href="#icon-${name}"></use></svg>`;
});
```
We take in the name of our icon, and return a `<svg>` element with the class `icon` and `icon-[name]` (the classes are just for styling later[^2]). We also include a `<use>` element that references the SVG with the ID `#icon-[name]`. This is where the magic of SVG sprites happens. We can use the same icon multiple times on a page, but only include it once. The reference to the SVG is what makes this work.

But we can do better. Why include icons that we aren't even using on the page? We can add a list of icons to the page context, and then use that list to include the icons on the page. We can do this by adding a new property to the page context in our shortcode:

```js
eleventyConfig.addShortcode("icon", function icon(name) {
    if (!this.ctx.page.icons) { // [sh! ++]
        this.ctx.page.icons = []; // [sh! ++]
    } // [sh! ++]
    if (!this.ctx.page.icons.includes(name)) { // [sh! ++]
        this.ctx.page.icons.push(name); // [sh! ++]
    } // [sh! ++]
    return `<svg class="icon icon-${name}"><use href="#icon-${name}"></use></svg>`;
});
```

Let's go through it. First, we check if the page already has a property called `icons`. If it doesn't, we create it and set it to an empty array. Then we check if the array already contains the icon we are trying to add. If it doesn't, we add it to the array. Now we have a list of icons for each page that we can use to include icons.

### Generating a sprite sheet

Now, let's use this list of icons on each page to generate a sprite sheet. We can do this by creating another shortcode that loops through the icons.

```js
eleventyConfig.addShortcode("iconSheet", function iconSheet() {
    const sourceDir = path.join(__dirname, "../src/assets/icons");
    const icons = fs.readdirSync(sourceDir);
});
```
We can start by getting our icons...

```js
eleventyConfig.addShortcode("iconSheet", function iconSheet() {
    const sourceDir = path.join(__dirname, "../src/assets/icons");
    const icons = fs.readdirSync(sourceDir);
    let pageIcons = this.ctx.page.icons || []; // [sh! ++]
    pageIcons = pageIcons.filter((icon) => icon !== undefined); // [sh! ++]
});
```
...and then getting the icons for the page. We also need to filter out any `undefined` values that might be in the array.

```js
eleventyConfig.addShortcode("iconSheet", function iconSheet() {
    const sourceDir = path.join(__dirname, "../src/assets/icons");
    const icons = fs.readdirSync(sourceDir);
    let pageIcons = this.ctx.page.icons || [];
    pageIcons = pageIcons.filter((icon) => icon !== undefined);
    let sprite =
        '<svg class="hidden-svg-sprite-sheet" aria-hidden="true" style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n<defs>\n'; // [sh! ++]
});
```
We can start our sprite sheet with the base `svg` element and the `<defs>` element. This is where we will put our icons.
{% callout "Important!", "info" %}
Make sure to add `aria-hidden="true"` and `style="position: absolute; width: 0; height: 0; overflow: hidden;"` to the `svg` element. This will hide the sprite sheet from screen readers and keep it from affecting the layout of the page.
{% endcallout %}

Now we can loop through our icons and add them to the sprite sheet.

```js
    let symbols = "";
    icons.forEach((icon) => {
        const iconPath = path.join(sourceDir, icon);
        const iconName = path.parse(icon).name;
        const content = fs.readFileSync(iconPath, "utf8");
        const viewBox = content.match(/viewBox="(.+?)"/)[1];
        const symbol = content
            .replace(/<svg([^>]+)>/,`<symbol id="icon-${iconName}" viewBox="${viewBox}">`)
            .replace("</svg>", "</symbol>")
            .replace(/<!--(.*?)-->/g, "");
        if (pageIcons.includes(iconName)) { // [sh! ~~]
            symbols += symbol + "\n"; // [sh! ~~]
        }
    });
    if (symbols !== "") {
        sprite += symbols + "</defs>\n</svg>\n";
        return sprite;
    }
    return "";
```

For each icon, we get the path to the file, the name of the file, and the contents of the file. Then we can use RegEx to get the `viewBox` from the SVG. In SVG sprites, `<symbols>` are used in the place of `<svg>` tags: so we replace the `svg` element with a `symbol` element. And it is super important to add the `id` attribute so we can reference them from our other icon shortcode. We also remove any comments from the SVG. Then, check if the page contains the icon, and if it does, we add it to the sprite sheet. Finally, we return the sprite sheet.

#### Final code

Here is the final code for the icon shortcode:

```js
eleventyConfig.addShortcode("iconSheet", function iconSheet() {
    const sourceDir = path.join(__dirname, "../src/assets/icons"); // Change this to your icons directory
    const icons = fs.readdirSync(sourceDir);
    let pageIcons = this.ctx.page.icons || [];
    pageIcons = pageIcons.filter((icon) => icon !== undefined);

    let sprite =
        '<svg class="hidden-svg-sprite-sheet" aria-hidden="true" style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n<defs>\n';

    let symbols = "";
    icons.forEach((icon) => {
        const iconPath = path.join(sourceDir, icon);
        const iconName = path.parse(icon).name;
        const content = fs.readFileSync(iconPath, "utf8");
        const viewBox = content.match(/viewBox="(.+?)"/)[1];
        const symbol = content
            .replace(/<svg([^>]+)>/,`<symbol id="icon-${iconName}" viewBox="${viewBox}">`)
            .replace("</svg>", "</symbol>")
            .replace(/<!--(.*?)-->/g, "");
            
        if (pageIcons.includes(iconName)) {
            symbols += symbol + "\n";
        }
    });
    if (symbols !== "") {
        sprite += symbols + "</defs>\n</svg>\n";
        return sprite;
    }
    return "";
});
```

{% callout "My icons are broken!", "warning" %}
Some icons, like my Lucide icons, have other attributes on the SVGs that are important to keep, like `fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"`. If you are using an icon set that has these attributes, you will need to add them to the `symbol` element in the shortcode. You can do this by adding the attributes to the `replace` method.
{% endcallout %}


### Using the sprite sheet

Now that we have a sprite sheet, we can use it in our pages. We can do this by adding the `iconSheet` shortcode your base layout file. Typically it makes more sense to append it near the bottom of the page, just before the closing `</body>` tag.

```html
<body>
    <!-- ... -->
    {% raw %}{% iconSheet %}{% endraw %}
</body>
```

Now we can use the `icon` shortcode to add icons to our pages.

```html
{% raw %}{% icon "cat" %}{% endraw %}
```

Let me know if you have any questions or comments. I hope this helps you add SVG sprites to your Eleventy site!

[^1]: Like [https://www.npmjs.com/package/eleventy-plugin-svg-sprite](https://www.npmjs.com/package/eleventy-plugin-svg-sprite) or [https://www.npmjs.com/package/eleventy-plugin-svg-contents](https://www.npmjs.com/package/eleventy-plugin-svg-contents)
[^2]: I typically add some generic CSS to the icons like:
    ```css
    .icon {
        display: inline-block;
        width: 1em;
        height: 1em;
    }
    ```

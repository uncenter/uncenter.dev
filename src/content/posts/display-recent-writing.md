---
tags: ['11ty']
title: Displaying my recent writing
date: 2023-02-25
description: How I display my recent writing on my homepage
micro: true
# cspell:ignore micro-blog
---

I recently added a section to my homepage that displays my most recent writing, from both my articles and my micro-blog.

## Simple solution

```twig
{% raw %}{% set recentPost = collections.blog | last %}{% endraw %}
```

I'll leave the styling up to you, but this is the basic idea. I used the `last` [filter](https://mozilla.github.io/nunjucks/templating.html#last) to get the last item in the collection, and then you can use attributes like `recentPost.url` and `recentPost.data.title` to get the URL and title of the post. This approach assumes the collection is already sorted in reverse chronological order (i.e. older posts first), which I believe is the default for Eleventy. If the collection is sorted with newer posts first, you can use the `first` [filter](https://mozilla.github.io/nunjucks/templating.html#first) instead of `last`.

This works great if you only want to display one post; if you want to display more than just the most recent post, you could probably just do `collections.blog[0]`, `collections.blog[1]`, etc. I actually haven't tried this, but it should work. I made a filter for it instead:

```js
const getIndexOfCollection = (collection, index) => {
    return collection[index];
};
// Why am I using a filter? Because I can.
```

So now I can get the nth item of my collections like this:

```twig
{% raw %}{% set recentPost = collections.blog | reverse | getIndexOfCollection(0) %}
{% set recentMicro = collections.micro | reverse | getIndexOfCollection(0) %}
{% set recentMicroSecond = collections.micro | reverse | getIndexOfCollection(1) %}{% endraw %}
```

## Clean it up and add some style

I added some Tailwind classes and a little bit of inline styling to make it look a little nicer. Here's the final code:

```twig
{% raw %}<div class="flex flex-row my-10 justify-between gap-5">
{% set recentPost = collections.blog | reverse | getIndexOfCollection(0) %}
<div class="container flex-1">
    <h3><a href="{{ recentPost.url }}">{{ recentPost.data.title }}</a></h3>
    <p>{{ recentPost.data.description }}</p>
</div>

{% set recentMicro = collections.micro | reverse | getIndexOfCollection(0) %}
{% set recentMicroSecond = collections.micro | reverse | getIndexOfCollection(1) %}
<div class="flex flex-col gap-5">
<div class="container flex-1" style="height: 50%;">
    <h3 style="margin-top: 0.6em;"><a href="{{ recentMicro.url }}">{{ recentMicro.data.title }}</a></h3>
</div>
{% if recentMicroSecond %}
<div class="container flex-1" style="height: 50%;">
    <h3 style="margin-top: 0.6em;"><a href="{{ recentMicroSecond.url }}">{{ recentMicroSecond.data.title }}</a></h3>
</div>
{% else %}
<div class="flex-1" style="height: 50%;">
</div>
{% endif %}
</div>
</div>{% endraw %}
```

{% image "recent-writing-example.png", "Screenshot of my homepage with the recent writing section" %}
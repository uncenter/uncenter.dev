---
eleventyExcludeFromCollections: true
title: "Micro"
layout: base
---

## What is this?

Little things not warranting their own post but worth sharing! Often something I learned or a quick fix for something I ran into.

{% set posts = collections.micro | reverse %}
{% set includeExcerpt = false %}
{% include "components/posts.njk" %}
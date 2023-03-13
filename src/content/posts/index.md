---
eleventyExcludeFromCollections: true
title: "Articles"
layout: base
---

You can find all of my articles here. I write about web development, design, and other things I find interesting.

{% set posts = collections.posts | reverse %}
{% include "components/posts.njk" %}
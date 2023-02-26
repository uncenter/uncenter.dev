---
eleventyExcludeFromCollections: true
title: "Articles"
layout: base
---

You can find all of my articles here. I write about web development, design, and other things I find interesting. I would also recommend checking out my [micro posts](/micro) for bite-sized posts.

{% set posts = collections.blog | reverse %}
{% include "components/posts.njk" %}
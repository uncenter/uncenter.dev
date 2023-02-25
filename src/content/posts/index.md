---
eleventyExcludeFromCollections: true
title: "Blog"
layout: base
---

{% set posts = collections.blog | reverse %}
{% include "components/posts.njk" %}
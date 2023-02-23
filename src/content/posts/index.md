---
eleventyExcludeFromCollections: true
title: "Blog"
layout: base
---

{% set posts = collections.blog %}
{% include "components/posts.njk" %}
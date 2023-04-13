---
title: 'Microblog'
description: "Tips, tricks, and other small things I've learned."
templateEngineOverride: njk
eleventyExcludeFromCollections: true
---

Some tips, tricks, and other small things I've learned! For longer articles, see <a href="/articles">my articles</a>.

{% set posts = collections.microPosts | reverse %}
{% include "posts.njk" %}

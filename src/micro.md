---
title: 'Microblog'
description: "Tips, tricks, and other small things I've learned."
templateEngineOverride: njk
eleventyExcludeFromCollections: true
---

<p>Some tips, tricks, and other small things I've learned! For longer articles, see <a href="/posts">my articles</a>.</p>

{% set posts = collections.microPosts | reverse %}
{% include "posts.njk" %}

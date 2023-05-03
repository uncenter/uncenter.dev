---
title: Archives
description: The ugly ducklings of my writing.
templateEngineOverride: njk
eleventyExcludeFromCollections: true
---

<p>These articles do not match my writing standards or are no longer relevant. For current articles, see <a href="/posts/">my blog</a>.</p>

{% set posts = collections.archivedPosts | reverse %}
{% include "posts.njk" %}

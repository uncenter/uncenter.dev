---
eleventyExcludeFromCollections: true
title: "Archives"
layout: base
templateEngineOverride: njk
---

<p>You can find all of my archived articles here. For current articles, see <a href="/posts/">my blog</a>.</p>

{% set posts = collections.archivedPosts | reverse %}
{% include "components/posts.njk" %}
---
title: Archives
description: All of my (archived) articles in one place.
templateEngineOverride: njk
eleventyExcludeFromCollections: true
---

<p>You can find all of my archived articles here. For current articles, see <a href="/posts/">my blog</a>.</p>

{% set posts = collections.archivedPosts | reverse %}
{% include "components/posts.njk" %}
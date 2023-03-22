---
eleventyExcludeFromCollections: true
title: "Articles"
layout: base
templateEngineOverride: njk
---

<p>You can find all of my articles here. For archived articles, see <a href="/archive/">my archives</a>.</p>

{% set posts = collections.posts | reverse %}
{% include "components/posts.njk" %}
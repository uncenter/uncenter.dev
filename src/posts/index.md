---
title: 'Articles'
description: 'All of my articles, the good and the bad.'
layout: base
templateEngineOverride: njk
eleventyExcludeFromCollections: true
views: false
---

<I>You can find all of my articles here. For archived articles, see <a href="/archive/">my archives</a>. I also have a <a href="/stats/">stats page</a> with some brief statistics about my writing!</p>

{% set posts = collections.posts | reverse %}
{% include "posts.njk" %}
{% if collections.archivedPosts.length > 0 %}

<p class="container p-5 mt-10 bg-gray-100">
There {% if collections.archivedPosts.length === 1 %}is{% else %}are{% endif %} also {{ collections.archivedPosts.length }} archived articles. You can find them <a href="/archive/">in the archive</a>.</p>
{% endif %}

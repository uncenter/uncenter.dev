---
title: 'Articles'
description: 'All of my articles, the good and the bad.'
layout: page
templateEngineOverride: njk
eleventyExcludeFromCollections: true
views: false
---

<p>You can find all of my articles here. For archived articles, see <a href="/archive/">my archives</a>.

{% set posts = collections.posts | reverse %}
{% include "posts.njk" %}
{% if collections.archivedPosts.length > 0 %}

<p class="container p-5 mt-10 bg-gray-100">
There {% if collections.archivedPosts.length === 1 %}is also one archived article. You can find it {% else %}are also {{ collections.archivedPosts.length }} archived articles. You can find them {% endif %}<a href="/archive/">in the archive</a>.</p>
{% endif %}

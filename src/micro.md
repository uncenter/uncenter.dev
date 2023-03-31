---
title: 'Micro'
description: "Tips, tricks, and other small things I've learned."
templateEngineOverride: njk
eleventyExcludeFromCollections: true
---

{% set posts = collections.microPosts | reverse %}
{% include "posts.njk" %}

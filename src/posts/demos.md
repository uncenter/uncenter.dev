---
tags: 'general'
title: "Code Demos"
date: 2023-01-09
---

<!--START-->
Keeping the work-in-progress code demos here for now.<!--END-->

{% for demo in collections.orderedDemos %}
<article>
  <h2 id="{{ demo.fileSlug }}">{{ demo.data.title }}</h2>
  {{ demo.templateContent }}
</article>
{% endfor %}
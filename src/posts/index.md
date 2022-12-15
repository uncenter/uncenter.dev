---
title: "Posts"
date: "git Last Modified"
pagination:
  data: collections.general
  alias: posts
  size: 10
  reverse: true
---

## My Posts


{% for post in posts %}
  <article>
    <h1>
      <a href="{{ post.url | url }}">{{ post.data.title }}</a>
    </h1>
    {{ date }}
  </article>
{% endfor %}

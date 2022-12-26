---
title: "Posts"
date: "git Last Modified"
pagination:
  data: collections.general
  alias: posts
  size: 10
  reverse: true
---


<h1 class="title-header">Blog</h1>

<div class="articles">
{% for post in posts %}
  <article>
    <h1>
      <a href="{{ post.url | url }}">{{ post.data.title }}</a>
    </h1>
     <p class="description-text">{{ post.date | postDate }}</p>
    <p>{% excerpt post %}</p>
  </article>
{% endfor %}
</div>
---
title: "Posts"
layout: base
pagination:
  data: collections.general
  alias: posts
  size: 10
  reverse: true
---

<div class="blog-posts">
{% for post in posts %}
  <a href="{{ post.url | url }}" class="card-container">
    <div class="post-content card">
      <h3>{{ post.data.title }}</h3>
      <div class="description description-date">
        <p class="inline-card"><svg class="icon icon-calendar"><use xlink:href="#icon-calendar"></use></svg> {{ post.date | shortenedJSDate }}</p>
      </div>
      <p>{% excerpt post %}</p>
      <button class="read-more-button">Read more...</button>
    </div>
  </a>
{% endfor %}
</div>
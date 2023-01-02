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
        <p class="inline-card"><svg stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 24 24" class="text-lg" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>  {{ post.date | shortenedJSDate }}</p>
      </div>
      <p>{% excerpt post %}</p>
      <button class="read-more-button">Read more...</button>
    </div>
  </a>
{% endfor %}
</div>
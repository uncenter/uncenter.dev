---
title: "Blog"
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
      <div class="tags">
        <div class="description description-date">
          <p class="inline-card blue">{% insertSVG 'calendar' %} {{ post.date | shortenedJSDate }}</p>
        </div>
        <div class="description description-read">
            <p class="inline-card green">{% insertSVG 'clock' %} {{ post.templateContent | emojiReadTime }}</p>
        </div>
      </div>
      <p>{% excerpt post %}</p>
      <button class="read-more-button">Read more...</button>
    </div>
  </a>
{% endfor %}
</div>
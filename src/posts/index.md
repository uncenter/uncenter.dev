---
eleventyExcludeFromCollections: true
title: "Blog"
layout: base
---

<div class="blog-posts">
{% for post in collections.blog %}
  <div class="card-container">
    <div class="post-content card">
      <h3><a href="{{ post.url | url }}">{{ post.data.title }}</a></h3>
      <div class="tags">
        <div class="description description-date">
          <p class="inline-card blue">{% insertSVG 'calendar' %} {{ post.date | shortenedJSDate }}</p>
        </div>
        <div class="description description-read">
          <p class="inline-card green">{% insertSVG 'clock' %} {{ post.templateContent | emojiReadTime }}</p>
        </div>
        {% if post.data.tags %}
          {% for tag in post.data.tags %}
            <div class="description description-tag">
              <a href="/tags/{{ tag | slug }}"><p class="inline-card white">{% insertSVG 'tag' %} {{ tag }}</p></a>
            </div>
          {% endfor %}
        {% endif %}
      </div>
      <p>{% excerpt post %}</p>
    </div>
  </div>
{% endfor %}
</div>
---
eleventyExcludeFromCollections: true
title: "Blog"
layout: base
---

<div class="blog-posts">
    {%- for post in collections.blog -%}
        <div class="card-container">
            <div class="post-content card">
                <h2><a class="no-style" href="{{ post.url | url }}">{{ post.data.title }}</a></h2>
                <ul class="tags">
                    <li class="description description-date">
                        <p class="inline-card blue">{%- insertSVG 'calendar' %} {{ post.date | shortenedJSDate }}</p>
                    </li>
                    <li class="description description-read">
                        <p class="inline-card green">{%- insertSVG 'clock' %} {{ post.templateContent | emojiReadTime }}</p>
                    </li>
                    {%- if post.data.tags -%}
                        {%- for tag in post.data.tags -%}
                            <li class="description description-tag">
                                <a class="no-style" href="/tags/{{ tag | slug }}">
                                    <p class="inline-card white">{%- insertSVG 'tag' %} {{ tag }}</p>
                                </a>
                            </li>
                        {%- endfor -%}
                    {%- endif -%}
                </ul>
                <p>{%- excerpt post -%}</p>
            </div>
        </div>
    {%- endfor -%}
</div>
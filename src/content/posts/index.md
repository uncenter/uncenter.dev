---
eleventyExcludeFromCollections: true
title: "Blog"
layout: base
---

<div class="blog-posts">
    {%- for post in collections.blog -%}
        <div class="card-container">
            <div class="post-content card card-interactive">
                <h2><a class="no-style" href="{{ post.url | url }}">{{ post.data.title }}</a></h2>
                <div class="flex flex-row flex-wrap gap-6">
                    <div>
                        <p class="inline-card blue">{%- icon 'calendar' %} {{ post.date | shortenedJSDate }}</p>
                    </div>
                    <di>
                        <p class="inline-card green">{%- icon 'clock' %} {{ post.content | readingTime }}</p>
                    </di>
                    {%- if post.data.tags -%}
                        {%- for tag in post.data.tags -%}
                            <div>
                                <a class="no-style" href="/tags/{{ tag | slugify }}">
                                    <p class="inline-card white">{%- icon 'tag' %} {{ tag }}</p>
                                </a>
                            </div>
                        {%- endfor -%}
                    {%- endif -%}
                </div>
                <p>{%- excerpt post -%}</p>
            </div>
        </div>
    {%- endfor -%}
</div>
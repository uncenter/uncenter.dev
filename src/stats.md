---
title: Stats
description: Stats about my blog and this site.
collection: 'more'
icon: 'bar-chart-3'
---

Here are my _slightly embarrassing_ stats about this site and my blog.

{% for collection, label in {
    "posts": "Published posts",
    "archivedPosts": "Archived posts",
    "allPosts": "Total"
} %}

<table class="text-center">
    <thead>
        <tr>
            <th colspan="2">{{ label }}</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th>Posts</th>
            <td>{{ collections[collection].length }}</td>
        </tr>
        <tr>
            <th>Words</th>
            <td>{% totalWordCount collections[collection] %}</td>
        </tr>
        <tr>
            <th>Reading time</th>
            <td>{% totalReadingTime collections[collection] %} min</td>
        </tr>
        <tr>
            <th>Average word length</th>
            <td>{% wordLengthAverage collections[collection] %} characters</td>
        </tr>
        <tr>
            <th>Average words per post</th>
            <td>{% wordCountAverage collections[collection] %} words</td>
        </tr>
    </table>
{% endfor %}

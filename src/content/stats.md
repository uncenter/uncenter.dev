---
title: Stats
description: Stats about my blog and this site.
collection: 'more'
SVG: "bar-chart-3"
---

<table class="text-center">
    <thead>
        <tr>
            <th colspan="2">Total</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th>Posts</th>
            <td>{{ collections.allPosts.length }}</td>
        </tr>
        <tr>
            <th>Words</th>
            <td>{% totalWordCount collections.allPosts %}</td>
        </tr>
        <tr>
            <th>Reading time</th>
            <td>{% totalReadingTime collections.allPosts %} min</td>
        </tr>
    </tbody>
</table>

<table class="text-center">
    <thead>
        <tr>
            <th colspan="2">Published</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th>Posts</th>
            <td>{{ collections.posts.length }}</td>
        </tr>
        <tr>
            <th>Words</th>
            <td>{% totalWordCount collections.posts %}</td>
        </tr>
        <tr>
            <th>Reading time</th>
            <td>{% totalReadingTime collections.posts %} min</td>
        </tr>
    </tbody>
</table>


<table class="text-center">
    <thead>
        <tr>
            <th colspan="2">Archived</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th>Posts</th>
            <td>{{ collections.archivedPosts.length }}</td>
        </tr>
        <tr>
            <th>Words</th>
            <td>{% totalWordCount collections.archivedPosts %}</td>
        </tr>
        <tr>
            <th>Reading time</th>
            <td>{% totalReadingTime collections.archivedPosts %} min</td>
        </tr>
    </tbody>
</table>
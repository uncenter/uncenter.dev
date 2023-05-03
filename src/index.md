---
title: 'Home'
heading: Hello!
---

👋 Hi! I'm a high school student who likes to code, write, and learn. You can [reach out to me](/contact), [read my blog](/posts/), or just take a look around. Feel free to read my [colophon](/colophon/) if you're interested in how this site is built.

## Posts

<div class="flex flex-col justify-between gap-5 my-10 mt-0 sm:flex-row">
{% set recentPost = collections.posts | reverse | getIndex(0) %}
{% set recentPostSecond = collections.posts | reverse | getIndex(1) %}
<a class="container flex-1 no-underline hover:border-green-600 text-bold" style="height: 50%;" href="{{ recentPost.url }}">
    <h3 style="margin-top: 0.6em;">{{ recentPost.data.title }}</h3>
    <p>{{ recentPost.data.description }}</p>
</a>

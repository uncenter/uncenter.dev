---
title: "Home"
heading: Hello!
---

👋 Welcome! This site is mostly just a blog right now, but hopefully it will eventually host my portfolio and projects. For now, you can [reach out to me](/contact), [read my blog](/posts/), or just take a look around. Thanks for stopping by!


## Recent articles

<div class="flex flex-col sm:flex-row my-10 justify-between gap-5">
{% set recentPost = collections.blog | reverse | getIndexOfCollection(0) %}
{% set recentPostSecond = collections.micro | reverse | getIndexOfCollection(1) %}
<a class="container flex-1 hover:border-green-600 text-bold no-underline" style="height: 50%;" href="{{ recentPost.url }}">
    <h3 style="margin-top: 0.6em;">{{ recentPost.data.title }}</h3>
    <p>{{ recentPost.data.description }}</p>
</a>
<a class="container flex-1 hover:border-green-600 text-bold no-underline" style="height: 50%;" href="{{ recentPostSecond.url }}">
    <h3 style="margin-top: 0.6em;">{{ recentPostSecond.data.title }}</h3>
    <p>{{ recentPostSecond.data.description }}</p>
</a>
</div>
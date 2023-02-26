---
title: "Home"
heading: Hello!
---

👋 Welcome! This site is mostly just a blog right now, but hopefully it will eventually host my portfolio and projects. For now, you can [reach out to me](/contact), [read my blog](/posts/), or just take a look around. Thanks for stopping by!


## Recent writing

<div class="flex flex-row my-10 justify-between gap-5">
{% set recentPost = collections.blog | reverse | getIndexOfCollection(0) %}
<div class="container flex-1">
    <h3><a href="{{ recentPost.url }}">{{ recentPost.data.title }}</a></h3>
    <p>{{ recentPost.data.description }}</p>
</div>

{% set recentMicro = collections.micro | reverse | getIndexOfCollection(0) %}
{% set recentMicroSecond = collections.micro | reverse | getIndexOfCollection(1) %}
<div class="flex flex-col gap-5">
<div class="container flex-1" style="height: 50%;">
    <h3 style="margin-top: 0.6em;"><a href="{{ recentMicro.url }}">{{ recentMicro.data.title }}</a></h3>
</div>
{% if recentMicroSecond %}
<div class="container flex-1" style="height: 50%;">
    <h3 style="margin-top: 0.6em;"><a href="{{ recentMicroSecond.url }}">{{ recentMicroSecond.data.title }}</a></h3>
</div>
{% else %}
<div class="flex-1" style="height: 50%;">
</div>
{% endif %}
</div>
</div>
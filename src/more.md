---
title: More Pages
templateEngineOverride: njk
---

Some other pages you might be interested in:
<ul>
{% for page in collections.custom.more %}
    <li><p class="mt-0 ml-2">{% icon page.data.SVG %}<a class="mt-0 ml-2" href="{{ page.url }}">{{ page.data.title }}</a></p></li>
{% endfor %}
</ul>
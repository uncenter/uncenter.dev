---
title: More Pages
---

:::card
Some other pages you might be interested in:
<ul>
{% for page in collections.custom.more %}
    <li>{% icon page.data.SVG %} <a href="{{ page.url }}">{{ page.data.title }}</a></li>
{% endfor %}
</ul>
:::
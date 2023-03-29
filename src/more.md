---
title: More Pages
---

Some other pages you might be interested in:
<ul>
{% for page in collections.custom.more %}
    <li><a href="{{ page.url }}">{{ page.data.title }}</a></li>
{% endfor %}
</ul>
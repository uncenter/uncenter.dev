---
title: "More Pages"
---

:::card
Some other pages you might be interested in:
<ul class="more-pages-container">
{% for page in collections.morePages %}
<li>{% insertSVG page.data.SVG %} <a href="{{ page.url }}">{{ page.data.title }}</a></li>
{% endfor %}
</ul>
:::
---
title: More Pages
permalink: false
---

{% set icons = [] %}
{% for page in collections.custom.more %}
    {% set icons = (icons.push(page.data.SVG), icons) %}
{% endfor %}
{% for i in icons %}
    {% icon i %}
{% endfor %}

{% set icons = [ 'folder-closed', 'pin', 'bar-chart-3', 'palette', 'clock' ] %}
{% for i in icons %}
    {% icon i %}
{% endfor %}

Some other pages you might be interested in:
<ul>
{% for page in collections.custom.more %}
    <li>{% icon page.data.SVG %} <a href="{{ page.url }}">{{ page.data.title }}</a></li>
{% endfor %}
</ul>

folder-closed node_modules/lucide-static/icons
pin node_modules/lucide-static/icons
bar-chart-3 node_modules/lucide-static/icons
clock node_modules/lucide-static/icons
palette node_modules/lucide-static/icons



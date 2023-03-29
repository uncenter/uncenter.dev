---
title: More Pages
templateEngineOverride: njk
description: "Other, less important pages."
---

<ul>
{% for page in collections.custom.more %}
    <li><p class="mt-0 ml-2">{% icon page.data.icon %}<a class="mt-0 ml-2" href="{{ page.url }}">{{ page.data.title }}</a></p></li>
{% endfor %}
</ul>
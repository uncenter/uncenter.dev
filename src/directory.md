---
title: "Directory"
date: "git Last Modified"
---

{%- for post in collections.all %}
* [{{ post.data.title }}]({{ post.url }})
{%- endfor %}
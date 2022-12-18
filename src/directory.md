---
title: "Directory"
date: "git Last Modified"
---

# Site Directory{.title-header}

{%- for post in collections.all %}
* [{{ post.data.title }}]({{ post.url }})
{%- endfor %}
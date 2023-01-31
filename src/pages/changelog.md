---
title: "Changelog"
---

:::card
<dl>
{%- for group in collections.recentChangesByDate %}
  <dt>{{ group[0] | shortenedISODate}}</dt>
  <dd>
    <ul>
      {%- for commit in group[1] %}
        <li>{{ commit.subject }}</li>
      {%- endfor %}
    </ul>
  </dd>
{%- endfor %}
</dl>
:::
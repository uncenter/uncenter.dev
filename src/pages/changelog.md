---
title: "Changelog"
---

:::card
<ul>
{%- for commit in collections.recentChanges %}
    <li>{{ commit.authorDate | shortenedISODate}}
    <ul>
        <li>{{ commit.subject }}</li>
    </ul>
    </li>
{%- endfor %}
</ul>
:::
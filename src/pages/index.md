---
title: "Home"
heading: Hello!
---

👋 welcome! you can check out my [projects](/projects), [contact me](/contact), or vist the [about](/about) page to learn how this website works.

<br>


## recent changes
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
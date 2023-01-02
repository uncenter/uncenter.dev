---
title: "Home"
heading: Hello!
---

👋 welcome! you can check out my [projects](/projects) and if you have any questions or need to contact me, do so [here](/contact). details about how this website was made can be found [here](/about).

<br>

### recent changes
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
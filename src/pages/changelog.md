---
title: "Changelog"
---

:::card
<dl class="changelog">
{%- for group in collections.recentChangesByDate -%}
  <dt>{{ group[0] | shortenedISODate}}</dt>
  <dd>
    <ul>
      {%- for commit in group[1] %}
      <li data-type="{{ commit.subject | getCommitCategory }}"><span class="inline-card" data-type="{{ commit.subject | getCommitCategory }}">{{ commit.subject | getCommitCategory }}</span> - {%- if commit.subject -%}{{ commit.subject | getCommitMessage }}{%- else -%}[no commit message]{%- endif -%}
        </li>
      {%- endfor -%}
    </ul>
  </dd>
{%- endfor -%}
</dl>
:::
---
title: "Changelog"
collection: 'more'
SVG: 'clock'
---

<dl>
{%- for group in collections.recentChanges -%}
  <dt class="font-semibold text-center">{{ group[0] }}</dt>
  <dd>
    <ul>
      {%- for commit in group[1] %}
      <li data-date-rel="{{ commit.committerDateRel }}" data-date="{{ commit.committerDate }}" data-commit="{{ commit.hash }}" data-category="{{ commit.subject | getCommitCategory }}"><span class="inline-card" data-category="{{ commit.subject | getCommitCategory }}">{{ commit.subject | getCommitCategory }}</span> - {% if commit.subject -%}<a aria-label="View commit on Github" href="https://github.com/{{ meta.github.username }}/{{ meta.github.repo }}/commit/{{ commit.hash }}">{{ commit.subject | getCommitMessage }}</a>{%- endif -%}
        </li>
      {%- endfor -%}
    </ul>
  </dd>
{%- endfor -%}
</dl>
---
title: Colophon
description: This site and how it's made.
---

According to [Wikipedia](<https://en.wikipedia.org/wiki/Colophon_(publishing)>), a colophon is:

> ...a brief statement containing information about the publication of a book such as an "imprint" (the place of publication, the publisher, and the date of publication).

This page is my colophon, where I'll explain how this website is made and hosted. I've put a lot of time and effort into this website, and I'm proud of it. I hope you enjoy it!

## Site structure

This website uses the [Eleventy (11ty)](https://www.11ty.dev/) static site generator. 11ty converts Markdown files, like blog posts and other pages, into HTML, making it easy for me to design the frontend while focusing on the content.

According to 11ty's website:

- Eleventy is a simple static site generator.
- It quickly builds fast websites.
- It's a popular modern web site generator.

You can find the source code for this website on [GitHub](https://www.github.com/{{ meta.author.github.username }}/{{ meta.repo }}).

## Site hosting

After the website is built, it's just a folder on my desktop or in a GitHub repository. The magic happens with [Netlify](https://www.netlify.com/), a free hosting service, auto-deploys this website every time I push to my repository. The domain is provided by [Cloudflare](https://www.cloudflare.com/).

## Visitor analytics

Usage statistics are tracked using [umami](https://umami.is/), an open-source alternative to Google Analytics. Although it was a bit challenging to set up, the data presentation and graphs look great once it's up and running. The PostgreSQL database and app are hosted on [Railway](https://railway.app/), a convenient and (mostly) free platform for hosting projects like this. View the [analytics!]({{ meta.analytics.shareLink }}).

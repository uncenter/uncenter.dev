---
title: Colophon
description: This site and how it's made.
---

What is a colophon? According to [Wikipedia](<https://en.wikipedia.org/wiki/Colophon_(publishing)>):

> [A colophon] is a brief statement containing information about the publication of a book such as an "imprint" (the place of publication, the publisher, and the date of publication).

Basically, an about page for a book- but in recent years, it's been used to describe the publication of a website as well. This page is a colophon for my website, which is a publication of sorts. It contains information about the site, how it's made, and how it's hosted. I've put a lot of time and effort into this website, and I'm proud of it. I hope you enjoy it!

{% info "Style guide" %}
I've written a [style guide](/style/) for this website, which contains information about the design, colors, and typography. It helps me keep the site consistent and maybe you'll find it useful too.
{% endinfo %}

## Site structure

This website uses the [Eleventy (11ty)](https://www.11ty.dev/) static site generator. 11ty converts Markdown files, like blog posts and other pages, into HTML, making it easy for me to design the frontend while focusing on the content.

According to 11ty's website:

- Eleventy is a simple static site generator.
- It quickly builds fast websites.
- It's a popular modern web site generator.

You can find the source code for this website on [GitHub](https://www.github.com/{{ meta.author.github.username }}/{{ meta.repo }}).

## Site hosting

After the website is built, it's just a folder on my desktop or in a GitHub repository. The magic happens with [Netlify](https://www.netlify.com/), a free hosting service, which auto-deploys the website every time I push to my GitHub repository. Since Netlify is free, I don't have to worry about paying for hosting or managing a server. The domain is provided by [Cloudflare](https://www.cloudflare.com/).

## Visitor analytics

Usage statistics are tracked using [umami](https://umami.is/), an open-source alternative to Google Analytics. Although it was a bit challenging to set up, the data presentation and graphs look great once it's up and running. The PostgreSQL database and app are hosted on [Railway](https://railway.app/), a convenient and (mostly) free platform for hosting projects like this. View the [analytics!]({{ meta.analytics.shareLink }}).
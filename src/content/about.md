---
title: "About"
collection: 'more'
SVG: "circle-ellipsis"
---

## Site structure
This website uses the [Eleventy (11ty)](https://www.11ty.dev/) static site generator. 11ty converts Markdown files, like blog posts and other pages, into HTML, making it easy for me to design the frontend while focusing on the content.

According to 11ty's website:
- Eleventy is a simple static site generator.
- It quickly builds fast websites.
- It's a popular modern web site generator.

## Site hosting
After the website is built, it's just a folder on my desktop (or source code in [a Github repository](https://www.github.com/{{ meta.github.username }}/{{ meta.github.repo }})). I use [Netlify](https://www.netlify.com/), a free hosting service, to auto-deploy the website from the Github repository.

## Domain proivder
The domain is provided by [Cloudflare](https://www.cloudflare.com/).

## Visitor analytics
Usage statistics are tracked using [umami](https://umami.is/), an open-source alternative to Google Analytics. Although it was a bit challenging to set up, the data presentation and graphs look great once it's up and running. The PostgreSQL database and hosting for Umami is provided by [Railway](https://railway.app/), a convenient and free platform for hosting projects like this.

## Email service
My email is managed through [Migadu](https://www.migadu.com/), which allows me to manage my aliases and mailboxes easily and securely.
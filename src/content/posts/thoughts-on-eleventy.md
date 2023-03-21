---
tags: ['11ty']
title: My thoughts on Eleventy
date: 2023-03-16
description: A few thoughts on Eleventy and the Eleventy website
# cspell:ignore darthmall
---

## Foreword - Thank you, Eleventy
Eleventy is awesome. This website is built on Eleventy, and I've actually learned more than just how to make a website; I've learned how to write a blog, how to make a pull request, how to open an issue, how to help others, how to contribute to open-source projects, how to write CSS, and even JavaScript. I made the [first commit to this site on May 6, 2022](https://github.com/uncenter/uncenter.org/commit/11b536cd596463e42e2175a312dbf0439ca77103), so coming up on a year with Eleventy in a few months. I think I am more than qualified to give my thoughts!

## The website...
One of the very very few unpleasant experiences I have had with Eleventy is the website. Instead of attempting to articulate myself well, I'll show you.

### The homepage

My first observation about the homepage lies in the very first section you see after opening [11ty.dev](https://11ty.dev).

{% image "first-homepage-section.png", "The first section on the Eleventy homepage, with links to Docs, Search, Blog, and social medias." %}

I love having everything all in one place, I do... but this is a little crammed and unorganized. On first glance, you might not even notice the link to the documentation or to the blog, both of which are presumably mainly what you are visiting the website for. I think the <strong>bold</strong> and <u>underline</u> are meant to highlight the significance of those important links, but on the contrary they just add to the effect of disorganization and confusion, inconsistency even.

Another noticeable problem with the homepage is the Quick Start section, as seen below. It's not particularly bad but I've come to realize, after [witnessing](https://hachyderm.io/@KatherineInCode/109866326892317408) and interacting with people new to Eleventy, that many, many people are unfamiliar with the command line. While it is super important at some point to learn and understand how to use it, there ought to be a better way to explain how to make a new `index.md` file than using the `echo` command. The section also doesn't explain how to set up a folder structure, a configuration, or anything you actually need to do for a proper site. I know that Eleventy tries to remain as un-opinionated as possible, but this is hindering more than helping. Instead of going around the issue, why don't we address it by providing multiple simple methods of organizing a project.

{% image "quick-start-section.png", "The quick start section on the homepage with instructions on how to get started." %}

On a better note though, here is a part I actually like about the homepage.

{% image "faster-and-faster-websites.png", "The speed race visual/animation showcasing 11ty's prowess over competing web frameworks." %}

I love this animation and it's a convincing visual. Makes me glad I started with Eleventy instead of Gatsby or Next.js.

### The documentation
I want to start thinking about this by putting yourself in someone else's shoes, a beginner's shoes. You are super excited to try this awesome and easy static site generator that your friend mentioned, and after finding the *completely normal sized* documentation button on the homepage, you landed here, at the documentation overview page.

{% image "eleventy-documentation.png", "The documentation homepage on the 11ty website." %}

There are two things I'd like to mention here. First, the "trusted by" section. While it is amazing to see all of those well known companies and websites use Eleventy or whatever, I think the placement is odd. The page that the documentation opens up to sounds more like a pitch for why you should use Eleventy, rather than a convenient resource to guide your site. I think it would be better suited to be on the homepage, since by the time you reach the documentation, you are most likely already interested in using it. Second, the table of contents. For the most part, it's fine. My issue lies in the order of the content suggested by the table of contents. The pitch I mentioned earlier for Eleventy continues here. Again, moving these and the testimonials to the homepage might make more sense. And the same goes for the Community section in the table of contents.

I also want to reference [the Github issue](https://github.com/11ty/eleventy/issues/2855) on that led to writing this post. I was really interested in [@darthmall's comment](https://github.com/11ty/eleventy/issues/2855#issuecomment-1463988371) about the four types of documentation (copied from the issue, edited with my own words):

- Tutorials
	- A **complete** lesson that walks you through accomplishing a real, applicable task.
- How-tos
	- Short recipes or "tips" for accomplishing very specific things, the likes of [11ty.recipes](https://11ty.recipes/) and [11ty.rocks](https://11ty.rocks/)
- Reference
	- The actual specification/dictionary of everything there is to know (what most people consider documentation, like all the `eleventyConfig` options).
- Key topics
	- Higher level concepts that probably aren't useful to new users but are important to explain, like the data cascade or `eleventy.before`/`eleventy.after`.

I love this idea. And actually, Eleventy does have most of these, but unfortunately they aren't presented in the best way. The Getting Started section is fine, but it isn't a real tutorial as defined above. Again, I put myself in a new user's shoes while thinking about this and I want to point out that there don't seem to be any other good options either! To test this theory, I opened an Incognito tab to see what pops up when I search from "make an eleventy website" on Youtube.

{% image "youtube-search-for-eleventy.png", "The results of the search 'make an eleventy website' on Youtube." %}

Neither of the first two results are recent- the videos in Bryan Robinson's tutorial series were produced between May and September of 2019, almost three years ago. And the 11ty Rocks! video was published over two years ago as of last month. And the often-recommended [Learn Eleventy from Scratch](https://learneleventyfromscratch.com/) tutorial is sadly plastered with warnings of outdated content (most of it is up to date actually, but I understand the reasoning behind the warning).

{% image "eleventy-from-scratch-warning.png", "The mentioned outdated content warning is the first thing seen on the Learn Eleventy from Scratch website." %}

Furthermore, none of those are official Eleventy resources. My conclusion from all this is this:

1. We need a new up-to-date getting started series - not as in-depth as Learn Eleventy from Scratch, but certainly longer than the current Getting Started page (a tutorial, not a reference).
2. It needs to be on the Eleventy website, and not just a link to a different website.
3. It needs to be the first thing you see on website, not tucked away in a sidebar.

I don't want to self-promote but I have actually tried to solve a few of this issues by making a CLI tool that scaffolds your project for you. [Try it out](https://github.com/uncenter/create-eleventy-app) or [read about how I made it](https://www.uncenter.org/posts/making-create-eleventy-app/).

Overall, I think there is a lot that needs to be done. And I'm not writing about this as a criticism, but rather I wish the best for Eleventy and it is important to me to have it succeed!
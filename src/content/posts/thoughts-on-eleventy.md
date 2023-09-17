---
tags: ['11ty', 'thoughts']
title: An honest review of Eleventy
description: My thoughts on Eleventy after using it for almost a year.
createdAt: 2023-03-16
modifiedAt: 2023-07-08
---

## Foreword

This website is built with the Eleventy static site generator; a simple, fast, and powerful static site generator. I've been using Eleventy for almost a year now, since [May 2022]({{ meta.repository | url('https://github.com/')}}/commit/11b536cd596463e42e2175a312dbf0439ca77103), and I've actually learned more than just how to make a website! I've learned how to write blog posts, how to make a pull request, how to open an issue, how to help others, how to contribute to open-source projects, how to write CSS or JavaScript, etc. I've learned a lot, and I've had a lot of fun doing it! On that note, I'd like to share some of my thoughts on Eleventy.

## The good

11ty is really good at what it does! It transforms my files quickly and has a great community who are always more than willing to help. It's lack of opinionated defaults is mostly a blessing, though it makes it a little more difficult to get started. Eleventy also has a simple and easy-to-use API, which makes it easy to add custom functionality and create plugins. I use two of my own plugins, [`@uncenter/eleventy-plugin-toc`]({{ meta.author.github.url }}/eleventy-plugin-toc) and [`eleventy-plugin-icons`]({{ meta.author.github.url }}/eleventy-plugin-icons), and a few others from the community. Eleventy also maintains a few official plugins, ones for syntax highlighting, pagination, image optimization, fetching remote data, and more.

### The community

As I mentioned earlier, the Eleventy community is great! If you are new to Eleventy, I highly recommend joining the [Eleventy Discord server](https://www.11ty.dev/blog/discord/) and asking questions there. The community is very friendly and helpful, and you will almost always get a response within a few hours. You also can see what others are doing with Eleventy and get inspiration for your own projects.

## The ugly

### Website

One of the few frustrating experiences I have had with Eleventy is the website. Especially when I was starting out, I found it difficult to navigate and find what I was looking for. Thankfully, a search feature was added a few months ago, which has helped a lot. But there are still some things that I think could be improved.

### The homepage

My first issue about the homepage appears in the very first section you see after opening [11ty.dev](https://11ty.dev).

{% image "/thoughts-on-eleventy/first-homepage-section.png", "The first section on the Eleventy homepage, with links to the documentation, search, blog, and social medias." %}

I love having everything all in one place, but this is crammed and unorganized. On first glance, you might not even notice the link to the documentation or to the blog, both of which are presumably mainly what you are visiting the website for. The best solution would probably be to have a navigation bar at the top of the page, with links to the documentation, blog, and search. The social media links could be moved to the footer, or even removed entirely. The big logo/11ty text that takes up the top two-thirds of the page looks cool, but just makes it more difficult to find what you are looking for.

Another noticeable problem with the homepage is the Quick Start section, as seen below. It's not particularly bad but I've come to realize, after [witnessing](https://hachyderm.io/@KatherineInCode/109866326892317408) and interacting with people new to Eleventy, that many, many people are unfamiliar with the command line - I was too when I started out. While it is super important at some point to learn and understand how to use it, there ought to be a better way to explain how to make a new `index.md` file than using the `echo` command. The section also doesn't explain how to set up a folder structure, a configuration, or anything you actually need to do for a proper site. I know that Eleventy tries to remain as un-opinionated as possible, but this is hindering more than helping. Instead of going around the issue, why don't we address it by providing multiple simple methods of organizing a project.

{% image "/thoughts-on-eleventy/quick-start-section.png", "The quick start section on the homepage, contains instructions on how to get started." %}

On a better note though, here is a part I actually like about the homepage.

{% image "/thoughts-on-eleventy/faster-websites-animation.png", "An animation
showcasing 11ty's prowess over competing static site generators in a race-like fashion." %}

I love this animation and it's a convincing visual. Makes me glad I chose Eleventy!

### The documentation

I want to start thinking about this by putting yourself in someone else's shoes, a beginner's shoes. You are super excited to try this awesome and easy static site generator that your friend mentioned, and after finding the _completely normal sized_ documentation button on the homepage, you landed here, at the documentation overview page.

{% image "/thoughts-on-eleventy/docs-homepage.png", "The documentation homepage on the 11ty website." %}

There are two things I'd like to mention here. First, the "trusted by" section. While it is amazing to see all of those well known companies and websites use Eleventy, the placement is definitely odd. It would be better suited on the homepage, since by the time you reach the documentation, you are already interested in using Eleventy! Second, the table of contents. For the most part it's fine, but the order of the content suggested by the table of contents lists testimonials and other unnecessary categories first.

I also want to reference [the GitHub issue](https://github.com/11ty/eleventy/issues/2855) on that led to writing this post. I was really interested in [@darthmall's comment](https://github.com/11ty/eleventy/issues/2855#issuecomment-1463988371) about the four types of documentation (copied from the issue, edited with my own words):

- Tutorials
  - A **complete** lesson that walks you through accomplishing a real, applicable task.
- How-tos
  - Short recipes or "tips" for accomplishing very specific things, the likes of [11ty.recipes](https://11ty.recipes/) and [11ty.rocks](https://11ty.rocks/)
- Reference
  - The actual specification/dictionary of everything there is to know (what most people consider documentation, like all the `eleventyConfig` options).
- Key topics
  - Higher level concepts that probably aren't useful to new users but are important to explain, like the data cascade or `eleventy.before`/`eleventy.after`.

I love this way of approaching it. And actually, Eleventy does have most of these, but unfortunately they aren't presented in the best way. The Getting Started section is fine, but it isn't a real tutorial as defined above. Again, I put myself in a new user's shoes while thinking about this and I want to point out that there don't seem to be any other good options either! To test this theory, I opened an new incognito tab to see what appears when I search from "make an eleventy website" on Youtube.

{% image "/thoughts-on-eleventy/youtube-search-for-eleventy.png", "The results of the search 'make an eleventy website' on Youtube." %}

Neither of the first two results are recent- the videos in Bryan Robinson's tutorial series were produced between May and September of 2019, almost three years ago. And the '11ty Rocks!' video was published over two years ago as of last month. And the often-recommended [Learn Eleventy from Scratch](https://learneleventyfromscratch.com/) tutorial is sadly plastered with warnings of outdated content.

{% image "/thoughts-on-eleventy/eleventy-from-scratch-warning.png", "The mentioned outdated content warning is the first thing seen on the Learn Eleventy from Scratch website, a scary red banner discouraging new users from using the tutorial." %}

Furthermore, none of those are official Eleventy resources. My conclusion from all this is this:

1. We need a new up-to-date getting started series - not as in-depth as Learn Eleventy from Scratch, but certainly longer than the current Getting Started page (a tutorial, not a reference).
2. It needs to be on the Eleventy website, and not just a link to a different website.
3. It needs to be the first thing you see on website, not tucked away in a sidebar.

I have actually tried to solve a few of this issues by making a CLI tool that scaffolds your project for you. [Try it out]({{ meta.author.github.url }}/create-eleventy-app) and let me know what you think!

I think there is a lot that needs to be done. And I'm not writing about this as a criticism, but rather I wish the best for Eleventy and it is important to me to have it succeed! I hope this post was interesting and I'm looking forward to seeing what the future holds for Eleventy (including some updates to the website?!).

---
title: My new Learn Eleventy course
description: Updates on reviving a resource for the Eleventy community
tags: ["eleventy", "learn-eleventy"]
date: 2026-03-02
comments: true
---

If you're familiar with the [Eleventy](https://www.11ty.dev/) community, you've likely come across [Andy Bell](https://bell.bz/)'s excellent free course, [Learn Eleventy from Scratch](https://learneleventyfromscratch.com/). Learn Eleventy from Scratch has been an invaluable resource to the community since it was published. Unforunately, time inevitably moves on. Originally written in 2021 — before the release of Eleventy v1.0.0! — parts of the course have gradually become outdated as Eleventy evolved.

As an avid user of Eleventy — you might have seen me in GitHub issues, on the Discord support channels, or used one of my plugins — I decided to create a fork of the course, titled "Learn Eleventy", in April of 2023. Initially, with my limited time for it, the fork focused on modernizing the foundation: it was rebuilt with a newer Eleventy-based site (huge thanks to [Sandro Roth](https://sandroroth.com/) for the [Eleventy Notes framework](https://eleventy-notes.sandroroth.com/)!) and accumulated various fixes and updates.

In late 2024, I noticed a sizeable jump — over a six-fold increase — in visitors to the course! As it turns out, a random contributor had suggested a change that Andy had merged, adding a link to my fork in a note at the top of the course. With so many new learners, I felt a new responsibility to work on the course and keep it up to date — especially since Eleventy itself had been evolving, reaching v3.0.0 in the time since the fork began. Although it took until June for me to find enough time to devote to the course, I began to work in the background on more substantial content updates.

I had hoped to complete the content overhaul before the new year, and I got pretty close! On January _2nd_ of this year, I finally [merged the dev branch](https://github.com/uncenter/learn-eleventy/pull/19) and removed the original Gulp-based asset pipeline, teaching instead Eleventy's native asset pipeline techniques (the official Eleventy Image plugin, Sass via Custom Template Languages, and more), as well as migrating all of the code samples to modern ESM syntax.

Several other updates arrived at the same time or since. The course has switched to the latest version — v2 — of the official Eleventy RSS plugin, and Moment has been replaced with Luxon for date formatting. I'm also excited to introduce a personal favorite, downloadable lesson files! A [separate repository](github.com/uncenter/learn-eleventy-completed) tracks all content changes in the course repository and compiles per-lesson ZIP archives of what the course expects you to have built by that point.

And one final update: this weekend, after [much](https://bsky.app/profile/did:plc:rkm6m4dsc4da2yzdlvxorhf3/post/3luxg4ilp2c2k) [deliberation](https://bsky.app/profile/did:plc:rkm6m4dsc4da2yzdlvxorhf3/post/3mbijlczalc22), I officially purchased and launched a new domain for the course — welcome to [learneleventy.dev](https://learneleventy.dev)!
The course's "Issue 33" completed project site also now has it's own home, separate from the original course demo, at [issue33.learneleventy.dev](https://issue33.learneleventy.dev/).

::: note
The domain for the course previously — [learn-eleventy.pages.dev](https://learn-eleventy.pages.dev) — is still active and up to date, though this might change to redirect to the new domain soon.
:::

If you are an Eleventy user, or want to learn to become one, I hope this course can be a valuable resource for you! ❤️

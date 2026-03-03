---
title: My new Learn Eleventy course
description: Updates on reviving a resource for the Eleventy community
tags: ["eleventy", "learn-eleventy"]
date: 2026-03-02
comments: true
---

If you are familiar with the [Eleventy](https://www.11ty.dev/) community, you might have seen the popular, free tutorial course created by [Andy Bell](https://bell.bz/) — [Learn Eleventy from Scratch](https://learneleventyfromscratch.com/). Learn Eleventy from Scratch has been an invaluable resource to the community since it was published. Unforunately, the wheel of time took its toll, and its content has gradually become outdated. Believe it or not, the course was originally written before Eleventy v1.0.0, in 2021!. As an avid Eleventy user — you might have seen me in GitHub issues, on the Discord support channels, or used one of my plugins — I created a fork, titled "Learn Eleventy", all the way back in April of 2023. For a time, the fork's primary differences were that it was built with a newer Eleventy-based site (huge thanks to [Sandro Roth](https://sandroroth.com/) for the [Eleventy Notes framework](https://eleventy-notes.sandroroth.com/)!) and minor fixes.

In late 2024, I noticed a sizeable jump — six-fold increase — in visitors to the course, and realized Andy had merged a change that started linking to my fork in a note on the original course. With the sudden influx of users, I had a new impetus to work on the course — especially since in the preceding two-ish years, Eleventy had made even more leaps — on to v3.0.0! It took until June for me to find enough time to devote to the course, so starting in June, I began to work on some larger content changes in the background.

I was hoping to have finished my make-over to the content before the new year, and I got pretty close! On January _2nd_ of this year, I finally [merged the dev branch](https://github.com/uncenter/learn-eleventy/pull/19) and ripped out the original Gulp-based asset pipeline, switching the content over to teach Eleventy's native asset pipeline techniques and using the amazing official Eleventy Image plugin, as well as migrating all code samples to ESM. Other recent pull requests also switched to the latest version (v2) of the official Eleventy RSS plugin, and replaced Moment with Luxon for date formatting. A long awaited feature has also been added... downloadable lesson files! A [separate repository](github.com/uncenter/learn-eleventy-completed) tracks all content changes in the course repository and compiles per-lesson ZIP archive of what the course expects you to have done by that point.

My final update on the course is that this weekend, after [much](https://bsky.app/profile/did:plc:rkm6m4dsc4da2yzdlvxorhf3/post/3luxg4ilp2c2k) [deliberation](https://bsky.app/profile/did:plc:rkm6m4dsc4da2yzdlvxorhf3/post/3mbijlczalc22), I have finally purchased and set up a new domain for the course — please welcome [learneleventy.dev](https://learneleventy.dev)! The course's "Issue 33" completed project site is also now running separately from Andy's original demo, at [issue33.learneleventy.dev](https://issue33.learneleventy.dev/).

::: note
The old course domain — [learn-eleventy.pages.dev](https://learn-eleventy.pages.dev) — is still active and up to date, though this might change to redirect to the new domain soon.
:::

If you are an Eleventy user, or want to learn to become one, I hope this course can be a valuable resource for you! ❤️

---
title: My new Learn Eleventy course
description: Updates on reviving a resource for the Eleventy community
tags: ["eleventy", "learn-eleventy"]
date: 2026-03-02
comments: true
---

If you are familiar with the [Eleventy](https://www.11ty.dev/) community, you might have seen the popular, free tutorial course created by [Andy Bell](https://bell.bz/) — [Learn Eleventy from Scratch](https://learneleventyfromscratch.com/). Though, as the course was originally written in 2021 — before Eleventy v1.0.0! — its content has gradually become outdated.
As an avid Eleventy user — you might have seen me in GitHub issue, on the Discord support channels, or used one of my plugins — I, in April of 2023, created a fork titled "Learn Eleventy". At first, the new course's main differences were in a newer site (built with Eleventy—huge thanks to [Sandro Roth](https://sandroroth.com/) for the [Eleventy Notes framework](https://eleventy-notes.sandroroth.com/)) and minor fixes. But beginning in 2025, I began to work on some larger content changes in the background.

## Revamped content

I was hoping to have finished my revamp to the course content before the new year, and I got pretty close! On January 2nd of this year, I landed [a large pull request](https://github.com/uncenter/learn-eleventy/pull/19) that ripped out the original Gulp-based asset pipeline, switching the content over to teach Eleventy's native asset pipeline techniques and using the amazing official Eleventy Image plugin, as well as migrating all code samples to ESM. Other recent pull requests also switched to the latest version (v2) of the official Eleventy RSS plugin, and replaced Moment with Luxon for date formatting.

The course also now has a long awaited feature... downloadable lesson archives! I am maintaining [a separate repository](github.com/uncenter/learn-eleventy-completed) that tracks all content changes in the course repository and compiles per-lesson ZIPs of what the course expects you to have done by that point.

## A new domain

My final update on the course is that this weekend, after [much](https://bsky.app/profile/did:plc:rkm6m4dsc4da2yzdlvxorhf3/post/3luxg4ilp2c2k) [deliberation](https://bsky.app/profile/did:plc:rkm6m4dsc4da2yzdlvxorhf3/post/3mbijlczalc22), I have finally purchased and set up a new domain for the course — please welcome [learneleventy.dev](https://learneleventy.dev)! The course's "Issue 33" completed project site is also now running separately from Andy's original demo, at [issue33.learneleventy.dev](https://issue33.learneleventy.dev/).

The old course domain — [learn-eleventy.pages.dev](https://learn-eleventy.pages.dev) — is still active and up to date, though this might change to redirect to the new domain soon.

Thanks for reading all the way to this point! If you are an Eleventy user, or want to learn to become one, I hope this course can still be a valuable resource for you and the community at large.

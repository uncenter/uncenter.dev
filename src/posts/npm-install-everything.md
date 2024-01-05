---
tags: ['npm']
title: The package that broke NPM (accidentally)
description: How we made a package that depends on every single NPM package... and broke NPM in the process.
date: 2024-01-03
edited: 2024-01-04
comments: true
# cSpell:ignore unpublish, unpublishing
---

:::note

## An update! {data-toc-exclude}

<details>
	<summary>You might want to read the rest of the article first...</summary>

GitHub has now, a day after writing this, fully "disabled" (whatever that means) our `everything-registry` organization on NPM and GitHub; you can see the email they sent to me below. While I may not agree entirely with the reasoning they provided, I am very thankful that our personal accounts are still intact!

<details>
	<summary>Email from GitHub Trust & Safety</summary>
	{% image "github-trust-and-safety-email.png" %}
</details>

All of [our scoped packages](https://www.npmjs.com/org/everything-registry) have been deleted, so unpublishing packages should no longer be an issue.

Another note; this story was picked up by some media outlets in the cybersecurity world! [SC Media](https://www.scmagazine.com/news/npm-registry-prank-leaves-developers-unable-to-unpublish-packages), [Checkmarx](https://checkmarx.com/blog/when-everything-goes-wrong-npm-dependency-hell-campaign-2024-edition/), and [BleepingComputer](https://www.bleepingcomputer.com/news/security/everything-blocks-devs-from-removing-their-own-npm-packages/).

<details>
	<summary>The aforementioned articles</summary>
	{% image "sc-media-article.png" %}
	{% image "checkmarx-article.png" %}
	{% image "bleepingcomputer-article.png" %}
</details>

{% image "tech-twitter-knows.png" %}

</details>
:::

Ten years ago, [PatrickJS](https://github.com/PatrickJS) created the `everything` package on NPM, containing every package on the NPM registry in the first 5 years of the registry's existence. The package remained the same for years, but that all changed just a few days ago with [a single tweet](https://twitter.com/trashh_dev/status/1740756965905875311).

{% image "the-tweet.png", "the perfect repo doesn’t exi… (a link to Patrick's node-everything repository)",  { dark: "the-tweet-dark.png" } %}

I saw the tweet on my timeline and [made a quick PR](https://github.com/everything-registry/everything/pull/6) to clean up a few things and help bring the repository up to speed. At the same time, Patrick had started an attempt to publish a `2.0.0` version of the package, but he discovered that there was now a `10` megabyte limit for the uncompressed size of a package. I [made a comment](https://github.com/everything-registry/everything/pull/6#issuecomment-1872278630) about the issue and we quickly [began brainstorming](https://github.com/everything-registry/everything/pull/6#issuecomment-1872294994) a solution.

## Brainstorming...

We moved to Twitter DMs, and by this time others who saw Trash's tweet wanted to join — [Hacksore](https://hacksore.com/), and Trash himself. We came up with a plan to divide the ~2.5m packages into "scoped" groups of packages; a group for packages starting with the letter "a", the letter "b", and the rest of the alphabet, and then the numbers "0" to "9", and finally an "other" category for anything else. Since each of these scoped packages would only be a subset of the total, they would easily pass the size limit, and the main `everything` package could just depend on each of these scoped packages.

{% image "plan-a.png", "A diagram of the core 'everything' package depending on many other scoped packages",  { dark: "plan-a-dark.png" } %}

## Unforseen issues

[I began implementing some code](https://github.com/everything-registry/everything/pull/7) to generate the required packages, and a few hours later we were ready to go- except we forget one thing. Or, rather, NPM didn't tell us one thing. It turns out that NPM has a limit for how many dependencies a package can have. And we were apparently _way_ over it. NPM has no apparent documentation on this and the limit wasn't visible in any public source code (the registry is private), so Hacksore [did some testing](https://github.com/Hacksore/max-npm-package-deps) and discovered the limit to be 800 dependencies. At the current range of 90k to 300k dependencies per scoped package... we needed a new plan.

## Back to the drawing board

I suggested a new, very basic plan: just split them into "chunks" (groups) of 800 dependencies.

{% image "plan-b-initial.png", "A diagram of the core 'everything' package with arrows toward many 'chunked' packages", { dark: "plan-b-initial-dark.png" } %}

This leaves 3246 groups though, and 3246 is still too many for our main `everything` package to hold. So we simply "chunk" the 3246 groups of 800 into groups of 800 again.

{% image "plan-b.png", "A diagram of the core 'everything' package with arrows toward many 'chunked' packages, each of which in turn has arrows toward more 'sub-chunked' packages", { dark: "plan-b-dark.png" } %}

## 3...2...1... go!

Set on our new plan, we updated the code and triggered [our GitHub Actions workflow](https://github.com/everything-registry/everything/blob/1aef5aa3aa5e3d0e2107063cad6ce63f9cba9b0b/.github/workflows/release.yml)...

{% image "plan-b-countdown.png" %}

It worked! The [GitHub Action logs](https://github.com/everything-registry/everything/actions/runs/7361935655/job/20039814620) rolled in, one after another, as the packages slowly got published. We had a brief scare after realizing that [GitHub Actions jobs and workflows have a maximum time](https://docs.github.com/en/actions/learn-github-actions/usage-limits-billing-and-administration) that we might reach, but some quick calculations revealed that we had no cause for worry. Workflow jobs time out after 6 hours, and at the current rate of one package published every ~4.5 seconds, we could comfortably publish 4,800+ packages in that time.

{% image "plan-b-success.png" %}

We all went back to doing other things, and I checked the logs occasionally. Half an hour later though, we ran into a different problem... we had been rate limited. In 32 minutes, we had published 454 packages: the main `everything` package, all five "chunks", but only 448 "sub-chunks". It was only a fraction (roughly 14%) of everything (hah, pun intended) we needed to publish.

## What next??

I [made a quick fix](https://github.com/everything-registry/everything/commit/1aef5aa3aa5e3d0e2107063cad6ce63f9cba9b0b) before heading to bed to skip the packages we had already published, but we still didn't have any sort of plan to deal with rate limiting. Overnight between the 29^th^ and the 30^th^, we settled on a new plan. We would periodically run a workflow that publishes as many packages as it can, and then the workflow saves the work it did to the repository so the next run can pick up where the last one left off. I replaced the sketchy manual intervention from the night before with a proper `published.json` file to keep track of the published packages, and [initialized it](https://github.com/everything-registry/everything/commit/fafc0ccf92b74eb994136c49b3ae87a7016d6e77). I [wrote a release script](https://github.com/everything-registry/everything/commit/3bd649ab3bd74a6d7933b8e4ad5116b9b987889d) that wrote back to `published.json` after publishing each package (I know, I know, this could be better) and [added a step to the workflow](https://github.com/everything-registry/everything/commit/85c8bed75a15e81c66a750e3ea36a4f3bb166fcc) to commit the changes after each run. After a few hiccups, it finally worked!

So it began. Throughout the day I (very irregularly) manually dispatched the workflow. For a while, we sat and waited. We even began an effort to actually run `npm install everything` (well, `yarn add everything`) and put up a Twitch stream of the installation on a virtual machine.

{% image "twitch-stream.png", { dark: "twitch-stream-dark.png" } %}

We also [made a website](https://everything-registry-website.pages.dev/)! Many thanks to the rest of the contributors I have mentioned so far, but notably [Evan Boehs](https://boehs.org/) for leading the charge and [PickleNik](https://github.com/PickleNik) made it look nice.

## Finale

Finally, at 11:27PM, [the final workflow run](https://github.com/everything-registry/everything/actions/runs/7368358420) completed publishing the last 20 sub-chunks. All 5 chunks, 3246 sub-chunks, and the main `everything` package. In total, depending on over 2.5 million NPM packages!

## A vulnerability?

The initial response to our endeavour was... not positive. People began coming to the repository, complaining about not being able to unpublish. What?! We looked into it, and it turns out that the issue was our usage of "star" versions; that is, specifying the version not as a typical semantic version in the format of `X.Y.Z`, but as `*`. The star means "any and all" versions of a package - here is where the issue lies. NPM blocks package authors from unpublishing packages if another package depends on that version of the package. But since the star is _all_ versions, all versions of a package cannot be unpublished. This is usually harmless, but us (unintentionally) doing this on a large scale prevented _anyone_ from unpublishing. We immediately reached out to GitHub; Patrick used his network and contacts to speak to people at GitHub, and we sent multiple emails to the support and security teams on NPM. Unfortunately, these events transpired over the holidays and the NPM/GitHub teams were not responding (likely out of the office). We continued to get harsh and rude comments from random people with a little too much time on their hands... one person even [wrote a 1400 word rant](https://github.com/everything-registry/everything/issues/21) about the unpublishing issue, despite us repeatedly telling them we could do nothing further.

Thankfully, on the night of Janurary 2^nd^, GitHub reached out and let us know they were aware of the problem. On the 3^rd^ of January, we received a notice that our GitHub organization had been "flagged" and our organization and repositories were hidden. Not what we wanted to see, but progress nonetheless.

{% image "org-flagged.png" %}

They also began removing our organization's scoped packages on NPM, as we had suggested. The initial problem had been solved, but we are still waiting to see how NPM prevents this issue in the future. My two cents are that NPM should either a) prevent folks from publishing packages with star versions in the package.json entirely, or b) don't consider a dependent of a package if it uses a star version when tallying how many packages depend on a package for unpublishing.

Lastly, I want to apologize for anyone frustrated, annoyed, or just angry at us. We made a mistake, and we've owned up to it. This all started as a harmless joke and we had no intentions of breaking, abusing, or doing any sort of damage to the registry. In short we, uhh... fucked around and found out.

{% image "fuck-around-find-out.jpg" %}

Thanks for reading this, and have a lovely day!

_Now_ you can [read the update](#an-update!) if you haven't already!

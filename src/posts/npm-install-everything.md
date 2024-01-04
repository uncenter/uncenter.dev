---
tags: ['npm']
title: The package that broke NPM (accidentally)
description: How we made a package that depends on every single NPM package... and how we broke NPM in the process.
date: 2024-01-03
edited: 2024-01-03
comments: true
# cSpell:ignore unpublish, unpublishing
---

Nine years ago, [@PatrickJS](https://github.com/PatrickJS) created the `everything` package on NPM, containing every package on the NPM registry in the first 5 years of the registry's existence. The package remained unchanged for years, but just a few days ago [a tweet](https://twitter.com/trashh_dev/status/1740756965905875311) from [@Trash](https://twitter.com/trashh_dev/) sparked renewed interest in the project!

{% image "the-tweet.png", "the perfect repo doesn’t exi… (a link to Patrick's node-everything repository)",  { dark: "the-tweet-dark.png" } %}

I saw the tweet on my timeline and [made a quick PR](https://github.com/everything-registry/everything/pull/6) to clean up a few things and help bring the repository up to speed. At the same time, Patrick had started an attempt to publish a `2.0.0` version of the package, but he discovered that there was now a `10` megabyte limit for the uncompressed size of a package. I [made a comment](https://github.com/everything-registry/everything/pull/6#issuecomment-1872278630) about the issue and we quickly [began brainstorming](https://github.com/everything-registry/everything/pull/6#issuecomment-1872294994) a solution.

## Phase 1: Brainstorming

We moved to Twitter DMs, and by this time others who saw Trash's tweet wanted to join — [Hacksore](https://hacksore.com/), and Trash himself. We came up with a plan to divide the ~2.5m packages into "scoped" groups of packages; a group for packages starting with the letter "a", the letter "b", and the rest of the alphabet, and then the numbers "0" to "9", and finally an "other" category for anything else. Since each of these scoped packages would only be a subset of the total, they would easily pass the size limit, and the main `everything` package could just depend on each of these scoped packages.

{% image "plan-a.png", "A diagram of the core 'everything' package depending on many other scoped packages",  { dark: "plan-a-dark.png" } %}

## Phase 2: Execution

[I began implementing some code](https://github.com/everything-registry/everything/pull/7) to generate the required packages, and a few hours later we were ready to go- except we forget one thing. Or, rather, NPM didn't tell us one thing. It turns out that NPM has a limit for how many dependencies a package can have. And we were apparently _way_ over it. NPM has no apparent documentation on this and the limit wasn't visible in any public source code (the registry is private), so Hacksore [did some testing](https://github.com/Hacksore/max-npm-package-deps) and discovered the limit to be 800 dependencies. At the current range of 90k to 300k dependencies per scoped package... we needed a new plan.

## Phase 3: Back to the drawing board.

I suggested a new, very basic plan: just split them into "chunks" (groups) of 800 dependencies. This leaves 3246 groups of 800 each, but 3246 is still too many for our main `everything` package to hold; so we simply "chunk" the groups of 800 into groups of 800 again.

{% image "plan-b.png", "A diagram of the core 'everything' package depending on many 'chunked' packages, each of which in turn depends on more 'sub-chunked' packages", { dark: "plan-b-dark.png" } %}

## Phase 4: Execution (again)

We triggered [our GitHub Actions workflow](https://github.com/everything-registry/everything/blob/1aef5aa3aa5e3d0e2107063cad6ce63f9cba9b0b/.github/workflows/release.yml) and watched in anticipation...

{% image "plan-b-countdown.png" %}

And it worked! The [GitHub Action logs rolled in](https://github.com/everything-registry/everything/actions/runs/7361935655/job/20039814620), one after another, as the packages slowly got published. We had a brief scare after realizing that [GitHub Actions jobs and workflows have a maximum time](https://docs.github.com/en/actions/learn-github-actions/usage-limits-billing-and-administration) that we might reach, but some quick calculations revealed that we had no cause for worry. Workflow jobs time out after 6 hours, and at the current rate of one package published every ~4.5 seconds, we could comfortably publish 4,800+ packages in that time.

{% image "plan-b-success.png" %}

We all went back to doing other things, and I checked the logs occasionally. Half an hour later though, we ran into a different problem.

## 11:33 PM, EST

We had found the limits of NPM's API, and had been rate limited. In 32 minutes, we had published 454 packages: the main `everything` package, all five "chunks", but only 448 "sub-chunks". It was only a fraction (roughly 14%) of everything (hah, pun intended) we needed to publish.

## Phase 5: ???

I [made a quick fix](https://github.com/everything-registry/everything/commit/1aef5aa3aa5e3d0e2107063cad6ce63f9cba9b0b) before heading to bed to skip the packages we had already published, but we still didn't have any sort of plan to deal with rate limiting. Overnight between the 29th and the 30th, we settled on a new plan. We would periodically run a workflow that publishes as many packages as it can, and then the workflow saves the work it did to the repository so the next run can pick up where the last one left off. I replaced the sketchy manual intervention from the night before with a proper `published.json` file to keep track of the published packages, and [initialized it](https://github.com/everything-registry/everything/commit/fafc0ccf92b74eb994136c49b3ae87a7016d6e77). I [wrote a release script](https://github.com/everything-registry/everything/commit/3bd649ab3bd74a6d7933b8e4ad5116b9b987889d) that wrote back to `published.json` after publishing each package (I know, I know, this could be better) and [added a step to the workflow](https://github.com/everything-registry/everything/commit/85c8bed75a15e81c66a750e3ea36a4f3bb166fcc) to commit the changes after each run. After a few hiccups[^1], it finally worked!

And so it began. Throughout the day I, very irregularly, manually dispatched the workflow. For a while, we sat and waited. We even began an effort to actually run `npm install everything` (well, `yarn add everything`) and put up a Twitch stream.

{% image "twitch-stream.png", { dark: "twitch-stream-dark.png" } %}

We also [made a website](ttps://everything-registry.github.io/)! Many thanks to the rest of the contributors I have mentioned so far, but notably [Evan Boehs](https://boehs.org/) for leading the charge and [PickleNik](https://github.com/PickleNik) made it look nice.

## Finale

Finally, at 11:27PM, [the final workflow run](https://github.com/everything-registry/everything/actions/runs/7368358420) completed publishing the last 20 sub-chunks. All 5 chunks, 3246 sub-chunks, and the main `everything` package. In total, depending on over 2.5 million NPM packages!

[^1]: Namely https://github.com/everything-registry/everything/commit/9edd208769da652db2c2eb06196dad4ceb2b452d, https://github.com/everything-registry/everything/commit/f963df11963a80f50ba06107101fcabab7cb5825, and https://github.com/everything-registry/everything/commit/5c50a13ad6de8229f262ff98e798301cee6fc119.

## Response

The initial response to our endeavour was... not positive. People began coming to the repository, complaining about not being able to unpublish. We looked into it, and it turns out that the issue is our usage of "star" versions; that is, specifying the version not as a typical semantic version in the format of `vX.Y.Z`, but as `*`. The star means "any and all" versions of a package - here is where the issue lies. NPM blocks package authors from unpublishing packages if another package depends on that version of the package. But since the star is _all_ versions, all versions of a package cannot be unpublished. This is usually harmless, but unintentionally us doing this on a large scale prevented _anyone_ from unpublishing. We immediately reached out to GitHub; Patrick used his network and contacts to speak to people at GitHub, and we sent multiple emails to the support and security team on NPM. Unfortunately, these events transpired over the holidays and the NPM/GitHub teams were out of the office. We continued to get harsh and rude comments from random people with a little too much time on their hands - one person even [wrote a 1400 word rant](https://github.com/everything-registry/everything/issues/21). Thankfully on the night of Tuesday, Jan 2nd, GitHub reached out and let us know they were aware of the problem. On the 3rd of January, we received a notice that our GitHub organization had been "flagged" and our repositories were hidden.

{% image "org-flagged.png" %}

They also began removing our organization's scoped packages on NPM, as we had suggested. I think it's safe to say the initial problem has been solved, but we are still waiting to see how NPM prevents this issue in the future. My two cents are: a) prevent folks from publishing packages with star versions in the package.json entirely, or b) don't consider a dependent of a package if it uses a star version when tallying how many packages depend on a package for unpublishing.

And lastly, I want to apologize for anyone frustrated, annoyed, or just angry at us. We made a mistake, and we've owned up to it. This all started as a harmless joke and we had no intentions of breaking, abusing, or doing any sort of damage to the registry. In short we, uhh... fucked around and found out.

{% image "fuck-around-find-out.jpg" %}

Thanks for reading this, and have a lovely day!

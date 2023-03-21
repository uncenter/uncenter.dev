---
tags: ['Tailwind']
title: Disabling a Tailwind component
date: 2023-02-25
description: How to disable Tailwind component that you don't want to use
---

Ran into an issue with Tailwind components today. I tried to reduce redundancy in my Tailwind classes by making a class for all of my containers/cards, but in doing so stumbled upon the [Container component](https://tailwindcss.com/docs/container) (I tried using the `.container` class). By default, it messes with `width`/`max-width`, which totally messed up lots of my code. 

Here is what worked! I added the following to my `tailwind.config.js` file:

```js
module.exports = {
    // ...
    corePlugins: { // [sh! focus:start]
        container: false,
    }, // [sh! focus:end]
};
```

You can do this with [any Tailwind core component](https://tailwindcss.com/docs/configuration#core-plugins).
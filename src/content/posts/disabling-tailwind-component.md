---
tags: ['Tailwind']
title: Disabling a Tailwind component
date: 2023-02-25
description: Quick fix for a Tailwind component that you don't want to use.
---

Ran into an issue with Tailwind components today. I tried to reduce redundancy in my Tailwind classes by making a class for all of my containers/cards, but in doing so stumbled upon the [Container component](https://tailwindcss.com/docs/container) (I tried using the `.container` class). By default, it messes with `width`/`max-width`, which totally messed up lots of my code! I spent a while trying to figure out how to disable it[^1], but couldn't find anything. 

Here is what worked! I added the following to my `tailwind.config.js` file:

```js
module.exports = {
    // ...
    corePlugins: { // [sh! focus:start]
        container: false,
    }, // [sh! focus:end]
};
```

You can do this with [any Tailwind core component](https://tailwindcss.com/docs/container).

[^1]: It ended up being simple but without knowing what I was looking for, I couldn't find it. I didn't even know what a core plugin was until I found this solution! :sweat_smile:
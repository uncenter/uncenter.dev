---
tags: ['Tailwind']
title: Disabling a Tailwind component
micro: true
date: 2023-02-25
---

Ran into an issue with Tailwind components today. I tried to reduce redundancy in my Tailwind classes by making a class for all of my containers/cards, but in doing so stumbled upon the [Container component](https://tailwindcss.com/docs/container) (I tried using the `.container` class). By default, it sets with `width`/`max-width`, which messed up the layout.

Since the Container component is a "corePlugin", you can disable it by adding the following to your `tailwind.config.js` file:

```js
module.exports = {
	// ...
	corePlugins: {
		// [sh! focus:start]
		container: false,
	}, // [sh! focus:end]
};
```

You can do this with [any Tailwind core component](https://tailwindcss.com/docs/configuration#core-plugins).

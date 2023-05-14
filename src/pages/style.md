---
title: Style
description: Just a style guide.
collection: 'more'
---

This is my style guide! You can also read my [colophon page](/colophon) if you want to read how I _created_ this website. This document showcases the styles that I use on this website, and is meant to be a reference for myself and others.

{% info "Credit where credit is due" %}
This page is inspired and based of off [Binyamin's style guide](https://binyam.in/style/), which took inspiration from [Brian Devries's style guide](https://brianjdevries.com/style-guide/).
{% endinfo %}

## Block-level elements

{% info "Info"%}
Officia consectetur in labore deserunt qui laborum.
{% endinfo %}

{% warning "Warning" %}
Officia consectetur in labore deserunt qui laborum.
{% endwarning %}

{% tip "Tip" %}
Officia consectetur in labore deserunt qui laborum.
{% endtip %}

{% note %}
Officia consectetur in labore deserunt qui laborum.
{% endnote %}

> This is a blockquote

1. A numbered list

- A bulleted list

* Lorem

  - Ipsum

* [ ] An incomplete task
* [x] A completed task

```py
print("Hello World!") # [sh! highlight]
def sum(a, b):
  return a + b
```

```js
console.log('Hello World!'); // [sh! --]
function sum(a, b) {
	return a + b; // [sh! ++]
}
```

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<!-- [sh! focus:start] -->
		<title></title>
		<meta name="description" content="" />
		<!-- [sh! focus:end] -->
		<meta name="viewport" content="width=device-width, initial-scale=1" />

		<link rel="icon" href="/favicon.ico" sizes="any" />
		<link rel="icon" href="/icon.svg" type="image/svg+xml" />

		<link rel="stylesheet" href="css/style.css" />
	</head>
	<body></body>
</html>
```

{% callout "Browser support for code styling", "info" %}
The above code block is using the [:has()](https://developer.mozilla.org/en-US/docs/Web/CSS/:has) selector to blur the code that is not in focus. This is a new CSS selector that is not yet supported in all browsers. It should work in Chrome and Safari, but not in Firefox yet. I tried to enable it in Firefox with the `layout.css.has-selector.enabled` flag... and it looks like this:
{% image "images/has-selector-failed.png", "Screenshot of failed implementation of the :has() selector in Firefox" %}
It needs some work... but it's a start! For you Firefox users (_cough_ me _cough_), here's what it **should** look like:
{% image "images/has-selector-working.png", "Screenshot of working implementation of the :has() selector in Safari and Chrome" %}
{% endcallout %}

<!-- prettier-ignore -->
*[CSS]: Cascading Style Sheets

## Inline elements

- Keyboard Input: [[icon:cmd]] + [[shift]] + [[p]]
- Inline code - `Inline Code`
- [This is an internal text link](#).
- [This is an external text link](https://github.com)
- **Strong is used to indicate strong importance.**
- _This text has added emphasis._
- The <b>b element</b> is stylistically different text from normal text, without any special importance.
- The <i>i element</i> is text that is offset from the normal text.
- The <u>u element</u> is text with an unarticulated, though explicitly rendered, non-textual annotation.
- <del>This text is deleted</del> and <ins>This text is inserted</ins>.
- <s>This text has a strikethrough</s>
- Superscript^®^.
- Subscript for things like H~2~O.
- <small>This small text is small for for fine print, etc.</small>
- Abbreviation: <abbr title="Hyper Text Markup Language">HTML</abbr>
  - CSS using the markdown-it-abbr plugin.
- <q cite="https://developer.mozilla.org/en-US/docs/HTML/Element/q">This text is a short inline quotation.</q>
- <cite>This is a citation.</cite>
- The <dfn>dfn element</dfn> indicates a definition.
- The ==mark element== indicates a highlight.
- The <var>variable element</var>, such as <var>x</var> = <var>y</var>.
- A footnote is... a footnote[^1].

[^1]: This is a footnote.

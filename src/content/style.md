---
title: Style
styles: ['syntax.css', 'palette.css']
collection: 'more'
SVG: "palette"
---

{% callout ":construction: Work-In-Progress", "warning" %}
This document is evolving slowly! Nothing is final...
{% endcallout %}

This is my style guide. You can also read my [about page](/about) if you want to read how I *created* this website. This document talks more about the visual design.

{% callout ":book: Inspiration", "info" %}
This page is inspired and based of off [Binyamin's style guide](https://binyam.in/style/), which took inspiration from [Brian Devries's style guide](https://brianjdevries.com/style-guide/).
{% endcallout %}


## Block-level elements

{% callout ":book: Info", "info" %}
Officia consectetur in labore deserunt qui laborum.
{% endcallout %}

{% callout ":construction: Warning", "warning" %}
Officia consectetur in labore deserunt qui laborum.
{% endcallout %}

{% callout ":warning: Caution", "caution" %}
Officia consectetur in labore deserunt qui laborum.
{% endcallout %}

{% callout ":hourglass: Update", "update" %}
Officia consectetur in labore deserunt qui laborum.
{% endcallout %}

{% callout ":thumbsup: Tip", "tip" %}
Officia consectetur in labore deserunt qui laborum.
{% endcallout %}

{% callout "Note" %}
Officia consectetur in labore deserunt qui laborum.
{% endcallout %}

> This is a blockquote

{% stoot "fosstodon.org", "109792555995860965" %}


1. A numbered list

* A bulleted list

- Lorem
  - Ipsum

- [ ] An incomplete task
- [x] A completed task


```py
print("Hello World!") # [sh! highlight]
def sum(a, b):
  return a + b
```

```js
console.log("Hello World!") // [sh! --]
function sum(a, b) { // [sh! ++]
  return a + b;
}
```

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8"> <!-- [sh! focus:start] -->
        <title></title>
        <meta name="description" content=""> <!-- [sh! focus:end] -->
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/icon.svg" type="image/svg+xml">

        <link rel="stylesheet" href="css/style.css">
    </head>
    <body>

    </body>
</html>
```

{% callout ":book: Info", "info" %}
The above code block is using the [:has()](https://developer.mozilla.org/en-US/docs/Web/CSS/:has) selector to blur the code that is not in focus. This is a new CSS selector that is not yet supported in all browsers. It should work in Chrome and Safari, but not in Firefox yet. I tried to enable it in Firefox with the `layout.css.has-selector.enabled` flag... and it looks like this:
![Broken implementation of the :has() selector in Firefox](/assets/images/content/firefox-has-selector-failed.png)
It needs some work... but it's a start! For you Firefox users (*cough* me *cough*), here's what it **should** look like:
![Working implementation of the :has() selector in Safari](/assets/images/content/has-selector.png)
{% endcallout %}

<button class="btn">Button</button>

*[CSS]: Cascading Style Sheets

## Inline elements
- Keyboard Input: [[⌘]] + [[Shift]] + [[P]]
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


## Nord Theme

<div class="colors-container">
	<div id="aurora" class="wrapper">
	<h1 class="title">Aurora</h1>
		<div class="palette-card">
			<div class="palette large">
			<div class="swatch-box">
				<div data-color="#bf616a" class="color"></div>
			</div>
			<div class="swatch-box">
				<div data-color="#d08770" class="color"></div>
			</div>
			<div class="swatch-box">
				<div data-color="#ebcb8b" class="color"></div>
			</div>
			<div class="swatch-box">
				<div data-color="#a3be8c" class="color"></div>
			</div>
			<div class="swatch-box">
				<div data-color="#b48ead" class="color"></div>
			</div>
			</div>
		</div>
	</div>
	<div id="frost" class="wrapper">
		<h1 class="title">Frost</h1>
		<div class="palette-card">
			<div class="palette">
				<div class="swatch-box">
					<div data-color="#8fbcbb" class="color"></div>
				</div>
				<div class="swatch-box">
					<div data-color="#88c0d0" class="color"></div>
				</div>
				<div class="swatch-box">
					<div data-color="#81a1c1" class="color"></div>
				</div>
				<div class="swatch-box">
					<div data-color="#5e81ac" class="color"></div>
				</div>
			</div>
		</div>
	</div>
	<div id="polar-night" class="wrapper">
		<h1 class="title">Polar Night</h1>
		<div class="palette-card">
			<div class="palette">
				<div class="swatch-box">
					<div data-color="#2e3440" class="color"></div>
				</div>
				<div class="swatch-box">
					<div data-color="#3b4252" class="color"></div>
				</div>
				<div class="swatch-box">
					<div data-color="#434c5e" class="color"></div>
				</div>
				<div class="swatch-box">
					<div data-color="#4c566a" class="color"></div>
				</div>
			</div>
		</div>
	</div>
	<div id="snow-storm" class="wrapper">
		<h1 class="title">Snow Storm</h1>
		<div class="palette-card">
			<div class="palette small">
				<div class="swatch-box">
					<div data-color="#d8dee9" class="color"></div>
				</div>
				<div class="swatch-box">
					<div data-color="#e5e9f0" class="color"></div>
				</div>
				<div class="swatch-box">
					<div data-color="#eceff4" class="color"></div>
				</div>
			</div>
		</div>
	</div>
</div>

<script>
	const swatches = document.querySelectorAll(".swatch-box");
	swatches.forEach((swatch) => {
		const divColor = swatch.querySelector(".color");
		const background = divColor.getAttribute("data-color");
		divColor.style.backgroundColor = background;

		const divLabel = document.createElement("div");
		divLabel.classList.add("label");
		const divLabelText = document.createElement("span");
		divLabelText.classList.add("text");
		divLabelText.textContent = background;
		swatch.appendChild(divLabel);
		divLabel.append(divLabelText);

		const divLabelButton = document.createElement("button");
		divLabelButton.innerHTML =
			'<svg id="icon-copy" viewBox="0 0 24 24"><path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg>';
		divLabelButton.addEventListener("click", (event) => {
			navigator.clipboard.writeText(background);
	});

	divLabel.appendChild(divLabelButton);
});
</script>
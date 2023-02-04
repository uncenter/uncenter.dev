---
title: Style
styles: ['prism-mix.css', 'palette.css']
collection: 'more'
SVG: "palette"
---

{% note "warning" %}
:construction: **Work-In-Progress**<br>
This document is evolving slowly! Nothing is final...
{% endnote %}

This is my style guide. You can also read my [about page](/about) if you want to read how I *created* this website. This document talks more about the visual design.

{% note "info" %}
:book: **Inspiration**<br>
This page is inspired and based of off [Binyamin's style guide](https://binyam.in/style/), which took inspiration from [Brian Devries's style guide](https://brianjdevries.com/style-guide/).
{% endnote %}


## Typography
- Fonts are Titillium Web for the body text, Inter for my headings, and Questrial for the header.
- Body font sizeis 14pt, but I probably should make it 16pt.

## Block-level elements

> This is a blockquote

1. List
2. of
3. Things


```js
function foo(bar) {
    return bar;
}
```


<button class="btn">Button</button>

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
- Abbreviation: <abbr title="HyperText Markup Language">HTML</abbr>
- <q cite="https://developer.mozilla.org/en-US/docs/HTML/Element/q">This text is a short inline quotation.</q>
- <cite>This is a citation.</cite>
- The <dfn>dfn element</dfn> indicates a definition.
- The ==mark element== indicates a highlight.
- The <var>variable element</var>, such as <var>x</var> = <var>y</var>.
- A footnote is... a footnote[^1].


[^1]: This is a footnote.


## Colors

<div class="colors-container">
	<div id="aurora" class="wrapper">
	<h1 class="title">Aurora</h1>
	<div class="palette-card">
		<div class="palette">
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
</div>

<script>
	const swatches = document.querySelectorAll(".swatch-box");
	swatches.forEach((swatch) => {
  		const divColor = swatch.querySelector(".color");
  		const background = divColor.getAttribute("data-color");
  		divColor.style.backgroundColor = background;

  		const divLabel = document.createElement("div");
  		divLabel.classList.add("label");
  		divLabel.textContent = background;
  		swatch.appendChild(divLabel);

  		const button = document.createElement("button");
  		button.innerHTML = '<svg id="icon-copy" viewBox="0 0 24 24"><path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg>';
  		button.addEventListener("click", (event) => {
    		navigator.clipboard.writeText(background);
  		});

		divLabel.appendChild(button);
	});
</script>
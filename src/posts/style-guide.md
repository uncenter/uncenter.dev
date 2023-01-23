---
tags: 'general'
title: "Style Guide/Testing"
eleventyExcludeFromCollections: true
date: 2023-01-04
---

<!--START-->
This post is a testing article to test how my blog will react! Hopefully, all of this text should show up in the excerpt card on the /posts/ page. Does **bolding** work? _Italics_?<!--END-->
This will not be included in the excerpt.

## Colors

<section class="pallete palleteA">
	<div class="color-swatches">
		<div class="pallete-title">Nord Aurora</div>
		<div class="swatch-container">
			<div class="swatch A tooltip">
				<span class="tooltip-text">#bf616a</span>
			</div>
			<div class="swatch B tooltip">
				<span class="tooltip-text">#d08770</span>
			</div>
			<div class="swatch C tooltip">
				<span class="tooltip-text">#ebcb8b</span>
			</div>
			<div class="swatch D tooltip">
				<span class="tooltip-text">#a3be8c</span>
			</div>
			<div class="swatch E tooltip">
				<span class="tooltip-text">#ACB4D7</span>
			</div>
			<div class="swatch F tooltip">
				<span class="tooltip-text">#A7ACD9</span>
			</div>
			<div class="swatch G tooltip">
				<span class="tooltip-text">#b48ead</span>
			</div>
		</div>
	</div>
</section>
<section class="pallete palleteB">
	<div class="color-swatches">
		<div class="pallete-title">Nord Aurora</div>
		<div class="swatch-container">
			<div class="swatch A tooltip">
				<span class="tooltip-text">#eceff4</span>
			</div>
			<div class="swatch B tooltip">
				<span class="tooltip-text">#e5e9f0</span>
			</div>
			<div class="swatch C tooltip">
				<span class="tooltip-text">#d8dee9</span>
			</div>
			<div class="swatch D tooltip">
				<span class="tooltip-text">#CBD3E1</span>
			</div>
			<div class="swatch E tooltip">
				<span class="tooltip-text">#BEC8DA</span>
			</div>
			<div class="swatch F tooltip">
				<span class="tooltip-text">#B1BDD2</span>
			</div>
		</div>
	</div>
</section>

MacOS: [[⌘]] + [[Shift]] + [[P]]
Windows: [[Ctrl]] + [[Shift]] + [[P]]

Subscript: H~2~0

Superscript: 1^st^ place!

Lorum ipsum dolor. ^[This references 'lorum ipsum dolor'.]

Sample code and code highlighting:
```js
function myFunction() {
  return true;
}
```
```html
<h1>sample</h1>
```
Here's how you can add a color gradient to text:
```css
.title {
	font-size: 28pt;
	text-transform: lowercase;
	background-color: var(--accent-blue);
	background-image: linear-gradient(45deg, var(--accent-blue), black);
	background-size: 100%;
	background-repeat: repeat;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	-moz-background-clip: text;
	-moz-text-fill-color: transparent;
	background-clip: text;
	text-decoration-line: underline;
	text-decoration-style: dotted;
	text-decoration-color: var(--accent-purple);
}
```

Inline code: You can use the built-in function of Python `print()` to display text to the console. Just add your text like this `print("Hello World")` and voila.

## Heading 2

### Heading 3

#### Heading 4
---
title: Style
description: Just a style guide.
---

{% info "Inspiration" %}
This page is inspired and based of off [Binyamin's style guide](https://binyam.in/style/), which took inspiration from [Brian Devries's style guide](https://brianjdevries.com/style-guide/).
{% endinfo %}

## Block-level elements

### Paragraphs

Cillum laboris ex proident et in exercitation eu aliqua cillum magna non. Veniam incididunt id tempor qui cillum laborum reprehenderit esse nisi excepteur velit. Mollit proident consectetur ea adipisicing fugiat cillum nostrud officia ullamco officia amet fugiat. Fugiat excepteur ullamco nulla reprehenderit ipsum do sit laboris.

### Blockquotes/Notes

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

> Cillum exercitation magna eiusmod laborum mollit excepteur irure officia laboris enim laborum in quis. Et irure elit est veniam occaecat culpa. Do commodo consectetur sit nisi ex laboris aute ex fugiat eiusmod velit labore. Nisi minim non dolore et consectetur id. Do nulla tempor magna qui quis ullamco nostrud duis officia laboris est sunt. Veniam consectetur proident dolor excepteur ullamco qui proident exercitation mollit sit.

### Lists

1. A numbered list

- A bulleted list

- Lorem
  - Ipsum

* [ ] An incomplete task
* [x] A completed task

### Code blocks

<pre>
  P R E F O R M A T T E D T E X T
  ! " # $ % &amp; ' ( ) * + , - . /
  0 1 2 3 4 5 6 7 8 9 : ; &lt; = &gt; ?
  @ A B C D E F G H I J K L M N O
  P Q R S T U V W X Y Z [ \ ] ^ _
  ` a b c d e f g h i j k l m n o
  p q r s t u v w x y z { | } ~ 
</pre>

```sh
npm install prettier -D
```

```css
html {
	scroll-behavior: smooth;
}
```

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

### Horizontal rules

---

### Tables

| Syntax    | Description |
| --------- | ----------- |
| Header    | Title       |
| Paragraph | Text        |

### Images

{% image "images/home.png", "Placeholder/example image" %}

## Inline elements

<!-- prettier-ignore -->
*[CSS]: Cascading Style Sheets

- Keyboard Input: [[icon:cmd]] + [[icon:shift]] + [[p]]
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

---
tags: 'general'
title: "Self-Hosting (Google) Fonts"
date: 2023-01-12
---


Fonts are notoriously slow and clunky, but I love my website and I love my fonts (it just doesn’t look the same without). For some performance benefits, and to further separate myself from Google, I began self hosting these fonts. 

## picking font variations

Alright. On my blog, I use three fonts (I know, I know). I use *Titillium Web* for the body text, *Inter* for my headings, and *Questrial* for my header. For each font, there are different variations with different levels of bold. When picking a font, say on [Google Fonts](https://www.notion.so/Self-Hosting-Google-Fonts-d01e0973301743759c5102554ed62ae2), you will probably see options like this: 

- 100 – Thin
- 200 – Extra Light (Ultra Light)
- 300 – Light
- 400 – Normal
- 500 – Medium
- 600 – Semi Bold (Demi Bold)
- 700 – Bold
- 800 – Extra Bold (Ultra Bold)
- 900 – Black (Heavy)

These are used to give the browser the exact typeface to use for specific font weights - without these, there is a phenomenon called **faux bold** (it also happens with italics) - when a website tries to use a font without the proper font files, and the browser attempts to emulate it. Here is a great example from Google Fonts — it’s a small but noticeable difference.

<img src="/assets/images/faux-bold-italic-example.svg" alt="An example of faux (fake) bold and faux italic text. On the left, true italics, bolds, and small caps; on the right, faux italics, faux bolds, and faux small caps." width="200"/>

<aside>
📌 On the left, true italics, bolds, and small caps; on the right, faux italics, faux bolds, and faux small caps. Note how the faux italic has radically different forms, the faux bold appears too crowded, and the faux small caps are considerably lighter in weight.
</aside>

Not all typefaces have all of these, but for *Titillium Web* I grabbed 400 (Normal) and 700 (Bold), both with italic variations, so that I have the option to **bold** text. For the other two, I’m probably not going to be bolding or italicizing anything in my headings and header, so I just grabbed the regular font-weight for those.

## Google Webfonts Helper

This is where we diverge from Google. We picked our fonts, and now we can use this amazing tool from [Mario Ranftl](https://mranftl.com/) called the [Google Webfonts Helper](https://gwfh.mranftl.com/fonts) (GWFH) to download and use the fonts in our CSS.

### @font-family and CSS

To start using this tool, just search your font (one at a time) in the top-left search bar and select the font variations that you decided on. GWFH gives you two options for the CSS `@font-face` , and I opted for the ‘Modern Browsers’ option - This provides `.woff` and `.woff2` files, since I assume anyone reading my blog is using anything but Internet Explorer (`.woff` is supported by Edge, Firefox, Chrome, Safari, Opera, iOS, and Android)

> If you are interested in learning more about different support for font formats, [read this great article that goes into depth on each format](https://medium.com/@aitareydesign/understanding-of-font-formats-ttf-otf-woff-eot-svg-e55e00a1ef2).
> 

For example, here is what the CSS for my *****Inter***** font-family looked like.

```css
/* inter-regular - latin */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  src: url('../fonts/inter-v12-latin-regular.eot'); /* IE9 Compat Modes */
  src: local(''),
       url('/assets/fonts/inter-v12-latin-regular.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('/assets/fonts/inter-v12-latin-regular.woff2') format('woff2'), /* Super Modern Browsers */
       url('/assets/fonts/inter-v12-latin-regular.woff') format('woff'), /* Modern Browsers */
       url('/assets/fonts/inter-v12-latin-regular.ttf') format('truetype'), /* Safari, Android, iOS */
       url('/assets/fonts/inter-v12-latin-regular.svg#Inter') format('svg'); /* Legacy iOS */
}

/* inter-700 - latin */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  src: url('../fonts/inter-v12-latin-700.eot'); /* IE9 Compat Modes */
  src: local(''),
       url('/assets/fonts/inter-v12-latin-700.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('/assets/fonts/inter-v12-latin-700.woff2') format('woff2'), /* Super Modern Browsers */
       url('/assets/fonts/inter-v12-latin-700.woff') format('woff'), /* Modern Browsers */
       url('/assets/fonts/inter-v12-latin-700.ttf') format('truetype'), /* Safari, Android, iOS */
       url('/assets/fonts/inter-v12-latin-700.svg#Inter') format('svg'); /* Legacy iOS */
}
```

### downloading and using fonts

The helper will give you a nice little button that downloads a zip of the requested files, and you can add those into your project. For my blog, I added the fonts into `/assets/fonts/`, the `@font-face` rules to a `_fonts.scss`  (don’t forget to change the file path to wherever you stored your fonts), and imported the fonts into my base stylesheet. 

## cleaning up

If you are forgetful like me, you might have forgotten to remove your `<link>` tags from your HTML — get rid of those pesky external references!

<hr>

## further reading

- [Self-Hosting Google Web Fonts](https://mranftl.com/2014/12/23/self-hosting-google-web-fonts/) by Mario Ranftl
- [How to use @font-face in CSS](https://css-tricks.com/snippets/css/using-font-face-in-css/)
---
tags: ['11ty', 'fonts', 'performance', 'webdev']
title: "Self-Hosting (Google) Fonts"
date: 2023-01-12
---


<!--START-->
Bye Google and hello self-hosted fonts!<!--END-->
I recently decided to self-host my fonts on this site, and I thought I’d share my process for anyone who is interested in doing the same. I use three fonts on this blog; *Titillium Web* for the body text, *Inter* for my headings, and *Questrial* for my header, and it adds up quickly. Hopefully self-hosting can help me shave off a few milliseconds of load time! 🤞

## picking font variations
When picking a font, say on [Google Fonts](https://fonts.google.com), you will probably see options like this: 

- 100 – Thin
- 200 – Extra Light (Ultra Light)
- 300 – Light
- 400 – Normal
- 500 – Medium
- 600 – Semi Bold (Demi Bold)
- 700 – Bold
- 800 – Extra Bold (Ultra Bold)
- 900 – Black (Heavy)

These are used to give the browser the exact typeface to use for specific font weights - without these, there is a phenomenon called **faux bold** (it also happens with italics) - when a website tries to use a font without the proper font files, and the browser attempts to emulate it (albeit incorrectly). Here is a great example from Google Fonts — it’s a small but noticeable difference.

<figure>
  <img src="/assets/images/content/faux-bold-italic-example.svg" alt="" width="200"/>
  <figcaption>An example of faux (fake) bold and faux italic text. On the left, true italics, bolds, and small caps; on the right, faux italics, faux bolds, and faux small caps.<figcaption>
</figure>

Not all typefaces have all of these, but for *Titillium Web* I grabbed 400 (Normal) and 700 (Bold), both with italic variations, so that I have the option to **bold** text. For the other two, I’m probably not going to be bolding or italicizing anything in my headings and header, so I just grabbed the regular font-weight for those.

## Google Webfonts Helper

This is where we diverge from Google. We picked our fonts, and now we can use this amazing tool from [Mario Ranftl](https://mranftl.com/) called the [Google Webfonts Helper](https://gwfh.mranftl.com/fonts) (GWFH) to download and use the fonts in our CSS.

### @font-family and CSS

To start using this tool, search for one of your fonts and select the font variations that you decided on. GWFH gives you two options for the CSS `@font-face` , and I opted for the ‘Modern Browsers’ option - This provides `.woff` and `.woff2` files, since I assume anyone reading my blog isn't using Internet Explorer (`.woff` is supported by Edge, Firefox, Chrome, Safari, Opera, iOS, and Android).

{% note "tip" %}
If you are interested in learning more about different support for font formats, [read this great article that goes into depth on each format](https://medium.com/@aitareydesign/understanding-of-font-formats-ttf-otf-woff-eot-svg-e55e00a1ef2).
{% endnote %}

For example, here is what the CSS for my *Inter* font-family looked like.

```css
/* inter-regular - latin */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  src: url('../fonts/inter-v12-latin-regular.eot');
  src: local(''),
       url('/assets/fonts/inter-v12-latin-regular.eot?#iefix') format('embedded-opentype'),
       url('/assets/fonts/inter-v12-latin-regular.woff2') format('woff2'),
       url('/assets/fonts/inter-v12-latin-regular.woff') format('woff'),
       url('/assets/fonts/inter-v12-latin-regular.ttf') format('truetype'),
       url('/assets/fonts/inter-v12-latin-regular.svg#Inter') format('svg');
}

/* ...more @font-face rules */
```

### downloading and using fonts

The helper will give you a nice little button that downloads a zip of the requested files, and you can add those into your project. For my blog, I added the fonts into `/assets/fonts/`, the `@font-face` rules to a `_fonts.scss`  (don’t forget to change the file path to wherever you stored your fonts), and imported the fonts into my base stylesheet. 

## cleaning up

If you are forgetful like me, you might have forgotten to remove the Google Font `<link>` tags from your HTML — get rid of those!

<hr>

## further reading

- [Self-Hosting Google Web Fonts](https://mranftl.com/2014/12/23/self-hosting-google-web-fonts/) by Mario Ranftl
- [How to use @font-face in CSS](https://css-tricks.com/snippets/css/using-font-face-in-css/)

---
tags: ['11ty', 'fonts', 'performance']
title: "No  More Fonts!"
date: 2023-02-02
---


<!--START-->
I got rid of my fonts... and not for the reason you might expect.<!--END-->

## Why I got rid of my fonts
Storing the fonts locally wasn't actually bad. The performance of the site was indeed faster, but what made me remove them is that _I don't actually prefer them_. As in, I don't even like my fonts. Just this past week, I found a website that really stuck out to me. It was [ryanccn.dev](https://ryanccn.dev/), and I really liked the font (and the overall aesthetic). I thought it had a nice, clean, and modern font. And it took me a minute to realize it was just the `ui-sans-serif` font... literally just a system font. For some reason, I have always believed I need a fancy font, something unique or special. Anyway, I instantly decided to to switch, and I'm really happy with the result. I'm not sure if I'll keep it forever, but I'm happy with it for now.

## Speed :rocket:

<figure>
  <img src="/assets/images/content/no-more-fonts_bundle-size.png" alt=""/>
  <figcaption>An almost 80% decrease in overall weight just by removing my fonts.<figcaption>
</figure>

But the best part was the performance boost. By using a system font, I was able to reduce my overall bundle size by almost 80%! This not only made my website load faster, but also made it look much better. This was a win-win situation, and I couldn't be happier with my decision.

## Further reading
- [Flavio Cope's (outdated) article on system fonts and their introduction](https://flaviocopes.com/css-system-fonts/)
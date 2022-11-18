const Image = require("@11ty/eleventy-img")
const markdownIt = require('markdown-it')
const markdownItAttrs = require('markdown-it-attrs')
const markdownItOptions = {
  html: true,
  breaks: true,
  linkify: true
}
const markdownLib = markdownIt(markdownItOptions).use(markdownItAttrs)


module.exports = function(eleventyConfig){
    eleventyConfig.addPassthroughCopy({"src/_public/": "."});
    eleventyConfig.setLibrary('md', markdownLib);
    eleventyConfig.addFilter("randomItem", (arr) => {
        arr.sort(() => {
          return 0.5 - Math.random();
        });
        return arr.slice(0, 1);
      });
    return {
        dir:{
            input:"src"
        }
    }
}
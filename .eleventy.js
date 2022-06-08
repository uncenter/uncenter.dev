const Image = require("@11ty/eleventy-img")
module.exports = function(eleventyConfig){
    eleventyConfig.addPassthroughCopy({"src/_public/": "."});
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
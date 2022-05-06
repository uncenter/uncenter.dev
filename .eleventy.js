module.exports = function(eleventyConfig){
    eleventyConfig.addPassthroughCopy({"src/_public/": "."});
    return {
        dir:{
            input:"src"
        }
    }
}
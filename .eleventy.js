const markdownIt = require("markdown-it");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const codeClipboard = require("eleventy-plugin-code-clipboard");
const { DateTime } = require("luxon");


module.exports = function(eleventyConfig){
    let markdownLibrary = markdownIt({
      html: true,
      linkify: true
    }).use(codeClipboard.markdownItCopyButton);
    eleventyConfig.setLibrary("md", markdownLibrary);
    eleventyConfig.addPlugin(codeClipboard);
    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.setLibrary("md", markdownLibrary);
    eleventyConfig.addShortcode('excerpt', article => extractExcerpt(article));
    eleventyConfig.addPassthroughCopy({"src/_public/": "."});
    eleventyConfig.addPassthroughCopy("src/img/favicon.ico")
    eleventyConfig.addFilter("randomItem", (arr) => {
        arr.sort(() => {
          return 0.5 - Math.random();
        });
        return arr.slice(0, 1);
      });
    eleventyConfig.addFilter("postDate", (dateObj) => {
      return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
    });
    return {
        dir:{
            input:"src"
        }
    }
}

function extractExcerpt(article) {
  if (!article.hasOwnProperty('templateContent')) {
    console.warn('Failed to extract excerpt: Document has no property "templateContent".');
    return null;
  }
 
  let excerpt = null;
  const content = article.templateContent;
 
  // The start and end separators to try and match to extract the excerpt
  const separatorsList = [
    { start: '<!-- Excerpt Start -->', end: '<!-- Excerpt End -->' },
    { start: '<p>', end: '</p>' }
  ];
 
  separatorsList.some(separators => {
    const startPosition = content.indexOf(separators.start);
    const endPosition = content.indexOf(separators.end);
 
    if (startPosition !== -1 && endPosition !== -1) {
      excerpt = content.substring(startPosition + separators.start.length, endPosition).trim();
      return true; // Exit out of array loop on first match
    }
  });
 
  return excerpt;
}
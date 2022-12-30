const markdownIt = require("markdown-it");
const markdownItAnchor = require('markdown-it-anchor')

const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const codeClipboard = require("eleventy-plugin-code-clipboard");
const pluginTOC = require('eleventy-plugin-nesting-toc')
const emojiReadTime = require("@11tyrocks/eleventy-plugin-emoji-readtime");
const recentChanges = require('eleventy-plugin-recent-changes');

const { DateTime } = require("luxon");
const moment = require('moment');

module.exports = function(eleventyConfig){
    let markdownLibrary = markdownIt({
      html: true,
      linkify: true
    }).use(codeClipboard.markdownItCopyButton, {
      title: 'Copy code to clipboard',
    }).use(markdownItAnchor);
    eleventyConfig.setLibrary("md", markdownLibrary);
    eleventyConfig.addPlugin(codeClipboard);
    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.addPlugin(pluginTOC);
    eleventyConfig.addPlugin(emojiReadTime, { showEmoji: false, label: "min read" });
    eleventyConfig.addPlugin(recentChanges,  {commits: 5});
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
    eleventyConfig.addFilter("shortenedJSDate", (dateObj) => {
      return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
    });
    eleventyConfig.addFilter("shortenedISODate", (dateObj) => {
      return DateTime.fromISO(formatDateISO(dateObj)).toFormat('LLL dd yyyy');
    });
    return {
        dir:{
            input:"src"
        }
    }
}
function formatDateISO(dateString) {
  const date = moment(dateString).toDate();
  const isoString = date.toISOString();
  return isoString

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
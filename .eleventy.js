// markdown-it plugins
const markdownIt = require("markdown-it");
const markdownItAnchor = require('markdown-it-anchor');
const markdownItLinkAttributes = require('markdown-it-link-attributes');
const markdownItFootnote = require('markdown-it-footnote');
const markdownItMark = require('markdown-it-mark');
const markdownItAbbr = require('markdown-it-abbr');
const markdownItSup = require('markdown-it-sup');
const markdownItSub = require('markdown-it-sub');
const markdownItContainer = require('markdown-it-container');

// eleventy plugins
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const codeClipboard = require("eleventy-plugin-code-clipboard");
const pluginTOC = require('eleventy-plugin-nesting-toc')
const emojiReadTime = require("@11tyrocks/eleventy-plugin-emoji-readtime");
const recentChanges = require('eleventy-plugin-recent-changes');
const genFavicons = require('eleventy-plugin-gen-favicons')

// utils
const filters = require("./utils/filters.js");

module.exports = function(eleventyConfig){
    let markdownLibrary = markdownIt({
      html: true,
      breaks: true,
    })
    .use(codeClipboard.markdownItCopyButton, { title: 'Copy code to clipboard' })
    .use(markdownItAnchor, {
      permalink: markdownItAnchor.permalink.ariaHidden({
        placement: "after",
        class: "direct-link",
        symbol: "#",
        level: [1, 2, 3, 4],
      })
    })
    .use(markdownItLinkAttributes, [
      {
        matcher(href) {
          return href.match(/^https?:\/\//);
        },
        attrs: {
          target: '_blank',
          rel: 'noopener noreferrer'
        }
      }
    ])
    .use(markdownItFootnote)
    .use(markdownItMark)
    .use(markdownItAbbr)
    .use(markdownItSup)
    .use(markdownItSub)
    .use(markdownItContainer, 'card');

    eleventyConfig.setLibrary("md", markdownLibrary);
    eleventyConfig.addPlugin(codeClipboard);
    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.addPlugin(pluginTOC);
    eleventyConfig.addPlugin(emojiReadTime, { showEmoji: false, label: "min read" });
    eleventyConfig.addPlugin(recentChanges,  { commits: 5 });
    eleventyConfig.addPlugin(genFavicons, { generateManifest: false, outputDir: './dist'});

    Object.keys(filters).forEach((filter) => {
      eleventyConfig.addFilter(filter, filters[filter]);
    });
    eleventyConfig.addShortcode('excerpt', article => extractExcerpt(article));

    eleventyConfig.addLayoutAlias('base', 'base.njk');
    eleventyConfig.addLayoutAlias('page', 'page.njk');
    eleventyConfig.addLayoutAlias('blog', 'blog.njk');
    eleventyConfig.addLayoutAlias('post', 'post.njk');

    ['src/assets/styles/', 'src/assets/images/', 'src/assets/scripts/'].forEach(path =>
      eleventyConfig.addPassthroughCopy(path)
    );

    eleventyConfig.addWatchTarget("/src/assets/styles");

    return {
        dir:{
          input: 'src',
          output: 'dist',
          includes: '_includes',
          layouts: '_includes/layouts',
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
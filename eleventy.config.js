const markdownIt = require("markdown-it");
const markdownItAnchor = require('markdown-it-anchor');
const markdownItAttrs = require('markdown-it-attrs');
const markdownItLinkAttributes = require('markdown-it-link-attributes');
const markdownItFootnote = require('markdown-it-footnote');
const markdownItMark = require('markdown-it-mark');
const markdownItAbbr = require('markdown-it-abbr');
const markdownItSup = require('markdown-it-sup');
const markdownItSub = require('markdown-it-sub');
const markdownItContainer = require('markdown-it-container');
const markdownItKBD = require('markdown-it-kbd');

const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const codeClipboard = require("./config/code-clipboard/.eleventy");
const pluginTOC = require('eleventy-plugin-toc')
const emojiReadTime = require("@11tyrocks/eleventy-plugin-emoji-readtime");
const recentChanges = require('eleventy-plugin-recent-changes');
const genFavicons = require('eleventy-plugin-gen-favicons')
const externalLinks = require("@aloskutov/eleventy-plugin-external-links");
const purgeCSS = require("eleventy-plugin-purgecss");

// utils
const filters = require("./utils/filters.js");
const htmlmin = require("html-minifier");

module.exports = function(eleventyConfig){
    let markdownLibrary = markdownIt({
      html: true,
      breaks: true,
    })
    .use(require('markdown-it-task-checkbox'), {
      disabled: true,
      divWrap: false,
      divClass: 'checkbox',
      idPrefix: 'cbx_',
      ulClass: 'task-list',
      liClass: 'task-list-item'
    })
    .use(codeClipboard.markdownItCopyButton, { 
    iconClass: 'icon icon-copy', 
    iconDefinition: 'icon-copy', 
    renderMode: 'svg-sprite',
    iconStyle: "", 
    })
    .use(markdownItAnchor, {
      permalink: true,
      permalinkClass: "direct-link",
      permalinkSymbol: "#",
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
    .use(markdownItAttrs)
    .use(markdownItFootnote)
    .use(markdownItMark)
    .use(markdownItAbbr)
    .use(markdownItSup)
    .use(markdownItSub)
    .use(markdownItContainer, 
      'card'
    )
    .use(markdownItKBD);
    eleventyConfig.setLibrary("md", markdownLibrary);

    eleventyConfig.addPlugin(codeClipboard);
    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.addPlugin(pluginTOC);
    eleventyConfig.addPlugin(emojiReadTime, { showEmoji: false, label: "min read" });
    eleventyConfig.addPlugin(recentChanges,  { commits: 5 });
    eleventyConfig.addPlugin(genFavicons, { generateManifest: false, outputDir: './dist'});
    eleventyConfig.addPlugin(externalLinks, {url: 'https://uncenter.org', rel: ['noreferrer', 'noopener', 'external'], overwrite: false});
    eleventyConfig.addPlugin(purgeCSS, {
      config: "./purgecss.config.js",
        quiet: false,
    });
    Object.keys(filters).forEach((filter) => {
      eleventyConfig.addFilter(filter, filters[filter]);
    });
    eleventyConfig.addShortcode("insertSVG", function (def) {
      const svgRef = 'icon-' + def
      const svgClass = 'icon ' + svgRef
      return `<svg class="${svgClass}"><use xlink:href="#${svgRef}"></use></svg>`;
    });
    eleventyConfig.addShortcode('excerpt', article => extractExcerpt(article));
    eleventyConfig.addTransform("htmlmin", function(content) {
      // Prior to Eleventy 2.0: use this.outputPath instead
      if( this.page.outputPath && this.page.outputPath.endsWith(".html") ) {
        let minified = htmlmin.minify(content, {
          useShortDoctype: true,
          removeComments: true,
          collapseWhitespace: true
        });
        return minified;
      }
  
      return content;
    });
    eleventyConfig.addCollection("orderedDemos", function (collection) {
      return collection.getFilteredByTag("demos").sort((a, b) => {
        return a.data.order - b.data.order;
      });
    });

    eleventyConfig.addLayoutAlias('base', 'base.njk');
    eleventyConfig.addLayoutAlias('blog', 'blog.njk');

    ['src/assets/styles/', 'src/assets/images/', 'src/assets/scripts/', 'src/assets/fonts/'].forEach(path =>
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

  const separatorsList = [
  { start: '<!--START-->', end: '<!--END-->' },
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
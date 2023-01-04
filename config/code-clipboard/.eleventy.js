const fs = require('fs');
const path = require('path');
const UglifyJS = require('uglify-js');

const defaultPluginOptions = {
  clipboardJSVersion: '2.0.8',
  buttonClass: 'code-copy',
  successMessage: 'Copied!',
  failureMessage: 'Failed...',
};

const defaultRendererOptions = {
  renderMode: 'icon',
  iconStyle: 'font-size: 15px; opacity: 0.8;',
  iconClass: 'mdi mdi-content-copy',
  iconTag: 'span',
  buttonClass: 'code-copy',
  buttonStyle: 'position: absolute; top: 7.5px; right: 6px; cursor: pointer; outline: none; opacity: 0.8;',
  additionalButtonClass: '',
  title: 'Copy',
};

function renderCode(origRule, rendererOptions) {
  return (tokens, idx, options, env, self) => {
    const origRendered = origRule(tokens, idx, options, env, self);
    if (tokens[idx].tag !== 'code') {
      return origRendered;
    }
    if (!tokens[idx].info || tokens[idx].info === 'mermaid') {
      return origRendered;
    }
    if (tokens[idx].content.length === 0) {
      return origRendered;
    }
    if (rendererOptions.renderMode === 'svg-sprite') {
    return `
  <div style="position: relative">
    ${origRendered.replace(/<code /, `<code id="code-${idx}"`)}
    <button class="${rendererOptions.buttonClass} ${rendererOptions.additionalButtonClass}"
      data-clipboard-target="#code-${idx}"
      style="${rendererOptions.buttonStyle}" title="${rendererOptions.title}">
      <svg style="${rendererOptions.iconStyle}" class="${rendererOptions.iconClass}"><use xlink:href="#${rendererOptions.iconDefinition}"></use></svg>
    </button>
  </div>
`; } else if (rendererOptions.renderMode === 'custom'){
  return `
<div style="position: relative">
  ${origRendered.replace(/<code /, `<code id="code-${idx}"`)}
  <button class="${rendererOptions.buttonClass} ${rendererOptions.additionalButtonClass}"
    data-clipboard-target="#code-${idx}"
    style="${rendererOptions.buttonStyle}" title="${rendererOptions.title}">
    <span>
      ${rendererOptions.customCode}
    </span>
  </button>
</div>
`; } else {
    return `
  <div style="position: relative">
    ${origRendered.replace(/<code /, `<code id="code-${idx}"`)}
    <button class="${rendererOptions.buttonClass} ${rendererOptions.additionalButtonClass}"
      data-clipboard-target="#code-${idx}"
      style="${rendererOptions.buttonStyle}" title="${rendererOptions.title}">
      <span>
        <${rendererOptions.iconTag} style="${rendererOptions.iconStyle}" class="${rendererOptions.iconClass}"></${rendererOptions.iconTag}>
      </span>
    </button>
  </div>
`; }
  };
}
function initClipboardJS(options) {
  const originSource = fs.readFileSync(path.join(__dirname, '/init-clipboard.js')).toString();
  const script = originSource.replace('new ClipboardJS(\'\')', `new ClipboardJS('.${options.buttonClass}')`)
    .replace('Copied!', options.successMessage)
    .replace('Failed...', options.failureMessage);
  const minified = UglifyJS.minify(script);
  if (minified.error) {
    throw minified.error;
  }
  return `<script>${minified.code}</script>
<script async src="https://cdn.jsdelivr.net/npm/clipboard@${options.clipboardJSVersion}/dist/clipboard.js"></script>`;
}

module.exports = {
  configFunction(eleventyConfig, pluginOptions) {
    const pluginFallbackOptions = {
      ...defaultPluginOptions,
      ...pluginOptions,
    };
    eleventyConfig.addShortcode('initClipboardJS', () => initClipboardJS(pluginFallbackOptions));
  },
  markdownItCopyButton(md, rendererOptions) {
    const rendererFallbackOptions = {
      ...defaultRendererOptions,
      ...rendererOptions,
    };
    md.renderer.rules.fence = renderCode(
      md.renderer.rules.fence,
      rendererFallbackOptions,
    );
  },
};

const htmlEscapes = {
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;',
	'"': '&quot;',
	"'": '&#39;',
};
var FontStyle = /* @__PURE__ */ ((FontStyle2) => {
	FontStyle2[(FontStyle2['NotSet'] = -1)] = 'NotSet';
	FontStyle2[(FontStyle2['None'] = 0)] = 'None';
	FontStyle2[(FontStyle2['Italic'] = 1)] = 'Italic';
	FontStyle2[(FontStyle2['Bold'] = 2)] = 'Bold';
	FontStyle2[(FontStyle2['Underline'] = 4)] = 'Underline';
	return FontStyle2;
})(FontStyle || {});
const defaultElements = {
	pre({ className, style, children }) {
		return `<pre class="${className}" style="${style}" tabindex="0">${children}</pre>`;
	},
	code({ children }) {
		return `<code>${children}</code>`;
	},
	line({ className, children }) {
		return `<span class="${className}">${children}</span>`;
	},
	token({ style, children }) {
		return `<span style="${style}">${children}</span>`;
	},
};
function escapeHtml(html) {
	return html.replace(/[&<>"']/g, (chr) => htmlEscapes[chr]);
}
function getLineClasses(lineOptions) {
	const lineClasses = /* @__PURE__ */ new Set(['line']);
	for (const lineOption of lineOptions) {
		for (const lineClass of lineOption.classes ?? []) {
			lineClasses.add(lineClass);
		}
	}
	return Array.from(lineClasses);
}
function groupBy(elements, keyGetter) {
	const map = /* @__PURE__ */ new Map();
	for (const element of elements) {
		const key = keyGetter(element);
		if (map.has(key)) {
			const group = map.get(key);
			group.push(element);
		} else {
			map.set(key, [element]);
		}
	}
	return map;
}

function renderToHtml(lines, options = {}) {
	const bg = options.bg || '#fff';
	const optionsByLineNumber = groupBy(
		options.lineOptions ?? [],
		(option) => option.line,
	);
	const userElements = options.elements || {};
	function h(type = '', props = {}, children) {
		const element = userElements[type] || defaultElements[type];
		if (element) {
			children = children.filter(Boolean);
			if (type === 'token') {
				const parts = children[0].split(
					/(https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*))/,
				);
				children[0] = parts
					.map((part, index) => {
						if (index % 2 === 0) {
							return escapeHtml(part);
						} else {
							return `<a href="${part}">${part}</a>`;
						}
					})
					.join('');
			}
			return element({
				...props,
				children: type === 'code' ? children.join('\n') : children.join(''),
			});
		}
		return '';
	}
	return h(
		'pre',
		{
			className: 'shiki ' + (`language-${options.lang}` || ''),
			style: `background-color: ${bg}`,
		},
		[
			h(
				'code',
				{},
				lines.map((line, index) => {
					const lineNumber = index + 1;
					const lineOptions = optionsByLineNumber.get(lineNumber) ?? [];
					const lineClasses = getLineClasses(lineOptions).join(' ');
					return h(
						'line',
						{
							className: lineClasses,
							lines,
							line,
							index,
						},
						line.map((token, index2) => {
							const cssDeclarations = [`color: ${token.color || options.fg}`];
							if (token.fontStyle & FontStyle.Italic) {
								cssDeclarations.push('font-style: italic');
							}
							if (token.fontStyle & FontStyle.Bold) {
								cssDeclarations.push('font-weight: bold');
							}
							if (token.fontStyle & FontStyle.Underline) {
								cssDeclarations.push('text-decoration: underline');
							}
							return h(
								'token',
								{
									style: cssDeclarations.join('; '),
									tokens: line,
									token,
									index: index2,
								},
								[token.content],
							);
						}),
					);
				}),
			),
		],
	);
}

module.exports = renderToHtml;

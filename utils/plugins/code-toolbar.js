import crypto from 'node:crypto';
import html from 'nanohtml';
import raw from 'nanohtml/lib/raw-server.js';
import { parseHTML } from 'linkedom';

const ICON_COPY = `<svg class="copy" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path></svg>`;
const ICON_LINK = `<svg class="link" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z"></path></svg>`;
const ICON_CHECK = `<svg class="check" aria-hidden="true" style="display: none;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path></svg>`;

function renderCode(originalRule) {
	return (...args) => {
		const [tokens, index] = args;
		const content = tokens[index].content;
		const originalContent = originalRule(...args);

		if (content.length === 0) return originalContent;

		const document = parseHTML(originalContent).document;
		const code = document.querySelector('code').textContent;

		const codeId = crypto
			.createHash('md5')
			.update(code)
			.digest('hex')
			.slice(0, 8);

		return html`
			<div class="code-block" id="${codeId}">
				${raw(originalContent)}
				<div class="toolbar">
					<button
						title="Copy code to clipboard"
						aria-label="Copy code to clipboard"
						class="copy-code"
					>
						${raw(ICON_COPY)}${raw(ICON_CHECK)}
					</button>
					<button
						title="Copy link to code block"
						aria-label="Copy link to code block"
						class="copy-link"
					>
						${raw(ICON_LINK)}${raw(ICON_CHECK)}
					</button>
				</div>
			</div>
		`;
	};
}

export default (md) => {
	md.renderer.rules.code_block = renderCode(md.renderer.rules.code_block);
	md.renderer.rules.fence = renderCode(md.renderer.rules.fence);
};

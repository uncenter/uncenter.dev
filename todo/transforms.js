import { parseHTML } from 'linkedom';
import { createHash } from 'node:crypto';

// Wrap Shiki code blocks in a div and apply counter IDs to provide anchor links.
export function wrapShiki(content) {
	const { document } = parseHTML(content);
	for (const block of document.querySelectorAll('pre.shiki')) {
		const code = block.querySelector('code').innerHTML;
		const genUniqueId = (content) => {
			return createHash('md5').update(content).digest('hex');
		};
		let uniqueId = genUniqueId(code).slice(0, 6);
		while (document.querySelector(`#${uniqueId}`)) {
			uniqueId = genUniqueId(uniqueId).slice(0, 6);
		}
		block.outerHTML = `<div class="shiki-wrapper" id="${uniqueId}">${block.outerHTML}</div>`;
	}
	return `<!DOCTYPE html>\n${document.documentElement.outerHTML}`;
}

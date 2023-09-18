export async function htmlToAbsoluteUrls(html: string, base: URL | string) {
	const { document } = parseHTML(html);
	document.querySelectorAll('a').forEach((a) => {
		a.href = urlize(a.href.trim(), base).href;
	});
	return document.documentElement.outerHTML;
}

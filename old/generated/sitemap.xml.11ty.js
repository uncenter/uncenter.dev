class Page {
	data() {
		return {
			permalink: '/sitemap.xml',
			eleventyExcludeFromCollections: true,
		};
	}

	render(data) {
		return `
<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${data.collections.all
			.map((page) =>
				`
    <url>
        <loc>${new URL(page.url, data.meta.site.url).href}</loc>
        <lastmod>${page.date.toISOString()}</lastmod>
    </url>`.replaceAll(/^\n/g, ''),
			)
			.join('\n')}
</urlset>
`.trimStart();
	}
}

module.exports = Page;

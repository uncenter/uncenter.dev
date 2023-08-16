// Inspired by: https://github.com/ryanccn/ryanccn.dev/blob/main/src/generated/feed.json.11ty.js
// License: MIT

const meta = require('../_data/meta');
const domain = require('../_data/domain');

class Page {
	data() {
		return {
			permalink: '/feed.json',
			eleventyExcludeFromCollections: true,
		};
	}

	async render(data) {
		return JSON.stringify(
			{
				version: 'https://jsonfeed.org/version/1.1',
				title: meta.name,
				home_page_url: domain.url,
				feed_url: new URL('feed.json', domain.url).href,
				items: await Promise.all(
					[...data.collections.posts].reverse().map(async (post) => ({
						id: post.data.slug,
						url: new URL(post.url, domain.url).href,
						title: post.data.title,
						content_html: await this.htmlToAbsoluteUrls(
							post.templateContent,
							new URL(post.url, domain.url),
						),
						date_published: post.data.date,
						tags: post.data.tags,
					})),
				),
			},
			undefined,
			2,
		);
	}
}

module.exports = Page;

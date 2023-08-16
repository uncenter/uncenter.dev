// Inspired by: https://github.com/ryanccn/ryanccn.dev/blob/main/src/generated/feed.json.11ty.js
// License: MIT

const urlize = require('../_11ty/utils/urlize');

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
				title: data.meta.site.domain,
				description: data.meta.feed.description,
				language: data.meta.lang,
				authors: [
					{
						name: data.meta.author.name,
						icon: urlize('1024w.png'),
					},
				],
				home_page_url: data.meta.site.url,
				feed_url: urlize('feed.json'),
				items: await Promise.all(
					[...data.collections.posts].reverse().map(async (post) => ({
						id: post.data.slug,
						url: urlize(post.url),
						title: post.data.title,
						content_html: await this.htmlToAbsoluteUrls(
							post.templateContent,
							urlize(post.url),
						),
						summary: post.data.description,
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

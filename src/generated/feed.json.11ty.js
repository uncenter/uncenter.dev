// Inspired by https://github.com/ryanccn/ryanccn.dev/blob/main/src/generated/feed.json.11ty.js.

// MIT License

// Copyright (c) 2022 Ryan Cao

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import urlize from '../../config/urlize.js';

class Page {
	data() {
		return {
			permalink: '/feed.json',
		};
	}

	async render(data) {
		return JSON.stringify(
			{
				version: 'https://jsonfeed.org/version/1.1',
				title: data.site.domain,
				description: data.site.feed.description,
				language: data.site.lang,
				authors: [
					{
						name: data.site.author.name,
						avatar: urlize('1024w.png'),
					},
				],
				home_page_url: data.site.url,
				feed_url: urlize('feed.json'),
				items: await Promise.all(
					[...data.collections.posts].reverse().map(async (post) => ({
						id: post.filePathStem,
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

export default Page;

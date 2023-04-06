require('dotenv').config();
const EleventyFetch = require('@11ty/eleventy-fetch');
const meta = require('./meta.json');

const logOutput = require('../_11ty/utils/logOutput.js');

// https://dev.to/philw_/show-off-your-lighthouse-scores-in-eleventy-with-the-pagespeed-insights-api-1cpp
// Credit to Phil Wolstenholme (unknown license)
module.exports = async function () {
	const params = new URLSearchParams();
	params.append('url', meta.url);
	params.append('key', process.env.PAGESPEED_API_KEY);
	params.append(
		'fields',
		'lighthouseResult.categories.*.score,lighthouseResult.categories.*.title',
	);
	params.append('prettyPrint', false);
	params.append('strategy', 'desktop');
	params.append('category', 'PERFORMANCE');
	params.append('category', 'ACCESSIBILITY');
	params.append('category', 'BEST-PRACTICES');
	params.append('category', 'SEO');
	let data = await EleventyFetch(
		`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${params}`,
		{
			duration: '1d',
			type: 'json',
		},
	);
	data = data.lighthouseResult.categories;

	const getGrade = function (score) {
		if (score < 0.5) {
			return 'bad';
		}
		if (score < 0.9) {
			return 'ok';
		}
		return 'good';
	};

	Object.keys(data).map(function (key) {
		if (data[key].score <= 1) {
			data[key].score = (data[key].score * 100).toFixed();
		}
		data[key].grade = getGrade(data[key].score);
	});
	logOutput({
		prefix: 'data:lighthouse',
		action: 'fetched Lighthouse scores for',
		file: meta.url,
		extra: {
			content: `${data.performance.score}% performance, ${data.accessibility.score}% accessibility, ${data['best-practices'].score}% best practices, ${data.seo.score}% SEO`,
			size: false,
		},
	});

	return {
		categories: data,
	};
};

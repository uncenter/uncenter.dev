// Via: https://github.com/ryanccn/ryanccn.dev/blob/827b12321ea7d606593d2d2a3cfabe8e9a5bc7b3/src/_data/gitRev.js
// License: MIT

const log = require('../_11ty/utils/log.js');

module.exports = async () => {
	const { execa } = await import('execa');
	const rev = execa('git', ['rev-parse', '--short', 'HEAD']).then(
		(a) => a.stdout,
	);
	log.output({
		category: 'gitRev',
		message: 'gitRev.js',
		extra: rev,
	});
	return rev;
};

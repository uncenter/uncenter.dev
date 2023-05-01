module.exports = (pre, value, post) => {
	if (pre !== '' && postText !== '') {
		return pre + ' ' + value + ' ' + post;
	} else if (post !== '') {
		return value + ' ' + post;
	} else if (pre !== '') {
		return pre + ' ' + value;
	} else {
		return value;
	}
};

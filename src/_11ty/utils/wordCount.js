module.exports = (content) => {
	const matches = content.match(/[\u0400-\u04FF]+|\S+\s*/g);
	return matches !== null ? matches.length : 0;
};

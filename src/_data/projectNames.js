const projects = require('./projects.json');

module.exports = () => {
	return Object.values(projects).flatMap((category) =>
		category.map((project) => project.name),
	);
};

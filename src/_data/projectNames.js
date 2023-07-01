const projects = require('./projects.json');
module.exports = () => {
	const projectNames = [];
	Object.entries(projects).map(([category, projects]) => {
		projectNames.push(...projects.map((project) => project.name));
	});
	return projectNames;
};

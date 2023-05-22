#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function getRepos() {
	const reposFile = path.join(__dirname, './dicts/repos.txt');
	const reposURL = 'https://api.github.com/users/uncenter/repos';

	(async () => {
		const response = await fetch(reposURL);
		const json = await response.json();

		if (Array.isArray(json)) {
			const repos = json.map((repo) => repo.name);
			fs.writeFileSync(reposFile, repos.join('\n'));
		} else {
			console.log('Invalid response format:', json);
		}
	})();
}

getRepos();

#!/usr/bin/env node

const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

function getRepos() {
	const reposFile = path.join(__dirname, './dicts/repos.txt');
	const reposURL = 'https://api.github.com/users/uncenter/repos';

	(async () => {
		const repos = await fetch(reposURL)
			.then((res) => res.json())
			.then((json) => json.map((repo) => repo.name));

		fs.writeFileSync(reposFile, repos.join('\n'));
	})();
}

getRepos();

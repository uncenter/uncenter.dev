#!/usr/bin/env node
const fs = require('fs/promises');
const { join } = require('path');

async function getRepos() {
	try {
		const response = await fetch('https://api.github.com/users/uncenter/repos');
		const json = await response.json();

		if (Array.isArray(json)) {
			fs.writeFile(
				join(__dirname, './dicts/repos.txt'),
				json.map((repo) => repo.name).join('\n'),
			);
		} else {
			throw new Error();
		}
	} catch {
		console.log('[cspell:update] Something went wrong.');
	}
}

getRepos();

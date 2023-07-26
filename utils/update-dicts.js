#!/usr/bin/env node
const fs = require('node:fs/promises');
const { join } = require('node:path');

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
			throw new TypeError('Invalid response content.');
		}
	} catch {
		console.log('[cspell:update] Something went wrong.');
	}
}

getRepos();

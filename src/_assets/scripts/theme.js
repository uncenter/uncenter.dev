function getSystemTheme() {
	return window.matchMedia('(prefers-color-scheme: dark)').matches
		? 'dark'
		: 'light';
}

function setTheme(theme, permanent = true) {
	console.log(
		`Setting theme to '${theme === 'system' ? getSystemTheme() : theme}'${
			permanent ? ", storing '" + theme + "' in localStorage." : ' (temporary).'
		}`,
	);
	if (permanent) localStorage.setItem('theme', theme);
	if (theme === 'system') theme = getSystemTheme();
	document
		.querySelector('meta[name="theme-color"]')
		.setAttribute('content', theme === 'dark' ? '#121212' : '#ffffff');
	document.documentElement.setAttribute('theme', theme);
	loadGiscus();
}

window.addEventListener('DOMContentLoaded', () => {
	let theme;
	let storedTheme = localStorage.getItem('theme');
	let overrideTheme;
	if (location.hash.includes('theme=')) {
		const hashOverrideMatch = location.hash.match(/theme=([a-z\-]+)/);
		if (hashOverrideMatch) {
			overrideTheme = hashOverrideMatch[1];
		}
	}
	theme = overrideTheme || storedTheme;
	if (!theme || !['light', 'dark', 'system'].includes(theme)) {
		console.log(
			`Invalid theme '${theme}' ${
				overrideTheme ? 'from hash' : 'from localStorage'
			}, ${
				storedTheme
					? "using stored '" + storedTheme + "' theme instead."
					: 'using system theme.'
			}`,
		);
		theme = storedTheme || 'system';
	}
	setTheme(theme, theme === overrideTheme ? false : true);
	document.getElementById('theme-selector').value = theme;
	document
		.getElementById('theme-selector')
		.addEventListener('change', function () {
			let selectedTheme = this.value.split(' ')[0];
			setTheme(selectedTheme);
		});
	if (document.getElementById('giscus')) {
		document.getElementById('giscus').innerHTML = insertGiscusScript();
	}
});

window
	.matchMedia('(prefers-color-scheme: dark)')
	.addEventListener('change', (e) => {
		if (localStorage.getItem('theme') !== 'system') return;
		setTheme('system');
	});

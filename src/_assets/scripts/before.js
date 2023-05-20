function getSystemTheme() {
	return window.matchMedia('(prefers-color-scheme: dark)').matches
		? 'dark'
		: 'light';
}

function setTheme(theme, options = { permanent: true, update: true }) {
	const { permanent, update } = options;
	console.log(
		`Setting theme to '${theme === 'system' ? getSystemTheme() : theme}'${
			permanent ? ", storing '" + theme + "' in localStorage." : ' (temporary).'
		}`,
	);
	if (permanent) localStorage.setItem('theme', theme);
	if (theme === 'system') theme = getSystemTheme();
	document.documentElement.setAttribute('theme', theme);
	document.documentElement.style.setProperty('color-scheme', theme);
	document
		.querySelector('meta[name="theme-color"]')
		.setAttribute('content', theme === 'dark' ? '#121212' : '#ffffff');
	if (update) {
		loadGiscus();
	}
}

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
setTheme(theme, {
	permanent: theme === overrideTheme ? false : true,
	update: false,
});

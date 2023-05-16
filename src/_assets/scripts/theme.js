function getSystemTheme() {
	return window.matchMedia('(prefers-color-scheme: dark)').matches
		? 'dark'
		: 'light';
}

function setTheme(theme) {
	console.log(
		`Setting theme to '${
			theme === 'system' ? getSystemTheme() : theme
		}', storing '${theme}' in localStorage.`,
	);
	localStorage.setItem('theme', theme);
	if (theme === 'system') theme = getSystemTheme();
	document
		.querySelector('meta[name="theme-color"]')
		.setAttribute('content', theme === 'dark' ? '#121212' : '#ffffff');
	document.documentElement.setAttribute('theme', theme);
	loadGiscus();
}

window.addEventListener('DOMContentLoaded', () => {
	theme = localStorage.getItem('theme') || 'system';
	setTheme(theme);
	document.getElementById('themeSelector').value = theme;
	document
		.getElementById('themeSelector')
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

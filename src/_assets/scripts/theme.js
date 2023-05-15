function setTheme(theme) {
	// theme: 'light' | 'dark' | 'system'
	localStorage.setItem('theme', theme);
	if (theme === 'system') {
		theme = window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light';
	}
	document.documentElement.setAttribute('theme', theme);
}

window.addEventListener('DOMContentLoaded', () => {
	theme = localStorage.getItem('theme') || 'system';
	setTheme(theme);
	document.getElementById('themeSelector').value = theme;
	document
		.getElementById('themeSelector')
		.addEventListener('change', function () {
			let selectedTheme = this.value.split(' ')[0]; // The value from the select: "light, "dark", or "system"
			setTheme(selectedTheme);
		});
});

window
	.matchMedia('(prefers-color-scheme: dark)')
	.addEventListener('change', (e) => {
		if (localStorage.getItem('theme') !== 'system') return;
		setTheme('system');
	});

window.addEventListener('DOMContentLoaded', () => {
	setMetaThemeColor(localStorage.getItem('theme'));
	if (document.querySelector('#theme-selector')) {
		document.querySelector('#theme-selector').value =
			localStorage.getItem('theme');
		document
			.querySelector('#theme-selector')
			.addEventListener('change', function () {
				let selectedTheme = this.value;
				setTheme(selectedTheme);
			});
	}
	window
		.matchMedia('(prefers-color-scheme: dark)')
		.addEventListener('change', (e) => {
			if (localStorage.getItem('theme') === 'system') setTheme('system');
		});
	loadGiscus();
});

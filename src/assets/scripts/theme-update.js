window.addEventListener('DOMContentLoaded', () => {
	setMetaThemeColor();
	if (document.querySelector('#theme-selector')) {
		document.querySelector('#theme-selector').value =
			document.documentElement.getAttribute('theme');
		document
			.querySelector('#theme-selector')
			.addEventListener('change', function () {
				setTheme(this.value);
			});
	}
	window
		.matchMedia('(prefers-color-scheme: dark)')
		.addEventListener('change', (e) => {
			if (localStorage.getItem('theme') === 'auto') setTheme('auto');
		});
	loadGiscus();
});

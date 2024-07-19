window.addEventListener('DOMContentLoaded', () => {
	setMetaThemeColor();
	if (document.querySelector('#theme-selector')) {
		document.querySelector('#theme-selector').value =
			document.documentElement.getAttribute('theme');
		document
			.querySelector('#theme-selector')
			.addEventListener('change', function () {
				if (
					'startViewTransition' in document &&
					document.startViewTransition !== undefined
				) {
					document.startViewTransition(() => {
						setTheme(this.value);
					});
				} else {
					setTheme(this.value);
				}
			});
	}
	window
		.matchMedia('(prefers-color-scheme: dark)')
		.addEventListener('change', (e) => {
			if (localStorage.getItem('theme') === 'auto') setTheme('auto');
		});
	loadGiscus();
});

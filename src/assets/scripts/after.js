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

for (const codeBlock of document.querySelectorAll('div.code-block')) {
	const copyCodeButton = codeBlock.querySelector('button.copy-code');
	const copyLinkButton = codeBlock.querySelector('button.copy-link');

	copyCodeButton.addEventListener('click', async () => {
		const copyIcon = copyCodeButton.querySelector('svg.copy');
		const checkIcon = copyCodeButton.querySelector('svg.check');
		await navigator.clipboard.writeText(
			codeBlock.querySelector('code').textContent,
		);
		copyIcon.style.display = 'none';
		checkIcon.style.display = 'block';
		copyCodeButton.classList.add('active');
		setTimeout(() => {
			checkIcon.style.display = 'none';
			copyIcon.style.display = 'block';
			copyCodeButton.classList.remove('active');
		}, 1500);
	});

	copyLinkButton.addEventListener('click', async () => {
		const linkIcon = copyLinkButton.querySelector('svg.link');
		const checkIcon = copyLinkButton.querySelector('svg.check');
		const codeUrl =
			window.location.href.split('#')[0] + '#' + codeBlock.getAttribute('id');
		window.location.href = codeUrl;
		await navigator.clipboard.writeText(codeUrl);

		linkIcon.style.display = 'none';
		checkIcon.style.display = 'block';
		copyLinkButton.classList.add('active');
		setTimeout(() => {
			checkIcon.style.display = 'none';
			linkIcon.style.display = 'block';
			copyLinkButton.classList.remove('active');
		}, 1500);
	});
}

window.addEventListener('DOMContentLoaded', () => {
	if (document.getElementById('theme-selector')) {
		document.getElementById('theme-selector').value =
			document.documentElement.getAttribute('theme');
		document
			.getElementById('theme-selector')
			.addEventListener('change', function () {
				let selectedTheme = this.value;
				setTheme(selectedTheme);
			});
	}
	if (document.getElementById('accent-selector')) {
		document.getElementById('accent-selector').value =
			document.documentElement.getAttribute('accent');
		document
			.getElementById('accent-selector')
			.addEventListener('change', function () {
				let selectedAccent = this.value;
				setAccent(selectedAccent);
			});
	}
	window
		.matchMedia('(prefers-color-scheme: dark)')
		.addEventListener('change', (e) => {
			if (localStorage.getItem('theme') !== 'system') return;
			setTheme('system');
		});
	loadGiscus();
});

const ICON_COPY = `<svg aria-hidden="true" viewBox="0 0 16 16" class="fill-slate-300 m-2"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"/><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"/></svg>`;
const ICON_CHECK = `<svg aria-hidden="true" viewBox="0 0 16 16" class="fill-green-400 m-2"><path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"/></svg>`;

document.querySelectorAll('pre.shiki').forEach((block) => {
	const buttonWrapper = document.createElement('div');
	buttonWrapper.classList.add('absolute', 'right-0', 'top-0', 'fade-out');
	const button = document.createElement('button');
	button.classList.add('m-2', 'border', 'border-solid', 'border-transparent');
	button.innerHTML = ICON_COPY;

	button.addEventListener('click', () => {
		navigator.clipboard.writeText(block.querySelector('code').textContent);
		button.innerHTML = ICON_CHECK;
		button.classList.remove('border-transparent');
		button.classList.add('border-green-400');
		setTimeout(() => {
			button.innerHTML = ICON_COPY;
			button.classList.remove('border-green-400');
			button.classList.add('border-transparent');
		}, 1500);
	});
	buttonWrapper.appendChild(button);
	block.parentNode.insertBefore(buttonWrapper, block.nextSibling);
});

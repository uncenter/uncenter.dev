window.addEventListener('DOMContentLoaded', () => {
	setMetaThemeColor(localStorage.getItem('theme'));
	if (document.getElementById('theme-selector')) {
		document.getElementById('theme-selector').value =
			localStorage.getItem('theme');
		document
			.getElementById('theme-selector')
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

const ICON_COPY = `<svg aria-hidden="true" viewBox="0 0 16 16" class="fill-slate-300 m-2"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"/><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"/></svg>`;
const ICON_LINK = `<svg aria-hidden="true" viewBox="0 0 16 16" class="fill-slate-300 m-2"><path d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z"/></svg>`;
const ICON_CHECK = `<svg aria-hidden="true" viewBox="0 0 16 16" class="fill-green-400 m-2"><path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"/></svg>`;
document.querySelectorAll('pre.shiki').forEach((block) => {
	const codeToolbar = document.createElement('div');
	codeToolbar.classList.add('absolute', 'right-0', 'top-0', 'flex', 'gap-1');

	const copyButton = document.createElement('button');
	copyButton.setAttribute('aria-label', 'Copy code to clipboard');
	copyButton.innerHTML = ICON_COPY;
	copyButton.addEventListener('click', () => {
		navigator.clipboard.writeText(block.querySelector('code').textContent);
		copyButton.innerHTML = ICON_CHECK;
		copyButton.classList.remove('border-transparent');
		copyButton.classList.add('border-green-400');
		setTimeout(() => {
			copyButton.innerHTML = ICON_COPY;
			copyButton.classList.remove('border-green-400');
			copyButton.classList.add('border-transparent');
		}, 1500);
	});

	const linkButton = document.createElement('button');
	linkButton.setAttribute('aria-label', 'Go to code block');
	linkButton.innerHTML = ICON_LINK;
	linkButton.addEventListener('click', () => {
		const codeUrl =
			window.location.href.split('#')[0] +
			'#' +
			block.parentNode.getAttribute('id');
		window.location.href = codeUrl;
		navigator.clipboard.writeText(codeUrl);
		linkButton.innerHTML = ICON_CHECK;
		linkButton.classList.remove('border-transparent');
		linkButton.classList.add('border-green-400');
		setTimeout(() => {
			linkButton.innerHTML = ICON_LINK;
			linkButton.classList.remove('border-green-400');
			linkButton.classList.add('border-transparent');
		}, 1500);
	});

	codeToolbar.appendChild(linkButton);
	codeToolbar.appendChild(copyButton);
	block.parentNode.insertBefore(codeToolbar, block.nextSibling);
});

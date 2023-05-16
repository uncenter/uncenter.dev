const ICON_COPY = `<svg aria-hidden="true" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect height="4" rx="1" ry="1" width="8" x="8" y="2"/><path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M16 4h2a2 2 0 0 1 2 2v4m1 4H11"/><path d="m15 10-4 4 4 4"/></svg>`;
const ICON_CHECK = `<svg aria-hidden="true" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect height="4" rx="1" ry="1" width="8" x="8" y="2"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/></svg>`;

document.querySelectorAll('pre.shiki').forEach((block) => {
	const button = document.createElement('button');
	button.innerHTML = ICON_COPY;

	button.addEventListener('click', () => {
		navigator.clipboard.writeText(block.querySelector('code').textContent);
		button.innerHTML = ICON_CHECK;
		setTimeout(() => {
			button.innerHTML = ICON_COPY;
		}, 1500);
	});
	block.querySelector('.language-id').appendChild(button);
});

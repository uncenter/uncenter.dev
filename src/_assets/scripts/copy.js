const ICON_CLIPBOARD_COPY = `<svg aria-hidden="true" focusable="false" fill=none height=24 stroke=currentColor stroke-linecap=round stroke-linejoin=round stroke-width=2 viewBox="0 0 24 24"width=24 xmlns=http://www.w3.org/2000/svg><rect height=4 rx=1 ry=1 width=8 x=8 y=2></rect><path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"></path><path d="M16 4h2a2 2 0 0 1 2 2v4"></path><path d="M21 14H11"></path><path d="m15 10-4 4 4 4"></path></svg>`;
const ICON_CLIPBOARD_CHECK = `<svg aria-hidden="true" focusable="false" fill=none height=24 stroke=currentColor stroke-linecap=round stroke-linejoin=round stroke-width=2 viewBox="0 0 24 24"width=24 xmlns=http://www.w3.org/2000/svg><rect height=4 rx=1 ry=1 width=8 x=8 y=2></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><path d="m9 14 2 2 4-4"></path></svg>`;

document.querySelectorAll('pre.shiki').forEach((block) => {
	const copyButton = document.createElement('button');
	copyButton.innerHTML = ICON_CLIPBOARD_COPY;

	copyButton.addEventListener('click', () => {
		navigator.clipboard.writeText(block.querySelector('code').textContent);
		copyButton.innerHTML = ICON_CLIPBOARD_CHECK;
		setTimeout(() => {
			copyButton.innerHTML = ICON_CLIPBOARD_COPY;
		}, 1500);
	});
	block.querySelector('.language-id').appendChild(copyButton);
});

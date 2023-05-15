// concept: <html theme="light|dark"> affects the CSS styling, and <html data-current-theme="light|dark|system"> affects we process the icons and cycle
const SUN_ICON =
	'<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>';
const MOON_ICON =
	'<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>';
const SYSTEM_ICON =
	'<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-laptop"><path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"></path></svg>';
const icons = {
	light: SUN_ICON,
	dark: MOON_ICON,
	system: SYSTEM_ICON,
};
const cycle = ['dark', 'light', 'system'];
const ROOT = document.documentElement;
const THEME_TOGGLE = document.querySelector('#theme-toggle');

function setTheme(theme) {
	THEME_TOGGLE.innerHTML =
		icons[cycle[(cycle.indexOf(theme) + 1) % cycle.length]];
	localStorage.setItem('theme', theme);
	if (theme === 'system') {
		theme = window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light';
	}
	ROOT.setAttribute('theme', theme);
}

window.onload = () => {
	if (['dark', 'light'].includes(localStorage.getItem('theme'))) {
		setTheme(localStorage.getItem('theme'));
	} else {
		setTheme('system');
	}
};

window
	.matchMedia('(prefers-color-scheme: dark)')
	.addEventListener('change', (e) => {
		if (localStorage.getItem('theme') !== 'system') return;
		setTheme('system');
	});

THEME_TOGGLE.addEventListener('click', () => {
	const index = cycle.indexOf(localStorage.getItem('theme'));
	let theme = cycle[(index + 1) % cycle.length];
	setTheme(theme);
});

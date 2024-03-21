function getAutomaticTheme() {
	return window.matchMedia('(prefers-color-scheme: dark)').matches
		? 'macchiato'
		: 'latte';
}

function setMetaThemeColor() {
	const meta = document.querySelector("meta[name='theme-color']");
	meta &&
		meta.setAttribute(
			'content',
			getComputedStyle(document.documentElement).getPropertyValue(
				`--base`,
			),
		);
}

function setTheme(theme, options) {
	const { permanent, update } = { permanent: true, update: true, ...options };
	if (permanent) localStorage.setItem('theme', theme);
	if (theme === 'auto') theme = getAutomaticTheme();
	document.documentElement.setAttribute('theme', theme);
	document.documentElement.style.setProperty(
		'color-scheme',
		theme === 'latte' ? 'light' : 'dark',
	);
	setMetaThemeColor();
	if (update) loadGiscus();
}

const params = new URLSearchParams(window.location.search);
const themes = ['latte', 'frappe', 'macchiato', 'mocha'];

let theme;
let stored = localStorage.getItem('theme');
let override = params.get('theme');

theme = override || stored;
if (!theme || !themes.includes(theme)) {
	theme = themes.includes(stored) ? stored : 'auto';
}
setTheme(theme, {
	permanent: theme === override ? false : true,
	update: false,
});

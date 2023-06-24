function getSystemTheme() {
	return window.matchMedia('(prefers-color-scheme: dark)').matches
		? 'dark'
		: 'light';
}

function setMetaThemeColor(theme) {
	if (theme === 'system') theme = getSystemTheme();
	const metaThemeColor = document.querySelector("meta[name='theme-color']");
	if (metaThemeColor) {
		metaThemeColor.setAttribute(
			'content',
			theme === 'dark' ? '#303446' : '#EFF1F5',
		);
		return true;
	}
	return false;
}

function setTheme(theme, options = { permanent: true, update: true }) {
	const { permanent, update } = options;
	console.log(
		`Setting theme to '${theme === 'system' ? getSystemTheme() : theme}'${
			permanent ? ", storing '" + theme + "' in localStorage." : ' (temporary).'
		}`,
	);
	if (permanent) localStorage.setItem('theme', theme);
	if (theme === 'system') theme = getSystemTheme();
	document.documentElement.setAttribute('theme', theme);
	document.documentElement.style.setProperty('color-scheme', theme);
	setMetaThemeColor(theme);
	if (update) loadGiscus();
}

const queryParams = new URLSearchParams(window.location.search);
const validThemes = ['light', 'dark', 'system'];

let theme;
let storedTheme = localStorage.getItem('theme');
let overrideTheme;

if (queryParams.has('theme')) {
	overrideTheme = queryParams.get('theme');
}

theme = overrideTheme || storedTheme;
if (!theme || !validThemes.includes(theme)) {
	console.log(
		`Invalid theme '${theme}' ${
			overrideTheme ? 'from query parameter' : 'from localStorage'
		}, ${
			storedTheme
				? "using stored '" + storedTheme + "' theme instead."
				: 'using system theme.'
		}`,
	);
	theme = validThemes.includes(storedTheme) ? storedTheme : 'system';
}
setTheme(theme, {
	permanent: theme === overrideTheme ? false : true,
	update: false,
});

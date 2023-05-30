function getSystemTheme() {
	return window.matchMedia('(prefers-color-scheme: dark)').matches
		? 'dark'
		: 'light';
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
	document
		.querySelector('meta[name="theme-color"]')
		.setAttribute('content', theme === 'dark' ? '#1d1f21' : '#ffffff');
	if (update) {
		loadGiscus();
	}
}

function setAccent(accent, options = { permanent: true }) {
	const { permanent } = options;
	console.log(
		`Setting accent to '${accent}'${
			permanent
				? ", storing '" + accent + "' in localStorage."
				: ' (temporary).'
		}`,
	);
	if (permanent) localStorage.setItem('accent', accent);
	document.documentElement.setAttribute('accent', accent);
	document.documentElement.style.setProperty(
		'--accent',
		`var(--accent-${accent})`,
	);
}

const queryParams = new URLSearchParams(window.location.search);
const validThemes = ['light', 'dark', 'system'];
const validAccents = [
	'red',
	'orange',
	'yellow',
	'green',
	'blue',
	'purple',
	'pink',
];

let theme;
let accent;
let storedTheme = localStorage.getItem('theme');
let storedAccent = localStorage.getItem('accent');
let overrideTheme;
let overrideAccent;

if (queryParams.has('theme')) {
	overrideTheme = queryParams.get('theme');
}
if (queryParams.has('accent')) {
	overrideAccent = queryParams.get('accent');
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

accent = overrideAccent || storedAccent;
if (!accent || !validAccents.includes(accent)) {
	console.log(
		`Invalid accent '${accent}' ${
			overrideAccent ? 'from query parameter' : 'from localStorage'
		}, ${
			storedAccent
				? "using stored '" + storedAccent + "' accent instead."
				: 'using default accent.'
		}`,
	);
	accent = validAccents.includes(storedAccent) ? storedAccent : 'red';
}
setAccent(accent, {
	permanent: accent === overrideAccent ? false : true,
});

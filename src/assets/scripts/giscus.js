function loadGiscus() {
	if (!document.querySelector('#comments')) return;
	let attributes = {
		'src': 'https://giscus.app/client.js',
		'data-repo': site.repository,
		'data-repo-id': 'R_kgDOHSjhjQ',
		'data-category-id': 'DIC_kwDOHSjhjc4CTQUr',
		'data-mapping': 'title',
		'data-reactions-enabled': '1',
		'data-emit-metadata': '0',
		'data-input-position': 'top',
		'data-theme': document.documentElement.getAttribute('theme'),
		'data-lang': 'en',
		'crossorigin': 'anonymous',
		'async': '',
	};
	let script = document.createElement('script');
	Object.entries(attributes).forEach(([key, value]) =>
		script.setAttribute(key, value),
	);
	document.querySelector('#comments').innerHTML = '';
	document.querySelector('#comments').appendChild(script);
}

function changeGiscusTheme() {
    const theme = document.querySelector("html").classList.contains("dark") ? 'dark' : 'light';
    function sendMessage(message) {
        const iframe = document.querySelector('iframe.giscus-frame');
        if (!iframe) return;
        iframe.contentWindow.postMessage({ giscus: message }, 'https://giscus.app');
    }
    sendMessage({
        setConfig: {
        theme: theme,
        },
    });
}

if (toggle) {
toggle.addEventListener('click', changeGiscusTheme);
}
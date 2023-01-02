const toggle = document.getElementById("toggle");
const html = document.querySelector("html");
initTheme();
toggle.onclick = function() {
        html.classList.toggle("light");
        html.classList.toggle("dark");
        toggle.classList.toggle("active");
        localStorage.setItem('colorTheme', html.classList.contains('dark') ? 'dark' : 'light');
        console.log('Toggle clicked. Theme updated.');
};

function sendMessage(message) {
    const iframe = document.querySelector('iframe.giscus-frame');
    if (!iframe) return;
    iframe.contentWindow.postMessage({ giscus: message }, 'https://giscus.app');
}

function changeGiscusTheme() {
    const theme = document.querySelector("html").classList.contains("dark") ? 'dark' : 'light';
    sendMessage({
        setConfig: {
        theme: theme,
        },
    });
    console.log("Giscus theme updated to: " + theme + "")

}

function initTheme() {
    if (localStorage.getItem('colorTheme') !== null) {
        if (localStorage.getItem('colorTheme') === "dark") {
            html.classList.add('dark');
            html.classList.remove('light');
            toggle.classList.add('active');
        }
        console.log('Theme initialized from local storage.');
        changeGiscusTheme();
    }
};


function giscus() {
    toggle.addEventListener('click', changeGiscusTheme);
}

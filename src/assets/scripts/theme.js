const toggle = document.getElementById("toggle");

function setTheme (theme) {
    if (theme === undefined) {
        if (html.dataset.theme === "dark") {
            theme = "light";
        } else {
            theme = "dark";
        }
    }
    localStorage.setItem('colorTheme', theme);
    html.dataset.theme = theme;
    checkToggle(theme)
    changeGiscusTheme(theme);
}

function checkToggle (theme) {
    const svg = toggle.querySelector('.icon');
    if (theme === "dark") {
        svg.classList.replace('moon', 'sun')
        svg.querySelector('use').setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#icon-sun');
    } else {
        svg.classList.replace('sun', 'moon')
        svg.querySelector('use').setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#icon-moon');
    }
}

const getSystemTheme = () => {
    return media.matches ? "dark" : "light";
}

function sendMessage(message) {
    const iframe = document.querySelector('iframe.giscus-frame');
    if (!iframe) return;
    iframe.contentWindow.postMessage({ giscus: message }, 'https://giscus.app');
}

function changeGiscusTheme(theme) {
    if (theme === undefined) {
        theme = html.dataset.theme
    }
    sendMessage({
        setConfig: {
        theme: theme,
        },
    });
}

media.onchange = () => {
    setTheme(getSystemTheme());
}

toggle.onclick = function() {
    setTheme();
};

checkToggle(theme);
const toggle = document.getElementById("toggle");
const html = document.querySelector("html");
const media = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme (color) {
    if (color === undefined) {
        console.log('Undefined color. Switching to opposite theme.')
        if (html.dataset.theme === "dark") {
            color = "light";
        } else {
            color = "dark";
        }
    }
    localStorage.setItem('colorTheme', color);
    html.dataset.theme = color;
    checkToggle(color)
    toggle.ariaLabel = `Switch to ${color} mode`;
    changeGiscusTheme(color);
}

function checkToggle (value) {
    if (value === "dark") {
        if (toggle.classList.contains("active") === false) { 
            toggle.classList.add("active");
        }
    } else {
        if (toggle.classList.contains("active") === true) { 
            toggle.classList.remove("active");
        }
    }
}

function initTheme() {
    theme = localStorage.getItem('colorTheme')
    if (theme !== null) {
        setTheme(theme);
        console.log('Theme initialized from local storage.');
    } else {
        setTheme(getSystemTheme())
        console.log('Theme initialized from system preference.');
    }
};


media.onchange = () => {
    setTheme(getSystemTheme());
}

const getSystemTheme = () => {
    return media.matches ? "dark" : "light";
}


document.onload = initTheme();
toggle.onclick = function() {
        setTheme();
        console.log('Toggle clicked. Theme updated.');
};

function sendMessage(message) {
    const iframe = document.querySelector('iframe.giscus-frame');
    if (!iframe) return;
    iframe.contentWindow.postMessage({ giscus: message }, 'https://giscus.app');
}

function changeGiscusTheme(theme) {
    sendMessage({
        setConfig: {
        theme: theme,
        },
    });
    console.log("Giscus theme updated to: " + theme + "")

}

function giscus() {
    toggle.addEventListener('click', changeGiscusTheme);
}

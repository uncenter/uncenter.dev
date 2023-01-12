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
    if (theme === "dark") {
        if (toggle.classList.contains("active") === false) { 
            toggle.classList.add("active");
        }
    } else {
        if (toggle.classList.contains("active") === true) { 
            toggle.classList.remove("active");
        }
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
const toggle = document.getElementById("toggle");
const html = document.querySelector("html");
initTheme();
toggle.onclick = function() {
        html.classList.toggle("light");
        html.classList.toggle("dark");
        toggle.classList.toggle("active");
        localStorage.setItem('colorTheme', html.classList.contains('dark') ? 'dark' : 'light');
};

function initTheme() {
    if (localStorage.getItem('colorTheme') !== null) {
        if (localStorage.getItem('colorTheme') === "dark") {
            html.classList.add('dark');
            html.classList.remove('light');
            toggle.classList.add('active');
        }
    }
};

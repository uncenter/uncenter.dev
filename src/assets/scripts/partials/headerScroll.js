const headerPx = 1;
const header = document.querySelector(".navigation-bar");

const scrollContainer = () => {
    return document.documentElement || document.body;
};

document.addEventListener("scroll", () => {
    if (scrollContainer().scrollTop > headerPx) {
        if(!header.classList.contains('scrolled')){
            header.classList.add('scrolled');
        }
    } else {
        header.classList.remove('scrolled');
    }
});
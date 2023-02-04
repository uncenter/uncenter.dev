
const headerPx = 1;

const header = document.querySelector("header");

const scrollContainer = () => {
    return document.documentElement || document.body;
};


document.addEventListener("scroll", () => {
    if (scrollContainer().scrollTop > headerPx) {
        if(!header.classList.contains('active')){
            header.classList.add('active');
        }
    } else {
        header.classList.remove('active');
    }
});
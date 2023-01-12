const backToTopPx = 30;
const headerPx = 1;

const backToTop = document.querySelector(".back-to-top");
const header = document.querySelector("header");

const scrollContainer = () => {
    return document.documentElement || document.body;
};

const goToTop = () => {
    window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth"
    });
};


document.addEventListener("scroll", () => {
    if (scrollContainer().scrollTop > backToTopPx) {
        backToTop.style.display = "block";
    } else {
        backToTop.style.display = "none";
    }
    if (scrollContainer().scrollTop > headerPx) {
        if(!header.classList.contains('active')){
            header.classList.add('active');
        }
    } else {
        header.classList.remove('active');
    }
});
backToTop.addEventListener("click", goToTop);

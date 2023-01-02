const backToTopPx = 30;
const backToTop = document.querySelector(".back-to-top");

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
});

backToTop.addEventListener("click", goToTop);
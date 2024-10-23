document.getElementById("scrollToTop").addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

const stickyNav = document.querySelector("#sticky-nav")
const observer = new IntersectionObserver(function([e]) {
    return e.target.classList.toggle("is-pinned", e.intersectionRatio < 1)
}, {threshold: [1]})
observer.observe(stickyNav)









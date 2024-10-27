// for the vertical side bar graphic action
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

// for the sticky nav
/*
const stickyNav = document.querySelector("#sticky-nav")
const observer = new IntersectionObserver(function([e]) {
    return e.target.classList.toggle("is-pinned", e.intersectionRatio < 1)
}, {threshold: [1]})
observer.observe(stickyNav)
*/

let textElement = document.getElementById('sticky-nav');
let scrollThreshold = 400; // Adjust to determine when the font size should change

    window.addEventListener('scroll', function() {
      if (window.scrollY > scrollThreshold) {
        textElement.style.fontSize = '10px'; // Change font size when scrolled past
      } else {
        textElement.style.fontSize = '17px'; // Original font size
      }
    });
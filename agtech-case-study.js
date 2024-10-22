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

// script.js

window.onscroll = function() {
    stickyNavbar();
};

let navbar = document.getElementById("navigation-bar");
let sticky = navbar.offsetTop;

function stickyNavbar() {
    if (window.pageYOffset > sticky) {
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }
}

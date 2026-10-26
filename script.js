const menuToggle = document.getElementById("menu-toggle");
const headerMenu = document.getElementById("header-menu");
const navLinks = document.querySelectorAll("#main-nav a");
const sections = document.querySelectorAll("main section");

/* ---- mobile menu ---- */
menuToggle.addEventListener("click", () => {
    const isOpen = headerMenu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen);
});

// close the menu after tapping a link
navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        headerMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});

/* ---- highlight the current section in the nav ---- */
function setActive(id) {
    navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === "#" + id);
    });
}

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setActive(entry.target.id);
            }
        });
    },
    { rootMargin: "-40% 0px -55% 0px" }
);

sections.forEach((section) => observer.observe(section));

// the last section is short, so force it active at the bottom of the page
window.addEventListener("scroll", () => {
    const atBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;
    if (atBottom) {
        setActive(sections[sections.length - 1].id);
    }
});
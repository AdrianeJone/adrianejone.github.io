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

/* ---- figure carousels ---- */
document.querySelectorAll(".carousel").forEach((carousel) => {
    const slides = carousel.querySelectorAll(".carousel-slide");
    const prevBtn = carousel.querySelector(".carousel-btn.prev");
    const nextBtn = carousel.querySelector(".carousel-btn.next");
    const count = carousel.querySelector(".carousel-count");
    let index = 0;

    function show(i) {
        index = (i + slides.length) % slides.length;
        slides.forEach((slide, n) => {
            slide.classList.toggle("active", n === index);
        });
        count.textContent = (index + 1) + " / " + slides.length;
    }

    prevBtn.addEventListener("click", () => show(index - 1));
    nextBtn.addEventListener("click", () => show(index + 1));

    // arrow keys when the carousel is focused
    carousel.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") show(index - 1);
        if (e.key === "ArrowRight") show(index + 1);
    });

    // swipe on touch screens
    let startX = null;
    carousel.addEventListener("touchstart", (e) => {
        startX = e.changedTouches[0].clientX;
    }, { passive: true });
    carousel.addEventListener("touchend", (e) => {
        if (startX === null) return;
        const dx = e.changedTouches[0].clientX - startX;
        if (Math.abs(dx) > 50) show(dx < 0 ? index + 1 : index - 1);
        startX = null;
    });

    show(0);
});
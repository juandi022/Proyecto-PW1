let currentSlide = 0;

function moveSlide(direction) {
    const slides = document.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;

    currentSlide += direction;

    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }

    const carousel = document.querySelector('.carousel-images');
    const offset = -currentSlide * 100;
    carousel.style.transform = `translateX(${offset}%)`;
}

setInterval(() => {
    moveSlide(1);
}, 6000);

let lastScrollTop = 0;
const headerRed = document.querySelector('.header-red');
const headerWhite = document.querySelector('.header-white');

window.addEventListener('scroll', function() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
        headerRed.style.top = '-60px';
        headerWhite.style.top = '0';
    } else {
        headerRed.style.top = '0';
        headerWhite.style.top = '60px';
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});


const menuIcon = document.getElementById('menu-icon');
const navLinks = document.querySelector('.nav-links');

if (menuIcon && navLinks) {
    menuIcon.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });

    // Opcional: cerrar el menú al hacer clic en un enlace
    const navItems = navLinks.querySelectorAll('a');
    navItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('show');
        });
    });
}

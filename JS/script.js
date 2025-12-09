// =================== CARRUSEL ===================
let currentSlide = 0;

function moveSlide(direction) {
    const slides = document.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;

    if (totalSlides === 0) return;

    currentSlide += direction;

    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }

    const carousel = document.querySelector('.carousel-images');
    if (!carousel) return;

    const offset = -currentSlide * 100;
    carousel.style.transform = `translateX(${offset}%)`;
}

// Auto-avance cada 6 segundos (solo si existe carrusel)
setInterval(() => {
    const carousel = document.querySelector('.carousel-images');
    if (carousel) {
        moveSlide(1);
    }
}, 6000);

// =================== HEADER QUE SUBE/BAJA ===================
let lastScrollTop = 0;
const headerRed = document.querySelector('.header-red');
const headerWhite = document.querySelector('.header-white');

if (headerRed && headerWhite) {
    window.addEventListener('scroll', function() {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > lastScrollTop) {
            // hacia abajo
            headerRed.style.top = '-60px';
            headerWhite.style.top = '0';
        } else {
            // hacia arriba
            headerRed.style.top = '0';
            headerWhite.style.top = '60px';
        }

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });
}

// =================== MENÚ HAMBURGUESA (MÓVIL) ===================
const menuIcon = document.getElementById('menu-icon');
const navLinks = document.querySelector('.nav-links');

if (menuIcon && navLinks) {
    menuIcon.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });

    // Cerrar menú al hacer clic en un enlace
    const navItems = navLinks.querySelectorAll('a');
    navItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('show');
        });
    });
}

// =================== DROPDOWNS EN MÓVIL ===================
const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach(drop => {
    drop.addEventListener("click", function(e) {
        if (window.innerWidth <= 768) {
            const submenu = this.querySelector(".dropdown-menu");
            if (submenu) {
                e.preventDefault();
                const isVisible = getComputedStyle(submenu).display !== "none";
                submenu.style.display = isVisible ? "none" : "block";
            }
        }
    });
});

// =================== BUSCADOR DEL HEADER ===================

// Data de navegación que se puede buscar
const searchItems = [
    {
        label: "Nosotros",
        path: "Nosotros",
        url: "Nosotros.html",
        keywords: ["nosotros", "quienes somos", "equipo", "institución"]
    },
    {
        label: "Cursos - Francés para niños",
        path: "Cursos > Francés para niños",
        url: "#",
        keywords: ["cursos", "curso niños", "francés para niños", "niños"]
    },
    {
        label: "Cursos - Francés para adolescentes",
        path: "Cursos > Francés para adolescentes",
        url: "#",
        keywords: ["cursos", "adolescentes", "jóvenes", "francés adolescentes"]
    },
    {
        label: "Cursos - Francés para adultos",
        path: "Cursos > Francés para adultos",
        url: "#",
        keywords: ["cursos", "adultos", "francés adultos"]
    },
    {
        label: "Cultura - Eventos culturales",
        path: "Cultura > Eventos culturales",
        url: "RevistaCultural.html",
        keywords: ["cultura", "eventos", "eventos culturales", "agenda", "revista"]
    },
    {
        label: "Cultura - Revista Cultural",
        path: "Cultura > Revista Cultural",
        url: "RevistaCultural.html",
        keywords: ["revista", "revista cultural", "artículos", "noticias"]
    },
    {
        label: "Cultura - Galería de imágenes",
        path: "Cultura > Galería de imágenes",
        url: "GaleriaFotos.html",
        keywords: ["galería", "fotos", "imagenes", "imágenes", "fotografía"]
    },
    {
        label: "Servicios",
        path: "Servicios",
        url: "#",
        keywords: ["servicios", "service", "oferta"]
    },
    {
        label: "Contáctenos",
        path: "Contáctenos",
        url: "#",
        keywords: ["contacto", "contáctenos", "correo", "teléfono", "ubicación"]
    }
];

// Inicializar buscador solo si existe el input
const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");

if (searchInput && searchResults) {

    function clearResults() {
        searchResults.innerHTML = "";
        searchResults.style.display = "none";
    }

    function renderResults(results) {
        if (!results.length) {
            clearResults();
            return;
        }

        searchResults.innerHTML = results.map(item => `
            <div class="search-result-item" data-url="${item.url}">
                ${item.label}
                <span class="path">${item.path}</span>
            </div>
        `).join("");

        searchResults.style.display = "block";
    }

    function filterResults(query) {
        const q = query.trim().toLowerCase();
        if (!q) {
            clearResults();
            return;
        }

        const results = searchItems.filter(item => {
            const labelMatch = item.label.toLowerCase().includes(q);
            const keywordMatch = item.keywords?.some(k => k.toLowerCase().includes(q));
            return labelMatch || keywordMatch;
        });

        renderResults(results);
    }

    // Evento cuando escribe en el input
    searchInput.addEventListener("input", () => {
        filterResults(searchInput.value);
    });

    // Enter: si hay un resultado, ir al primero
    searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const first = searchResults.querySelector(".search-result-item");
            if (first) {
                const url = first.getAttribute("data-url");
                if (url && url !== "#") {
                    window.location.href = url;
                }
                clearResults();
            }
        } else if (e.key === "Escape") {
            clearResults();
            searchInput.blur();
        }
    });

    // Click en un resultado
    searchResults.addEventListener("click", (e) => {
        const item = e.target.closest(".search-result-item");
        if (!item) return;

        const url = item.getAttribute("data-url");
        if (url && url !== "#") {
            window.location.href = url;
        }
        clearResults();
    });

    // Cerrar si hace click fuera
    document.addEventListener("click", (e) => {
        const container = document.querySelector(".search-container");
        if (!container) return;

        if (!container.contains(e.target)) {
            clearResults();
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {
    const contadoresSection = document.querySelector('.contadores');
    if (!contadoresSection) return;

    const counters = contadoresSection.querySelectorAll('span');
    let yaAnimado = false;

    function animarContadores() {
        if (yaAnimado) return;
        yaAnimado = true;

        counters.forEach(counter => {
            const final = parseInt(counter.textContent.replace(/\D/g, ''), 10);
            if (isNaN(final)) return;

            counter.classList.add('activo'); // activa el efecto de opacidad en CSS

            counter.textContent = '0';
            let inicio = 0;
            const duracion = 1500; // ms
            const inicioTiempo = performance.now();

            function actualizar(now) {
                const progreso = Math.min((now - inicioTiempo) / duracion, 1);
                const valorActual = Math.floor(progreso * final);
                counter.textContent = valorActual.toLocaleString('es-HN');

                if (progreso < 1) {
                    requestAnimationFrame(actualizar);
                } else {
                    counter.textContent = final.toLocaleString('es-HN');
                }
            }

            requestAnimationFrame(actualizar);
        });
    }

    // Usamos IntersectionObserver para disparar la animación cuando se vean
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animarContadores();
                    observer.disconnect();
                }
            });
        }, { threshold: 0.4 });

        observer.observe(contadoresSection);
    } else {
        // Fallback: si el navegador es viejo, anima al cargar
        animarContadores();
    }
});

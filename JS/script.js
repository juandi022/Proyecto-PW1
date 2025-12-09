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
const headerRed  = document.querySelector('.header-red');
const headerWhite = document.querySelector('.header-white');

if (headerRed && headerWhite) {
    window.addEventListener('scroll', function() {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > lastScrollTop) {
            // hacia abajo
            headerRed.style.top  = '-60px';
            headerWhite.style.top = '0';
        } else {
            // hacia arriba
            headerRed.style.top  = '0';
            headerWhite.style.top = '60px';
        }

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });
}

// =================== MENÚ HAMBURGUESA + DROPDOWNS (MÓVIL) ===================
document.addEventListener("DOMContentLoaded", () => {
    const menuIcon   = document.getElementById("menu-icon");
    const navLinks   = document.querySelector(".nav-links");
    const dropdownLi = document.querySelectorAll(".nav-links .dropdown");
    const allLinks   = document.querySelectorAll(".nav-links a");

    if (!navLinks || !menuIcon) return;

    const isMobile = () => window.innerWidth <= 768;

    // 🔹 Dejar SIEMPRE cerrado al iniciar en móvil
    function setInitialState() {
        if (isMobile()) {
            navLinks.classList.remove("show");
            // Fuerza que arranque cerrado aunque el CSS esté raro
            navLinks.style.display = "none";
        } else {
            // En escritorio que tome lo que diga el CSS (flex)
            navLinks.style.display = "";
            navLinks.classList.remove("show");
        }
        // Cerrar todos los submenús
        dropdownLi.forEach(d => {
            const submenu = d.querySelector(".dropdown-menu");
            if (submenu) submenu.style.display = "none";
        });
    }

    setInitialState();

    function openMenu() {
        navLinks.classList.add("show");
        navLinks.style.display = "flex";
        menuIcon.classList.add("open");
    }

    function closeMenu() {
        navLinks.classList.remove("show");
        navLinks.style.display = "none";
        menuIcon.classList.remove("open");

        dropdownLi.forEach(d => {
            const submenu = d.querySelector(".dropdown-menu");
            if (submenu) submenu.style.display = "none";
        });
    }

    // 🔹 Click en el ícono ☰
    menuIcon.addEventListener("click", (e) => {
        e.stopPropagation();             // que no dispare el click global
        if (!isMobile()) return;        // sólo móvil

        const isOpen = navLinks.style.display === "flex";

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // 🔹 Dropdowns (Cursos / Cultura) en móvil
    dropdownLi.forEach(drop => {
        const trigger = drop.querySelector("a");
        const submenu = drop.querySelector(".dropdown-menu");
        if (!trigger || !submenu) return;

        // En escritorio se manejan por :hover (CSS), no tocamos nada
        trigger.addEventListener("click", (e) => {
            if (!isMobile()) return;

            const isOpen = submenu.style.display === "block";

            if (!isOpen) {
                // Primer click: abrir submenú, NO navegar
                e.preventDefault();

                // Cerrar otros submenús
                dropdownLi.forEach(d => {
                    if (d !== drop) {
                        const other = d.querySelector(".dropdown-menu");
                        if (other) other.style.display = "none";
                    }
                });

                submenu.style.display = "block";
            } else {
                // Segundo click: ya estaba abierto → dejamos que navegue
            }
        });
    });

    // 🔹 Cerrar menú al hacer click en cualquier link que NO sea el trigger del dropdown
    allLinks.forEach(a => {
        a.addEventListener("click", () => {
            if (!isMobile()) return;

            const li = a.parentElement;
            const esTriggerDropdown =
                li &&
                li.classList.contains("dropdown") &&
                a === li.querySelector("a");

            if (esTriggerDropdown) {
                // Este click se usa para abrir el menú, no cerrar todo
                return;
            }

            // Cualquier otro link: cerrar menú
            closeMenu();
        });
    });

    // 🔹 Cerrar si hago click fuera del menú en móvil
    document.addEventListener("click", (e) => {
        if (!isMobile()) return;

        const clickDentroNav  = navLinks.contains(e.target);
        const clickEnIcono    = menuIcon.contains(e.target);

        if (!clickDentroNav && !clickEnIcono) {
            closeMenu();
        }
    });

    // 🔹 Reset al cambiar tamaño de pantalla
    window.addEventListener("resize", () => {
        setInitialState();
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
        url: "curso-ninos.html",
        keywords: ["cursos", "curso niños", "francés para niños", "niños"]
    },
    {
        label: "Cursos - Francés para adolescentes",
        path: "Cursos > Francés para adolescentes",
        url: "curso-adolescentes.html",
        keywords: ["cursos", "adolescentes", "jóvenes", "francés adolescentes"]
    },
    {
        label: "Cursos - Francés para adultos",
        path: "Cursos > Francés para adultos",
        url: "curso-adultos.html",
        keywords: ["cursos", "adultos", "francés adultos"]
    },
    {
        label: "Cultura - Eventos culturales",
        path: "Cultura > Eventos culturales",
        url: "eventosculturales.html",
        keywords: ["cultura", "eventos", "eventos culturales", "agenda"]
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
        url: "contactenos.html",
        keywords: ["contacto", "contáctenos", "correo", "teléfono", "ubicación"]
    }
];

// Inicializar buscador solo si existe el input
const searchInput   = document.getElementById("search-input");
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
            const labelMatch   = item.label.toLowerCase().includes(q);
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

// =================== CONTADORES ANIMADOS ===================
document.addEventListener('DOMContentLoaded', () => {
    const contadoresSection = document.querySelector('.contadores');
    if (!contadoresSection) return;

    const counters  = contadoresSection.querySelectorAll('span');
    let yaAnimado   = false;

    function animarContadores() {
        if (yaAnimado) return;
        yaAnimado = true;

        counters.forEach(counter => {
            const final = parseInt(counter.textContent.replace(/\D/g, ''), 10);
            if (isNaN(final)) return;

            counter.classList.add('activo'); // activa el efecto de opacidad en CSS

            counter.textContent = '0';
            const duracion      = 1500; // ms
            const inicioTiempo  = performance.now();

            function actualizar(now) {
                const progreso    = Math.min((now - inicioTiempo) / duracion, 1);
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

// =================== VALIDACIÓN FORMULARIO + MODAL ÉXITO (INSCRIPCIÓN) ===================
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-info");
    if (!form) return; // Si no estamos en esa página, no hace nada

    const nombre    = document.getElementById("nombre");
    const correo    = document.getElementById("correo");
    const telefono  = document.getElementById("telefono");
    const curso     = document.getElementById("curso");
    const modalidad = document.getElementById("modalidad");
    const mensaje   = document.getElementById("mensaje");

    const overlay   = document.getElementById("success-overlay");
    const btnCerrar = document.getElementById("btn-cerrar-success");

    function limpiarError(campo) {
        const contenedor = campo.closest(".campo");
        if (!contenedor) return;
        contenedor.classList.remove("campo-error");
        const small = contenedor.querySelector(".mensaje-error");
        if (small) small.textContent = "";
    }

    function marcarError(campo, mensaje) {
        const contenedor = campo.closest(".campo");
        if (!contenedor) return;
        contenedor.classList.add("campo-error");
        const small = contenedor.querySelector(".mensaje-error");
        if (small) small.textContent = mensaje;
    }

    function validarNombre() {
        limpiarError(nombre);
        const valor = nombre.value.trim();
        if (valor.length < 3) {
            marcarError(nombre, "Ingrese al menos 3 caracteres.");
            return false;
        }
        return true;
    }

    function validarCorreo() {
        limpiarError(correo);
        const valor = correo.value.trim();
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(valor)) {
            marcarError(correo, "Ingrese un correo válido.");
            return false;
        }
        return true;
    }

    function validarTelefono() {
        limpiarError(telefono);
        const valor       = telefono.value.trim();
        const soloDigitos = valor.replace(/\D/g, "");
        if (soloDigitos.length < 8) {
            marcarError(telefono, "Ingrese un teléfono válido (al menos 8 dígitos).");
            return false;
        }
        return true;
    }

    function validarCurso() {
        limpiarError(curso);
        if (!curso.value) {
            marcarError(curso, "Seleccione un curso de interés.");
            return false;
        }
        return true;
    }

    // Modalidad es opcional, pero podrías validar si quieres:
    function validarModalidad() {
        limpiarError(modalidad);
        return true;
    }

    function validarMensaje() {
        limpiarError(mensaje);
        if (mensaje.value.trim().length > 0 && mensaje.value.trim().length < 5) {
            marcarError(mensaje, "Si escribe un mensaje, que sea un poco más detallado.");
            return false;
        }
        return true;
    }

    function mostrarExito() {
        if (!overlay) return;
        overlay.classList.add("show");

        // Ocultar automáticamente después de unos segundos (opcional)
        setTimeout(() => {
            overlay.classList.remove("show");
        }, 3500);
    }

    // Cerrar al hacer click en botón
    if (btnCerrar && overlay) {
        btnCerrar.addEventListener("click", () => {
            overlay.classList.remove("show");
        });

        // Cerrar si se hace click fuera de la tarjeta
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) {
                overlay.classList.remove("show");
            }
        });
    }

    // Validación en tiempo real opcional
    nombre.addEventListener("input", validarNombre);
    correo.addEventListener("input", validarCorreo);
    telefono.addEventListener("input", validarTelefono);
    curso.addEventListener("change", validarCurso);
    mensaje.addEventListener("input", validarMensaje);

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const v1 = validarNombre();
        const v2 = validarCorreo();
        const v3 = validarTelefono();
        const v4 = validarCurso();
        const v5 = validarModalidad();
        const v6 = validarMensaje();

        const todoOk = v1 && v2 && v3 && v4 && v5 && v6;

        if (!todoOk) return;

        // Aquí podrías hacer envío real por AJAX / EmailJS si luego quieres.
        form.reset();
        mostrarExito();
    });
});

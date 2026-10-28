(() => {
  const nav = document.getElementById("nav");
  const menu = document.getElementById("navMenu");
  const movil = document.getElementById("navMovil");
  const oscuro = document.querySelector("[data-tema='oscuro']");

  // La barra toma fondo al bajar y cambia a oscura cuando pasa sobre la zona negra.
  const alDesplazar = () => {
    nav.classList.toggle("con-fondo", window.scrollY > 24);
    if (oscuro) {
      const { top, bottom } = oscuro.getBoundingClientRect();
      nav.classList.toggle("es-oscuro", top <= 42 && bottom >= 42);
    }
  };
  alDesplazar();
  window.addEventListener("scroll", alDesplazar, { passive: true });
  window.addEventListener("resize", alDesplazar, { passive: true });

  const cerrarMenu = () => {
    movil.classList.remove("abierto");
    menu.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-label", "Abrir menú");
  };
  menu.addEventListener("click", () => {
    const abierto = movil.classList.toggle("abierto");
    menu.setAttribute("aria-expanded", String(abierto));
    menu.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
  });
  movil.querySelectorAll("a").forEach((enlace) => enlace.addEventListener("click", cerrarMenu));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") cerrarMenu();
  });

  const porRevelar = document.querySelectorAll(".revela");
  if ("IntersectionObserver" in window) {
    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            entrada.target.classList.add("visible");
            observador.unobserve(entrada.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    porRevelar.forEach((el) => observador.observe(el));
  } else {
    porRevelar.forEach((el) => el.classList.add("visible"));
  }

  const anio = document.getElementById("anio");
  if (anio) anio.textContent = new Date().getFullYear();
})();

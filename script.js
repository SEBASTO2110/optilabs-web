(() => {
  const nav = document.getElementById("nav");
  const navToggle = document.getElementById("navToggle");
  const navMobile = document.getElementById("navMobile");

  const onScroll = () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 40);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  navToggle.addEventListener("click", () => {
    const isOpen = navMobile.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navMobile.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMobile.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  const revealTargets = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealTargets.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealTargets.forEach((el) => observer.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  }

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

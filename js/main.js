// Mobile nav toggle
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav__toggle");
  const links = document.querySelector(".nav__links");
  if (toggle && links) {
    toggle.addEventListener("click", () => links.classList.toggle("open"));
  }

  // Highlight the active nav link
  const path = window.location.pathname.replace(/\/$/, "");
  document.querySelectorAll(".nav__links a").forEach((a) => {
    const href = a.getAttribute("href").replace(/\/$/, "");
    if (
      href &&
      (path === href ||
        (href !== "/" && path.startsWith(href)))
    ) {
      a.classList.add("active");
    }
  });
});

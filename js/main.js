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

// Lightbox slideshow
(function () {
  const items = [];
  let current = 0;
  let lb, lbImg, lbCaption, lbCounter, lbPrev, lbNext;
  let touchStartX = 0;

  function build() {
    lb = document.createElement("div");
    lb.className = "lightbox";
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-modal", "true");
    lb.setAttribute("aria-label", "Photo viewer");
    lb.tabIndex = -1;
    lb.innerHTML =
      '<button class="lightbox__close" aria-label="Close">&#x2715;</button>' +
      '<button class="lightbox__nav lightbox__prev" aria-label="Previous">&#x2039;</button>' +
      '<div class="lightbox__img-wrap"><img class="lightbox__img" alt="" /></div>' +
      '<button class="lightbox__nav lightbox__next" aria-label="Next">&#x203a;</button>' +
      '<div class="lightbox__caption"></div>' +
      '<div class="lightbox__counter"></div>';
    document.body.appendChild(lb);

    lbImg     = lb.querySelector(".lightbox__img");
    lbCaption = lb.querySelector(".lightbox__caption");
    lbCounter = lb.querySelector(".lightbox__counter");
    lbPrev    = lb.querySelector(".lightbox__prev");
    lbNext    = lb.querySelector(".lightbox__next");

    lb.querySelector(".lightbox__close").addEventListener("click", close);
    lbPrev.addEventListener("click", prev);
    lbNext.addEventListener("click", next);

    // Click on backdrop (not on image/controls) closes
    lb.addEventListener("click", (e) => {
      if (e.target === lb || e.target.classList.contains("lightbox__img-wrap")) close();
    });

    lb.addEventListener("touchstart", (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    lb.addEventListener("touchend", (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 50) { dx < 0 ? next() : prev(); }
    }, { passive: true });
  }

  function show(index) {
    current = index;
    const item = items[current];
    lbImg.style.opacity = "0";
    lbImg.alt = item.alt;
    lbImg.src = item.src;
    lbImg.onload = () => { lbImg.style.opacity = "1"; };
    lbCaption.textContent = item.caption;
    lbCounter.textContent = (current + 1) + " / " + items.length;
    lbPrev.style.visibility = items.length > 1 ? "visible" : "hidden";
    lbNext.style.visibility = items.length > 1 ? "visible" : "hidden";
  }

  function open(index) {
    show(index);
    lb.classList.add("open");
    document.body.style.overflow = "hidden";
    lb.focus();
  }

  function close() {
    lb.classList.remove("open");
    document.body.style.overflow = "";
  }

  function prev() { show((current - 1 + items.length) % items.length); }
  function next() { show((current + 1) % items.length); }

  function init() {
    document.querySelectorAll(".tile:not(.tile--placeholder):not(.tile--caption-below)").forEach((tile) => {
      const img = tile.querySelector("img");
      if (!img) return;
      const caption = tile.querySelector(".tile__caption");
      const idx = items.length;
      items.push({ src: img.src, alt: img.alt, caption: caption ? caption.textContent.trim() : "" });
      tile.addEventListener("click", () => open(idx));
    });

    if (items.length === 0) return;
    build();

    document.addEventListener("keydown", (e) => {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape")     close();
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
}());

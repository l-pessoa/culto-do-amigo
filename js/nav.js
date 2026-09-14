function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const list = document.getElementById("nav-list");

  if (toggle && list) {
    toggle.addEventListener("click", () => {
      const isOpen = list.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    list.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        list.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const currentPage = document.body.dataset.page;
  if (currentPage) {
    const activeLink = document.querySelector(`.nav-list a[data-page="${currentPage}"]`);
    if (activeLink) activeLink.setAttribute("aria-current", "page");
  }
}

initNav();

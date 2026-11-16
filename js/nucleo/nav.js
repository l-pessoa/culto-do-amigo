function initNav() {
  const currentPage = document.body.dataset.page;
  if (!currentPage) return;

  document
    .querySelectorAll(
      `.nav-list a[data-page="${currentPage}"], .bottom-nav__item[data-page="${currentPage}"]`
    )
    .forEach((el) => el.setAttribute("aria-current", "page"));
}

initNav();

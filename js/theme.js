const STORAGE_KEY = "culto-amigo-theme";

const ICON_SUN = `<svg class="icon theme-toggle__sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.5"/><path d="M12 2.5v2.5M12 19v2.5M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M2.5 12H5M19 12h2.5M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8"/></svg>`;
const ICON_MOON = `<svg class="icon theme-toggle__moon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/></svg>`;

function currentTheme() {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch (e) {}
}

function mountToggle() {
  const header = document.querySelector(".header-inner");
  if (!header || document.getElementById("theme-toggle")) return;

  const btn = document.createElement("button");
  btn.type = "button";
  btn.id = "theme-toggle";
  btn.className = "theme-toggle";
  btn.setAttribute("aria-label", "Alternar entre tema claro e escuro");
  btn.innerHTML = ICON_MOON + ICON_SUN;

  btn.addEventListener("click", () => {
    setTheme(currentTheme() === "dark" ? "light" : "dark");
  });

  const nav = header.querySelector(".main-nav");
  if (nav) nav.appendChild(btn);
  else header.appendChild(btn);
}

mountToggle();

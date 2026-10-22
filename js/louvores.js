import { conteudo, CATEGORIAS_ORDEM } from "../data/conteudo.js";

const ICON_PLAY = `<svg class="icon" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 4l14 8-14 8z"/></svg>`;

function renderCategoryList() {
  const list = document.getElementById("category-list");
  if (!list) return;

  const contagem = CATEGORIAS_ORDEM.map((categoria) => {
    const total = conteudo.hinos.filter((h) => h.categoria === categoria).length;
    return { categoria, total };
  });

  list.innerHTML = contagem
    .map(
      ({ categoria, total }) =>
        `<li><a href="#categoria-${slugify(categoria)}">${categoria} <span aria-hidden="true">– ${total}</span></a></li>`
    )
    .join("");
}

function slugify(text) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "-");
}

function renderGrid() {
  const grid = document.getElementById("hino-grid");
  if (!grid) return;

  grid.innerHTML = CATEGORIAS_ORDEM.map((categoria) => {
    const hinosDaCategoria = conteudo.hinos.filter((h) => h.categoria === categoria);
    if (hinosDaCategoria.length === 0) return "";

    const rows = hinosDaCategoria.map((hino) => playlistRowHtml(hino)).join("");

    return `
      <div class="hino-category" id="categoria-${slugify(categoria)}">
        <div class="playlist-card">
          <div class="playlist-card__head">
            <p class="playlist-card__title">${categoria}</p>
            <p class="playlist-card__count">${hinosDaCategoria.length} hino${hinosDaCategoria.length === 1 ? "" : "s"}</p>
          </div>
          <div class="playlist-rows">${rows}</div>
        </div>
      </div>`;
  }).join("");
}

function playlistRowHtml(hino) {
  return `
    <a class="playlist-row" href="player.html?hino=${encodeURIComponent(hino.id)}">
      <div class="disc disc--sm disc--idle" aria-hidden="true"></div>
      <div class="playlist-row__body">
        <p class="playlist-row__title">${hino.titulo}</p>
        <p class="playlist-row__meta">${hino.categoria}</p>
      </div>
      <span class="playlist-row__play" aria-hidden="true">${ICON_PLAY}</span>
    </a>`;
}

renderCategoryList();
renderGrid();

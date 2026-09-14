import { conteudo, CATEGORIAS_ORDEM } from "../data/conteudo.js";

const ICON_PREV = `<svg class="icon" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 5v14l-11-7z"/><rect x="4" y="5" width="2" height="14"/></svg>`;
const ICON_NEXT = `<svg class="icon" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5 5v14l11-7z"/><rect x="18" y="5" width="2" height="14"/></svg>`;
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

    const cards = hinosDaCategoria.map((hino) => hinoCardHtml(hino)).join("");

    return `
      <div class="hino-category" id="categoria-${slugify(categoria)}">
        <h3 class="hino-category__title eyebrow-plain">${categoria}</h3>
        <div class="hino-grid">${cards}</div>
      </div>`;
  }).join("");
}

function hinoCardHtml(hino) {
  return `
    <a class="hino-card" href="player.html?hino=${encodeURIComponent(hino.id)}">
      <div class="hino-card__disc"><div class="disc"></div></div>
      <div class="hino-card__body">
        <p class="hino-card__title">${hino.titulo}</p>
        <div class="hino-card__scrubber" aria-hidden="true"><span></span></div>
        <div class="hino-card__controls" aria-hidden="true">
          ${ICON_PREV}
          <span class="play">${ICON_PLAY}</span>
          ${ICON_NEXT}
        </div>
        <div class="hino-card__meta" aria-hidden="true">
          <span>${hino.categoria}</span>
          <span class="waveform">${waveformBars()}</span>
        </div>
      </div>
    </a>`;
}

function waveformBars() {
  const heights = [4, 8, 6, 10, 5, 9, 4];
  return heights.map((h) => `<span style="height:${h}px"></span>`).join("");
}

renderCategoryList();
renderGrid();

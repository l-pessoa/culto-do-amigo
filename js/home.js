import { conteudo, CATEGORIAS_ORDEM } from "../data/conteudo.js";

function renderCarousel() {
  const track = document.getElementById("home-carousel-track");
  if (!track) return;

  const destaques = CATEGORIAS_ORDEM.map((categoria) =>
    conteudo.hinos.find((hino) => hino.categoria === categoria)
  ).filter(Boolean);

  track.innerHTML = destaques
    .map(
      (hino) => `
        <a class="carousel-item hino-card" href="louvores.html">
          <div class="hino-card__disc"><div class="disc"></div></div>
          <div class="hino-card__body">
            <p class="hino-card__title">${hino.titulo}</p>
          </div>
        </a>`
    )
    .join("");

  const prevBtn = document.querySelector(".carousel-nav-btn.prev");
  const nextBtn = document.querySelector(".carousel-nav-btn.next");
  const scrollAmount = () => track.clientWidth * 0.8;

  prevBtn?.addEventListener("click", () => {
    track.scrollBy({ left: -scrollAmount(), behavior: "smooth" });
  });
  nextBtn?.addEventListener("click", () => {
    track.scrollBy({ left: scrollAmount(), behavior: "smooth" });
  });
}

function renderPreviewText() {
  const map = {
    "home-hero-title": conteudo.home.tituloTop,
    "home-hero-overlay": conteudo.home.tituloOverlay,
    "home-lema-frase": conteudo.lema.fraseEfeito,
    "home-pregacao-versiculo": `"${conteudo.pregacao.versiculo}"`,
    "home-pregacao-referencia": conteudo.pregacao.referencia,
    "home-convite-texto": conteudo.convite.texto,
  };

  Object.entries(map).forEach(([id, value]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  });
}

renderCarousel();
renderPreviewText();

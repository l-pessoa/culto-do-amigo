// Carrosséis de fotos da página "Volte sempre".
// CSS scroll-snap + botões, teclado, indicadores. Sem bibliotecas.
import { conteudo } from "../../data/conteudo.js";

const reduzMovimento = window.matchMedia("(prefers-reduced-motion: reduce)");
const esc = (t) => String(t).replace(/[&<>"]/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m]));

const seta = (dir) =>
  `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${dir === "prev" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}"/></svg>`;

function montar(raiz) {
  const fotos = conteudo.convite[raiz.dataset.fonte];
  if (!Array.isArray(fotos) || !fotos.length) return;
  const nome = raiz.dataset.nome || "Fotos";

  raiz.setAttribute("role", "region");
  raiz.setAttribute("aria-roledescription", "carrossel");
  raiz.setAttribute("aria-label", nome);
  raiz.innerHTML = `
    <div class="carrossel__viewport">
      <div class="carrossel__track" tabindex="0" aria-label="${esc(nome)}: use as setas do teclado ou deslize">
        ${fotos
          .map(
            (f, i) => `
          <figure class="carrossel__slide" role="group" aria-roledescription="slide" aria-label="${i + 1} de ${fotos.length}">
            <img class="carrossel__bg" src="${esc(f.src)}" alt="" aria-hidden="true" loading="lazy" decoding="async" draggable="false">
            <img class="carrossel__foto" src="${esc(f.src)}" alt="${esc(f.alt)}" loading="${i === 0 ? "eager" : "lazy"}" decoding="async" draggable="false">
            ${f.legenda ? `<figcaption>${esc(f.legenda)}</figcaption>` : ""}
          </figure>`
          )
          .join("")}
      </div>
      <button type="button" class="carrossel__btn carrossel__btn--prev" aria-label="Foto anterior">${seta("prev")}</button>
      <button type="button" class="carrossel__btn carrossel__btn--next" aria-label="Próxima foto">${seta("next")}</button>
    </div>
    <div class="carrossel__dots" role="group" aria-label="Escolher foto">
      ${fotos.map((_, i) => `<button type="button" class="carrossel__dot" aria-label="Ir para a foto ${i + 1}"></button>`).join("")}
    </div>
    <p class="sr-only" aria-live="polite" data-live></p>`;

  const track = raiz.querySelector(".carrossel__track");
  const slides = [...track.children];
  const dots = [...raiz.querySelectorAll(".carrossel__dot")];
  const prev = raiz.querySelector(".carrossel__btn--prev");
  const next = raiz.querySelector(".carrossel__btn--next");
  const live = raiz.querySelector("[data-live]");
  let atual = 0;

  function marcar(i) {
    atual = i;
    slides.forEach((s, k) => s.classList.toggle("is-active", k === i));
    dots.forEach((d, k) => {
      d.classList.toggle("is-active", k === i);
      if (k === i) d.setAttribute("aria-current", "true");
      else d.removeAttribute("aria-current");
    });
  }

  function ir(i) {
    i = (i + slides.length) % slides.length; // dá a volta: depois da última, a primeira
    const s = slides[i];
    const alvo = s.offsetLeft - (track.clientWidth - s.clientWidth) / 2;
    track.scrollTo({ left: alvo, behavior: reduzMovimento.matches ? "auto" : "smooth" });
    marcar(i);
  }

  let raf = 0;
  track.addEventListener("scroll", () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const centro = track.scrollLeft + track.clientWidth / 2;
      let melhor = 0;
      let dist = Infinity;
      slides.forEach((s, k) => {
        const d = Math.abs(s.offsetLeft + s.clientWidth / 2 - centro);
        if (d < dist) { dist = d; melhor = k; }
      });
      if (melhor !== atual) {
        marcar(melhor);
        live.textContent = `${melhor + 1} de ${slides.length}: ${fotos[melhor].legenda || fotos[melhor].alt}`;
      }
    });
  }, { passive: true });

  prev.addEventListener("click", () => ir(atual - 1));
  next.addEventListener("click", () => ir(atual + 1));
  dots.forEach((d, k) => d.addEventListener("click", () => ir(k)));
  track.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); ir(atual + 1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); ir(atual - 1); }
    else if (e.key === "Home") { e.preventDefault(); ir(0); }
    else if (e.key === "End") { e.preventDefault(); ir(slides.length - 1); }
  });

  // passa sozinho a cada INTERVALO ms; pausa com dedo/mouse/foco, aba escondida
  // ou carrossel fora da tela, e nunca roda se a pessoa pediu menos movimento.
  const INTERVALO = 4000;
  let timer = 0;
  let visivel = false;
  let pausado = false;
  const podeAutoplay = () => !reduzMovimento.matches && visivel && !pausado && !document.hidden && slides.length > 1;
  function agendar() {
    clearTimeout(timer);
    if (podeAutoplay()) timer = setTimeout(() => { ir(atual + 1); agendar(); }, INTERVALO);
  }
  const pausar = () => { pausado = true; agendar(); };
  const retomar = () => { pausado = false; agendar(); };
  raiz.addEventListener("pointerenter", pausar);
  raiz.addEventListener("pointerleave", retomar);
  raiz.addEventListener("focusin", pausar);
  raiz.addEventListener("focusout", retomar);
  // toque: pausa enquanto o dedo está na foto e dá um respiro depois de deslizar
  track.addEventListener("touchstart", pausar, { passive: true });
  track.addEventListener("touchend", () => { clearTimeout(timer); pausado = false; timer = setTimeout(agendar, INTERVALO); }, { passive: true });
  document.addEventListener("visibilitychange", agendar);
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([e]) => { visivel = e.isIntersecting; agendar(); }, { threshold: 0.4 }).observe(raiz);
  } else {
    visivel = true;
    agendar();
  }

  marcar(0);
}

document.querySelectorAll(".carrossel[data-fonte]").forEach(montar);

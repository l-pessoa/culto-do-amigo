// Botão discreto de música da página "Volte sempre".
// Desligado por padrão (nunca autoplay). Pausa ao sair da página.
import { conteudo } from "../data/conteudo.js";

const btn = document.getElementById("convite-musica-btn");
const musica = conteudo.convite && conteudo.convite.musica;

if (btn && musica) {
  const label = document.getElementById("convite-musica-label");
  let audio = null;

  btn.hidden = false;
  label.textContent = musica.rotulo;
  btn.setAttribute("aria-label", `${musica.rotulo}: ${musica.titulo}`);

  function estado(tocando) {
    btn.setAttribute("aria-pressed", String(tocando));
    btn.classList.toggle("is-playing", tocando);
    label.textContent = tocando ? `Tocando: ${musica.titulo}` : musica.rotulo;
  }

  function pausar() {
    if (audio && !audio.paused) audio.pause();
    estado(false);
  }

  btn.addEventListener("click", () => {
    if (!audio) {
      audio = new Audio();
      audio.preload = "none";
      audio.src = musica.arquivo;
      audio.loop = true;
      audio.addEventListener("pause", () => estado(false));
      audio.addEventListener("play", () => estado(true));
      audio.addEventListener("error", () => estado(false));
    }
    if (audio.paused) {
      audio.play().catch(() => estado(false));
    } else {
      audio.pause();
    }
  });

  document.addEventListener("visibilitychange", () => { if (document.hidden) pausar(); });
  window.addEventListener("pagehide", pausar);
}

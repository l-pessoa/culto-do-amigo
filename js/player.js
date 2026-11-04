import { conteudo } from "../data/conteudo.js";
import { discCoverHtml } from "./disc.js";

const params = new URLSearchParams(location.search);
const hinoId = params.get("hino");
const index = conteudo.hinos.findIndex((h) => h.id === hinoId);
const hino = index >= 0 ? conteudo.hinos[index] : null;

const root = document.getElementById("player-root");

if (!hino) {
  root.innerHTML = `
    <p class="player-back"><a href="louvores.html">&larr; Voltar</a></p>
    <p class="player-unavailable">Hino não encontrado. Volte para a lista de louvores e escolha outro.</p>
  `;
} else {
  renderPlayer(hino);
}

function renderPlayer(hino) {
  root.innerHTML = `
    <p class="player-back"><a href="louvores.html">&larr; Voltar</a></p>
    <div class="player-panel">
      <div class="player-disc-wrap"><div class="disc" id="player-disc">${discCoverHtml(hino)}</div></div>
      <div class="player-info">
        <h1 class="player-title">${hino.titulo}</h1>
        <p class="player-category">${hino.categoria}</p>
      </div>
      <div id="player-audio-area" class="player-audio-area">
        <div class="player-scrubber" id="player-scrubber">
          <div class="player-scrubber__fill" id="player-scrubber-fill"></div>
        </div>
        <div class="player-time">
          <span id="player-time-current">0:00</span>
          <span id="player-time-duration">0:00</span>
        </div>
        <div class="player-controls">
          <button type="button" id="player-prev" aria-label="Hino anterior">${iconPrev()}</button>
          <button type="button" id="player-rewind" aria-label="Voltar 10 segundos">${iconRewind10()}</button>
          <button type="button" id="player-play" class="play-pause" aria-label="Tocar">${iconPlay()}</button>
          <button type="button" id="player-forward" aria-label="Avançar 10 segundos">${iconForward10()}</button>
          <button type="button" id="player-next" aria-label="Próximo hino">${iconNext()}</button>
        </div>
      </div>
    </div>
    ${upNextHtml(hino)}
    <audio id="player-audio" src="${hino.arquivoAudio}" preload="none"></audio>
  `;

  const audio = document.getElementById("player-audio");
  const disc = document.getElementById("player-disc");
  const playBtn = document.getElementById("player-play");
  const scrubber = document.getElementById("player-scrubber");
  const scrubberFill = document.getElementById("player-scrubber-fill");
  const timeCurrent = document.getElementById("player-time-current");
  const timeDuration = document.getElementById("player-time-duration");
  const audioArea = document.getElementById("player-audio-area");
  const prevBtn = document.getElementById("player-prev");
  const nextBtn = document.getElementById("player-next");
  const rewindBtn = document.getElementById("player-rewind");
  const forwardBtn = document.getElementById("player-forward");

  const prevHino = conteudo.hinos[index - 1];
  const nextHino = conteudo.hinos[index + 1];
  prevBtn.disabled = !prevHino;
  nextBtn.disabled = !nextHino;
  if (!prevHino) prevBtn.style.visibility = "hidden";
  if (!nextHino) nextBtn.style.visibility = "hidden";

  prevBtn.addEventListener("click", () => {
    if (prevHino) location.href = `player.html?hino=${encodeURIComponent(prevHino.id)}`;
  });
  nextBtn.addEventListener("click", () => {
    if (nextHino) location.href = `player.html?hino=${encodeURIComponent(nextHino.id)}`;
  });

  playBtn.addEventListener("click", () => {
    if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
  });

  rewindBtn.addEventListener("click", () => {
    audio.currentTime = Math.max(0, audio.currentTime - 10);
  });
  forwardBtn.addEventListener("click", () => {
    audio.currentTime = Math.min(audio.duration || audio.currentTime + 10, audio.currentTime + 10);
  });

  audio.addEventListener("play", () => {
    disc.style.animationPlayState = "running";
    playBtn.innerHTML = iconPause();
    playBtn.setAttribute("aria-label", "Pausar");
  });

  audio.addEventListener("pause", () => {
    disc.style.animationPlayState = "paused";
    playBtn.innerHTML = iconPlay();
    playBtn.setAttribute("aria-label", "Tocar");
  });

  audio.addEventListener("ended", () => {
    disc.style.animationPlayState = "paused";
    playBtn.innerHTML = iconPlay();
    playBtn.setAttribute("aria-label", "Tocar");
  });

  audio.addEventListener("timeupdate", () => {
    if (!audio.duration) return;
    const pct = (audio.currentTime / audio.duration) * 100;
    scrubberFill.style.width = `${pct}%`;
    timeCurrent.textContent = formatTime(audio.currentTime);
  });

  audio.addEventListener("loadedmetadata", () => {
    timeDuration.textContent = formatTime(audio.duration);
  });

  scrubber.addEventListener("click", (event) => {
    if (!audio.duration) return;
    const rect = scrubber.getBoundingClientRect();
    const ratio = (event.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * audio.duration;
  });

  audio.addEventListener("error", () => {
    audioArea.innerHTML = `<p class="player-unavailable">Áudio ainda não disponível para este hino.</p>`;
  });
}

function upNextHtml(current) {
  const related = conteudo.hinos.filter(
    (h) => h.categoria === current.categoria && h.id !== current.id
  );
  if (related.length === 0) return "";

  const rows = related
    .map(
      (h) => `
        <a class="playlist-row" href="player.html?hino=${encodeURIComponent(h.id)}">
          <div class="disc disc--sm disc--idle" aria-hidden="true">${discCoverHtml(h)}</div>
          <div class="playlist-row__body">
            <p class="playlist-row__title">${h.titulo}</p>
            <p class="playlist-row__meta">${h.categoria}</p>
          </div>
          <span class="playlist-row__play" aria-hidden="true">${iconPlay()}</span>
        </a>`
    )
    .join("");

  return `
    <div class="up-next">
      <div class="playlist-card">
        <div class="playlist-card__head">
          <p class="playlist-card__title">Mais de ${current.categoria}</p>
        </div>
        <div class="playlist-rows">${rows}</div>
      </div>
    </div>`;
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function iconPlay() {
  return `<svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4l14 8-14 8z"/></svg>`;
}
function iconPause() {
  return `<svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`;
}
function iconPrev() {
  return `<svg class="icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 5v14l-11-7z"/><rect x="4" y="5" width="2" height="14"/></svg>`;
}
function iconNext() {
  return `<svg class="icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5 5v14l11-7z"/><rect x="18" y="5" width="2" height="14"/></svg>`;
}
function iconRewind10() {
  return `<svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M8 4.5 4.5 7.5 8 10.5"/>
    <path d="M4.5 7.5a8 8 0 1 1 -2.2 7.9"/>
    <text x="12.5" y="17" font-size="7.5" font-weight="700" stroke="none" fill="currentColor" text-anchor="middle" font-family="inherit">10</text>
  </svg>`;
}
function iconForward10() {
  return `<svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M16 4.5 19.5 7.5 16 10.5"/>
    <path d="M19.5 7.5a8 8 0 1 0 2.2 7.9"/>
    <text x="11.5" y="17" font-size="7.5" font-weight="700" stroke="none" fill="currentColor" text-anchor="middle" font-family="inherit">10</text>
  </svg>`;
}

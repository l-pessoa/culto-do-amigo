import { conteudo } from "../data/conteudo.js";
import { discCoverHtml } from "./disc.js";

const params = new URLSearchParams(location.search);
const hinoId = params.get("hino");
const indexInicial = conteudo.hinos.findIndex((h) => h.id === hinoId);

const root = document.getElementById("player-root");

// Os tempos foram marcados ~0,2 s depois do início real de cada linha (latência
// ao apertar espaço); LEAD antecipa a troca. ?lead= (0–1 s) deixa calibrar.
const LEAD_PADRAO = 0.3;
const leadParam = parseFloat(params.get("lead"));
const LEAD = Number.isFinite(leadParam) ? Math.min(1, Math.max(0, leadParam)) : LEAD_PADRAO;

if (indexInicial < 0) {
  root.innerHTML = `
    <p class="player-back"><a href="louvores.html">&larr; Voltar</a></p>
    <p class="player-unavailable">Hino não encontrado. Volte para a lista de louvores e escolha outro.</p>
  `;
} else {
  renderPlayer(indexInicial);
}

function renderPlayer(indexInicial) {
  root.innerHTML = `
    <p class="player-back"><a href="louvores.html">&larr; Voltar</a></p>
    <div class="player-panel">
      <div class="player-disc-wrap"><div class="disc" id="player-disc"></div></div>
      <div class="player-info">
        <h1 class="player-title" id="player-title"></h1>
        <p class="player-category" id="player-category"></p>
      </div>
      <p class="player-unavailable" id="player-error" hidden>Áudio ainda não disponível para este hino.</p>
      <div id="player-audio-area" class="player-audio-area">
        <div id="player-progress">
          <div class="player-scrubber" id="player-scrubber">
            <div class="player-scrubber__fill" id="player-scrubber-fill"></div>
          </div>
          <div class="player-time">
            <span id="player-time-current">0:00</span>
            <span id="player-time-duration">0:00</span>
          </div>
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
    <div id="player-lyrics"></div>
    <div id="player-upnext"></div>
    <p class="sr-only" id="player-live" aria-live="polite"></p>
    <audio id="player-audio" preload="none"></audio>
  `;

  const audio = document.getElementById("player-audio");
  const disc = document.getElementById("player-disc");
  const titleEl = document.getElementById("player-title");
  const categoryEl = document.getElementById("player-category");
  const errorEl = document.getElementById("player-error");
  const progressEl = document.getElementById("player-progress");
  const playBtn = document.getElementById("player-play");
  const scrubber = document.getElementById("player-scrubber");
  const scrubberFill = document.getElementById("player-scrubber-fill");
  const timeCurrent = document.getElementById("player-time-current");
  const timeDuration = document.getElementById("player-time-duration");
  const prevBtn = document.getElementById("player-prev");
  const nextBtn = document.getElementById("player-next");
  const rewindBtn = document.getElementById("player-rewind");
  const forwardBtn = document.getElementById("player-forward");
  const lyricsRoot = document.getElementById("player-lyrics");
  const upNextRoot = document.getElementById("player-upnext");
  const liveEl = document.getElementById("player-live");

  let index = indexInicial;
  let hino = conteudo.hinos[index];
  let lyricsLines = [];
  let temposReais = null;
  let currentLyricIndex = -1;

  // Troca de hino na própria página, reaproveitando o MESMO <audio>: um elemento
  // novo (ou uma navegação) perde a permissão de autoplay no iOS Safari e no Chrome Android.
  function carregarHino(novoIndex, { tocar, anunciar = true }) {
    index = novoIndex;
    hino = conteudo.hinos[index];

    titleEl.textContent = hino.titulo;
    categoryEl.textContent = hino.categoria;
    disc.innerHTML = discCoverHtml(hino);
    lyricsRoot.innerHTML = letraHtml(hino);
    upNextRoot.innerHTML = upNextHtml(hino);
    const lyricsBody = document.getElementById("lyrics-body");
    lyricsLines = lyricsBody ? Array.from(lyricsBody.querySelectorAll(".lyrics-line")) : [];
    temposReais = hino.tempos && hino.tempos.length === lyricsLines.length ? hino.tempos : null;
    currentLyricIndex = -1;

    scrubberFill.style.width = "0%";
    timeCurrent.textContent = "0:00";
    timeDuration.textContent = "0:00";
    errorEl.hidden = true;
    progressEl.hidden = false;

    const prevHino = conteudo.hinos[index - 1];
    const nextHino = conteudo.hinos[index + 1];
    prevBtn.disabled = !prevHino;
    nextBtn.disabled = !nextHino;
    prevBtn.style.visibility = prevHino ? "" : "hidden";
    nextBtn.style.visibility = nextHino ? "" : "hidden";

    // preserva ?lead= e demais parâmetros
    const url = new URL(location.href);
    url.searchParams.set("hino", hino.id);
    history.replaceState(null, "", url);

    atualizarMediaSession();

    stopLyricsLoop();
    audio.src = hino.arquivoAudio;
    if (tocar) {
      // autoplay pode ser bloqueado: sem erro no console, o botão fica em "tocar"
      audio.play().catch(marcarPausado);
    } else {
      marcarPausado();
    }

    if (anunciar) {
      liveEl.textContent = `${hino.titulo}, ${hino.categoria}`;
      // o foco não pode ficar num prev/next que acabou de esconder
      playBtn.focus({ preventScroll: true });
    }
  }

  // se estava tocando, o novo hino continua tocando
  function trocarPara(novoIndex) {
    if (novoIndex < 0 || novoIndex >= conteudo.hinos.length) return;
    carregarHino(novoIndex, { tocar: !audio.paused });
  }

  function marcarPausado() {
    stopLyricsLoop();
    disc.style.animationPlayState = "paused";
    playBtn.innerHTML = iconPlay();
    playBtn.setAttribute("aria-label", "Tocar");
  }

  prevBtn.addEventListener("click", () => trocarPara(index - 1));
  nextBtn.addEventListener("click", () => trocarPara(index + 1));

  playBtn.addEventListener("click", () => {
    if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
  });

  function voltar10() {
    audio.currentTime = Math.max(0, audio.currentTime - 10);
  }
  function avancar10() {
    audio.currentTime = Math.min(audio.duration || audio.currentTime + 10, audio.currentTime + 10);
  }
  rewindBtn.addEventListener("click", voltar10);
  forwardBtn.addEventListener("click", avancar10);

  // timeupdate só dispara ~4 Hz; durante o play a letra segue o relógio do frame
  let rafId = 0;
  function lyricsLoop() {
    updateLyrics(audio.currentTime, audio.duration);
    rafId = requestAnimationFrame(lyricsLoop);
  }
  function startLyricsLoop() {
    if (!rafId) rafId = requestAnimationFrame(lyricsLoop);
  }
  function stopLyricsLoop() {
    cancelAnimationFrame(rafId);
    rafId = 0;
  }

  audio.addEventListener("play", () => {
    startLyricsLoop();
    disc.style.animationPlayState = "running";
    playBtn.innerHTML = iconPause();
    playBtn.setAttribute("aria-label", "Pausar");
  });

  audio.addEventListener("pause", marcarPausado);

  audio.addEventListener("ended", () => {
    marcarPausado();
    // no último hino a playlist termina e fica parada
    if (index + 1 < conteudo.hinos.length) carregarHino(index + 1, { tocar: true });
  });

  audio.addEventListener("timeupdate", () => {
    if (!audio.duration) return;
    const pct = (audio.currentTime / audio.duration) * 100;
    scrubberFill.style.width = `${pct}%`;
    timeCurrent.textContent = formatTime(audio.currentTime);
    updateLyrics(audio.currentTime, audio.duration);
  });

  // seek com o áudio parado não dispara o rAF
  audio.addEventListener("seeked", () => updateLyrics(audio.currentTime, audio.duration));

  function updateLyrics(currentTime, duration) {
    if (lyricsLines.length === 0) return;
    const t = currentTime + LEAD;

    let index;
    if (temposReais) {
      index = 0;
      for (let i = 0; i < temposReais.length; i++) {
        if (t >= temposReais[i]) index = i;
        else break;
      }
    } else {
      index = Math.min(
        lyricsLines.length - 1,
        Math.floor((currentTime / (duration || Infinity)) * lyricsLines.length)
      );
    }

    if (index === currentLyricIndex) return;
    currentLyricIndex = index;
    lyricsLines.forEach((line, i) => {
      line.classList.toggle("is-current", i === index);
      line.classList.toggle("is-past", i < index);
    });
    lyricsLines[index].scrollIntoView({ block: "center", behavior: "smooth" });
  }

  audio.addEventListener("loadedmetadata", () => {
    timeDuration.textContent = formatTime(audio.duration);
    atualizarPosicaoMediaSession();
  });

  scrubber.addEventListener("click", (event) => {
    if (!audio.duration) return;
    const rect = scrubber.getBoundingClientRect();
    const ratio = (event.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * audio.duration;
  });

  // sem áudio: prev/next continuam à mão, para dar para pular o hino
  audio.addEventListener("error", () => {
    if (!audio.getAttribute("src")) return;
    errorEl.hidden = false;
    progressEl.hidden = true;
    marcarPausado();
  });

  // controles na tela de bloqueio / fones
  function atualizarMediaSession() {
    if (!("mediaSession" in navigator)) return;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: hino.titulo,
      artist: hino.categoria || "AEC",
      artwork: hino.capa ? [{ src: new URL(hino.capa, location.href).href }] : [],
    });
    navigator.mediaSession.setActionHandler("previoustrack", index > 0 ? () => trocarPara(index - 1) : null);
    navigator.mediaSession.setActionHandler(
      "nexttrack",
      index + 1 < conteudo.hinos.length ? () => trocarPara(index + 1) : null
    );
  }

  function atualizarPosicaoMediaSession() {
    if (!("mediaSession" in navigator) || !navigator.mediaSession.setPositionState) return;
    try {
      navigator.mediaSession.setPositionState({
        duration: audio.duration,
        position: audio.currentTime,
        playbackRate: audio.playbackRate,
      });
    } catch {
      // duração ainda inválida (Infinity/NaN): ignora
    }
  }

  if ("mediaSession" in navigator) {
    const ms = navigator.mediaSession;
    ms.setActionHandler("play", () => audio.play().catch(() => {}));
    ms.setActionHandler("pause", () => audio.pause());
    ms.setActionHandler("seekbackward", voltar10);
    ms.setActionHandler("seekforward", avancar10);
  }

  // na abertura da página não anuncia nem rouba o foco
  carregarHino(index, { tocar: false, anunciar: false });
}

function letraHtml(hino) {
  if (!hino.letra || hino.letra.length === 0) return "";

  const lines = hino.letra
    .map((line) =>
      line === ""
        ? `<div class="lyrics-line-break" aria-hidden="true"></div>`
        : `<p class="lyrics-line">${escapeHtml(line)}</p>`
    )
    .join("");

  return `
    <div class="lyrics-card">
      <p class="lyrics-card__title">Letra</p>
      <div class="lyrics-body" id="lyrics-body">${lines}</div>
    </div>`;
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
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

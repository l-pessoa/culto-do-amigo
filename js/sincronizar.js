import { conteudo } from "../data/conteudo.js";

const root = document.getElementById("sync-root");
const hinosComLetra = conteudo.hinos.filter((h) => h.letra && h.letra.length > 0);

if (hinosComLetra.length === 0) {
  root.innerHTML = `<p class="player-unavailable">Nenhum hino com letra cadastrada ainda.</p>`;
} else {
  root.innerHTML = `
    <div class="sync-tool-card">
      <label class="sync-label" for="sync-select">Hino</label>
      <select id="sync-select" class="sync-select">
        ${hinosComLetra
          .map((h) => `<option value="${h.id}">${h.titulo} — ${h.categoria}</option>`)
          .join("")}
      </select>

      <audio id="sync-audio" controls style="width:100%; margin-block: var(--space-4);"></audio>

      <div class="sync-lines" id="sync-lines"></div>

      <div class="sync-actions">
        <button type="button" id="sync-tap" class="btn btn-primary">Marcar próxima linha (espaço)</button>
        <button type="button" id="sync-undo" class="btn btn-outline">Desfazer</button>
        <button type="button" id="sync-reset" class="btn btn-outline">Reiniciar</button>
      </div>

      <div class="sync-output">
        <p class="sync-output__label">Resultado — cole isso dentro do hino, do lado de "letra":</p>
        <textarea id="sync-result" class="sync-textarea" rows="6" readonly></textarea>
        <button type="button" id="sync-copy" class="btn btn-outline">Copiar</button>
        <span class="sync-copy-msg" id="sync-copy-msg" aria-live="polite"></span>
      </div>
    </div>
  `;

  const select = document.getElementById("sync-select");
  const audio = document.getElementById("sync-audio");
  const linesEl = document.getElementById("sync-lines");
  const tapBtn = document.getElementById("sync-tap");
  const undoBtn = document.getElementById("sync-undo");
  const resetBtn = document.getElementById("sync-reset");
  const resultEl = document.getElementById("sync-result");
  const copyBtn = document.getElementById("sync-copy");
  const copyMsg = document.getElementById("sync-copy-msg");

  let hino = null;
  let lineTexts = [];
  let tempos = [];

  function loadHino(id) {
    hino = hinosComLetra.find((h) => h.id === id);
    if (!hino) return;
    audio.src = hino.arquivoAudio;
    lineTexts = hino.letra.filter((linha) => linha !== "");
    tempos = (hino.tempos && hino.tempos.length === lineTexts.length) ? [...hino.tempos] : [];
    renderLines();
    renderResult();
  }

  function renderLines() {
    linesEl.innerHTML = lineTexts
      .map((texto, i) => {
        let classe = "sync-line";
        if (i < tempos.length) classe += " sync-line--done";
        if (i === tempos.length) classe += " sync-line--next";
        return `<p class="${classe}">${texto}</p>`;
      })
      .join("");
    const proxima = linesEl.querySelector(".sync-line--next");
    if (proxima) proxima.scrollIntoView({ block: "center", behavior: "smooth" });
  }

  function tap() {
    if (!hino || tempos.length >= lineTexts.length || !audio.src) return;
    tempos.push(Math.round(audio.currentTime * 100) / 100);
    renderLines();
    renderResult();
  }

  function undo() {
    if (tempos.length === 0) return;
    tempos.pop();
    renderLines();
    renderResult();
  }

  function reset() {
    tempos = [];
    renderLines();
    renderResult();
  }

  function renderResult() {
    resultEl.value = tempos.length
      ? `tempos: [${tempos.join(", ")}],`
      : "";
  }

  select.addEventListener("change", () => loadHino(select.value));
  tapBtn.addEventListener("click", tap);
  undoBtn.addEventListener("click", undo);
  resetBtn.addEventListener("click", reset);

  copyBtn.addEventListener("click", async () => {
    if (!resultEl.value) return;
    try {
      await navigator.clipboard.writeText(resultEl.value);
      copyMsg.textContent = "Copiado!";
    } catch (e) {
      resultEl.select();
      copyMsg.textContent = "Selecionado — copia com Ctrl/Cmd+C";
    }
    setTimeout(() => { copyMsg.textContent = ""; }, 2500);
  });

  document.addEventListener("keydown", (event) => {
    if (event.code === "Space" && document.activeElement !== select) {
      event.preventDefault();
      tap();
    }
  });

  const params = new URLSearchParams(location.search);
  const preselect = params.get("hino");
  const initial = hinosComLetra.find((h) => h.id === preselect) ? preselect : hinosComLetra[0].id;
  select.value = initial;
  loadHino(initial);
}

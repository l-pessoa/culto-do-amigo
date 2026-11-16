import { conteudo } from "../data/conteudo.js";

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function setHref(id, value) {
  const el = document.getElementById(id);
  if (el) el.setAttribute("href", value);
}

const page = document.body.dataset.page;

if (page === "tema") {
  setText("tema-versiculo", `"${conteudo.lema.versiculo}"`);
  setText("tema-referencia", conteudo.lema.referencia);
  setText("tema-frase", conteudo.lema.fraseEfeito);
  setText("tema-ensino-heading", conteudo.lema.ensinoTitulo);

  const stepsEl = document.getElementById("tema-ensino-steps");
  if (stepsEl && Array.isArray(conteudo.lema.ensino)) {
    stepsEl.innerHTML = conteudo.lema.ensino
      .map(
        (passo) => `
          <div class="teaching-step reveal-child">
            <span class="teaching-step__marker" aria-hidden="true"></span>
            <p class="teaching-step__label">${passo.rotulo}</p>
            <p class="teaching-step__text">${passo.texto}</p>
          </div>`
      )
      .join("");
  }
}

if (page === "pregacao") {
  setText("pregacao-versiculo", `"${conteudo.pregacao.versiculo}"`);
  setText("pregacao-referencia", conteudo.pregacao.referencia);
  setText("pregacao-watermark", conteudo.pregacao.referencia);
}

if (page === "convite") {
  const c = conteudo.convite;
  setText("convite-titulo", c.titulo);
  setText("convite-frase", c.frase);
  setText("convite-texto", c.texto);
  setText("convite-endereco", conteudo.igreja.endereco);
  setText("convite-mapa-endereco", conteudo.igreja.endereco);
  setText("convite-horarios-h", c.horariosTitulo);
  setText("convite-grupos-h", c.gruposTitulo);
  setText("convite-grupos-sub", c.gruposSub);
  setText("convite-igreja-h", c.igrejaTitulo);
  setText("convite-igreja-sub", c.igrejaSub);
  setText("convite-mapa-h", c.mapaTitulo);
  setText("convite-maps-link", c.textoComoChegar);
  setText("convite-whatsapp-link", c.textoWhatsapp);
  setHref("convite-maps-link", conteudo.igreja.mapsUrl);
  setHref("convite-maps-pin", conteudo.igreja.mapsUrl);
  setHref("convite-instagram-link", conteudo.igreja.instagramUrl);
  setText("convite-instagram-handle", conteudo.igreja.instagramUser);
  setHref(
    "convite-whatsapp-link",
    `https://api.whatsapp.com/send?text=${encodeURIComponent(c.mensagemCompartilhar)}`
  );

  const esc = (t) => String(t).replace(/[&<>"]/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m]));

  const horEl = document.getElementById("convite-horarios");
  if (horEl) {
    horEl.innerHTML = c.horarios
      .map(
        (h) => `
        <li class="horario-card${h.placeholder ? " is-placeholder" : ""}">
          <span class="horario-card__dia">${esc(h.dia)}</span>
          <span class="horario-card__hora">${esc(h.hora)}</span>
          <span class="horario-card__nome">${esc(h.nome)}</span>
        </li>`
      )
      .join("");
    const aviso = document.getElementById("convite-horarios-aviso");
    if (aviso && c.horarios.some((h) => h.placeholder)) {
      aviso.textContent = c.horariosAviso;
      aviso.hidden = false;
    }
  }

  // Mapa: sem chave de API; só carrega online (o fallback textual fica por baixo).
  const mapa = document.getElementById("convite-mapa");
  const iframe = document.getElementById("convite-mapa-iframe");
  if (mapa && iframe) {
    const src = `https://maps.google.com/maps?q=${encodeURIComponent(conteudo.igreja.endereco)}&output=embed`;
    const carregar = () => {
      if (iframe.getAttribute("src")) return;
      iframe.addEventListener("load", () => mapa.classList.add("is-loaded"), { once: true });
      iframe.setAttribute("src", src);
    };
    if (navigator.onLine) carregar();
    window.addEventListener("online", carregar);
  }
}

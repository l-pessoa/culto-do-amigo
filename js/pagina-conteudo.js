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
}

if (page === "pregacao") {
  setText("pregacao-versiculo", `"${conteudo.pregacao.versiculo}"`);
  setText("pregacao-referencia", conteudo.pregacao.referencia);
}

if (page === "convite") {
  setText("convite-frase", conteudo.convite.frase);
  setText("convite-texto", conteudo.convite.texto);
  setText("convite-endereco", conteudo.igreja.endereco);
  setHref("convite-maps-link", conteudo.igreja.mapsUrl);
  setHref(
    "convite-whatsapp-link",
    `https://api.whatsapp.com/send?text=${encodeURIComponent(conteudo.convite.mensagemCompartilhar)}`
  );
}

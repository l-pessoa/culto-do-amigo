// Capa do hino sobre o disco, quando existir (conteudo.hinos[].capa).
export function discCoverHtml(hino) {
  return hino.capa ? `<img class="disc__cover" src="${hino.capa}" alt="" loading="lazy">` : "";
}

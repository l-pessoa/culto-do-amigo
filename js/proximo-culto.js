// Cartão "Próximo culto" (Home e Volte sempre): calcula sozinho o próximo culto a partir de
// conteudo.convite.horarios e oferece um arquivo .ics para adicionar os cultos à agenda.
// Tudo em horário de Brasília (UTC-3, sem horário de verão), qualquer que seja o fuso do aparelho.
import { conteudo } from "../data/conteudo.js";

const BRT_MS = 3 * 60 * 60 * 1000;
const DIA_MS = 24 * 60 * 60 * 1000;
const cultos = conteudo.convite.horarios.filter((h) => typeof h.dow === "number" && h.inicio && h.fim);

const hm = (texto) => texto.split(":").map(Number);
const rotuloHora = (texto) => {
  const [h, m] = hm(texto);
  return m ? `${h}h${String(m).padStart(2, "0")}` : `${h}h`;
};

// Trabalha com "relógio de Brasília" guardado em campos UTC: agora = Date.now() - 3 h.
function ocorrencia(culto, base, deslocamentoDias) {
  const dia = new Date(Date.UTC(base.getUTCFullYear(), base.getUTCMonth(), base.getUTCDate() + deslocamentoDias));
  if (dia.getUTCDay() !== culto.dow) return null;
  const [hi, mi] = hm(culto.inicio);
  const [hf, mf] = hm(culto.fim);
  const y = dia.getUTCFullYear(), mo = dia.getUTCMonth(), d = dia.getUTCDate();
  return { culto, inicio: Date.UTC(y, mo, d, hi, mi), fim: Date.UTC(y, mo, d, hf, mf), dia: Date.UTC(y, mo, d) };
}

function proximo(agoraBrt) {
  const base = new Date(agoraBrt);
  let melhor = null;
  for (const culto of cultos) {
    for (let i = 0; i <= 7; i++) {
      const o = ocorrencia(culto, base, i);
      if (o && o.fim > agoraBrt) {
        if (!melhor || o.inicio < melhor.inicio) melhor = o;
        break;
      }
    }
  }
  return melhor;
}

function quandoTexto(o, agoraBrt) {
  if (o.inicio <= agoraBrt) return "Acontecendo agora";
  const hoje = Date.UTC(new Date(agoraBrt).getUTCFullYear(), new Date(agoraBrt).getUTCMonth(), new Date(agoraBrt).getUTCDate());
  const dias = Math.round((o.dia - hoje) / DIA_MS);
  const falta = o.inicio - agoraBrt;
  if (dias === 0) {
    const min = Math.max(1, Math.round(falta / 60000));
    if (min < 60) return `Hoje, em ${min} min`;
    const h = Math.floor(min / 60), r = min % 60;
    return r ? `Hoje, em ${h} h ${r} min` : `Hoje, em ${h} h`;
  }
  if (dias === 1) return "Amanhã";
  return `Em ${dias} dias`;
}

function pintar(cartao) {
  const agoraBrt = Date.now() - BRT_MS;
  const o = proximo(agoraBrt);
  if (!o) return;
  const agora = o.inicio <= agoraBrt;
  cartao.classList.toggle("is-agora", agora);
  cartao.querySelector("[data-pc-quando]").textContent = quandoTexto(o, agoraBrt);
  cartao.querySelector("[data-pc-detalhe]").textContent =
    `${o.culto.dia}, ${rotuloHora(o.culto.inicio)} às ${rotuloHora(o.culto.fim)} · ${o.culto.nome}`;
  cartao.hidden = false;
}

// ---------- agenda (.ics) ----------
const pad = (n) => String(n).padStart(2, "0");
const utcIcs = (ms) => {
  const d = new Date(ms);
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;
};
const escIcs = (t) => String(t).replace(/\\/g, "\\\\").replace(/;/g, "\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
// linhas do .ics não passam de 75 bytes: o excesso continua na linha seguinte, iniciada por espaço
const dobrar = (linha) => {
  const enc = new TextEncoder();
  const partes = [];
  let atual = "";
  for (const ch of linha) {
    if (enc.encode(atual + ch).length > (partes.length ? 74 : 75)) {
      partes.push(atual);
      atual = "";
    }
    atual += ch;
  }
  partes.push(atual);
  return partes.join("\r\n ");
};

function montarIcs() {
  const agoraBrt = Date.now() - BRT_MS;
  const base = new Date(agoraBrt);
  const linhas = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//AEC//Culto do Amigo//PT-BR", "CALSCALE:GREGORIAN", "METHOD:PUBLISH", "X-WR-CALNAME:Cultos da AEC"];
  cultos.forEach((culto, idx) => {
    let o = null;
    for (let i = 0; i <= 7 && !o; i++) {
      const c = ocorrencia(culto, base, i);
      if (c && c.fim > agoraBrt) o = c;
    }
    if (!o) return;
    linhas.push(
      "BEGIN:VEVENT",
      `UID:culto-${idx}-${culto.dow}@culto-do-amigo.vercel.app`,
      `DTSTAMP:${utcIcs(Date.now())}`,
      `DTSTART:${utcIcs(o.inicio + BRT_MS)}`,
      `DTEND:${utcIcs(o.fim + BRT_MS)}`,
      "RRULE:FREQ=WEEKLY",
      `SUMMARY:${escIcs(`${culto.nome} — AEC`)}`,
      `LOCATION:${escIcs(`${conteudo.igreja.nome} — ${conteudo.igreja.endereco}`)}`,
      `GEO:${conteudo.igreja.latitude};${conteudo.igreja.longitude}`,
      `DESCRIPTION:${escIcs("A casa do Senhor está de portas abertas para você. Traga a sua família e os seus amigos.")}`,
      "END:VEVENT"
    );
  });
  linhas.push("END:VCALENDAR");
  return linhas.map(dobrar).join("\r\n") + "\r\n";
}

function baixarAgenda(aviso) {
  const blob = new Blob([montarIcs()], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "cultos-aec.ics";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
  if (aviso) aviso.textContent = "Pronto! Abra o arquivo para adicionar os cultos à sua agenda.";
}

document.querySelectorAll("[data-proximo-culto]").forEach((cartao) => {
  if (!cultos.length) return;
  pintar(cartao);
  setInterval(() => pintar(cartao), 60000);
  const botao = cartao.querySelector("[data-pc-agenda]");
  const aviso = cartao.querySelector("[data-pc-aviso]");
  botao?.addEventListener("click", () => baixarAgenda(aviso));
});

export { proximo, montarIcs };

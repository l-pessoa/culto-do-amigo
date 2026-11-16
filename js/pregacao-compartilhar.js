import { conteudo } from "../data/conteudo.js";

const { versiculo, referencia } = conteudo.pregacao;

const LARGURA = 1080;
const ALTURA = 1350;
const OURO = "#F0C48A";
const TERRACOTA = "#A9805F";
const CREME = "#E6E6D9";
const FONTE_DISPLAY = "'Playfair Display', Georgia, 'Times New Roman', serif";
const FONTE_CORPO = "'Work Sans', system-ui, -apple-system, sans-serif";

// Sem a fonte carregada o canvas desenharia com o fallback e mediria errado;
// se a rede falhar, seguimos com o serif do sistema em vez de travar o botão.
async function garantirFontes() {
  if (!document.fonts || !document.fonts.load) return;
  try {
    await Promise.all([
      document.fonts.load(`italic 700 48px "Playfair Display"`, versiculo),
      document.fonts.load(`700 28px "Work Sans"`, referencia),
    ]);
    await document.fonts.ready;
  } catch (_) {
    /* usa o fallback */
  }
}

function quebrarLinhas(ctx, texto, larguraMax) {
  const linhas = [];
  let atual = "";
  for (const palavra of texto.split(/\s+/)) {
    const tentativa = atual ? `${atual} ${palavra}` : palavra;
    if (atual && ctx.measureText(tentativa).width > larguraMax) {
      linhas.push(atual);
      atual = palavra;
    } else {
      atual = tentativa;
    }
  }
  if (atual) linhas.push(atual);
  return linhas;
}

// Maior corpo de fonte em que o versículo cabe na altura disponível.
function ajustarTexto(ctx, texto, larguraMax, alturaMax) {
  let tamanho = 74;
  for (; tamanho > 34; tamanho -= 2) {
    ctx.font = `italic 700 ${tamanho}px ${FONTE_DISPLAY}`;
    const linhas = quebrarLinhas(ctx, texto, larguraMax);
    if (linhas.length * tamanho * 1.38 <= alturaMax) {
      return { tamanho, linhas, entrelinha: tamanho * 1.38 };
    }
  }
  ctx.font = `italic 700 ${tamanho}px ${FONTE_DISPLAY}`;
  return { tamanho, linhas: quebrarLinhas(ctx, texto, larguraMax), entrelinha: tamanho * 1.38 };
}

function retanguloArredondado(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

export async function gerarImagem() {
  await garantirFontes();
  const canvas = document.createElement("canvas");
  canvas.width = LARGURA;
  canvas.height = ALTURA;
  const ctx = canvas.getContext("2d");

  const fundo = ctx.createLinearGradient(0, 0, 0, ALTURA);
  fundo.addColorStop(0, "#1A1A14");
  fundo.addColorStop(1, "#2B2117");
  ctx.fillStyle = fundo;
  ctx.fillRect(0, 0, LARGURA, ALTURA);

  const brilho = ctx.createRadialGradient(LARGURA / 2, 330, 0, LARGURA / 2, 330, 760);
  brilho.addColorStop(0, "rgba(240,196,138,0.30)");
  brilho.addColorStop(1, "rgba(240,196,138,0)");
  ctx.fillStyle = brilho;
  ctx.fillRect(0, 0, LARGURA, ALTURA);

  // moldura dupla: filete externo forte, interno discreto
  ctx.strokeStyle = OURO;
  ctx.lineWidth = 3;
  retanguloArredondado(ctx, 54, 54, LARGURA - 108, ALTURA - 108, 28);
  ctx.stroke();
  ctx.strokeStyle = "rgba(240,196,138,0.28)";
  ctx.lineWidth = 1.5;
  retanguloArredondado(ctx, 74, 74, LARGURA - 148, ALTURA - 148, 20);
  ctx.stroke();

  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";

  ctx.fillStyle = OURO;
  ctx.font = `700 280px ${FONTE_DISPLAY}`;
  ctx.shadowColor = "rgba(240,196,138,0.45)";
  ctx.shadowBlur = 40;
  ctx.fillText("“", LARGURA / 2, 420);
  ctx.shadowBlur = 0;

  // área do texto entre as aspas e o selo da referência
  const topo = 450;
  const base = 1040;
  const { tamanho, linhas, entrelinha } = ajustarTexto(ctx, versiculo, 790, base - topo);
  ctx.fillStyle = CREME;
  const alturaBloco = linhas.length * entrelinha;
  let y = topo + (base - topo - alturaBloco) / 2 + tamanho;
  for (const linha of linhas) {
    ctx.fillText(linha, LARGURA / 2, y);
    y += entrelinha;
  }

  // selo dourado com a referência
  ctx.font = `700 40px ${FONTE_CORPO}`;
  const larguraSelo = Math.min(ctx.measureText(referencia).width + 120, 800);
  const altSelo = 92;
  const xSelo = (LARGURA - larguraSelo) / 2;
  const ySelo = 1090;
  const grad = ctx.createLinearGradient(xSelo, ySelo, xSelo + larguraSelo, ySelo + altSelo);
  grad.addColorStop(0, OURO);
  grad.addColorStop(1, TERRACOTA);
  ctx.fillStyle = grad;
  retanguloArredondado(ctx, xSelo, ySelo, larguraSelo, altSelo, altSelo / 2);
  ctx.fill();
  ctx.fillStyle = "#1A1A14";
  ctx.textBaseline = "middle";
  ctx.fillText(referencia, LARGURA / 2, ySelo + altSelo / 2 + 2);

  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "rgba(230,230,217,0.62)";
  ctx.font = `600 28px ${FONTE_CORPO}`;
  ctx.fillText("AEC — Culto do Amigo", LARGURA / 2, 1242);

  return canvas;
}

const aPartirDe = (canvas) =>
  new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("toBlob falhou"))), "image/png")
  );

function baixar(blob, nome) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = nome;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

const botao = document.getElementById("compartilhar-versiculo");
const whats = document.getElementById("compartilhar-whatsapp");
const aviso = document.getElementById("compartilhar-aviso");
const textoCompartilhar = `“${versiculo}” — ${referencia}`;

function avisar(msg) {
  if (aviso) aviso.textContent = msg;
}

if (whats) {
  whats.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(textoCompartilhar)}`;
}

if (botao) {
  botao.addEventListener("click", async () => {
    botao.disabled = true;
    avisar("");
    try {
      const blob = await aPartirDe(await gerarImagem());
      const arquivo = new File([blob], "versiculo-culto-do-amigo.png", { type: "image/png" });
      if (navigator.canShare && navigator.canShare({ files: [arquivo] })) {
        try {
          await navigator.share({
            files: [arquivo],
            title: `${referencia} — Culto do Amigo`,
            text: textoCompartilhar,
          });
        } catch (erro) {
          // fechar a folha de compartilhamento não é erro
          if (erro && erro.name === "AbortError") return;
          throw erro;
        }
      } else {
        baixar(blob, arquivo.name);
        avisar("Imagem salva! Agora é só compartilhar.");
      }
    } catch (_) {
      avisar("Não foi possível gerar a imagem agora. Tente de novo.");
    } finally {
      botao.disabled = false;
    }
  });
}

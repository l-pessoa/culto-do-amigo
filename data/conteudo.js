// Conteúdo central do site. Todo HTML/JS de apresentação lê daqui —
// nunca hardcode texto de conteúdo direto no markup.
//
// Placeholders marcados com [PLACEHOLDER] ainda não têm arquivo de áudio
// (.mp3) disponível em /assets/audio — o player trata isso mostrando um
// aviso em vez de quebrar. Nomes reais dos hinos e ordem final ainda
// serão confirmados.

export const conteudo = {
  igreja: {
    nome: "AEC",
    endereco: "Rua Exemplo, 123 – Centro, Sua Cidade – UF", // [PLACEHOLDER]
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent("Rua Exemplo, 123 – Centro, Sua Cidade – UF"),
  },

  home: {
    tituloTop: "AMIGO",
    tituloOverlay: "CULTO DO",
  },

  lema: {
    titulo: "Jesus, Melhor Amigo",
    versiculo:
      "Já vos não chamarei servos, porque o servo não sabe o que faz o seu senhor; mas tenho-vos chamado amigos, porque tudo quanto ouvi de meu Pai vos tenho feito conhecer.",
    referencia: "João 15:15",
    fraseEfeito:
      "Um amigo que não muda, mesmo quando tudo muda ao redor.",
  },

  pregacao: {
    titulo: "Versículo",
    versiculo:
      "O amigo ama em todo o tempo e para a hora da angústia nasce o irmão.",
    referencia: "Provérbios 17:17",
  },

  convite: {
    titulo: "Convite",
    frase: "Você é nosso convidado especial.",
    texto:
      "No dia do Culto do Amigo, queremos abrir as portas para você — não importa se essa é sua primeira vez em uma igreja ou se faz tempo que não vem. Vai ter música, uma palavra leve e gente feliz em te receber. Traga um amigo, ou venha ser um.",
    mensagemCompartilhar:
      "Vem comigo no Culto do Amigo! Preparamos uma noite especial e eu queria muito ter você lá. 💛",
  },

  hinos: [
    { id: "harpa-1", categoria: "Harpa", titulo: "Grandioso És Tu", arquivoAudio: "/assets/audio/harpa-1.mp3" }, // [PLACEHOLDER]
    { id: "harpa-2", categoria: "Harpa", titulo: "Castelo Forte", arquivoAudio: "/assets/audio/harpa-2.mp3" }, // [PLACEHOLDER]
    { id: "criancas-1", categoria: "Crianças", titulo: "Deus É Tão Bom", arquivoAudio: "/assets/audio/criancas-1.mp3" }, // [PLACEHOLDER]
    { id: "irmas-1", categoria: "Irmãs", titulo: "Preciosas Promessas", arquivoAudio: "/assets/audio/irmas-1.mp3" }, // [PLACEHOLDER]
    { id: "jovens-1", categoria: "Jovens e Adolescentes", titulo: "Digno É o Senhor", arquivoAudio: "/assets/audio/jovens-1.mp3" }, // [PLACEHOLDER]
    { id: "coral-1", categoria: "Coral", titulo: "Aleluia, Grande É o Senhor", arquivoAudio: "/assets/audio/coral-1.mp3" }, // [PLACEHOLDER]
  ],
};

export const CATEGORIAS_ORDEM = [
  "Harpa",
  "Crianças",
  "Irmãs",
  "Jovens e Adolescentes",
  "Coral",
];

// Conteúdo central do site. Todo HTML/JS de apresentação lê daqui —
// nunca hardcode texto de conteúdo direto no markup.
//
// Placeholders marcados com [PLACEHOLDER] ainda não têm dado real
// confirmado — o endereço da igreja é o único que resta.

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
    { id: "harpa-1", categoria: "Harpa", titulo: "Cristo, o Fiel Amigo", arquivoAudio: "/assets/audio/harpa-1.mp3", capa: "/assets/img/harpa-1-capa.jpeg" },
    { id: "harpa-2", categoria: "Harpa", titulo: "O Bondoso Amigo", arquivoAudio: "/assets/audio/harpa-2.mp3", capa: "/assets/img/harpa-2-capa.jpeg" },
    { id: "harpa-3", categoria: "Harpa", titulo: "A Teus Pés", arquivoAudio: "/assets/audio/harpa-3.mp3", capa: "/assets/img/harpa-3-capa.jpg" },
    { id: "criancas-1", categoria: "Crianças", titulo: "Restaurados", arquivoAudio: "/assets/audio/criancas-1.mp3", capa: "/assets/img/criancas-1-capa.avif" },
    { id: "irmas-1", categoria: "Irmãs", titulo: "Amor de Deus", arquivoAudio: "/assets/audio/irmas-1.mp3", capa: "/assets/img/irmas-1-capa.png" },
    { id: "jovens-1", categoria: "Jovens e Adolescentes", titulo: "Redentor", arquivoAudio: "/assets/audio/jovens-1.mp3", capa: "/assets/img/jovens-1-capa.jpeg" },
    { id: "coral-1", categoria: "Coral", titulo: "O Melhor Lugar do Mundo é Aos Pés do Salvador", arquivoAudio: "/assets/audio/coral-1.mp3", capa: "/assets/img/coral-1-capa.jpg" },
  ],
};

export const CATEGORIAS_ORDEM = [
  "Harpa",
  "Crianças",
  "Irmãs",
  "Jovens e Adolescentes",
  "Coral",
];

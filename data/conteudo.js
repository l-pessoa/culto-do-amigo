// Conteúdo central do site. Todo HTML/JS de apresentação lê daqui —
// nunca hardcode texto de conteúdo direto no markup.

export const conteudo = {
  igreja: {
    nome: "AEC",
    endereco: "Av. Águia de Haia, 1658 – Artur Alvim, São Paulo – SP, 03694-000",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent("Av. Águia de Haia, 1658 – Artur Alvim, São Paulo – SP, 03694-000"),
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
    {
      id: "criancas-1",
      categoria: "Crianças",
      titulo: "Restaurados",
      arquivoAudio: "/assets/audio/criancas-1.mp3",
      capa: "/assets/img/criancas-1-capa.avif",
      letra: [
        "Eu sou uma obra de arte", "Planejado em cada detalhe", "Deus me fez com tanto amor", "À Sua imagem eu sou", "",
        "Eu sou uma obra de arte", "Planejado em cada detalhe", "Deus me fez com tanto amor", "À Sua imagem eu sou", "",
        "Mas você conhece a história", "E sabe que o mal quis destruir", "A beleza e a perfeição", "Que Deus criou em mim", "",
        "Restaurado no amor de Cristo", "Então, curado", "Eu não quero mais estar quebrado", "Se por Ele eu posso ser transformado", "",
        "Restaurado no amor de Cristo", "Então, curado", "Eu não quero mais estar quebrado", "Se por Ele eu posso ser transformado", "",
        "Eu sou uma obra de arte", "Planejado em cada detalhe", "Deus me fez com tanto amor", "À Sua imagem eu sou", "",
        "Mas você conhece a história", "E sabe que o mal não venceu", "Fui manchado e quebrado", "Mas na cruz meu Jesus morreu", "E fui restaurado", "",
        "Restaurado no amor de Cristo", "Então, curado", "Eu não quero mais estar quebrado", "Se por Ele eu posso ser transformado", "",
        "Restaurado no amor de Cristo", "Então, curado", "Eu não quero mais estar quebrado", "Se por Ele eu posso ser transformado", "",
        "Restaurados no amor de Cristo", "Então, curados", "Não queremos mais estar quebrados", "Se por Ele somos nós transformados", "",
        "Restaurados no amor de Cristo", "Então, curados", "Não queremos mais estar quebrados", "Se por Ele somos nós transformados", "",
        "Eu sou uma obra de arte", "Planejado em cada detalhe", "Me refez com tanto amor", "À Sua imagem eu sou",
      ],
    },
    { id: "irmas-1", categoria: "Irmãs", titulo: "Amor de Deus", arquivoAudio: "/assets/audio/irmas-1.mp3", capa: "/assets/img/irmas-1-capa.png" },
    {
      id: "jovens-1",
      categoria: "Jovens e Adolescentes",
      titulo: "Redentor",
      arquivoAudio: "/assets/audio/jovens-1.mp3",
      capa: "/assets/img/jovens-1-capa.jpeg",
      letra: [
        "Desde o ventre", "Me conheces", "Tu me escolhestes", "Para ti", "",
        "Com moedas de", "Prata te vendi", "E mesmo assim se", "Entregou por mim", "",
        "Redentor", "Teu amor me libertou", "De mim e agora vivo, enfim", "",
        "Redentor", "Teu amor me libertou", "De mim e agora vivo, enfim!", "",
        "Ooh ooh ooh", "Ooh ooh ooh", "",
        "Desde o ventre", "Me conheces", "Tu me escolhestes", "Para ti", "",
        "Com moedas de", "Prata te vendi", "E mesmo assim se", "Entregou por mim", "",
        "Redentor", "Seu amor me libertou", "De mim e agora vivo, enfim", "",
        "Redentor", "Seu amor me libertou", "De mim e agora vivo, enfim", "",
        "Redentor", "Seu amor me libertou", "De mim e agora vivo, enfim", "",
        "Redentor", "Seu amor me libertou", "De mim e agora vivo, enfim!", "",
        "Mas ao Terceiro dia", "Ele ressuscitou", "A culpa", "Que era minha", "Ele, em si, levou", "",
        "Mas ao Terceiro dia", "Ele ressuscitou", "",
        "A culpa", "Que era minha", "Ele, em si, levou", "",
        "Mas ao", "Terceiro dia", "Ele ressuscitou", "",
        "A culpa", "Que era minha", "Ele, em si, levou", "",
        "Mas ao", "Terceiro dia", "Ele ressuscitou", "",
        "A culpa", "Que era minha", "Ele, em si, levou", "",
        "Redentor", "Teu amor me libertou", "De mim e agora vivo", "",
        "Redentor", "Teu amor me libertou", "De mim e agora vivo", "Enfim!",
      ],
    },
    {
      id: "coral-1",
      categoria: "Coral",
      titulo: "O Melhor Lugar do Mundo é Aos Pés do Salvador",
      arquivoAudio: "/assets/audio/coral-1.mp3",
      capa: "/assets/img/coral-1-capa.jpg",
      letra: [
        "No mundo ainda existem belezas",
        "Que alegram a vida e nos fazem sonhar",
        "Recantos felizes da natureza",
        "Onde qualquer ser humano, gostaria de estar",
        "Mas de todos os lugares o mais bonito e inspirador",
        "É onde fico, em oração, junto aos pés do salvador",
        "",
        "O melhor lugar do mundo, é aos pés do salvador",
        "É ali aonde a esperança trás alívio ao sofredor",
        "É ali onde eu me encontro, com a fonte do amor",
        "O melhor lugar do mundo, é aos pés do salvador!",
        "",
        "Sonhamos com casas que tenham conforto",
        "Talvez numa encosta com vista pro mar",
        "Mas as maravilhas não fazem sentido",
        "Se Cristo não está em primeiro lugar",
        "",
        "(ao sentir) ao sentir a paz de Deus seu poder e amor profundo",
        "Eu posso estar onde for (onde for, estou)",
        "Estou feliz, por me encontrar no melhor lugar do mundo",
        "",
        "O melhor lugar do mundo é aos pés do salvador",
        "É ali aonde a esperança trás alívio ao sofredor",
        "É ali onde eu me encontro com a fonte do amor",
        "O melhor lugar do mundo é aos pés do salvador",
        "",
        "O melhor lugar do mundo é aos pés do salvador",
        "É ali onde eu me encontro com a fonte do amor",
        "O melhor lugar do mundo, é aos pés, do salvador",
      ],
    },
  ],
};

export const CATEGORIAS_ORDEM = [
  "Harpa",
  "Crianças",
  "Irmãs",
  "Jovens e Adolescentes",
  "Coral",
];

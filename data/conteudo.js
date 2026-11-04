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
    {
      id: "harpa-1",
      categoria: "Harpa",
      titulo: "Cristo, o Fiel Amigo",
      arquivoAudio: "/assets/audio/harpa-1.mp3",
      capa: "/assets/img/harpa-1-capa.jpeg",
      letra: [
        "Cristo Jesus é fiel amigo", "Ele só, Ele só", "E nas fraquezas está comigo", "Ele só, Ele só", "",
        "E nas lutas de cada dia", "Cristo nunca me deixa só", "Pois Ele é meu seguro guia", "Ele só, Ele só", "",
        "Não há amigo mais nobre e digno", "Não, não há", "Não, não há", "Nem mais humilde e mais benigno", "Não, não há", "Não, não há", "",
        "E nas lutas de cada dia", "Cristo nunca me deixa só", "Pois Ele é meu seguro guia", "Ele só, Ele só", "",
        "Ao pecador perdoar anela", "Ele só, Ele só", "E pelos Seus santos sempre vela", "Ele só, Ele só", "",
        "E nas lutas de cada dia", "Cristo nunca me deixa só", "Pois Ele é meu seguro guia", "Ele só, Ele só", "",
        "Deus, em seu filho, Se há comprazido", "Nele só, Nele só", "Mas Sua glória me há repartido", "Dele só, Dele só", "",
        "E nas lutas de cada dia", "Cristo nunca me deixa só", "Pois Ele é meu seguro guia", "Ele só, Ele só", "",
        "Nele nós temos um firme guia", "Nele só, Nele só", "A noite enche de alegria", "Ele só, Ele só", "",
        "E nas lutas de cada dia", "Cristo nunca me deixa só", "Pois Ele é meu seguro guia", "Ele só, Ele só",
      ],
      tempos: [
        16.08, 21.32, 26.88, 32.34, 37.84, 43.32, 48.84, 54.04, 59.71, 63.64,
        65.45, 70.68, 73.54, 76.15, 81.52, 87.24, 92.16, 98.08, 103.39, 108.84,
        114.35, 119.77, 125.19, 130.86, 136.1, 141.34, 147.08, 152.23, 158.26, 163.3,
        168.7, 174.76, 179.77, 185.32, 190.96, 196.16, 201.74, 207.08, 213.08, 218.24,
        223.55, 229.03, // última linha estimada pelo padrão das 4 repetições anteriores do refrão
      ],
    },
    {
      id: "harpa-2",
      categoria: "Harpa",
      titulo: "O Bondoso Amigo",
      arquivoAudio: "/assets/audio/harpa-2.mp3",
      capa: "/assets/img/harpa-2-capa.jpeg",
      letra: [
        "Quão bondoso amigo é Cristo!", "Carregou com a nossa dor", "E nos manda que levemos", "Os cuidados ao Senhor", "",
        "Falta ao coração dorido", "Gozo, paz, consolação?", "Isso é porque não levamos", "Tudo a Deus em oração", "",
        "Tu estás fraco e carregado", "De cuidados e temor?", "A Jesus, refúgio eterno", "Vai com fé teu mal expor!", "",
        "Teus amigos te desprezam?", "Conta-lhe isso em oração", "E com Seu amor tão terno", "Paz terás no coração", "",
        "Cristo é verdadeiro amigo", "Disto provas nos mostrou", "Quando pra levar consigo", "O culpado encarnou", "",
        "Derramou Seu sangue puro", "Nossas manchas pra lavar", "Gozo em vida e no futuro", "Nele podemos alcançar",
      ],
      tempos: [
        18.08, 23.67, 29.74, 35.52, 41.36, 47.39, 53.33, 59.02, 64.65, 70.59,
        76.71, 82.38, 89.12, 94.32, 100.07, 106.09, 112.77, 118.72, 123.56, 129.45,
        135.05, 141.1, 146.78, 152.63, // última linha estimada pelo intervalo médio do hino (~5,85s)
      ],
    },
    {
      id: "harpa-3",
      categoria: "Harpa",
      titulo: "A Teus Pés",
      arquivoAudio: "/assets/audio/harpa-3.mp3",
      capa: "/assets/img/harpa-3-capa.jpg",
      letra: [
        "A Teus pés, ó, Jesus Cristo", "Tua face buscarei", "Escutando qual Maria", "As palavras de amor",
        "A Teus pés, ó, Jesus Cristo", "Meu passado esquecerei", "Pois Tua mão fiel e terna", "Tem-me salvo do temor", "",
        "A Teus pés, ó, Jesus Cristo", "Acho terna compaixão", "Para todos meus pesares", "Meus conflitos, minha dor",
        "Livra-me, ó, Jesus Cristo", "De cuidados, de aflição", "E concede-me constante", "Teu poder consolador", "",
        "A Teus pés, ó, Jesus Cristo", "Eu desfruto Teu amor", "Em Teus olhos há doçura", "Em Teu seio, proteção",
        "Dá-me, ó, Cristo, a Tua mente", "Dá-me graça e fervor", "E que o mundo possa sempre", "Ver em mim a salvação", "",
        "A Teus pés, ó, Jesus Cristo", "Tenho um gozo divinal", "A Teus pés encontro abrigo", "Oh, bondoso Salvador",
        "Só em Ti, ó, Jesus Cristo", "Há consolo sem igual", "Para minha alma abatida", "Neste mundo de horror",
      ],
      tempos: [
        16.23, 21.75, 27.1, 32.2, 38.24, 43.48, 49.21, 54.47, 59.96, 65.77,
        70.87, 76.43, 81.79, 87.16, 92.82, 97.8, 103.75, 108.96, 114.64, 120.11,
        125.6, 130.9, 136.47, 141.33, 147.25, 152.86, 158.32, 163.64, 169.11, 174.63,
        180.07, 185.53, // última linha estimada pelo intervalo médio do hino (~5,46s)
      ],
    },
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
      tempos: [
        16.95, 20.43, 23.97, 27.12, 30.46, 33.58, 36.97, 42.1, 44.28, 48.65,
        50.4, 55.39, 58.84, 61.18, 64.27, 68.85, 71.96, 74.24, 78.18, 85.93,
        88.8, 92.16, 95.25, 100.32, 105.27, 106.64, 108.66, 111.92, 113.82, 116.65,
        119.38, 122.62, 127.17, 129.73, 132.84, 135.96, 140.47, 144.03, 145.99, 149.02,
        153.81, 157.21, 159.52, 162.61, 167.63, 170.29, 173.85, 176.88, 180.35, // última linha estimada
      ],
    },
    {
      id: "irmas-1",
      categoria: "Irmãs",
      titulo: "Amor de Deus",
      arquivoAudio: "/assets/audio/irmas-1.mp3",
      capa: "/assets/img/irmas-1-capa.png",
      letra: [
        "Graça sobre graça, recebi", "E da plenitude, renasci", "Quando atraído, me encontrei", "No amor de Deus", "",
        "Viva e poderosa salvação", "Luz que me alcançou na escuridão", "Todo meu pecado se apagou", "No amor de Deus", "",
        "Logo eu, um pobre pecador", "Logo eu, tão fraco e tão devedor", "Logo eu, de graça recebi o amor de Deus", "",
        "Logo eu, finito e carnal", "Logo eu, diante de um Deus imortal", "Logo eu, de graça recebi o amor de Deus", "",
        "Graça sobre graça, recebi", "E da plenitude, renasci", "Quando atraído, me encontrei", "No amor de Deus", "",
        "Viva e poderosa salvação", "Luz que me alcançou na escuridão", "Todo meu pecado se apagou", "No amor de Deus", "",
        "Logo eu, um pobre pecador", "Logo eu, tão fraco e tão devedor", "Logo eu, de graça recebi o amor de Deus", "(O amor de Deus)", "",
        "Logo eu, finito e carnal", "Logo eu, diante de um Deus imortal", "Logo eu, de graça recebi o amor de Deus", "",
        "O amor de Deus é rico em benefícios", "O amor de Deus não mede sacrifícios", "Dos braços desse amor, recebo o perdão", "Comprado por Jesus", "",
        "O amor de Deus é puro e consciente", "Como as manhãs, é firme e constante", "Que se entregou na cruz e a morte derrotou", "O amor de Jesus", "",
        "Logo eu, um pobre pecador", "Logo eu, tão fraco e tão devedor", "Logo eu, de graça recebi o amor de Deus (o amor de Deus)", "",
        "Logo eu, finito e carnal", "Logo eu, diante de um Deus imortal", "Logo eu, de graça recebi o amor de Deus (o amor de Deus)", "O amor de Deus (amor de Deus)",
      ],
      tempos: [
        20.43, 26.17, 30.32, 37.56, 43.34, 49.11, 53.96, 59.89, 65.14, 70.88,
        82.37, 88.04, 94.3, 99.23, 112.03, 117.72, 122.01, 129.19, 134.95, 140.62,
        144.96, 155.23, 156.48, 162.4, 170.64, 173.36, 177.31, 185.75, 197.04, 201.99,
        207.57, 214.09, 219.04, 224.8, 230.7, 236.67, 248.46, 254.2, 259.64, 271.15,
        276.66, 282.5, 293.56, 298.9, // última linha estimada (tag curto final)
      ],
    },
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
        "Redentor", "Teu amor me libertou", "De mim e agora vivo", "",
        "Redentor", "Teu amor me libertou", "De mim e agora vivo", "",
        "Redentor", "Teu amor me libertou", "De mim e agora vivo, Enfim!", "",
        "Ooh ooh ooh", "Ooh ooh ooh",
      ],
      tempos: [
        19.42, 25.14, 27.72, 32.08, 33.82, 39.25, 40.95, 45.7, 50.08, 55.15,
        59.85, 63.7, 67.64, 73.56, 79.11, 102.28, 106.35, 111.04, 112.98, 117.8,
        120.53, 125.11, 128.88, 134.07, 138.78, 142.55, 149.39, 153.25, 157.74, 163.92,
        170.28, 172.11, 177.42, 181.39, 185.19, 206.44, 209.6, 213.04, 216.81, 217.7,
        220.16, 223.87, 227.51, 229, 231.17, 234.65, 235.78, 238.36, 241.87, 243.4,
        245.58, 249.08, 250.26, 252.72, 255.99, 258.68, 259.98, 263.77,
        267.51, 271.47, 277.77, // Redentor / Teu amor me libertou / De mim e agora vivo (repetição 1, marcada)
        281.77, 288.47, 291.42, // repetição 2, marcada
        295.42, 299.38, 305.68, // repetição 3, estimada repetindo o intervalo da repetição 1
        309.68, 316.38, 319.33, // repetição 4 + "Enfim!", estimada repetindo o intervalo da repetição 2
        324.88, 330.43, // Ooh ooh ooh x2, estimado
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
      tempos: [
        35.22, 44.14, 50.74, 62.49, 80, 96.92, 105.1, 115.04, 123.29, 142.1,
        151.5, 159.85, 166.2, 177.84, 195.56, 206.07, 220.45, 230.27, 238.15, 247.97,
        258.59, 263.79, 270.18, 278.19, // última linha estimada
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

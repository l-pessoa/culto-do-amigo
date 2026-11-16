# Culto do Amigo — AEC

Site da AEC para o Culto do Amigo: louvores com letra sincronizada, lema, pregação e a página "Volte sempre" (horários, mapa, fotos). Funciona como aplicativo instalável (PWA) e abre offline.

É um site estático: HTML, CSS e JavaScript puro, sem build. Publicado na Vercel a partir do branch `main`.

## Estrutura

```
/
├── index.html · louvores.html · player.html · tema.html
├── pregacao.html · convite.html          ← as páginas ficam na raiz (os endereços do site dependem disso)
├── sincronizar.html                       ← ferramenta interna para marcar o tempo das letras
├── sw.js · manifest.webmanifest           ← offline e instalação (precisam ficar na raiz)
│
├── data/
│   └── conteudo.js                        ← TODOS os textos, hinos, horários, fotos e links do site
│
├── css/
│   ├── tokens.css                         ← cores, fontes e espaçamentos
│   ├── style.css                          ← estilos gerais
│   └── paginas/                           ← estilos de cada página (convite, pregação, próximo culto)
│
├── js/
│   ├── nucleo/                            ← o que todas as páginas usam (menu, animações, instalação, disco)
│   └── paginas/                           ← o que cada página faz (player, carrosséis, próximo culto…)
│
└── assets/
    ├── audio/                             ← os hinos (.mp3)
    ├── img/
    │   ├── capas/                         ← capas dos hinos
    │   ├── convite/{grupos,igreja}/       ← fotos dos carrosséis
    │   └── og/                            ← imagem de pré-visualização do link (WhatsApp)
    ├── icons/                             ← ícones do aplicativo
    └── qrcode/                            ← QR code do site
```

**Regra de ouro:** nenhum texto fica solto no HTML. Para mudar uma frase, um horário, um versículo ou uma foto, edite `data/conteudo.js`.

## Rodar no computador

Não precisa instalar nada. Na pasta do projeto:

```
python3 -m http.server 8000
```

e abra `http://localhost:8000`. (O modo offline só funciona em `localhost` ou `https`.)

## Tarefas comuns

### Trocar o lema ou o versículo da pregação
Em `data/conteudo.js`, seções `lema` e `pregacao`.

### Mudar horários dos cultos
Em `data/conteudo.js`, `convite.horarios`. O cartão "Próximo culto" e o arquivo de agenda usam esses mesmos dados (`dow` = dia da semana, 0 = domingo; `inicio` e `fim` em horário de Brasília).

### Acrescentar fotos nos carrosséis
1. Converta para WebP, até ~150 KB e ~1280 px de largura (qualquer proporção serve: a foto aparece inteira).
2. Coloque em `assets/img/convite/grupos/` ou `assets/img/convite/igreja/`.
3. Acrescente uma linha `{ src, alt, legenda }` no array correspondente em `data/conteudo.js`. A `legenda` pode ficar vazia; o `alt` descreve a foto para leitores de tela.

### Trocar ou acrescentar um hino
1. **Use um nome novo para o áudio** (por exemplo `harpa-1-v2.mp3`). Com o mesmo nome, os celulares que já ouviram o hino continuam com o áudio antigo guardado.
2. Em `data/conteudo.js`, atualize `arquivoAudio` (ou crie o hino com `id`, `categoria`, `titulo`, `arquivoAudio`, `capa`, `letra`).
3. Refaça os tempos: abra `sincronizar.html?hino=ID-DO-HINO`, escolha o hino, dê play e aperte **espaço** na hora em que cada linha começa a ser cantada — **inclusive a primeira**. Copie o resultado para o campo `tempos` do hino.
4. O número de tempos precisa ser igual ao de linhas da letra (sem contar as linhas vazias).
5. O player adianta a letra em 0,3 s para compensar o tempo de reação. Para testar outro valor, abra `player.html?hino=ID&lead=0.4`.

### Publicar uma mudança
Mudou, testou, fez `git push` no `main`: a Vercel publica sozinha. Ao mudar arquivos que ficam no cache offline, aumente `CACHE_VERSION` em `sw.js`.

## Observações

- O mapa usa o código de incorporação do Google Maps do ponto exato da igreja (`igreja.mapaEmbedUrl`) e os botões usam as coordenadas.
- A imagem que aparece quando o link é colado no WhatsApp está em `assets/img/og/`; as tags ficam no `<head>` de cada página.

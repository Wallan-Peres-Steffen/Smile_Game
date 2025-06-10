let desempenho = 0;
let tentativas = 0;
let acertos = 0;
let jogar = true;

const btnReiniciar = document.getElementById("reiniciar");
const btnJogarNovamente = document.getElementById("joganovamente");
const divsJogo = document.querySelectorAll("#linha1 > div");

function reiniciar() {
  desempenho = 0;
  tentativas = 0;
  acertos = 0;
  jogar = true;
  jogarNovamente();
  atualizaPlacar(0, 0);
  btnJogarNovamente.classList.remove("invisivel");
  btnReiniciar.classList.add("invisivel");
}

function jogarNovamente() {
  jogar = true;

  divsJogo.forEach((div) => {
    div.className = "inicial";
    div.innerHTML = "";
  });

  document.getElementById("imagem")?.remove();
  document.getElementById("imageme")?.remove();
}

function atualizaPlacar(acertos, tentativas) {
  desempenho = (acertos / tentativas) * 100;
  document.getElementById(
    "resposta"
  ).innerHTML = `Placar - Acertos: ${acertos} Tentativas: ${tentativas} Desempenho: ${Math.round(
    desempenho
  )}%`;
}

function criarImagem(id, src) {
  const img = new Image(100);
  img.id = id;
  img.src = src;
  return img;
}

function acertou(obj) {
  obj.className = "acertou";
  obj.appendChild(
    criarImagem(
      "imagem",
      "https://upload.wikimedia.org/wikipedia/commons/2/2e/Oxygen480-emotes-face-smile-big.svg"
    )
  );
}

function errou(obj) {
  obj.className = "errou";
  obj.appendChild(
    criarImagem(
      "imageme",
      "https://e7.pngegg.com/pngimages/222/140/png-clipart-sad-emoticon-iphone-emoji-sadness-smiley-emoticon-emoji-face-electronics-face.png"
    )
  );
}

function verifica(obj) {
  if (!jogar) return alert('Clique em "Jogar novamente"');

  jogar = false;
  tentativas++;

  if (tentativas === 4) {
    btnJogarNovamente.classList.add("invisivel");
    btnReiniciar.classList.remove("invisivel");
  }

  let sorteado = Math.floor(Math.random() * 4);

  if (obj.id == sorteado) {
    acertou(obj);
    acertos++;
  } else {
    acertou(document.getElementById(sorteado));
    errou(obj);
  }

  atualizaPlacar(acertos, tentativas);
}

btnJogarNovamente.addEventListener("click", jogarNovamente);
btnReiniciar.addEventListener("click", reiniciar);

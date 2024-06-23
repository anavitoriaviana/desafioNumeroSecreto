let numerosSecretos = [];
let limiteNumeroSorteado = 10;
let numeroSecreto = numeroAleatorio();
let tentativas = 1;


function textoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', { rate: 1.2 });
}

function mensagemIncial() {
    textoNaTela('h1', 'Jogo do número secreto!');
    textoNaTela('p', `Chute um número de 1 à ${limiteNumeroSorteado}`);
}

mensagemIncial();

function numeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * limiteNumeroSorteado + 1);
    let quantidadeNumerosSecretos = numerosSecretos.length;

    if (quantidadeNumerosSecretos == limiteNumeroSorteado) {
        numerosSecretos = [];
    }

    if (numerosSecretos.includes(numeroEscolhido)) {
        return numeroAleatorio;
    } else {
        numerosSecretos.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        textoNaTela('h1', 'Acertou!');

        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você encontrou o número secreto com ${tentativas} ${palavraTentativa}!`;
        textoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute < numeroSecreto) {
            textoNaTela('p', 'O número secreto é maior.');
        } else {
            textoNaTela('p', 'O número secreto é menor');
        }
        tentativas++;
        limparCampo();
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = numeroAleatorio();
    limparCampo();
    tentativas = 1;
    mensagemIncial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

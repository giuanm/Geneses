let order = [];
let clickedOrder = [];
let score = 0;

//0 - verde
//1 - vermelho
//2 - amarelo
//3 - azul

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');
const cores = document.querySelector('#listaCor');

//cria ordem aleatória
let shuffleOrder = () =>{
    let colorOrder = Math.floor(Math.random()*4);
    order[order.length] = colorOrder;
    clickedOrder = [];
    dicaCor(colorOrder);

    for(let i in order){
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
} 

let dicaCor = (cor) => {
    cores.classList.remove('verde');
    cores.classList.remove('vermelho');
    cores.classList.remove('amarelo');
    cores.classList.remove('azul');
    if(cor == 0){
        cores.classList.add('verde');
        cores.innerHTML = "A última foi: Verde";
        setTimeout(() => {
            cores.classList.remove('verde');
        },10000);
    } else if(cor == 1){
        cores.classList.add('vermelho');
        cores.innerHTML = "A última foi: Vermelho";
        setTimeout(() => {
            cores.classList.remove('vermelho');
        },10000);
    } else if(cor == 2){
        cores.classList.add('amarelo');
        cores.innerHTML = "A última foi: Amarelo";
        setTimeout(() => {
            cores.classList.remove('amarelo');
        },10000);
    } else if(cor == 3){
        cores.classList.add('azul');
        cores.innerHTML = "A última foi: Azul";
        setTimeout(() => {
            cores.classList.remove('azul');
        },10000);
    }
}

//acende a próxima cor
let lightColor = (element, number) => {
    number = number*500;
    setTimeout(() => {
        element.classList.add('selected');
    }, number - 250);
    setTimeout(() => {
        element.classList.remove('selected');
    });
}

//checa se os botões clicados são os mesmo da ordem gerada no jogo
let checkOrder = () => {
    for(let i in clickedOrder) {
        if( clickedOrder[i] != order[i]){
            gameOver();
            break;
        }
    }
    if(clickedOrder.length == order.length){
        alert(`Pontuação: ${score}\nVocê acertou!!! Iniciando próximo nível!`);
        nextLevel();
    }
}

//função para o click do usuário
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');
    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    }, 250);
}

//função que retorna a cor
let createColorElement = (color) => {
    if(color == 0){
        return green;
    } else if(color == 1){
        return red;
    } else if(color == 2){
        return yellow;
    } else if(color == 3){
        return blue;
    }
}

//função para o próximo nível do jogo
let nextLevel = () => {
    score++;
    shuffleOrder();
    blue.classList.remove('selected');
    green.classList.remove('selected');
    red.classList.remove('selected');
    yellow.classList.remove('selected');
}

//função para game over
let gameOver = () => {
    alert(`Pontuação: ${score}!\nVocê perdeu o jogo!\nClick em Ok para iniciar um novo jogo!`);
    order = [];
    clickedOrder = [];

    playGame();
}

let playGame = () => {
    alert('Bem vindo ao Genesis! Iniciando novo jogo!');
    score = 0;

    nextLevel();
}

green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

playGame();
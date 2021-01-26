const dino = document.querySelector(".dino") // Procurando a div "dino"
const background = document.querySelector('.background'); // Pegando a div de 'background'

let position = 0; // Para definir a posição inicial do dino

let isJumping = false;
let finnalyJump = 0;

var point = 0;

function handleKeyup (event){
    if(event.keyCode === 32){
        if(!isJumping){ // Verifica se o dino está pulando
            jump();
        }
    }
}

function jump(){
    isJumping  = true;
    
    let upInterval = setInterval(() => {
        if(position >= 150){
            point += 1;
            clearInterval(upInterval)

            let downInterval = setInterval(() => {
                if(position <= 0){
                    clearInterval(downInterval);
                    isJumping = false;
                }else{
                    position -= 20;
                    
                    dino.style.bottom = position + 'px';
                }
            }, 20);
        }else{ 
            // Code
            position += 20;
        
        }
        dino.style.bottom = position + 'px';        

        if(!finnalyJump){
            document.querySelector('#border-point').innerHTML = point;
        }
    }, 20);
}

function createCactus(){
    const cactus = document.createElement('div');
    let positionCactus = 1000  
    let randintTime = Math.random() * 6000; // Criando um valor aleatório

    cactus.classList.add('cactus'); // Cria uma classe 'cactus'
    cactus.style.left = 1000 + 'px';

    background.appendChild(cactus);

    let leftInterval = setInterval(() => { // Criando o movimento do cactus
        
        if(cactus < -60){
            clearInterval(leftInterval);
            background.removeChild(cactus);
        }else if(positionCactus > 0 && positionCactus < 60 && position < 60){
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
            finnalyJump = true;
        }else{
            positionCactus -= 10;
            cactus.style.left = positionCactus + 'px';
        }
    }, 20);

    setTimeout(createCactus, randintTime); // Gera vários elementos do mesmo cactus
}

createCactus();

document.addEventListener('keyup', handleKeyup); 

let array = [];
let enemy = new Enemy(array);
let arrayButton = [];

//classe que contém o botão para iniciar o jogo.
const keydownListener = function(e) {
    if (e.key === "a") {
        //Adiciona uma classe no body para saber q o jogo está em andamento
        document.querySelector("body").classList.add("startedGame");
        enemy.nextLevel(); //Passa para o nível 1 do jogo
    }
};
//Adiciona o eventListener para a página toda.
document.addEventListener("keydown", keydownListener);

//Adiciona a opção de click para todos os botões.
for (let i = 0; i< document.querySelectorAll(".btn").length; i++){
    document.querySelectorAll(".btn")[i].addEventListener("click", function(){
        let button = "btn"+(i+1);
        buttonSound(button); //Add som para os botões
        buttonAnimation(this); //Add animação para os botões
        //Se o body conter o startedGame, então o jogo continuará.
        if (document.querySelector("body").classList.contains("startedGame")){
            enemy.compare(i+1); //Compara o valor do botão clicado com o array do objeto enemy.
        }
       
    });
    
}
//Adiciona som para os botões usando o nome da classe deles.
function buttonSound(clickedButton){
    switch (clickedButton) {
        case "btn1":
            audio = new Audio("sounds/green.mp3");
            audio.play();
            break;
            case "btn2":
            audio = new Audio("sounds/red.mp3");
            audio.play();
            break;
            case "btn3":
            audio = new Audio("sounds/yellow.mp3");
            audio.play();
            break;
            case "btn4":
            audio = new Audio("sounds/blue.mp3");
            audio.play();
            break;
        default:
            break;
    }
}
//Adiciona a mesma animação para todos os botões.
function buttonAnimation(clickedButton){
    clickedButton.classList.add("pressed");
    setTimeout(function(){ //Remove a animação dps de 1 segundo.
        clickedButton.classList.remove("pressed");
    },100);
}

//Construtor da "classe" Enemy
function Enemy(array){
    this.value = -1; //"Valor do tamanho do array"
    this.array = array;
    this.levelValue = 1; //Valor do nível q o jogador está.
    this.valueLoop = 0; //Esse valor é usado para chegar até o tamanho do array para comparar botões.
    //Função que passa de nível no jogo
    this.nextLevel = function(){
        if(document.querySelector("body").classList.contains("startedGame")){
            //Remove o evento de teclar "A", quando o usuário está em jogo.
            document.removeEventListener("keydown", keydownListener);
        }
        document.querySelector("h1").innerHTML = "Level "+enemy.levelValue; //Level atual do jogo
        let random = (Math.floor(Math.random()*4))+1; //Número random do botão gerado.
        let button = document.querySelector(".btn"+random); //Nome da classe btn+random.
        array.push(random); //Adiciona no array o valor do botão (numérico random).
        this.value++; //Aumenta o valor do tamanho do array
         //Depois de 6 segundos, inicia a a animação e o som do botão para o user memorizar
        setTimeout(function(){
        
            buttonSound("btn"+random);;
            buttonAnimation(button);
        },600);
        
    }
//Função ativada quando o usuário erra um botão.
    this.gameOver = function(){
        document.querySelector("body").classList.add("game-over"); //Tela de game-over.
        document.querySelector("h1").innerHTML = "You lose"; //Texto de game-over.
        let audio = new Audio("sounds/wrong.mp3"); //Som de game-over
        audio.play();
        document.querySelector("body").classList.remove("startedGame")//Encerra o jogo
        document.addEventListener("keydown", keydownListener);
        setTimeout(function(){
            document.querySelector("body").classList.remove("game-over"); //Remove o game-over dps de 2s
        },200);
    
    }
    
    this.compare = function(insertValue){
        if (this.array[this.valueLoop] == insertValue){ //Compara o valor do objeto com o botão clicado
            this.valueLoop++; //Aumenta o valor do objeto.
            if (this.valueLoop == this.array.length){ //Se o valor do objeto chegar no tamanho do array, então passará de fase
                this.nextLevel(); //Chama o método pra mudar de fase.
                this.levelValue++; //Aumenta o nível de difículdade
                this.valueLoop = 0; //Zera o valor do objeto, para se tornar um valor "loop" novamente.
            }    
    //Caso o botão clicado seja errado, então ativa o game-over. 
    }else{
        //Se o body contém a class startedGame, então é rodado o game-over, caso não, é preciso iniciar o jogo de novo
        if (document.querySelector("body").classList.contains("startedGame")){
             this.gameOver(); //caso seja falso, é game over.
            this.array.length = 0;
            this.valueLoop = 0;
            this.levelValue = 1;
        }
       
    }         
}
}


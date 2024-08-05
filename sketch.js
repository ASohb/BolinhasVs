var basket;
var ball;
var score = 1;
var redGroup;

var startTime;
var gameTime;
var lastChange= 0;

function setup() {
  createCanvas(800, 600);
  
  // Cria o cesto
  basket = createSprite(350, 585, 100, 20);
  basket.shapeColor = color(255, 0, 0);
  
  

  // Cria o grupo de bolas vermelhas
  redGroup = new Group();
  greenGroup = new Group();

    // Inicia o cronômetro
    startTime = millis();
}

function draw() {
  background(200);
  
  // Move o cesto com as setas do teclado
  if (keyDown(LEFT_ARROW)) {
    basket.position.x -= 5;
  }
  if (keyDown(RIGHT_ARROW)) {
    basket.position.x += 5;
  }
  

  // Adiciona bolas vermelhas a cada 60 frames
  redBalls();
  greenBalls();
  
   // Verifica a colisão entre o cesto e as bolas vermelhas
   redGroup.forEach(redB => {
    if (basket.overlap(redB) ){
      redB.remove(); // Remove a bola vermelha ao colidir
      score--; // Diminui a pontuação
    }
  });
   greenGroup.forEach(greenB => {
    if (basket.overlap(greenB) ){
      greenB.remove(); // Remove a bola vermelha ao colidir
      score++; // Diminui a pontuação
    }
  });
  
  if (gameTime - lastChange >= 30) {
    redGroup.setVelocityEach(random(8,14)) // Aumenta a velocidade
    lastChange = gameTime; // Atualiza o tempo da última alteração
    console.log("Estou aqui!")
  }
  
     // Atualiza o tempo decorrido
     gameTime = Math.floor((millis() - startTime) / 1000);

  
  
  drawSprites();
  
  // Mostra a pontuação
  fill(0);
  textSize(24);
  text("Score: "+score, 10, 30);
  text("Time: "+gameTime, 10, 60);

  if (score <= 0) {
    noLoop(); // Para o loop do jogo
    textSize(48);
    textAlign(CENTER, CENTER);
    fill(0);
    text(`Game Over!\nTime Survived: ${gameTime} s`, width / 2, height / 2);
  }
}

function redBalls() {
  if (frameCount % 10 === 0) {
    let redB = createSprite( random(0, 780),0, 20, 20);
    redB.shapeColor = color("red");
    redB.velocityY = random(3,9);
    redB.lifetime= 500;
    redGroup.add(redB);
  }
}

function greenBalls() {
  if (frameCount % 40 === 0) {
    let greenB = createSprite( random(0, 780),0, 20, 20);
    greenB.shapeColor = color("green");
    greenB.velocityY = random(3,12);
    greenB.lifetime= 500
    greenGroup.add(greenB);
  }
}
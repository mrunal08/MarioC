
var ground,groundImage;
var mario,marioImage;
var IVground,IVgroundImage;
var enemy,enemyImage;
var cloud,cloudImage;
var coin,coinImage;
var bullet,bulletImage;

var PLAY = 1
var END = 0
var gameState = PLAY

var bg;
var pipe,pipeImage;
var score = 5
var count = 0
var coinCount = 0

function preload() {
bg = loadImage("bg.png")
groundImage = loadImage("ground.png")
marioImage = loadAnimation("mario1.png","mario2.png")
enemyImage = loadAnimation("enemy1.png","enemy2.png")
pipeImage = loadImage("pipes.png")
cloudImage = loadImage("cloud.png")
coinImage = loadImage("coin.png")
bulletImage = loadImage("bullet.png")
}
function setup() {
createCanvas(1200, 400);
ground = createSprite(600,390,1200,20)
ground.addImage("ground",groundImage)

mario = createSprite(50,330,20,20)
mario.addAnimation("mario",marioImage)
mario.scale = 0.3

IVground = createSprite(600,370,1200,10)
IVground.visible = false

coin = createSprite(200,50,10,10)
coin.addImage("coin",coinImage)

pipeGroup = new Group()
cloudGroup = new Group()
bulletGroup = new Group()
enemyGroup = new Group()
coinGroup = new Group()

}
function draw() {
  background("pink")
  

  fill("black");
	textSize(35);
	textFont("monospace");
	text(" x ",70,60)
	text(score,120,60);
	
	textSize(35);
	text("SCORE:"+Math.round(count),320,60);
	text(coinCount,250,60);
	text(" x ",200,60);

if(gameState===PLAY){
  
   ground.velocityX = -7
   count = count + 0.1;
   if(ground.x<0){
    ground.x = ground.width/2
   }

   if(keyDown("space")&& mario.y>320){
    mario.velocityY = -20

   }

   if(keyWentDown("RIGHT_ARROW")){
     bullet = createSprite(mario.x, mario.y)
     bullet.addImage("bullet",bulletImage)
     bullet.velocityX = 4
     bulletGroup.add(bullet)

   }
    mario.velocityY = mario.velocityY +0.8

    spawnPipes();
    spawnEnemys();
    spawnclouds();
    spawncoins();

  if(pipeGroup.isTouching(mario)){
    score = score-1
    count = count -5
    gameState = END
  }

  if(enemyGroup.isTouching(mario)){
    score = score-1;
    count = count -5;
    gameState = END;
  }

  if(bulletGroup.isTouching(enemyGroup)){
    enemyGroup.destroyEach()
    bulletGroup.destroyEach()

  }

        for(var j=0;j<coinGroup.length;j++){
          if(coinGroup.isTouching(mario)){
            coinGroup.get(j).destroy();
            coinCount = coinCount+1;
          }

        }
}
else if(gameState===END){
  ground.velocityX = 0;
    cloudGroup.setVelocityXEach(0);
    pipeGroup.setVelocityXEach(0);
    enemyGroup.setVelocityXEach(0);
    cloudGroup.setLifetimeEach(-1);
    pipeGroup.setLifetimeEach(-1);
		enemyGroup.destroyEach();
		coinGroup.setVelocityXEach(0);
		coinGroup.setLifetimeEach(-1);
    mario.velocityY = 0;
    
}

if(score === 0){
  gameState ===END;
}

  mario.collide(IVground)
 
  drawSprites();  

 
}


function spawnPipes() {
  //write code here to spawn the pipe
  if (frameCount % 200 === 0) {
    var pipe = createSprite(1200,310,40,10);
    pipe.addImage(pipeImage);
    pipe.scale = 0.5;
    pipe.velocityX = -6;
    pipeGroup.add(pipe)
  }
}

function spawnEnemys() {
  //write code here to spawn the enemy
  if (frameCount % 200 === 0) {
    var enemy = createSprite(1200,340,40,10);
    enemy.addAnimation("enemy",enemyImage);
    enemy.scale = 0.15;
    enemy.velocityX = -6;
    enemy.lifetime=300
    enemyGroup.add(enemy)
  }
}

function spawncoins() {
  //write code here to spawn the coin
  if (frameCount % 250 === 0) {
    for(var i=0;i<5;i++){
    coin = createSprite(1200+i*20,200,10,10);
   coin.addImage("coin",coinImage);
  
    coin.velocityX = -4;
    coin.lifetime = 400
    coinGroup.add(coin)
    }
  }
}

function spawnclouds() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 2.5;
    cloud.velocityX = -3;
    cloudGroup.add(cloud)

  }
}


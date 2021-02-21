var tower, towerImage
var door, doorImage
var climber, climberImage
var ghost, ghostImage
var invisibleBlock
var gameState = "PLAY"
var spookySound

function preload(){
  towerImage=loadImage("tower.png");
  
  doorImage=loadImage("door.png");
  
  climberImage=loadImage("climber.png");
  
  ghostImage=loadImage("ghost-standing.png");
  
  spookySound=loadSound("spooky.wav");
}

function setup(){
  createCanvas(400,400);
  
  spookySound.loop();
  
  tower=createSprite(300,300);
  
  doors=new Group();
  
  climbers=new Group();
  
  invisibleBlocks=new Group();
  
  ghost=createSprite(200,200,50,50);
  
  ghost.addImage("ghost", ghostImage);
  ghost.scale=0.3;
  
  tower.addImage("tower", towerImage);
  tower.velocityY = 1;
  
}

function draw(){
  background(0);
  
  if(gameState==="PLAY"){
  
  spawnDoors();
  
  if(tower.y>400){
    tower.y=300;
  }
  
  if(keyDown("right_arrow")){
    ghost.x=ghost.x+3;
  }
  
  if(keyDown("left_arrow")){
    ghost.x=ghost.x-3;
  }
  
  if(keyDown("space")){
    ghost.velocityY=-5;
  }
  
  if(doors.isTouching(ghost)){
  ghost.velocityY=0;
  }
  
  if(invisibleBlocks.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState="END";
  }
  
  drawSprites();
  }
  if(gameState==="END"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230, 250);
  }
}


function spawnDoors(){
  if(frameCount%240===0){
  door=createSprite(200,-50);
  door.addImage(doorImage);
  climber=createSprite(200,10);
  climber.addImage(climberImage);
  invisibleBlock=createSprite(200,15);
  invisibleBlock.width=climber.width;
  invisibleBlock.height=2;
  door.velocityY=1;
  climber.velocityY=1;
  door.x=Math.round(random(120,400));
  invisibleBlock.x=door.x;
  invisibleBlock.velocityY=1;
  invisibleBlocks.add(invisibleBlock);
  invisibleBlock.visible=false;
  climber.x=door.x;
  doors.add(door);
  ghost.depth=door.depth;
  ghost.depth=ghost.depth+1;
  door.lifetime=800;
  climber.lifetime=800;
  climbers.add(climber);  
  }
}
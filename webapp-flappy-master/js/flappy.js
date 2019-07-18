// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);
var score = 0;
var labelScore;
var player;
var pipes = [];
var balloons = [];
var weight = [];
var gapSize = 140;
var gapMargin = 50;
var blockHeight = 50;
var height = 400;
var width = 790;
var pipeEndHeight = 25;
var pipeEndExtraWidth = 10;
/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
  game.load.image("backgroundImg", "../assets/ysb.png");
  game.load.image("playerImg", "../assets/ys2.png");
  game.load.audio("score", "../assets/bubbles.ogg");
  game.load.image("pipeBlock", "../assets/pipe2-body.png");
  game.load.image("pipeEnd", "../assets/pipe-end.png");
  game.load.image("balloons", "../assets/balloons.png");
  game.load.image("weight", "../assets/weight.png");
  game.load.image("cloud","../assets/cloud.png");
  // game.load.image("letterF","../assets/letters/F.png");
  // game.load.image("letterL","../assets/letters/L.png");
  // game.load.image("letterA","../assets/letters/A.png");
  // game.load.image("letterP","../assets/letters/P.png");
  // game.load.image("letterY","../assets/letters/Y.png");
  // game.load.image("letterS","../assets/letters/S.png");
  // game.load.image("letterU","../assets/letters/U.png");
  // game.load.image("letterB","../assets/letters/B.png");
  // game.load.image("letterM","../assets/letters/M.png");
  // game.load.image("letterA","../assets/letters/A.png");
  // game.load.image("letterR","../assets/letters/R.png");
  // game.load.image("letterI","../assets/letters/I.png");
  // game.load.image("letterN","../assets/letters/N.png");
  // game.load.image("letterE","../assets/letters/E.png");


}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    // set the background colour of the scene
    var background = game.add.image(0, 0, "backgroundImg");
    background.width = 790;
    background.height = 400;

    var backgroundVelocity = 20;
    var backgroundSprite = game.add.tileSprite(0,0,width,height,"cloud");
    backgroundSprite.autoScroll(-backgroundVelocity,0);





    player = game.add.sprite(50,50, "playerImg")
    game.physics.arcade.enable(player);

    player.body.gravity.y = 100;

    player.height = 40;
    player.width = 50;




    labelScore = game.add.text(30,20,(score-3).toString());

    game.input.onDown.add(playerJump);
    game.input
      .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
      .onDown.add(playerJump);

    var pipeInterval = 2.25 * Phaser.Timer.SECOND;
    game.time.events.loop(
      pipeInterval,
      generate

    );

    generatePipe();



}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
  game.physics.arcade.overlap(
    player,pipes,gameOver);
  if(player.body.y<0){
    gameOver();
  }
  if(player.body.y>400){
    gameOver();
  }
}

function gameOver() {
 regScore(score);
 game.state.restart();
 score = 0;
}


function playerJump() {
  player.body.velocity.y = -85;
}

function changeScore() {
  score = score + 1
  labelScore.setText((score-3).toString());
  game.sound.play("score");
}

function addPipeBlock(x,y){
  var block = game.add.sprite(x,y, "pipeBlock");
  pipes.push(block);

  game.physics.arcade.enable(block);
  block.body.velocity.x = -140;
}
function addPipeEnd(x,y){
  var block = game.add.sprite(x,y, "pipeEnd");
  pipes.push(block);

  game.physics.arcade.enable(block);
  block.body.velocity.x = -140;
}
function changeGravity(g) {
  gameGravity += g;
  player.body.gravity.y = gameGravity;
}
function generateBalloons(){
  var bonus = game.add.sprite(width,height, "balloons");
  balloons.push(bonus);
  game.physics.arcade.enable(bonus);
  bonus.body.velocity.x = - 200;
  bonus.body.velocity.y = - game.rnd.integerInRange(60, 100);
}
function generateWeight(){
  var bonus = game.add.sprite(width,height, "weight");
  weight.push(bonus);
  game.physics.arcade.enable(bonus);
  bonus.body.velocity.x = - 200;
  bonus.body.velocity.y = - game.rnd.integerInRange(60, 100);
}
function generate() {
 var diceRoll = game.rnd.integerInRange(1, 10);
 if(diceRoll==1) {
 generateBalloons();
 } else if(diceRoll==2) {
 generateWeight();
 } else {
 generatePipe();
 }
}
function generatePipe() {
  // this is where the gap starts
  var gapStart = game.rnd.integerInRange(gapMargin, height-gapSize-gapMargin);
  addPipeEnd(width - (pipeEndExtraWidth / 2), gapStart);
  for(var y = gapStart; y >0; y -= blockHeight) {
    // y is the coordinate of the bottom of the block, subtract blockHeight
    // to get the top
      addPipeBlock(width, y-blockHeight);

}
  addPipeEnd(width - (pipeEndExtraWidth / 2), gapStart + gapSize);
  for(var y = gapStart + gapSize + pipeEndHeight; y <height; y += blockHeight) {
        addPipeBlock(width, y);
  }


    changeScore();


}
//

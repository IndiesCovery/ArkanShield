var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', {
  preload: preload,
  create: create,
  update: update,
  render:render
});

var ballOnShip = true;
var ship = {};
var ball = {};
var ages = [];
var currentAgeIndex = 0;
var currentAge = {};

function preload() {
  game.load.image('screen_border', 'assets/images/screen_border.png');
  game.load.spritesheet('ship', 'assets/images/ShieldSprite.png', 64, 16, 5);
  game.load.image('ball', 'assets/images/ball.png');

  for(var i = 1; i <= 4; i++)
    game.load.image('brickStone'+i, 'assets/images/BlockStone_0'+i+'.png');
  
  for(var i = 1; i <= 5; i++)
    game.load.image('brickRenaissance'+i, 'assets/images/BlockRenaissance_0'+i+'.png');

  for(var i = 1; i <= 3; i++)
    game.load.image('brickFuture'+i, 'assets/images/BlockFuture_0'+i+'.png');
  
};


function create() {

  //Configs physics and world bounds
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.arcade.checkCollision.down = false;
  
  game.world.bounds.setTo(15, 50, 768, 500);
    if (game.camera.bounds)
    {
        //  The Camera can never be smaller than the game size
        game.camera.bounds.setTo(0, 0, 800, 600);
    }
  game.physics.setBoundsToWorld();

  //creates sprites
  ship = new Ship(game, 200, 510, 'ship');
  ball = new Ball(game, ship.x, ship.y - ship.height, 'ball');

  //adds sprites
  game.add.existing(ball);
  game.add.existing(ship);

  //set background
  game.add.sprite(0, 0, 'screen_border');

  //set physics
  game.physics.enable(ship, Phaser.Physics.ARCADE);
  game.physics.enable(ball, Phaser.Physics.ARCADE);


  ship.body.immovable = true;
  ship.body.bounce.set(0);
  ship.body.collideWorldBounds = true;

  ball.body.bounce.set(1);
  ball.body.velocity.setTo(0, 0);
  ball.body.collideWorldBounds = true;
  ball.checkWorldBounds = true;
  ball.events.onOutOfBounds.add(ballOnOutOfBounds, this);

  //set input
  cursors = game.input.keyboard.createCursorKeys();
  game.input.onDown.add(releaseBall, this);

  ages[0] = {
    spriteSet:'brickStone',
    frames: 4
  };
  ages[1] = {
    spriteSet:'brickRenaissance',
    frames: 5
  };
  ages[2] = {
    spriteSet:'brickFuture',
    frames: 3
  };

  currentAge = new Age(ages[0]);
  console.log(currentAge);
};

function ballOnOutOfBounds(){
   ballOnShip = true;
   ball.y = ship.y - (ship.height/2 + ball.height/2);
   ball.x = ship.x;
   ball.body.velocity.setTo(0,0);
}


function hitShipBall(_ship, _ball) {
  var dx = _ball.x - _ship.x;
  _ball.body.velocity.x = 10*dx;
  _ship.frame = _ball.x > _ship.x ? 3:4;
}

function releaseBall(){
  if(ballOnShip){
      ballOnShip = false;
      ball.body.velocity.y = -ball.speed.y;
      ball.body.velocity.x = (Math.random()*200 + 1) * (Math.floor(Math.random()*2)==1?1:-1); 
  }
}

function update(){  
  manageGeneralInput();
  currentAge.update();  

  if(currentAge.done){
      delete currentAge;
      currentAgeIndex = currentAgeIndex==2? 0:currentAgeIndex+1;
      currentAge = new Age(ages[currentAgeIndex]);
      ballOnShip = true;
      ball.x = ship.x;
      ball.y = ship.y - (ship.height/2 + ball.height/2);
  }

};

function render(){

}

function manageGeneralInput(){
  
  if(cursors.left.isDown && ship.body.x - 10 >= 8){
      ship.move(-10,0);
  }else if(cursors.right.isDown && ship.body.x + 10 <= 728){
      ship.move(10,0);
  }else{
      ship.frame = 0;
  }

  if(!ballOnShip)
     game.physics.arcade.collide(ship, ball, hitShipBall, null, this);
  else
     ball.x = ship.x;
}

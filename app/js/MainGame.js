var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', {
  preload: preload,
  create: create,
  update: update,
  render:render
});

var DEBUG = true;

var ballOnShip = true;
var ship = {};
var balls;
var ages = [];
var currentAgeIndex = 0;
var currentAge = {};
var powers;


function preload() {
  
  game.load.image('screen_border', 'assets/images/screen_border.png');
  game.load.spritesheet('ship', 'assets/images/ShieldSprite.png', 64, 16, 5);
  game.load.image('ball', 'assets/images/ball.png');
  game.load.image('doubleBallPower', 'assets/images/doubleBallPower.png');

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
  var ball = new Ball(game, ship.x, ship.y - ship.height, 'ball');
  
  //adds sprites
  game.add.existing(ball);
  game.add.existing(ship);

  //adds groups
  balls =  game.add.group(); 
  powers =  game.add.group();

  //set background
  game.add.sprite(0, 0, 'screen_border');

  //set ship physics
  game.physics.enable(ship, Phaser.Physics.ARCADE);
  ship.body.immovable = true;
  ship.body.bounce.set(0);
  ship.body.collideWorldBounds = true;

  //Set balls physics
  balls.enableBody = true;
  balls.physicsBodyType = Phaser.Physics.ARCADE;  

  //Set powers physics
  powers.enableBody = true;
  powers.physicsBodyType = Phaser.Physics.ARCADE;

  //Set balls group physics
  balls.add(ball);
  console.log(ball);
  ball.body.bounce.set(1);
  ball.body.velocity.setTo(0, 0);
  ball.body.collideWorldBounds = true;

  //set input
  cursors = game.input.keyboard.createCursorKeys();
  space_key = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

  space_key.onDown.add(releaseBall, this);

  ages[0] = Level.generate(Math.floor(Math.random()*388800));
  ages[1] = Level.generate(Math.floor(Math.random()*388800));
  ages[2] = Level.generate(Math.floor(Math.random()*388800));

  currentAge = new Age(ages[0]);
};

function hitShipBall(_ship, _ball) {
  var dx = _ball.x - _ship.x;
  _ball.body.velocity.x = 10*dx;
  _ship.frame = _ball.x > _ship.x ? 3:4;
}

function releaseBall(){
  if(ballOnShip){
      ballOnShip = false;
      balls.getAt(0).body.velocity.y = -balls.getAt(0).speed.y;
      balls.getAt(0).body.velocity.x = (Math.random()*200 + 1) * (Math.floor(Math.random()*2)==1?1:-1); 
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
      
      if(currentAge.powers_manager.activePower != undefined)
        currentAge.powers_manager.activePower.kill();
      
      balls.getAt(0).x = ship.x;
      balls.getAt(0).y = ship.y - (ship.height/2 + balls.getAt(0).height/2);
      balls.getAt(0).body.velocity.x = 0;
      balls.getAt(0).body.velocity.y = 0;   

      if(balls.length > 1){
        for(var i = 1; i < balls.length; i++){
          balls.removeAt(i);
        }
      }
  }

  for(var i = 0; i < balls.length; i++){    
    if(balls.getAt(i).y > 600){
      
      if(balls.length == 1){
        ballOnShip = true;
        balls.getAt(0).x = ship.x;
        balls.getAt(0).y = ship.y - (ship.height/2 + balls.getAt(0).height/2)-5;
        balls.getAt(0).body.velocity.x = 0;
        balls.getAt(0).body.velocity.y = 0;

        if(currentAge.powers_manager.activePower != undefined)
           currentAge.powers_manager.activePower.kill();
      
      }else{
        balls.removeChildAt(i);
      } 
    }
  }
}

function render(){}

function manageGeneralInput(){
  
  if(cursors.left.isDown && ship.body.x - 10 >= 8){
      ship.move(-10,0);
  }else if(cursors.right.isDown && ship.body.x + 10 <= 728){
      ship.move(10,0);
  }else{
      ship.frame = 0;
      if(DEBUG){
        ship.body.x = ball.x-Math.random()*64;
      }
  }
    
  if(!ballOnShip)
    for(var i = 0; i< balls.length; i++)
     game.physics.arcade.collide(ship, balls.getAt(i), hitShipBall, null, this);
  else
     balls.getAt(0).x = ship.x;
}

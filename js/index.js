var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', {
  preload: preload,
  create: create,
  update: update,
  render:render
});
var ballOnShip = false;

function preload() {
  game.load.image('screen_border', 'assets/images/screen_border.png');
  game.load.spritesheet('ship', 'assets/images/ShieldSprite.png', 64, 16, 5);
  game.load.image('ball', 'assets/images/ball.png');
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
  ball = new Ball(game, 100, 100, 'ball');
  
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
  ball.body.velocity.setTo(ball.speed.x, ball.speed.y);
  ball.body.collideWorldBounds = true;
  ball.checkWorldBounds = true;
  ball.events.onOutOfBounds.add(ballOnOutOfBounds, this);

  //set input
  cursors = game.input.keyboard.createCursorKeys();
  game.input.onDown.add(releaseBall, this);
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
      ball.body.velocity.x = Math.random()*100 + 1;   
  }
}

function update(){  
  

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
  
};

function render() {
  
}

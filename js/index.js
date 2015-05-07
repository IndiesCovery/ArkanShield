Ball = function(game, x, y, key){
  Phaser.Sprite.call(this, game, x, y, key);
  this.speed = {};
  this.speed.y = 400;
  this.speed.x = 100;
}

Ball.prototype = Object.create(Phaser.Sprite.prototype);
Ball.prototype.constructor = Ball;


Ball.prototype.move = function() {
};


var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', {
  preload: preload,
  create: create,
  update: update,
  render:render
});


function preload() {
  game.load.image('screen_border', 'assets/images/screen_border.png');
  game.load.image('ship', 'assets/images/ship.png');
  game.load.image('ball', 'assets/images/ball.png');
};


function create() {

  //Configs physics and world bounds
  game.physics.startSystem(Phaser.Physics.ARCADE);
  //game.physics.arcade.checkCollision.down = false;
  
  game.world.bounds.setTo(20, 50, 766, 500);
    if (game.camera.bounds)
    {
        //  The Camera can never be smaller than the game size
        game.camera.bounds.setTo(0, 0, 800, 600);
    }
  game.physics.setBoundsToWorld();


  //set background
  game.add.sprite(0, 0, 'screen_border');

  //creates sprites
  ship = game.add.sprite(200, 510, 'ship');
  ball = new Ball(game, 100, 100, 'ball');
  game.add.existing(ball);


  //set physics
  game.physics.enable(ship, Phaser.Physics.ARCADE);
  game.physics.enable(ball, Phaser.Physics.ARCADE);

  //ship.body.createBodyCallback(ball, hitBall, this);
  console.log(game);
  ship.body.immovable = true;
  ship.body.bounce.set(0);
  ship.body.collideWorldBounds = true;

  ball.anchor.set(0.5);
  ball.body.bounce.set(1);
  ball.body.velocity.setTo(ball.speed.x, ball.speed.y);
  ball.body.collideWorldBounds = true;

  //set input
  cursors = game.input.keyboard.createCursorKeys();

};

function hitBall(body1, body2) {
}

function update(){
  game.physics.arcade.collide(ship, ball);
  
  if(cursors.left.isDown){
    ship.body.x -= 10;
  }else if(cursors.right.isDown){
    ship.body.x += 10;
  }

};

function render() {
  
}

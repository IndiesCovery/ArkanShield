Ball = function(game, x, y, key){
  Phaser.Sprite.call(this, game, x, y, key);
}

Ball.prototype = Object.create(Phaser.Sprite.prototype);
Ball.prototype.constructor = Ball;

Ball.prototype.update = function() {
  this.position.x += 5;
  this.position.y += 5;
};

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
  //Configs physics
  game.physics.startSystem(Phaser.Physics.P2JS);
  game.physics.p2.restitution = 0.9;

  //set background
  game.add.sprite(0, 0, 'screen_border');


  //creates sprites
  ship = game.add.sprite(200, 510, 'ship');
  ball = new Ball(game, game.world.randomX, game.world.randomY, 'ball');
  game.add.existing(ball);


  //set physics
  game.physics.p2.enable(ship, false);
  game.physics.p2.enable(ball, false);
  ball.body.setCircle(16);
  //ship.body.createBodyCallback(ball, hitBall, this);
  ship.body.fixedRotation = true;
  ball.body.velocity.destination[0]=120;
  ball.body.velocity.destination[1]=120;
  ball.body.inertia = 0;
  ship.body.inertia = 0;

  //
  game.physics.p2.setImpactEvents(true);
  setMaterials();

  //set input
  cursors = game.input.keyboard.createCursorKeys();

};

function setMaterials(){
  var shipMaterial = game.physics.p2.createMaterial('shipMaterial', ship.body);
  var ballMaterial = game.physics.p2.createMaterial('ballMaterial', ball.body);

  var contactMaterial = game.physics.p2.createContactMaterial(shipMaterial, ballMaterial);

  contactMaterial.friction = 0;     // Friction to use in the contact of these two materials.
  contactMaterial.restitution = 1.0;  // Restitution (i.e. how bouncy it is!) to use in the contact of these two materials.
  contactMaterial.stiffness = 1e7;    // Stiffness of the resulting ContactEquation that this ContactMaterial generate.
  contactMaterial.relaxation = 3;     // Relaxation of the resulting ContactEquation that this ContactMaterial generate.
  contactMaterial.frictionStiffness = 1e7;    // Stiffness of the resulting FrictionEquation that this ContactMaterial generate.
  contactMaterial.frictionRelaxation = 3;     // Relaxation of the resulting FrictionEquation that this ContactMaterial generate.
  contactMaterial.surfaceVelocity = 0; 

}

function hitBall(body1, body2) {
}

function update(){
  ball.move();
  ship.body.setZeroVelocity();
  if(cursors.left.isDown){
    ship.body.moveLeft(400);
  }else if(cursors.right.isDown){
    ship.body.moveRight(400);
  }
};

function render() {
  
}

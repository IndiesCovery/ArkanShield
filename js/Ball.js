Ball = function(game, x, y, key){
  Phaser.Sprite.call(this, game, x, y, key);
  this.force = 1;
  this.speed = {};
  this.speed.y = 350;
  this.anchor.set(0.5);
}

Ball.prototype = Object.create(Phaser.Sprite.prototype);
Ball.prototype.constructor = Ball;

Ball.prototype.move = function(x, y) {
	this.body.x += x;
	this.body.y += y;	
};
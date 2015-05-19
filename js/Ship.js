Ship = function(game, x, y, key){
  Phaser.Sprite.call(this, game, x, y, key);
  this.lifes = 5;
  this.anchor.set(0.5);
  this.speed = 10;
}

Ship.prototype = Object.create(Phaser.Sprite.prototype);
Ship.prototype.constructor = Ship;

Ship.prototype.move = function(x, y) {
	this.body.x += x;
	this.body.y += y;

	this.frame = x>0? 1:2;
};

Ship.prototype.getBigger = function(){
	this.width = this.width * 2;
}

Ship.prototype.getSmaller = function(){
	this.width = this.width/2;
}
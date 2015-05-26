Ship = function(game, x, y, key){
  Phaser.Sprite.call(this, game, x, y, key);
  this.lifes = 5;
  this.basic_width = this.width;
  this.basic_height = this.height;
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
	game.add.tween(this.scale).to({ x: 2, y: 1 }, 500, Phaser.Easing.Back.Out, true, 1000);
}

Ship.prototype.getSmaller = function(){
	game.add.tween(this.scale).to({ x: 1/2, y: 1 }, 500, Phaser.Easing.Back.Out, true, 1000);
}

Ship.prototype.getNormal = function(){
	game.add.tween(this.scale).to({x: 1, y: 1 }, 500, Phaser.Easing.Back.Out, true, 1000);
}
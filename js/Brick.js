Brick = function(game, x, y, key){
	Phaser.Sprite.call(this, game, x, y, key);
}

Brick.prototype = Object.prototype.create(Phaser.Sprite.prototype);



Brick.constructor = Brick;
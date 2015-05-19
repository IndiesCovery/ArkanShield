var Power = function(game, x, y, key, functionality){
	Phaser.Sprite.call(this, game, x, y, key);
	this.functionality = functionality;
}

Power.prototype.constructor = Power;
Power.prototype = Object.create(Phaser.Sprite.prototype);

Power.prototype.activateFunctionality = function(){
	this.functionality();
}
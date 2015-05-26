var Power = function(game, x, y, key, frame, functionality, backFunctionality){
	
	if(!frame)
		Phaser.Sprite.call(this, game, x, y, key);
	else
		Phaser.Sprite.call(this, game, x, y, key, frame);
		
	this.functionality = functionality;
	this.backFunctionality = backFunctionality;
}

Power.prototype.constructor = Power;
Power.prototype = Object.create(Phaser.Sprite.prototype);

Power.prototype.activateFunctionality = function(){
	this.functionality();
}

Power.prototype.backFunctionality = function(){
	this.backFunctionality();
}
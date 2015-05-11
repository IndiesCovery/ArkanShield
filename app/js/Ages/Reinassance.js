Reinassance = function(){
	this.bricks = game.add.group();
	this.bricks.enableBody = true;
	this.bricks.physicsBodyType = Phaser.Physics.ARCADE;
	this.done = false;

	this.fillBricksList();
}

Reinassance.prototype.fillBricksList = function(){

		for(var i = 0; i < 16; i++){	
			for(var j = 0; j < 6; j++){ 		 
		 		 var brick = new Brick(game, (i+1)*50, (j+1)*50, 'brickRenaissance'+(Math.floor(Math.random()*5+1)));
		 		 this.bricks.add(brick);
	 			 brick.body.immovable = true;
		 		 brick.body.bounce.set(0);
	 		}
	 	}
}

Reinassance.prototype.hitBrickBall  = function(_ball, _brick){
	_brick.kill();
}

Reinassance.prototype.update = function(){
	if(this.bricks.countLiving() == 0) this.done = true;
	game.physics.arcade.collide( ball, this.bricks, this.hitBrickBall, null, this);
}



Reinassance.prototype.render = function(){}

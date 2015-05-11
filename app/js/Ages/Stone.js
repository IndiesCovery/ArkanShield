Stone = function(){

	this.bricks = game.add.group();
	this.bricks.enableBody = true;
	this.bricks.physicsBodyType = Phaser.Physics.ARCADE;
	this.done = false;

	this.fillBricksList();
}

Stone.prototype.fillBricksList = function(){

		for(var i = 0; i < 14; i++){	
			for(var j = 0; j < 6; j++){ 		 
		 		 var brick = new Brick(game, (i+1)*50, (j+1)*50, 'brickStone'+(Math.floor(Math.random()*4+1)));
		 		 this.bricks.add(brick);
	 			 brick.body.immovable = true;
		 		 brick.body.bounce.set(0);	
	 		 } 
 		}
}

Stone.prototype.hitBrickBall  = function(_ball, _brick){
	_brick.kill();
}

Stone.prototype.update = function(){
	if(this.bricks.countLiving() == 0) this.done = true;
	game.physics.arcade.collide(ball, this.bricks, this.hitBrickBall, null, this);
}

Future = function(){
	this.bricks = game.add.group();
	this.bricks.enableBody = true;
	this.bricks.physicsBodyType = Phaser.Physics.ARCADE;
	this.done = false;
	
	for(var i = 1; i< 4; i++)
		game.load.image('brickFuture'+i, 'assets/images/BlockFuture_0'+i+'.png');

	this.fillBricksList();
}

Future.prototype.fillBricksList = function(){

		for(var i = 0; i < 30; i++){	 		 
	 		 var brick = new Brick(game, game.world.randomX, game.world.randomY, 'brickFuture'+Math.floor(Math.random()*3));
	 		 brick.body.immovable = true;
	 		 brick.body.bounce.set(0);
	 		 this.bricks.add(brick);
 		}
}

Future.prototype.hitBrickBall  = function(_brick, _ball){
	_brick.kill();
}

Future.prototype.upload = function(){
	if(bricks.length == 0) this.done = true;
	game.physics.arcade.collide(this.bricks, ball, this.hitBrickBall, null, this);
}


Future.prototype.render = function(){}

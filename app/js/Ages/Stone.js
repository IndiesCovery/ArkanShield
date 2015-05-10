Stone = function(){

	this.bricks = game.add.group();
	this.bricks.enableBody = true;
	this.bricks.physicsBodyType = Phaser.Physics.ARCADE;
	this.done = false;

	for(var i = 0; i < 4; i++)
		this.game.load.image('brickStone'+i, 'assets/images/BlockStone_0'+i+'.png');

	this.fillBricksList();
}

Stone.prototype.fillBricksList = function(){

		for(var i = 0; i < 30; i++){	 		 
	 		 var brick = new Brick(game, game.world.randomX, game.world.randomY, 'brickStone'+Math.floor(Math.random()*3));
	 		 brick.body.immovable = true;
	 		 brick.body.bounce.set(0);
	 		 this.bricks.add(brick);
 		}
}

Stone.prototype.hitBrickBall  = function(_brick, _ball){
	_brick.kill();
}

Stone.prototype.upload = function(){
	if(bricks.length == 0) this.done = true;
	game.physics.arcade.collide(this.bricks, ball, this.hitBrickBall, null, this);
}

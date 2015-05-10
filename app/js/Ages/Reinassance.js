Reinassance = function(){
	this.bricks = game.add.group();
	this.bricks.enableBody = true;
	this.bricks.physicsBodyType = Phaser.Physics.ARCADE;
	this.done = false;

	for(var i = 1; i< 5; i++)
		game.load.image('brickRenaissance'+i, 'assets/images/BlockRenaissance_0'+i+'.png');

	this.fillBricksList();
}

Reinassance.prototype.fillBricksList = function(){

		for(var i = 0; i < 30; i++){	 		 
	 		 var brick = new Brick(game, game.world.randomX, game.world.randomY, 'brickRenaissance'+Math.floor(Math.random()*4));
	 		 brick.body.immovable = true;
	 		 brick.body.bounce.set(0);
	 		 this.bricks.add(brick);
 		}
}

Reinassance.prototype.hitBrickBall  = function(_brick, _ball){
	_brick.kill();
}

Reinassance.prototype.upload = function(){
	if(bricks.length == 0) this.done = true;
	game.physics.arcade.collide(this.bricks, ball, this.hitBrickBall, null, this);
}



Reinassance.prototype.render = function(){}

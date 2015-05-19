var Powers = function(){
	this.powers_from_blocks = [];	
	this.powers_from_ages = [];
	this.activePower = undefined;
	this.createPowers();
}

Powers.prototype.doubleBallPower = {
	functionality: function(){
			var len =  balls.length;
			var ball2;
			if(!ballOnShip){
				for(var i = 0; i < len; i++){
					ball2 = new Ball(game, balls.getAt(i).x, balls.getAt(i).y, 'ball');
					game.add.existing(ball2);
					balls.add(ball2);
					ball2.body.velocity.x = balls.getAt(i).body.velocity.x - 100;
					ball2.body.velocity.y = balls.getAt(i).body.velocity.y;
					ball2.body.bounce.set(1);
	  				ball2.body.collideWorldBounds = true;
	  				ball2._bounds = balls.getAt(i)._bounds;
				}
			}

		},
	key: 'doubleBallPower',
	expirable: true,
	time: 0
}



Powers.prototype.createPowers = function(){
	this.powers_from_blocks.push(this.doubleBallPower);
}

Powers.prototype.createPowerFromBlock = function(x, y){
	var rand_pow = Math.floor(Math.random()*(this.powers_from_blocks.length));
	var power = new Power(game, x, y, this.powers_from_blocks[rand_pow].key, this.powers_from_blocks[rand_pow].functionality);
	powers.add(power);
	power.body.velocity.y = 100;
}

Powers.prototype.getPowerFromAge = function(){}

Powers.prototype.update = function(){
	
	if(this.activePower.expirable){
		this.activePower.time += Phaser.Time.elapsed;
		if(this.activePower.time > 60000){
				this.activePower.kill();		
			}
		}
}
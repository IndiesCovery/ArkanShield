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
	backFunctionality: function(){},
	key: 'lvl_powers',
	frame: 2,
	expirable: false
};

Powers.prototype.strongFastBall = {
	functionality: function(){
		for(var i= 0; i < balls.length; i++){
				balls.getChildAt(i).body.velocity.y = balls.getChildAt(i).body.velocity.y > 0? balls.getChildAt(i).speed.y*2: -balls.getChildAt(i).speed.y*2;
				balls.getChildAt(i).force = 10;
			}
	},
	backFunctionality: function(){
		for(var i = 0; i < balls.length; i++){
			balls.getChildAt(i).body.velocity.y = balls.getChildAt(i).body.velocity.y> 0?balls.getChildAt(i).speed.y:-balls.getChildAt(i).speed.y;
			balls.getChildAt(i).force = 1;
		}
	},
	key: 'lvl_powers',
	frame: 1,
	expirable:true
};

Powers.prototype.slowBall = {
	functionality: function(){
		for(var i = 0; i< balls.length; i++){
			balls.getChildAt(i).body.velocity.y = balls.getChildAt(i).body.velocity.y > 0? balls.getChildAt(i).speed.y / 2: -balls.getChildAt(i).speed.y / 2;		
		}
	},
	backFunctionality: function(){
		for(var i = 0; i< balls.length; i++){
			balls.getChildAt(i).body.velocity.y = balls.getChildAt(i).body.velocity.y > 0? balls.getChildAt(i).speed.y:-balls.getChildAt(i).speed.y;		
		}
	},
	key: 'lvl_powers',
	frame: 0,
	expirable: true
};

Powers.prototype.longShip = {
	functionality: function(){
		ship.getBigger();
	},
	backFunctionality: function(){
		ship.getNormal();
	},
	key: 'lvl_powers',
	frame: 4,
	expirable: true
};

Powers.prototype.smallShip = {
	functionality: function(){
		ship.getSmaller();
	},
	backFunctionality: function(){
		ship.getNormal();
	},
	key: 'lvl_powers',
	frame: 3,
	expirable: true
};

Powers.prototype.createPowers = function(){
	this.powers_from_blocks.push(this.doubleBallPower);
	this.powers_from_blocks.push(this.smallShip);
	this.powers_from_blocks.push(this.longShip);
	this.powers_from_blocks.push(this.slowBall);
	this.powers_from_blocks.push(this.strongFastBall);
}

Powers.prototype.createPowerFromBlock = function(x, y){
	var rand_pow = Math.floor(Math.random()*(this.powers_from_blocks.length));
	var pow = this.powers_from_blocks[rand_pow];
	var power = new Power(game, x, y, pow.key, pow.frame, pow.functionality, pow.backFunctionality);
	power.expirable = pow.expirable;
	power.time = 0;
	powers.add(power);
	power.body.velocity.y = 100;
};

Powers.prototype.getPowerFromAge = function(){}

Powers.prototype.update = function(){

	if(this.activePower != undefined){
		if(this.activePower.expirable){
			this.activePower.time += game.time.elapsed;
			if(this.activePower.time > 40000){
					this.activePower.backFunctionality();
					this.activePower.kill();	
					this.activePower = undefined;	
				}
			}
	}
};
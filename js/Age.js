Age = function(level){
  this.bricks = game.add.group();
  this.bricks.enableBody = true;
  this.bricks.physicsBodyType = Phaser.Physics.ARCADE;
  this.done = false;
  this.fillBricksList(level.spriteSet);
  this.powers_manager = new Powers();
};

Age.prototype.constructor = Age;

Age.prototype.fillBricksList = function(spriteSet){
  limits = {
    top: 3,     // regular 0
    bottom: 15,  // regular 6
    left: 4,    // regular 0
    right: 17   // regular 14
  };
  
  for(var i = limits.left; i < limits.right; i++){  
    for(var j = limits.top; j < limits.bottom; j++){      
      var brick = new Brick(game, (i+1)*34, (j+1)*18, spriteSet.name+(Math.floor(Math.random()*spriteSet.frames+1)));
      this.bricks.add(brick);
      brick.body.immovable = true;
      brick.body.bounce.set(0);
    }
  }
}

Age.prototype.hitBrickBall  = function(_ball, _brick){
  
    _brick.life -= _ball.force;
    console.log(_brick.life);

    if(_brick.life <= 0){
       
      var i = Math.floor(Math.random()*100+1);
      if(i <= 5){
         this.powers_manager.createPowerFromBlock(_brick.x, _brick.y);
      }
      _brick.kill();
    }
}


Age.prototype.hitShipPower = function(_ship, _power){
  _power.activateFunctionality();
  
  if(this.powers_manager.activePower)
     this.powers_manager.activePower.kill();

  this.powers_manager.activePower = _power;
  var _powerArrives = game.add.tween(_power);
       _powerArrives.to({x:745, y:565}, 1000, Phaser.Easing.Bounce.Out);
       //_powerArrives.onComplete.add(firstTween, this);
       _powerArrives.start();
}

Age.prototype.update = function(){

  for(var i = 0; i < powers.length; i++){
    if(!ballOnShip)
      game.physics.arcade.collide(ship, powers.getAt(i), this.hitShipPower, null, this);
  }

  if(this.bricks.countLiving() == 0) this.done = true;
  for(var i = 0; i < balls.length; i++){
    game.physics.arcade.collide(balls.getAt(i), this.bricks, this.hitBrickBall, null, this);
  } 
}

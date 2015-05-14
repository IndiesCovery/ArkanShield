Age = function(level){
  this.bricks = game.add.group();
  this.bricks.enableBody = true;
  this.bricks.physicsBodyType = Phaser.Physics.ARCADE;
  this.done = false;
  this.level = level;
  this.fillBricksList();
  this.powers_manager = new Powers();
};

Age.prototype.constructor = Age;

Age.prototype.applyPattern = function(i, j, pattern){
  // i in columns
  // j in rows
  var row = j%pattern.length; 
  var col = i%pattern[0].length;
  return pattern[row][col] == 1; 
};


Age.prototype.createBrick = function(i, j){
  var brick = new Brick(game, (i+1)*34, (j+1)*18, this.level.spriteSet.name+(Math.floor(Math.random()*this.level.spriteSet.frames+1)));
  this.bricks.add(brick);
  brick.body.immovable = true;
  brick.body.bounce.set(0);
};


Age.prototype.fillBricksList = function(){
  width = 19-Math.round(this.level.width*19/100);
  limits = {
    top: 3,     // regular 0
    bottom: 20,  // regular 6
    left: 2+width/2,    // regular 0
    right: 19-width/2   // regular 14
  };

  
  for(var i = limits.left; i < limits.right; i++){
    for(var j = limits.top; j < limits.bottom; j++){
      if(this.applyPattern(i, j, this.level.pattern)==0){
        continue;
      }
      this.createBrick(i, j);
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

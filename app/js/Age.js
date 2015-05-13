Age = function(theme){
  this.bricks = game.add.group();
  this.bricks.enableBody = true;
  this.bricks.physicsBodyType = Phaser.Physics.ARCADE;
  this.done = false;
  this.fillBricksList(theme.spriteSet, theme.frames);
};

Age.prototype.constructor = Age;

Age.prototype.fillBricksList = function(theme, frames){
  limits = {
    top: 3,     // regular 0
    bottom: 23,  // regular 6
    left: 1,    // regular 0
    right: 21   // regular 14
  };
  
  for(var i = limits.left; i < limits.right; i++){  
    for(var j = limits.top; j < limits.bottom; j++){      
      var brick = new Brick(game, (i+1)*34, (j+1)*18, theme+(Math.floor(Math.random()*frames+1)));
      this.bricks.add(brick);
      brick.body.immovable = true;
      brick.body.bounce.set(0);
    }
  }
}

Age.prototype.hitBrickBall  = function(_ball, _brick){
  _brick.kill();
}

Age.prototype.update = function(){
  if(this.bricks.countLiving() == 0) this.done = true;
  game.physics.arcade.collide(ball, this.bricks, this.hitBrickBall, null, this);
}

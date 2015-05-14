spriteSets = {
  stone: {
    name:'brickStone',
    frames: 4
  },
  renaissance: {
    name:'brickRenaissance',
    frames: 5
  },
  future: {
    name:'brickFuture',
    frames: 3
  }
}

Level = function(params){
  this.shape = params.shape || '';  // regular, square, triangle, circle, another polygon?
  this.size = params.size || ''; // small, normal, big
  this.bricks = params.bricks || 100; // a percentage covering the screen...
  this.durabilityRanges = params.durabilityRanges || [100, 0, 0]; // Three percentages
  this.width = params.width || 100; //percentage
  this.pattern = params.pattern || ''; // one of some different patterns like manga patterns.
  this.timeout = params.timeout || 120; // time in seconds for level
  this.score = params.score || 0; // calculated based on the other attributes
  this.spriteSet = params.spriteSet || spriteSets.stone; // could be for ages
  this.soundSet = params.soundSet || ''; // could be for ages too
  this.music = params.music || ''; // music track for this level
  this.powers = params.powers || []; // available powers for this level
  this.missions = params.missions || []; // available missions for this level
  this.specialBricks = params.specialBricks || []; // list for bricks with special conditions
  this.baseSpeed = params.baseSpeed || 1; // factor for base speed for ball and ship
  this.seed = params.seed || -1;
}

Level.prototype.constructor = Level;

Level.generate = function(seed, params){
  var level = new Level(params||{});
  return level;
};
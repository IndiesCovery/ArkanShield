Level = function(){
  this.shape = '';  // regular, square, triangle, circle, another polygon?
  this.size = ''; // small, normal, big
  this.bricks = 100; // a percentage covering the screen...
  this.durabilityRanges = [100, 0, 0]; // Three percentages
  this.width = 100; //percentage
  this.pattern = ''; // one of some different patterns like manga patterns.
  this.timeout = 120; // time in seconds for level
  this.score = 0; // calculated based on the other attributes
  this.spriteSet = ''; // could be for ages
  this.soundSet = ''; // could be for ages too
  this.music = ''; // music track for this level
  this.powers = []; // available powers for this level
  this.missions = []; // available missions for this level
  this.specialBricks = []; // list for bricks with special conditions
  this.baseSpeed = 1; // factor for base speed for ball and ship
}

Level.prototype = Object.create();
Level.prototype.constructor = Level;
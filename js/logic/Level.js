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
};

PATTERNS = {
  regular: [1],
  diagonal: [
    [1,0],
    [0,1]
  ],
  transversal: [
    [0,1],
    [1,0]
  ],
  columns: [
    [1,0],
    [1,0]
  ], 
  rows: [
    [1,1],
    [0,0]
  ]
};

CONFIGS = {
  shapes: ['regular', 'square', 'triangle', 'circle'],
  sizes: ['small', 'medium', 'large'],
  bricks: [20, 40, 60, 80, 100],
  durabilityRanges: [[100,0,0], [80,20,0], [60,30,10]],
  widths: [50, 80, 100],
  patterns: [PATTERNS.regular, PATTERNS.diagonal, PATTERNS.transversal, PATTERNS.columns, PATTERNS.rows],
  timeouts: [45, 120, 180],
  scores: [20, 50, 100, 200],
  spriteSets: [spriteSets.stone, spriteSets.renaissance, spriteSets.future],
  soundSets: [''],
  music: [''],
  powers: [''],
  missions: [['']],
  specialBricks: [''],
  baseSpeeds: [1, 1.2, 1.5, 2]
};

DIMENSIONS = [CONFIGS.shapes, CONFIGS.sizes, CONFIGS.bricks, CONFIGS.durabilityRanges,
CONFIGS.widths, CONFIGS.patterns, CONFIGS.timeouts, CONFIGS.scores, CONFIGS.spriteSets,
CONFIGS.soundSets, CONFIGS.music, CONFIGS.powers, CONFIGS.missions, CONFIGS.specialBricks,
CONFIGS.baseSpeeds];
NAMES = ['shape', 'size', 'bricks', 'durabilityRanges', 'width', 'pattern', 'timeout',
'score', 'spriteSet', 'soundSet', 'music', 'powers', 'missions', 'specialBricks',
'baseSpeeds'];

totalLevels = 1;
keys = Object.keys(CONFIGS);
for (var i = 0; i < keys.length; i++) {
  totalLevels *= CONFIGS[keys[i]].length;
};
console.log('totalLevels', totalLevels);

Level = function(params){
  this.shape = params.shape || CONFIGS.shapes[0];  // regular, square, triangle, circle, another polygon?
  this.size = params.size || CONFIGS.sizes[1]; // small, normal, big
  this.bricks = params.bricks || CONFIGS.bricks[4]; // a percentage covering the screen...
  this.durabilityRanges = params.durabilityRanges || CONFIGS.durabilityRanges[0]; // Three percentages
  this.width = params.width || CONFIGS.widths[3]; //percentage
  this.pattern = params.pattern || CONFIGS.patterns[0]; // one of some different patterns like manga patterns.
  this.timeout = params.timeout || CONFIGS.timeouts[1]; // time in seconds for level
  this.score = params.score || CONFIGS.scores[0]; // calculated based on the other attributes
  this.spriteSet = params.spriteSet || CONFIGS.spriteSets[2]; // could be for ages
  this.soundSet = params.soundSet || CONFIGS.soundSets[0]; // could be for ages too
  this.music = params.music || CONFIGS.music[0]; // music track for this level
  this.powers = params.powers || CONFIGS.powers[0]; // available powers for this level
  this.missions = params.missions || CONFIGS.missions[0]; // available missions for this level
  this.specialBricks = params.specialBricks || CONFIGS.specialBricks[0]; // list for bricks with special conditions
  this.baseSpeed = params.baseSpeed || CONFIGS.baseSpeeds[0]; // factor for base speed for ball and ship
  this.seed = params.seed || -1;
};

Level.prototype.constructor = Level;

var getParam = function(factor, dimension){
  var length = dimension.length;
  var index = factor%length;
  factor = parseInt(factor/length);
  return [factor, dimension[index]];
};

Level.generate = function(seed, params){
  var factor = seed;
  params = params || {};
  for (var i = 0; i < DIMENSIONS.length; i++) {
    var result = getParam(factor, DIMENSIONS[i]);
    factor = result[0];
    params[NAMES[i]] = params[NAMES[i]] || result[1];
  };
  var level = new Level(params||{});
  return level;
};
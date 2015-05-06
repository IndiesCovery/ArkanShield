
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', {
  preload: preload,
  create: create,
  update: update,
  render:render
});

function preload() {
  game.load.image('screen_border', 'assets/images/screen_border.png');
  game.load.image('ship', 'assets/images/ship.png');
};


function create() {
  game.add.sprite(0, 0, 'screen_border');
  cursors = game.input.keyboard.createCursorKeys();
  ship = game.add.sprite(200, 510, 'ship');
};

function update(){
  if(cursors.left.isDown){
    ship.x -= 4;
  }else if(cursors.right.isDown){
    ship.x += 4;
  }
};

function render() {
  
}
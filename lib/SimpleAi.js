/*
  Simple Ai - Fires at a random valid Coordinate on the board which hasn't yet been hit 
*/

var Board = require('./lib/Board');

function Ai(cfg) {
  this.board = new Board(cfg);
  // directions: 0 up, 1, down, 2 left, 3 right
  this.prevShots = {hit: false, coords:false, direction: 0};
  this.attackMode = 'hunt';
};

Ai.prototype.turn = function(opponent, cb) {
  if (this.attackMode === 'hunt') {
    this.hunt(opponent,cb); 
  } 
  // kill mode not fully implemented yet
  else if (this.attackMode === 'kill') {
    this.hunt(opponent,cb);
    //this.kill(opponent,cb);
  }
}

// TODO: finish to isolate direction of a ship
/*
Ai.prototype.kill = function(opponent,cb) {
  var attack = opponent.attack(coords);
  // coords already been shot at
  if (!attack.unit) {
    this.kill(opponent,cb);
    return;
  }
  // hit a ship
  if (attack.hit) {
    if (attack.destroyed) {
      this.attackMode = 'hunt';
    }
    this.turn(opponent,cb);
    return;  
  }
  // handle a miss
  else {
    cb(false);
  }
  prevShots.coords.push(shotCoord);
  // ship killed, return to hunt mode
  this.previousShot = {hit:false, coords:false, direction: 0};
}
*/

Ai.prototype.humanizeCoordArray = function(coords) {
  var alphaMap = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return alphaMap.substr(coords[0],1) + coords[1];
}

Ai.prototype.hunt = function(opponent,cb) {
  var coords = opponent.randomCoord();
  var attack = opponent.attack(coords);
  console.log('Ai fired at: ' + this.humanizeCoordArray(coords));
  if (!attack.valid) {
      this.turn(opponent,cb);
      return;
  }
  // handle a successful hit
  else if (attack.hit) {
    console.log("Ai made a direct hit!");
    // notify sinking of ship
    if (attack.destroyed) {
      console.log("Ai sunk your " + attack.shipType);
    }
    // notify of victory
    if (attack.victory) {
      console.log("Ai wiped out your fleet!");
      cb(true);
      return;
    }
    // get another turn
    this.previousShot = {hit: true, coords: [coords], direction: 0};
    this.turn(opponent,cb);
    return;
  }
  // handle a miss
  else {
    console.log("Ai Missed!");
    cb(false);
    return;
  }
}

module.exports = Ai;
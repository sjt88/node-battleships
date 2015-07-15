
var Board = require('./lib/Board');
var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function Human(cfg, playername) {
  this.board = new Board(cfg);
  this.playername = playername;
};

Human.prototype.alphaMap = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // used to map letters to X coordinate

// validate input coordinates are: 
// - 2 or 3 chars
// - first is letter
// - 2nd/3rd is parseable as number
// - not out of bounds
Human.prototype.validateInput = function(inputStr) {
  if (typeof inputStr !== 'string') return false;
  if (inputStr.length !== 2 && inputStr.length !== 3) return false;
  var x = inputStr.substr(0,1).toUpperCase();
  var y;
  if (inputStr.length === 3) {
    y = inputStr.substr(1,2);
  }
  else {
    y = inputStr.substr(1,1);
  }
  if (isNaN(parseInt(this.alphaMap.indexOf(x)))) return false;
  if (this.alphaMap.indexOf(x) > (this.board.x -1) ) return false;
  if (y > this.board.y) return false;
  if (parseInt(y) < 1) return false;
  if (isNaN(parseInt(y))) return false;
  return true;
}

// opens prompt for human player to take a turn
Human.prototype.turn = function(opponent, cb, result) {
  var _that = this;
  rl.question("Where shall we fire next captain?\n", function(target) {
    if (target === 'exit') {rl.close(); return;}
    // validate input
    if (!_that.validateInput(target)) {
      console.log("Invalid input, try again");
      _that.turn(opponent,cb);
    }
    // input validated ok
    else {
      var x = _that.alphaMap.indexOf(target.substr(0,1).toUpperCase());
      var y;
      if (target.length === 3) y = target.substr(1,2)
      else y = target.substr(1,1);
      var y = parseInt(y) -1;
      var coord = [x, y];
      var attack = opponent.attack(coord);
      // handle an invalid shot
      if (!attack.valid) {
        // already shot at these coords
        if (!attack.unhit) {
          console.log("You've already attacked those coordinates! Try another...");
          _that.turn(opponent,cb);
          return;
        } 
        // coords out of bounds
        else {
          console.log("Coordinates are invalid");
          _that.turn(opponent,cb);
          return;
        }
      }
      // handle a successful hit
      else if (attack.hit) {
        console.log("Direct hit!");
        // notify sinking of ship
        if (attack.destroyed) {
          console.log("You sunk their " + attack.shipType);
        }
        // notify of victory
        if (attack.victory) {
          console.log("You wiped out your opponents fleet!");
          cb(true);
          return;
        }
        // get another turn
        _that.turn(opponent,cb);
        return;
      }
      // handle a miss
      else {
        console.log("Miss!");
        cb(false);
        return;
      }
    }
  });
};

module.exports = Human;
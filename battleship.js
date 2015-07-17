var util = require('util');
var events = require('events');

var Human = require('./lib/Human');
var Ai = require('./lib/SimpleAi');

// Main game object
function Game(cfg) {
  this.cfg = cfg;
  this.active = false;
  this.turnCount = 0;
  this.players = [];
  for (var i = 0; i < 2; i++) {
    if (cfg.players[i].type === 'human') {
      this.players[i] = new Human(cfg, cfg.players[i].name);
    }
    else {
      this.players[i] = new Ai(cfg);
    }
    this.players[i].name = cfg.players[i].name;
  }
  events.EventEmitter.call(this);
  game = this;

  // turn - invoked at the beginning of each turn
  this.turn = function() {
    console.log(game.players[game.turnCount%2].name + "'s turn");
    // invoke the player turn method from human or ai
    var opponent;
    if (game.turnCount %  2 === 0) {
      opponent = game.players[1].board;
      game.players[0].turn(opponent, game.turnEnd);
    }
    else {
      opponent = game.players[0].board;
      game.players[1].turn(opponent, game.turnEnd);
    }
  };

  // end of turn callback - reports a victory or starts another turn
  this.turnEnd = function(victor) {
    console.log('--------------------');
    if (victor) {
      var victorName = game.players[game.turnCount % 2].name;
      var loserName = game.players[(game.turnCount +1) % 2].name;
      console.log(victorName + ' is the winner!');
    }
    else {
      game.turnCount++;
      game.turn();
    }
  };

  this.start = function() {
    this.turn();
  };

}
util.inherits(Game, events.EventEmitter);


// configure & start the game
var battleship = new Game({
  players: [
    {name:'Player', type: 'human'},
    {name:'Computer', type:'ai'}
  ],
  // ship definitions
  ships: {
    "Battleship": {count: 1, size: 5},
    "Destroyer": {count: 2, size: 4}
  },
  // grid dimensions (max 10)
  x: 10,
  y: 10
});
console.log('--BATTLESHIPS--');
battleship.start();

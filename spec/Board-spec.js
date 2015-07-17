'use strict';

var util = require('util');

describe('Board', function() {
  var Board = require('../lib/Board.js');
  var board, cfg;

  beforeEach(function() {
    cfg = {
      // test players
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
    };
    board = new Board(cfg);
  });



  describe('#generateCoords', function (){
    var coordinates;

    beforeEach(function() {
      coordinates = board.randomCoord();
    });

    it('should return X and Y coordinates', function() {
      expect( Array.isArray(coordinates) ).toBe(true);
      expect( coordinates.length ).toBe(2);
    });

    describe('the returned arrays elements', function () {

      [0,1].forEach(function(key) {

        it('should be whole numbers', function() {
          expect(typeof coordinates[key]).toBe('number');
        });

        it('should be greater than 0', function() {
          spyOn(Math, "random").and.returnValue(0);
          expect(coordinates[key]).not.toBeLessThan(0);
        });

        it('should be less than the maximum width/length of the board', function() {
          spyOn(Math, "random").and.returnValue(10);
          expect(coordinates[key]).not.toBeGreaterThan(cfg.x);
          expect(coordinates[key]).not.toBeGreaterThan(cfg.y);
        });

      });

    });
  });

  describe('#attack', function() {
    var attack, coord;

    beforeEach(function() {
      board.setup();
      coord = [0,0];
    });

    it('should return an object', function() {
      attack = board.attack(coord);
      expect(typeof attack).toBe('object');
    });

    it('should notify the caller if coordinates have been shot at before', function() {
      board.grid[0][0].shot = true;
      attack = board.attack(coord);
      expect(attack.valid).toBe(false);
    });

    describe('when a shot hits a ship', function() {

      beforeEach(function() {
        board.setup();
        coord = [0,0];
        board.grid[0][0].shipId = 0;
        board.grid[0][0].contents = true;
      });

      it('should be able to notify the caller of the hit', function() {
        attack = board.attack(coord);
        expect(attack.hit).toBe(true);
      });

      it('should update the board with the hit', function() {
        attack = board.attack(coord);
        expect(board.grid[0][0].shot).toBe(true);
      });

      it('should reduce that ships number of lives by 1', function() {
        var initialLives = board.ships.byId[0].lives = 5;
        attack = board.attack(coord);
        var updatedLives = board.ships.byId[0].lives;
        expect(updatedLives).toBe(4);
      });

      it('should notify the caller if a ship was sunk and its type', function() {
        board.ships.byId[0].type = 'testship';
        board.ships.byId[0].lives = 1;

        attack = board.attack(coord);
        expect(typeof attack.destroyed).toBe('boolean');
        expect(attack.destroyed).toBe(true);
        expect(typeof attack.shipType).toBe('string');
        expect(attack.shipType).toBe('testship');
      });

    });

    describe('when a shot is a miss', function() {
      beforeEach(function() {
        board.setup();
        coord = [0,0];
        board.grid[0][0].contents = false;
      });

      it('should notify the caller of the miss', function() {
        attack = board.attack(coord);
        expect(typeof attack.hit).toBe('boolean');
        expect(attack.hit).toBe(false);
      });

    });
  });

  describe('#placeShip', function() {
    it('should place a ship on the board', function() {

    });

    it('should place a ship horizontally or vertically', function() {

    });

    it('should only place a ship in a valid location', function() {

    });

    it('should update the number of ships added to the board', function() {

    });

  });

  describe('#getArrayFromDirection', function() {
    it('should return all board square data in a given direction', function() {

    });
  });

});
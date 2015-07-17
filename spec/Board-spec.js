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
      coord = [0,0];
      attack = board.attack(coord);
    });

    it('should return an object', function() {
      expect(typeof attack).toBe('object');
    });

    describe('when a shot is a hit', function() {
      describe('the returned object', function() {
        it('should notify of the hit', function() {

        });

        it('should notify if a ship has been sunk', function() {

        });

        it('should update the board with the hit', function() {

        });

      });
    });

    describe('when a shot is a miss', function() {
      describe('the returned object', function() {
        it('should notify of the miss', function() {

        });
      })
    });

    describe('when shooting a previously hit coordinate', function() {
      describe('the returned object', function() {
        it('should notify these coordinates aren not valid', function() {

        });
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
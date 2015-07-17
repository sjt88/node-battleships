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

    it('should return an array containing two elements', function() {
      expect( Array.isArray(coordinates) ).toBe(true);
      expect( coordinates.length ).toBe(2);
    });

    describe('the returned arrays elements', function () {

      [0,1].forEach(function(key) {

        it('should be numbers', function() {
          expect(typeof coordinates[key]).toBe('number');
        });

        it('should be greater than 0', function() {
          spyOn(Math, "random").and.returnValue(0);
          expect(coordinates[key]).not.toBeLessThan(0);
        });

        it('should be less than cfg.x and cfg.y', function() {
          spyOn(Math, "random").and.returnValue(10);
          expect(coordinates[key]).not.toBeGreaterThan(cfg.x);
          expect(coordinates[key]).not.toBeGreaterThan(cfg.y);
        });

      });

    });
  });

  xdescribe('#attack', function() {
    var attack, coord;

    beforeEach(function() {
      coord = [0,0];
      attack = board.attack(coord);
    });

    it('should return an object', function() {
      expect(typeof attack).toBe('object');
    });

    describe('when a shot hits', function() {

      beforeEach(function() {

      });

    });

  });

});
var i = 0;
var i = 0;
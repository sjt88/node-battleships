function Square() {}
Square.prototype.contents = false;
Square.prototype.shot = false;


function Board(cfg){
  this.x = cfg.x;
  this.y = cfg.y;
  this.grid = [];
  this.ships = {
    aliveCount: 0,
    count: 0,
    byId: [],
    byType: cfg.ships
  };
  this.setup();
}

// generates a random [x,y] coordinate array
// always rolls coordinates which are within board boundarys
Board.prototype.randomCoord = function() {
  var that = this;
  // limit = highest random int
  function rand(limit) {
    return Math.floor(Math.random() * limit);
  }
  return [rand(that.x), rand(that.y)];
};

// attempt to shoot at a coordinate on this board
Board.prototype.attack = function(coord) {
  var response;
  if (this.grid[coord[0]][coord[1]].shot === true) {
    // already hit this coord before
    return {valid: false, unhit: false};
  }
  if (this.grid[coord[0]][coord[1]].contents) {
    // handle hit on unhit coordinate
    this.grid[coord[0]][coord[1]].shot = true;
    var shipId = this.grid[coord[0]][coord[1]].shipId;
    response = {valid: true, hit: true};

    this.ships.byId[shipId].lives--;
    if (this.ships.byId[shipId].lives === 0) {
      // notify of ship death
      response.destroyed = true;
      response.shipType = this.ships.byId[shipId].type;
      this.ships.aliveCount--;
      if (this.ships.aliveCount === 0) response.victory = true;
    }
    return response;
  }
  else {
    // handle miss on unhit coord
    this.grid[coord[0]][coord[1]].shot = true;
    response = {valid: true, hit: false};
    return response;
  }
};

// prints simple output of board
// 0 = water
// # = ship
// X = previously shot square
Board.prototype.print = function() {
  var append;
  var str = "";
  var hr = '------------------------------';
  console.log(hr);
  for(var i = (this.grid.length-1); i > -1; i--) {
    for (var j = 0; j < this.grid.length; j++) {
      if (this.grid[j][i].shot === true) append = 'X';
      else if (this.grid[j][i].contents === false) append = '0';
      else if (this.grid[j][i].contents === true) append = '#';
      str = str + "[" + append + "]";
    }
    console.log(str);
    str = "";
  }
  console.log(hr);
};

// place a ship in a random, valid location on game board
Board.prototype.placeShip = function(shipLength, shipType, shipId) {
  var validPlacement = this.findValidPlacement(shipLength);
  var direction = validPlacement.direction;
  var origin = validPlacement.origin;
  var shipEnd;

  // update ship index
  this.ships.byId.push({
    type: shipType,
    length: shipLength,
    lives: shipLength
  });
  this.ships.aliveCount++;

  var i;
  if (direction === 0) {
    shipEnd = origin[0] + shipLength;
    for (i = origin[0]; i < shipEnd; i++) {
      this.grid[i][origin[1]].contents = true;
      this.grid[i][origin[1]].shipId = this.ships.byId.length-1;
    }
  } else {
    shipEnd = origin[1] + shipLength;
    for (i = origin[1]; i < shipEnd; i++) {
      this.grid[origin[0]][i].contents = true;
      this.grid[origin[0]][i].shipId = this.ships.byId.length-1;
    }
  }
};

// returns a single array from origin coord in the desired direction
Board.prototype.getArrayFromDirection = function(max, direction, origin) {
  var directionArray = [];
  // build from horizontal, else vertical
  var i;
  if (direction === 0) {
    for (i = 0; i < this.x; i++) {
      directionArray.push(this.grid[i][origin[1]]);
    }
  } else {
    for (i = 0; i < this.y; i++) {
      directionArray.push(this.grid[origin[0]][i]);
    }
  }
  return directionArray;
};

// returns a valid coordinate array & direction for ship placement
// ensures ship segments aren't intersecting other ships
Board.prototype.findValidPlacement = function(shipLength) {
  var origin = this.randomCoord(shipLength);
  var direction = Math.floor(Math.random() * 2);
  var max = origin[direction] + shipLength;
  var dirArr = this.getArrayFromDirection(max, direction,origin);

  for (var i = origin[direction]; i < max; i++) {
    if (typeof dirArr[i] !== 'undefined') {
      if (dirArr[i].contents === true) {
        // recurse if placement would overlap other ships
        return this.findValidPlacement(shipLength);
      }
    } else {
      // recurse if placement would be off the game board
      return this.findValidPlacement(shipLength);
    }
  }
  // ship can be placed
  return {origin:origin, direction:direction};
};



Board.prototype.setup = function() {
  // fill the board with "water"
  for (var i = 0; i < this.x; i++) {
    this.grid[i] = [];
    for (var j = 0; j < this.y; j++) {
      this.grid[i].push(new Square());
    }
  }

  // add the ships
  for (var type in this.ships.byType) {
    for (var shipIx = 0; shipIx < this.ships.byType[type].count; shipIx++) {
      this.placeShip(this.ships.byType[type].size, type, this.ships.count);
      this.ships.count++;
    }
  }
  //this.print();
};

module.exports = Board;
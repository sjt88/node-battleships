# battleships

A simple game of battleships played against a computer in the terminal

*****
### Install & run


#### NPM

```
$ npm install node-battleships 
$ node node_modules/node-battleships/battleship.js
```

#### Git
```
$ git clone https://github.com/sjt88/node-battleships.git
$ node node-battleships/battleships.js
```

*****
### Gameplay

- You and the computer take turns to fire at coordinates on a 10x10 board.
- You each have 2 Destroyers (4 squares) and 1 Battleship (5 squares).
- Type in a grid coordinate between A1 and J10 to fire at a coordinate.
- When either player scores a hit they get another chance to shoot.
- Hits/Misses/Sinking of ships/Game won/lost will all be reported in the terminal
- Typing exit at any time will end the game.

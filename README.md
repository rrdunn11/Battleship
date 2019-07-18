# Battleship

Battleship is a classic two-player board game. This game is built using React and CSS Grid Layout in the frontend and Node.js and Socket.io in the backend. Once a particular player creates a game, a second player can join the game if given a particular room ID. If there are too many players in the room, the player will be informed and rejected from joining the room. 

There is capability for multiple ongoing games on a single server. Each game state is stored in the server to prevent players from accessing the opponent's grid. The game state is scrubbed accordingly before sending to the client. 

Built-in live-chat functionality is used for communication between the players. Live chat is constructed with React. Any XSS is automatically escaped by ReactDOM.


## Rules
Each player will have their own "ocean" grid and "target" grid, not visible to the opponent's grid set. The players will place 5 ships onto their "ocean" grid. Ships cannot be off the grid or overlap. The gameplay can start once all the ships have been placed. 

Each player takes turns submitting a targetted grid to the opponent. If the grid is a hit, the grid turns red. Otherwise, the grid turns white. A ship sinks after all of the ship's area has been hit. Once all of the ships have been sunk for a particular player, the opponent wins.


## Installation

1. npm install
2. npm run react-dev
3. npm run start
4. http://localhost

BATTLESHIP

Rules:
Grid: 10x10 (1-10, A-J)
The five ships are:
  Carrier, with five holes
  Battleship, with four holes
  Cruiser, with three holes
  Submarine, with three holes
  Destroyer, with two holes
Ships can rotate.
Take turns between P1 and P2. 
Use drag and drop in React. 


Brainstorming:
Client:
  Render the two boards: player and opponent.
  Will need to get board from server.
  Put request each time a ship is placed. 
  Logic needed:
    Rotate ships
    Check if ships are placed on valid spot (inbounds, not on another ship)
    Take turns between the two players
    
Server:
  Store the state of the two boards
  Player board:
    * Ocean / 0
    * Ship (active) / 1
    * Ship (hit) / 2
    * Miss / 3
    
  Oppontent board:
    * Unknown / 0
    * Ship (hit) / 2
    * Miss / 3
  
  Server can filter the information that is sent to the client depending on the Player #.
Database:

Stretch Goals:
Add a chat. 
How to rejoin game if disconnected (tokens).
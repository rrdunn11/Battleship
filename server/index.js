var express = require('express');
var bodyParser = require('body-parser');
var socket = require('socket.io');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
// var items = require('../database-mongo');
var {gameState} = require('./boardStates.js');
var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../react-client/dist'));

var server = app.listen(3000, function() {
  console.log('listening on port 3000!');
});

var io = socket(server);
var rooms = 0;

io.on('connection', function(socket) {
  console.log('Connected', socket.id);

  socket.on('disconnect', function() {
    console.log('User disconnected');
  });
  
  socket.on('createGame', function(data) {
    rooms++;
    socket.join('room-' + rooms);
    gameState['room-' + rooms] = [];
    gameState['room-' + rooms]['P1'] = [
      ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A'],
      ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A'],
      ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A'],
      ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A'],
      ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A'],
      ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A'],
      ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A'],
      ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A'],
      ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A'],
      ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A']
    ];
    socket.emit('newGame', {
      username: data.username, 
      room: 'room-'+rooms, 
      board: gameState['room-' + rooms]['P1']
    });
    });
    
    socket.on('joinGame', function(data) {
      var room = io.nsps['/'].adapter.rooms[data.roomID];
    if (room && room.length === 1) {
      socket.join(data.roomID);
      gameState[data.roomID]['P2'] = [
        ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A'],
        ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A'],
        ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A'],
        ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A'],
        ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A'],
        ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A'],
        ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A'],
        ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A'],
        ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A'],
        ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A']
      ];
      socket.broadcast.to(data.roomID).emit('P1', {message: `${data.username} joined!`});
      socket.emit('P2', { 
        username: data.username, 
        room: 'room-'+rooms, 
        board: gameState['room-' + rooms]['P2']
      });
    } else {
      socket.emit('err', { message: 'Sorry, The room is full!' });
    }
  });

  socket.on('setShips', (data) => {
    gameState[data.room][data.player] = data.playerBoard;
    let opponentBoardCopy = filterOpponentBoard(gameState[data.room][data.player]);
    socket.emit('setPlayerBoard', {
      board: gameState[data.room][data.player]
    });
    socket.broadcast.to(data.room).emit('setOpponentBoard', {
      board: opponentBoardCopy
    })
  });

  socket.on('playTurn', (data) => {
    let row = data.row;
    let col = data.col;
    let player = data.player;
    let opponent;
    if (player === 'P1') {
      opponent = 'P2';
    } else {
      opponent = 'P1';
    }

    if (gameState[data.room][opponent][row][col] === 'B') {
      gameState[data.room][opponent][row][col] ='C';
    } else {
      gameState[data.room][opponent][row][col] ='D';
    }

    let opponentBoard = gameState[data.room][opponent];
    
    let opponentBoardCopy = filterOpponentBoard(opponentBoard);
    let shipCellsLeft = 0;
    for (let i = 0; i < opponentBoard.length; i++) {
      for (let j = 0; j < opponentBoard[i].length; j++) {
        if (opponentBoard[i][j] === 'B') {
          shipCellsLeft++;
        } 
      }
    }
    if (shipCellsLeft === 0) {
      io.in(data.room).emit('winner', {player});
    } else {
      //send original board to opponent after turn
      socket.broadcast.to(data.room).emit('turnPlayedOpponent', {
        board: gameState[data.room][opponent]
      });
      //send filtered board to player after turn
      socket.emit('turnPlayedPlayer', {
        board: opponentBoardCopy
      })
    }
  });

});

const filterOpponentBoard = (opponentBoard) => {
  let opponentBoardCopy = [];
  for (let i = 0; i < opponentBoard.length; i++) {
    let temp = [];
    for (let j = 0; j < opponentBoard[i].length; j++) {
      if (opponentBoard[i][j] === 'B') {
        temp.push('A');
      } else {
        temp.push(opponentBoard[i][j]);
      }
    }
    opponentBoardCopy.push(temp);
  }
  return opponentBoardCopy;
}
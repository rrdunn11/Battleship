import React from 'react';
import ReactDOM from 'react-dom';
import PlayerBoard from './components/PlayerBoard.jsx';
import OpponentBoard from './components/OpponentBoard.jsx';
import StartingScreen from './components/StartingScreen.jsx';
import Chatbox from './components/Chatbox.jsx';
const socket = io.connect(window.location.origin);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: null,
      player: null,
      turn: null,
      roomID: null,
      playerBoard:[],
      opponentBoard: [],
      ships: [{
        name: "Carrier (5)",
        length: 5,
        set: 1
      },
      {
        name: "Battleship (4)",
        length: 4,
        set: 1
      },
      {
        name: "Cruiser (3)",
        length: 3,
        set: 1
      },
      {
        name: "Submarine (3)",
        length: 3,
        set: 1
      },
      {
        name: "Destroyer (2)",
        length: 2,
        set: 1
      }
    ],
    gameStatus: 0,
    message: "",
    chatOutput: [],
    }
    this.setShipAtApp = this.setShipAtApp.bind(this);
    this.setPlayerShips = this.setPlayerShips.bind(this);
    this.onNewGameClick = this.onNewGameClick.bind(this);
    this.onJoinGameClick = this.onJoinGameClick.bind(this);
    this.targetOpponent = this.targetOpponent.bind(this);
    this.chatMessageChange = this.chatMessageChange.bind(this);
    this.sendChatMessage = this.sendChatMessage.bind(this);
  }

  componentDidMount() {
    socket.on('newGame', (data) => {
      console.log(data);
      this.setState({
        username: data.username,
        player: 'P1',
        turn: true,
        gameStatus: this.state.gameStatus + 1,
        playerBoard: data.board,
        roomID: data.room
      });
    });
  
    socket.on('P1', (data) => {
      alert(data.message);
    })
  
    socket.on('P2', (data) => {
      this.setState({
        username: data.username,
        player: 'P2',
        turn: false,
        gameStatus: 1,
        playerBoard: data.board,
        roomID: data.room
      });
    });

    socket.on('setPlayerBoard', (data) => {
      this.setState({
        playerBoard: data.board,
        gameStatus: this.state.gameStatus + 1
      });
    });
  
    socket.on('setOpponentBoard', (data) => {
      this.setState({
        opponentBoard: data.board,
      });
    });

    socket.on('turnPlayedPlayer', (data) => {
      this.setState({
        opponentBoard: data.board,
        turn: !this.state.turn
      });
      if (data.winner) {
        alert(`You are the winner!`);
        socket.emit('endGame');
      }
    });

    socket.on('turnPlayedOpponent', (data) => {
      this.setState({
        playerBoard: data.board,
        turn: !this.state.turn
      });
      if (data.winner) {
        alert(`Your opponent is the winner!`);
      }
    });

    socket.on('receiveChat', (data) => {
      let chatOutputCopy =[];
      for (let i = 0; i < this.state.chatOutput.length; i++) {
        chatOutputCopy[i] = this.state.chatOutput[i].slice()
      }
      chatOutputCopy.push([data.username, data.message]);
      this.setState({
        chatOutput: chatOutputCopy,
        message: ''
      });
    });

    socket.on('err', (data) => {
      console.log(data);
    });
  }

  onNewGameClick(e) {
    e.preventDefault();
    let username = document.getElementById("usernameP1").value;
    if (username) {
      console.log(username)
      socket.emit('createGame', {username});
    } else {
      alert('Please enter a username!');
    }
  }

  onJoinGameClick(e) {
    e.preventDefault();
    let username = document.getElementById("usernameP2").value;
    let roomID = document.getElementById("roomID").value;
    if (username && roomID) {
      socket.emit('joinGame', {username, roomID});
    } else {
      alert('Please enter a username and roomID!')
    }
  }

  setShipAtApp(rowNumb, colNumb, idx, shipHorizontal) {
    let playerBoardCopy = this.state.playerBoard.slice();
    let ship = this.state.ships[idx];
    if (idx === null) {
      alert('Choose a ship!');
    } else if (ship.set === 0) {
      alert('Ship is already placed!');
    } else if (this.checkIfValidShipPlacement(rowNumb, colNumb, ship, shipHorizontal)) {
      if (shipHorizontal ) {
        for (let i = 0; i < ship.length; i++) {
          playerBoardCopy[rowNumb][colNumb+i] = ship.name;
        }
      } else {
        for (let i = 0; i < ship.length; i++) {
          playerBoardCopy[rowNumb+i][colNumb] = ship.name;
        }
      } 
      let shipsCopy = this.state.ships.slice();
      shipsCopy[idx].set--;
      this.setState({
        playerBoard: playerBoardCopy,
        ships: shipsCopy
      });
    } else {
      alert('Not a valid spot!');
    }
  }

  checkIfValidShipPlacement(rowNumb, colNumb, ship, shipHorizontal) {
    if (shipHorizontal) {
      if (colNumb + ship.length > 10) {
        return false;
      }
      for (let i = 0; i < ship.length; i++) {
        if (this.state.playerBoard[rowNumb][colNumb+i].length > 1) {
          return false;
        }
      }
    } else {
      if (rowNumb + ship.length > 10) {
        return false;
      }
      for (let i = 0; i < ship.length; i++) {
        if (this.state.playerBoard[rowNumb+i][colNumb].length > 1) {
          return false;
        }
      }
    }
    return true;
  }

  setPlayerShips(e) {
    e.preventDefault();
    let shipsNotSet = 0;
    for (let i = 0; i < this.state.ships.length; i++) {
      if (this.state.ships[i].set !== 0) {
        shipsNotSet++;
      }
    }
    if (shipsNotSet === 0) {
      socket.emit('setShips', {
        player: this.state.player, 
        room: this.state.roomID, 
        playerBoard: this.state.playerBoard
      });
    } else {
      alert('Please set all ships!');
    }
  }

  targetOpponent(e, row, col) {
    e.preventDefault();
    if (this.state.turn) {
      socket.emit('playTurn', {
        row, 
        col, 
        player: this.state.player, 
        room: this.state.roomID
      });
    } else {
      alert('Not your turn!');
    }
  }

  chatMessageChange(e) {
    e.preventDefault();
    this.setState({
      message: e.target.value
    });
  }

  sendChatMessage(e) {
    e.preventDefault();
    let message = this.state.message;
    let username = this.state.username;
    socket.emit('sendChat', {
      message,
      username
    });
  }

  render () {
    let display;
    if (this.state.gameStatus === 0) {
      display = (
        <StartingScreen 
          onNewGameClick={this.onNewGameClick}
          onJoinGameClick={this.onJoinGameClick}
        />
      )
    } else {
      display = (
        <div id="battleship">
          <div>
            <div>Username: {this.state.username}</div>
            <div>Player: {this.state.player}</div>
            <div>Room: {this.state.roomID}</div>
            <div>Turn: {""+this.state.turn}</div>
            <h2>Your Board</h2>
            <button onClick={(e) => this.setPlayerShips(e)} >Set board!</button>
            <PlayerBoard 
              playerBoard={this.state.playerBoard}
              setShipAtApp={this.setShipAtApp}
              ships={this.state.ships}
              gameStatus={this.state.gameStatus}
            />
            {this.state.gameStatus === 2 ? 
            (<div>
              <h2> Your Opponent's Board</h2>
              <OpponentBoard 
                opponentBoard={this.state.opponentBoard}
                targetOpponent={this.targetOpponent}
              />
            </div>) : null}
          </div>
          <div>
            <Chatbox 
            sendChatMessage={this.sendChatMessage}
            chatMessageChange={this.chatMessageChange}
            chatOutput={this.state.chatOutput}
            message={this.state.message}
            />
          </div>
        </div>
      ) 
    } 

    return (
      <div id="app">
        <h1>Battleboat!</h1>
        {display}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

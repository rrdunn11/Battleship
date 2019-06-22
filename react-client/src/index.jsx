import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import PlayerBoard from './components/PlayerBoard.jsx';
import OpponentBoard from './components/OpponentBoard.jsx';
var socket = io.connect('http://localhost:3000');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      playerBoard:[],
      opponentBoard: [],
      ships: [{
        name: "Carrier",
        length: 5,
        set: 1
      },
      {
        name: "Battleship",
        length: 4,
        set: 1
      },
      {
        name: "Cruiser",
        length: 3,
        set: 1
      },
      {
        name: "Submarine",
        length: 3,
        set: 1
      },
      {
        name: "Destroyer",
        length: 2,
        set: 1
      }
    ],
    gameStatus: 0
    }
    this.setShipAtApp = this.setShipAtApp.bind(this);
    this.toggleNextGameState = this.toggleNextGameState.bind(this);
  }

  componentDidMount() {
    this.setState({
      playerBoard: [
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
      ],
      opponentBoard: [
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
      ]
    });
    // axios.get('/board')
    // .then(response => {
    //   console.log(response)
    //   this.setState({
    //     playerBoard: response.data.playerBoard,
    //     opponentBoard: response.data.opponentBoard
    //   })
    // })
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
          playerBoardCopy[rowNumb][colNumb+i] = 'B';
        }
      } else {
        for (let i = 0; i < ship.length; i++) {
          playerBoardCopy[rowNumb+i][colNumb] = 'B';
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
        if (this.state.playerBoard[rowNumb][colNumb+i] === 'B') {
          return false;
        }
      }
    } else {
      if (rowNumb + ship.length > 10) {
        return false;
      }
      for (let i = 0; i < ship.length; i++) {
        if (this.state.playerBoard[rowNumb+i][colNumb] === 'B') {
          return false;
        }
      }
    }
    return true;
  }

  toggleNextGameState(e) {
    e.preventDefault();
    this.setState({
      gameStatus: this.state.gameStatus + 1
    });
  }

  render () {
    let display;
    if (this.state.gameStatus === 0) {
      display = (
        <div>
          <h2>Your Board</h2>
          <PlayerBoard 
            playerBoard={this.state.playerBoard}
            setShipAtApp={this.setShipAtApp}
            ships={this.state.ships}
          />
        </div>
      ) 
    } else if (this.state.gameStatus === 1) {
      display = (
        <div>
          <h2>Your Board</h2>
          <PlayerBoard 
            playerBoard={this.state.playerBoard}
            setShipAtApp={this.setShipAtApp}
            ships={this.state.ships}
          />
          <h2> Your Opponent's Board</h2>
          <OpponentBoard 
            opponentBoard={this.state.opponentBoard}
          />
        </div>
      )
    }
    return (<div>
      <h1>Battleship!</h1>
      <button onClick={(e) => this.toggleNextGameState(e)} >Start Game!</button>
      {display}
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));


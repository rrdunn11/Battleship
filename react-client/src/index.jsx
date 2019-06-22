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
      opponentBoard: []
    }
  }

  componentDidMount() {
    this.setState({
      playerBoard: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ],
      opponentBoard: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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

  render () {
    return (<div>
      <h1>Battleship!</h1>
      <button>Start Game!</button>
      <PlayerBoard playerBoard={this.state.playerBoard}/>
      <OpponentBoard opponentBoard={this.state.opponentBoard}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));


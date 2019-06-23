import React from 'react';
import Board from './Board.jsx';
import Ships from './Ships.jsx';

class PlayerBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      selectedShip: null,
      shipHorizontal: true
    };
    this.onPlayerShipClick = this.onPlayerShipClick.bind(this);
    this.onPlayerShipSet = this.onPlayerShipSet.bind(this);
    this.changeShipDirection = this.changeShipDirection.bind(this);
  }

  onPlayerShipClick(e, idx) {
    e.preventDefault();
    if (this.props.ships[idx].set === 0) {
      alert('Ship is already placed!')
    } else {
      this.setState({
        selectedShip: idx
      });
    }
  }

  onPlayerShipSet(e, rowNumb, colNumb) {
    e.preventDefault();
    this.props.setShipAtApp(rowNumb, colNumb, this.state.selectedShip, this.state.shipHorizontal);
  }

  changeShipDirection(e) {
    e.preventDefault();
    this.setState({
      shipHorizontal: !this.state.shipHorizontal
    });
  }

  render() {
    return (

        <div id="playerBoard">
          <Board 
            board={this.props.playerBoard}
            onPlayerShipSet={this.onPlayerShipSet}
            gameStatus={this.props.gameStatus}
          />
          <div id="pieces">
            <Ships 
              onPlayerShipClick={this.onPlayerShipClick}
              changeShipDirection={this.changeShipDirection}
              ships={this.props.ships}
              selectedShip={this.state.selectedShip}
              shipHorizontal={this.state.shipHorizontal}
            />
          </div>
        </div>

    )
  }
}

export default PlayerBoard;
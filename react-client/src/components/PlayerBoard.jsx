import React from 'react';
import Row from './Row.jsx';
import Ships from './Ships.jsx';

class PlayerBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      selectedShip: 0,
      shipHorizontal: true
    };
    this.onPlayerShipClick = this.onPlayerShipClick.bind(this);
    this.onPlayerShipSet = this.onPlayerShipSet.bind(this);
  }

  onPlayerShipClick(e, length) {
    e.preventDefault();
    console.log(length);
    this.setState({
      selectedShip: length
    });
  }

  onPlayerShipSet(e, rowNumb, colNumb) {
    e.preventDefault();
    console.log(rowNumb, colNumb);
  }

  changeShipDirection(e) {

  }
  
  render() {
    return (
      <div id="playerBoard">
        <div id="oceanGrid" className="board">
          {this.props.playerBoard.map((row, rowNumb) => {
            return (<Row 
              row={row} 
              rowNumb={rowNumb} 
              onPlayerShipSet={this.onPlayerShipSet} 
              key={"row"+rowNumb}
            />)
          })}
        </div>
        <div id="pieces">
          <Ships onPlayerShipClick={this.onPlayerShipClick}/>
        </div>
      </div>
    )
  }
}

export default PlayerBoard;
import React from 'react';
import Cell from './Cell.jsx';

class Row extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row">
        <div className="rowHeader"><span>{this.props.rowNumb}</span></div>
        {this.props.row.map((cell, colNumb) => {
          return (<Cell 
            cell={cell} 
            rowNumb={this.props.rowNumb} 
            colNumb={colNumb} 
            onPlayerShipSet = {this.props.onPlayerShipSet}
            targetOpponent={this.props.targetOpponent}
            gameStatus={this.props.gameStatus}
            key={"cell"+colNumb}
          />)
        })}
      </div>
    )
  }
}

export default Row;
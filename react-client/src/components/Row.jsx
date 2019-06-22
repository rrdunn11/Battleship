import React from 'react';
import Cell from './Cell.jsx';

class Row extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row">
        <div className="rowHeader">{this.props.rowNumb}</div>
        {this.props.row.map((cell, colNumb) => {
          return (<Cell 
            cell={cell} 
            rowNumb={this.props.rowNumb} 
            colNumb={colNumb} 
            onPlayerShipSet = {this.props.onPlayerShipSet}
            key={"cell"+colNumb}
          />)
        })}
      </div>
    )
  }
}

export default Row;
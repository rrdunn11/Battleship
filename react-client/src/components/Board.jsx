import React from 'react';
import Row from './Row.jsx';

class Board extends React.Component{
  constructor(props) {
    super(props);

  }
  render() {
    let colIdx = [null, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let colHeader = colIdx.map((val, i) => {
      return <div className="colHeader">{val}</div>
    })
    return (
      <div id="oceanGrid" className="board">
        <div className="row">
          {colHeader}
        </div>
        {this.props.board.map((row, rowNumb) => {
          return (<Row 
            row={row} 
            rowNumb={rowNumb} 
            onPlayerShipSet={this.props.onPlayerShipSet} 
            key={"row"+rowNumb}
          />)
        })}
      </div>
    )
  }
} 


export default Board;
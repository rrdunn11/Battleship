import React from 'react';
import Board from './Board.jsx';

class OpponentBoard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="opponentBoard">
        <div id="targetingGrid" className="board">
          <Board 
            board={this.props.opponentBoard}
            targetOpponent={this.props.targetOpponent}
          />

        </div>
      </div>
    )
  }
}

export default OpponentBoard;
import React from 'react';
import Row from './Row.jsx';

class OpponentBoard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="opponentBoard">
        <div id="targetingGrid" className="board">

        </div>
      </div>
    )
  }
}

export default OpponentBoard;
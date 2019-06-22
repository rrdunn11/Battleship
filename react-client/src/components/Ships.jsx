import React from 'react';

const Ships = ({onPlayerShipClick}) => (
  <div id="ships">
    <p className="ship" onClick={(e) => onPlayerShipClick(e, 5)}>Carrier</p>
    <p className="ship" onClick={(e) => onPlayerShipClick(e, 4)}>Battleship</p>
    <p className="ship" onClick={(e) => onPlayerShipClick(e, 3)}>Cruiser</p>
    <p className="ship" onClick={(e) => onPlayerShipClick(e, 3)}>Submarine</p>
    <p className="ship" onClick={(e) => onPlayerShipClick(e, 2)}>Destroyer</p>
    <button>Change ship direction</button>
  </div>
)

export default Ships;
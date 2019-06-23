import React from 'react';
import Ship from './Ship.jsx';

const Ships = ({ships, onPlayerShipClick, changeShipDirection, selectedShip}) => (
  <div id="ships">
    {ships.map((ship, i) => {
      return (<Ship 
        ship={ship}
        onPlayerShipClick={onPlayerShipClick}
        selectedShip={selectedShip}
        i={i}
        key={"ship"+i}
      />)
    })}
    <button onClick={(e) => changeShipDirection(e)}>Change ship direction</button>
  </div>
)

export default Ships;
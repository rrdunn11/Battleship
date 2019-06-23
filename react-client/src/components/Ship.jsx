import React from 'react';

const Ship = ({ship, i, onPlayerShipClick, selectedShip}) => (
  <div id="ship">
    <p 
      className={`ship set${ship.set} selectedShip${selectedShip === i}`} 
      id={`${ship.name}`} 
      onClick={(e) => onPlayerShipClick(e, i)}
    >{ship.name}</p>
  </div>
)

export default Ship;
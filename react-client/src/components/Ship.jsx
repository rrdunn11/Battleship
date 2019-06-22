import React from 'react';

const Ship = ({ship, i, onPlayerShipClick}) => (
  <div id="ship">
    <p 
      className="ship" 
      id={`${ship.name}`} 
      onClick={(e) => onPlayerShipClick(e, i)}
    >{ship.name}</p>
  </div>


)

export default Ship;
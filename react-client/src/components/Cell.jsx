import React from 'react';


const Cell = ({cell, rowNumb, colNumb, onPlayerShipSet}) => (
  <div 
    className={`cell ${cell}`} 
    id={`${rowNumb}, ${colNumb}`}
    onClick={onPlayerShipSet ? (e) => onPlayerShipSet(e, rowNumb, colNumb): null}
    >
    {cell}
  </div>
)

export default Cell;
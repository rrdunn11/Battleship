import React from 'react';


const Cell = ({cell, rowNumb, colNumb, onPlayerShipSet}) => (
  <div 
    className={`cell ${cell}`} 
    id={`${rowNumb}, ${colNumb}`}
    onClick={(e) => onPlayerShipSet(e, rowNumb, colNumb)}
    >
    {cell}
  </div>
)

export default Cell;
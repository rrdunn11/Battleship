import React from 'react';


const Cell = ({cell, rowNumb, colNumb, onPlayerShipSet, targetOpponent}) => (
  <div 
    className={`cell ${cell}`} 
    id={`${rowNumb}, ${colNumb}`}
    onClick={onPlayerShipSet ? (e) => onPlayerShipSet(e, rowNumb, colNumb): (e) => targetOpponent(e, rowNumb, colNumb)}
    >
    {cell}
  </div>
)

export default Cell;
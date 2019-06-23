import React from 'react';


const Cell = ({cell, rowNumb, colNumb, onPlayerShipSet, targetOpponent, gameStatus}) => (
  <div 
    className={`cell ${cell}`} 
    id={`${rowNumb}, ${colNumb}`}
    onClick={gameStatus === 1 ? (e) => onPlayerShipSet(e, rowNumb, colNumb) : onPlayerShipSet ? null : (e) => targetOpponent(e, rowNumb, colNumb)}
    >
    {cell.length > 1 ? cell : null}
  </div>
)

export default Cell;



//onPlayerShipSet ? (e) => onPlayerShipSet(e, rowNumb, colNumb) : (e) => targetOpponent(e, rowNumb, colNumb)
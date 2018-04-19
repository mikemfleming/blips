import React from 'react';

import Cell from './Cell';

const Row = ({ row, currentColumn, toggleCell, playing, toggleCreateMode, createMode, y }) => {
  return (
    <div className="row">
      {
        row.map((cell, x) => (
          <Cell
            cell={cell}
            currentColumn={currentColumn}
            playing={playing}
            toggleCell={toggleCell}
            toggleCreateMode={toggleCreateMode}
            createMode={createMode}
            y={y}
            x={x}
          />
        ))
      }
    </div>
  )
};

export default Row;


import React from 'react';

const Cell = ({
  cell, currentColumn, playing, toggleCell, toggleCreateMode, createMode, x, y,
}) => {
  let classes = 'cell';
  if (cell.status) classes += ' active';
  if (currentColumn === x) classes += ' playing';
  if (!playing) classes += ' pointer';

  return !playing
    ? (<div
      className={classes}
      onTouchStart={toggleCell(x, y)}
      onMouseUp={toggleCreateMode}
      onMouseDown={toggleCreateMode}
      onClick={toggleCell(x, y)}
      onMouseOver={createMode ? toggleCell(x, y) : null}
    />)
    : <div className={classes} />;
};

export default Cell;

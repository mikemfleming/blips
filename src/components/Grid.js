import React from 'react';

import { GridContainer } from '../styles';

const renderCell = ({
  currentColumn, playing, toggleCell, y, toggleCreateMode, createMode,
}) => (cell, x) => {
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

const renderRow = ({
  currentColumn, toggleCell, playing, toggleCreateMode, createMode,
}) => (row, y) => (
  <div className="row">{row.map(renderCell({
 currentColumn, playing, toggleCell, y, toggleCreateMode, createMode,
}))}
  </div>
);

const Grid = ({
  grid, currentColumn, toggleCell, playing, toggleCreateMode, createMode, exitCreateMode,
}) => (
  <GridContainer className="ba bw3" onMouseLeave={exitCreateMode}>
    {grid.map(renderRow({
 currentColumn, playing, toggleCell, toggleCreateMode, createMode,
}))}
  </GridContainer>
);

export default Grid;

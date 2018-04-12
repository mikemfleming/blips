import React from 'react';
import styled from 'styled-components';

const GridContainer = styled.div`
  .row {
    height: 6.25%;
  }
  .cell {
    display: inline-block;
    width: 6.25%;
    height: 100%;
    border: 1px solid white;
    &.active {
      background: #333333;
    }
  }
  .playing { background: #FFFCEB; }
`;

const renderCell = ({ currentColumn, playing, toggleCell, y, toggleCreateMode, createMode }) => (cell, x) => {
  let classes = 'cell';
  if (cell.status) classes += ' active';
  if (currentColumn === x) classes += ' playing';
  if (!playing) classes += ' pointer';

  return !playing
    ? (<div className={classes} 
            onTouchStart={toggleCell(x,y)} 
            onMouseUp={toggleCreateMode} 
            onMouseDown={toggleCreateMode} 
            onClick={toggleCell(x,y)}
            onMouseOver={createMode ? toggleCell(x, y) : null}/>)
    : <div className={classes} />;
};

const renderRow = ({ currentColumn, toggleCell, playing, toggleCreateMode, createMode }) => (row, y) => (
  <div className="row">{row.map(renderCell({ currentColumn, playing, toggleCell, y, toggleCreateMode, createMode }))}</div>
);

const Grid = ({ grid, currentColumn, toggleCell, playing, toggleCreateMode, createMode, exitCreateMode }) => (
  <GridContainer className="w-100-s vh-50" onMouseLeave={exitCreateMode}>
    {grid.map(renderRow({ currentColumn, playing, toggleCell, toggleCreateMode, createMode }))}
  </GridContainer>
);

export default Grid;

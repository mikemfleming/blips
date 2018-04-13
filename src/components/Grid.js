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
    background: #F4F4F4;
    &.active {
      background: #111111;
      &.playing { animation: trip .2s infinite; }
    }
  }
  .playing { background: #EEEEEE; }
  @keyframes trip {
    0% { background-color: #9400D3;  }
    20% { background-color: #0000FF; }
    40% { background-color: #00FF00; }
    60% { background-color: #FFFF00; }
    80% { background-color: #FF7F00; }
    100% { background-color: #FF0000; }
  }
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
  <GridContainer className="ba bw3 w-100-s vh-50" onMouseLeave={exitCreateMode}>
    {grid.map(renderRow({ currentColumn, playing, toggleCell, toggleCreateMode, createMode }))}
  </GridContainer>
);

export default Grid;

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
      background: black;
    }
  }
  .playing { background: #e6fff2; }
`;

const renderCell = ({ currentColumn, playing, toggleCell, y }) => (cell, x) => {
  let classes = 'cell';
  if (cell.status) classes += ' active';
  if (currentColumn === x) classes += ' playing';
  return !playing
    ? <div className={classes} onMouseEnter={toggleCell(x, y)} onClick={toggleCell(x, y)} />
    : <div className={classes} />;
};

const renderRow = ({ currentColumn, toggleCell, playing }) => (row, y) => (
  <div className="row">{row.map(renderCell({ currentColumn, playing, toggleCell, y }))}</div>
);

const Grid = ({ grid, currentColumn, toggleCell, playing }) => (
  <GridContainer className="w-100-s vh-50">
    {grid.map(renderRow({ currentColumn, playing, toggleCell }))}
  </GridContainer>
);

export default Grid;

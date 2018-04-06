import React from 'react';
import styled from 'styled-components';

const GridContainer = styled.div`
  border: 1px solid black;
  .row {
    height: 6.25%;
  }
  .cell {
    display: inline-block;
    width: 6.25%;
    height: 100%;
    &.active {
      background: papayawhip;
    }
    
  }
  .playing { background: #e6fff2; }
`;

const renderCell = ({ currentColumn, toggleCell, y }) => (cell, x) => {
  let classes = 'cell';
  if (cell.status) classes += ' active';
  if (currentColumn === x) classes += ' playing';
  return <div className={classes} onClick={toggleCell(x, y)} />;
};

const renderRow = ({ currentColumn, toggleCell }) => (row, y) => (
  <div className="row">{row.map(renderCell({ currentColumn, toggleCell, y }))}</div>
);

const Grid = ({ grid, currentColumn, toggleCell }) => (
  <GridContainer className="w-100-s vh-50">
    {grid.map(renderRow({ currentColumn, toggleCell }))}
  </GridContainer>
);

export default Grid;

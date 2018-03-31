import React from 'react';
import styled from 'styled-components';

const GridContainer = styled.div`
  margin: auto;
  height: 30rem;
  width: 30rem;
  .row {
    height: 1.5625%;
  }
  .cell {
    display: inline-block;
    width: 1.5625%;
    height: 100%;
    &.active {
      background: papayawhip;
    }
    
  }
  .playing { background: #e6fff2; }
`;

const renderCell = currentColumn => (cell, idx) => {
  let classes = 'cell';
  if (cell) classes += ' active';
  if (currentColumn === idx) classes += ' playing';
  return <div className={classes} />;
};

const renderRow = currentColumn => row => <div className="row">{row.map(renderCell(currentColumn))}</div>;

const Grid = ({ grid, currentColumn }) => (
  <GridContainer>
    {grid.map(renderRow(currentColumn))}
  </GridContainer>
);

export default Grid;

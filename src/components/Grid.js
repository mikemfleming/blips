import React from 'react';
import styled from 'styled-components';

const GridContainer = styled.div`
  margin: auto;
  height: 30rem;
  width: 30rem;
  border-top: 1px solid gray;
  border-left: 1px solid gray;
  .row {
    height: 6.25%;
    border-bottom: 1px solid gray;
  }
  .cell {
    border-right: 1px solid gray;
    display: inline-block;
    width: 6.25%;
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

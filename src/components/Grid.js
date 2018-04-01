import React from 'react';
import styled from 'styled-components';

const GridContainer = styled.div`
  margin: auto;
  height: 30rem;
  width: 30rem;
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

const renderCell = (cell, idx) => {
  let classes = 'cell';
  if (cell.status) classes += ' active';
  // if (currentColumn === idx) classes += ' playing';
  return <div className={classes} />;
};

const renderRow = row => <div className="row">{row.map(renderCell)}</div>;

const Grid = ({ grid }) => (
  <GridContainer>
    {grid.map(renderRow)}
  </GridContainer>
);

export default Grid;

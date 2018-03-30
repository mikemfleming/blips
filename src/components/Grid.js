import React from 'react';
import styled from 'styled-components';

const GridContainer = styled.div`
  margin: auto;
  background: papayawhip;
  height: 30rem;
  width: 30rem;
  .row {
    height: 6.25%;
  }
  .cell {
    display: inline-block;
    width: 6.25%;
    height: 100%;
    &.active {
      background: mediumseagreen;
    }
  }
`;

const renderCell = cell => <div className={`${cell ? 'active' : ''} cell`}></div>;

const renderRow = row => <div className="row">{row.map(renderCell)}</div>;

const Grid = ({ grid }) => {
  return (
    <GridContainer>
      {grid.map(renderRow)}
    </GridContainer>
  )
};

export default Grid;
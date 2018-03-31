import React from 'react';
import styled from 'styled-components';

const GridContainer = styled.div`
  margin: auto;
  height: 30rem;
  width: 30rem;
  border-top: 1px solid black;
  border-left: 1px solid black;
  .row {
    height: 6.25%;
    border-bottom: 1px solid black;
  }
  .cell {
    border-right: 1px solid black;
    display: inline-block;
    width: 6.25%;
    height: 100%;
    &.active {
      background: black;
    }
  }
`;

const renderCell = cell => <div className={`${cell ? 'active' : ''} cell`} />;

const renderRow = row => <div className="row">{row.map(renderCell)}</div>;

const Grid = ({ grid }) => (
  <GridContainer>
    {grid.map(renderRow)}
  </GridContainer>
);

export default Grid;

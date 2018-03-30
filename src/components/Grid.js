import React from 'react';
import styled from 'styled-components';

const GridContainer = styled.div`
  background: papayawhip;
  height: 400px;
  width: 400px;
  .row {
    height: 25px;
    width: 100%;
  }
  .cell {
    display: inline-block;
    width: 25px;
    height: 25px;
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
import React from 'react';
import { Box } from '../styles';
import Row from '../components/Row';


const GridComponent = ({ grid, currentColumn, playing, createMode, toggleCell, toggleCreateMode, exitCreateMode }) => (
  <Box className="ba bw3" onMouseLeave={exitCreateMode}>
    {
      grid.map((row, y) => (
        <Row
          row={row}
          currentColumn={currentColumn}
          playing={playing}
          toggleCell={toggleCell}
          toggleCreateMode={toggleCreateMode}
          createMode={createMode}
          y={y}
        />
      ))
    }
  </Box>
);

export default GridComponent;

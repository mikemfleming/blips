import React from 'react';
import { connect } from 'react-redux';

import Row from '../components/Row';
import { Box } from '../styles';
import {EXIT_CREATE_MODE, TOGGLE_CELL, TOGGLE_CREATE_MODE} from "../constants";

const Grid = ({ grid, currentColumn, playing, createMode, toggleCell, toggleCreateMode, exitCreateMode }) => (
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

const mapStateToProps = state => ({
  grid: state.grid,
  currentColumn: state.currentColumn,
  playing: Boolean(state.interval),
  createMode: state.createMode,
});

const mapDispatchToProps = dispatch => ({
  toggleCell: (x, y) => () => dispatch({ type: TOGGLE_CELL, x, y }),
  toggleCreateMode: () => dispatch({ type: TOGGLE_CREATE_MODE }),
  exitCreateMode: () => dispatch({ type: EXIT_CREATE_MODE }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Grid);

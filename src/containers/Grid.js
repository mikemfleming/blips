import React from 'react';
import { connect } from 'react-redux';

import GridComponent from '../components/Grid';
import Row from '../components/Row';
import { Box } from '../styles';
import {EXIT_CREATE_MODE, TOGGLE_CELL, TOGGLE_CREATE_MODE} from "../constants";

const Grid = ({ grid, currentColumn, playing, createMode, toggleCell, toggleCreateMode, exitCreateMode }) => (
  <GridComponent
    grid={grid}
    currentColumn={currentColumn}
    playing={playing}
    createMode={createMode}
    toggleCell={toggleCell}
    toggleCreateMode={toggleCreateMode}
    exitCreateMode={exitCreateMode}
  />
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

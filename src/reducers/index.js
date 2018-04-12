import { STEP_GRID, START_GAME, STOP_GAME, TOGGLE_CELL, SET_KEY, TOGGLE_CREATE_MODE, EXIT_CREATE_MODE } from '../constants';

import Game from '../../game';

const initialDimensions = { rows: 16, columns: 16 };
const cMajorPentatonic = ['C6', 'A5', 'G5', 'E5', 'D5', 'C5', 'A4', 'G4', 'E4', 'D4', 'C4', 'A3', 'G3', 'E3', 'D3', 'C3'];
const cMinorPentatonic = ['C6', 'A#5', 'G5', 'E#5', 'D#5', 'C5', 'A#4', 'G4', 'E#4', 'D#4', 'C4', 'A#3', 'G3', 'E#3', 'D#3', 'C3'];

const initialState = {
  grid: Game.createGrid(initialDimensions, cMajorPentatonic),
  currentColumn: -1,
  interval: null,
  dimensions: initialDimensions,
  musicBox: {
    keys: [cMajorPentatonic, cMinorPentatonic],
    currentKey: 0,
    currentNotes: [],
  },
  createMode: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        interval: action.interval,
      };
    case STOP_GAME:
      return {
        ...state,
        interval: clearInterval(state.interval),
      };
    case TOGGLE_CELL:
      const newGrid = state.grid.slice();
      newGrid[action.y][action.x].status = state.createMode ? 1 : (state.grid[action.y][action.x].status + 1) % 2;
      return {
        ...state,
        grid: newGrid,
      };
    case STEP_GRID:
      const nextColumn = (state.currentColumn + 1) % state.dimensions.columns;
      const newCurrentNotes = state.currentColumn > -1
        ? state.grid.map(row => row[state.currentColumn]).filter(cell => cell.status).map(c => c.note)
        : [];
      return {
        ...state,
        musicBox: {
          ...state.musicBox,
          currentNotes: newCurrentNotes,
        },
        grid: (nextColumn === 0 && state.currentColumn > 0) ? Game.generateNewGrid(state.grid, state.dimensions, state.musicBox.keys[state.musicBox.currentKey]) : state.grid,
        currentColumn: nextColumn,
      };
    case SET_KEY:
      return {
        ...state,
        musicBox: {
          ...state.musicBox,
          currentKey: action.index,
        },
      };
    case TOGGLE_CREATE_MODE:
      return {
        ...state,
        createMode: !state.createMode,
      };
    case EXIT_CREATE_MODE:
      return {
        ...state,
        createMode: false,
      };
    default:
      return state;
  }
};

export default reducer;

import {
  STEP_GRID,
  START_GAME,
  STOP_GAME,
  TOGGLE_CELL,
  TOGGLE_KEY,
  TOGGLE_CREATE_MODE,
  EXIT_CREATE_MODE,
  RESET,
  TOGGLE_MUTE,
} from '../constants';

import {
  INITIAL_DIMENSIONS,
  MAJOR_PENTATONIC,
  MINOR_PENTATONIC,
} from '../../config/main.config';

import Game from '../../game';

const initialState = {
  grid: Game.createGrid(INITIAL_DIMENSIONS, MAJOR_PENTATONIC),
  currentColumn: -1,
  interval: null,
  dimensions: INITIAL_DIMENSIONS,
  musicBox: {
    keys: [MAJOR_PENTATONIC, MINOR_PENTATONIC],
    currentKey: 0,
    currentNotes: [],
    mute: false,
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
      newGrid[action.y][action.x].status = state.createMode
        ? 1
        : (state.grid[action.y][action.x].status + 1) % 2;
      return {
        ...state,
        grid: newGrid,
      };
    case STEP_GRID:
      const nextColumn = (state.currentColumn + 1) % state.dimensions.columns;
      const newCurrentNotes = state.currentColumn > -1
        ? (state.grid.map(row => row[state.currentColumn])
          .filter(cell => cell.status).map(c => c.note))
        : [];
      return {
        ...state,
        musicBox: {
          ...state.musicBox,
          currentNotes: newCurrentNotes,
        },
        grid: ((nextColumn === 0 && state.currentColumn > 0)
          ? Game.generateNewGrid(state.grid, state.dimensions, state.musicBox.keys[state.musicBox.currentKey])
          : state.grid),
        currentColumn: nextColumn,
      };
    case TOGGLE_KEY:
      return {
        ...state,
        musicBox: {
          ...state.musicBox,
          currentKey: (state.musicBox.currentKey + 1) % state.musicBox.keys.length,
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
    case RESET:
      return {
        ...state,
        grid: Game.createGrid(INITIAL_DIMENSIONS, MAJOR_PENTATONIC),
        currentColumn: -1,
        musicBox: {
          ...state.musicBox,
          currentNotes: [],
        },
      };
    case TOGGLE_MUTE:
      return {
        ...state,
        musicBox: {
          ...state.musicBox,
          mute: !state.musicBox.mute,
        },
      };
    default:
      return state;
  }
};

export default reducer;

import { STEP_GRID, START_GAME, STOP_GAME, TOGGLE_CELL } from '../constants';

import Game from '../../game';

const initialDimensions = { rows: 16, columns: 16 };
const initialNotes = ['C6', 'A5', 'G5', 'E5', 'D5', 'C5', 'A4', 'G4', 'E4', 'D4', 'C4', 'A3', 'G3', 'E3', 'D3', 'C3'];

const initialState = {
  grid: Game.createGrid(initialDimensions, initialNotes),
  currentColumn: -1,
  interval: null,
  dimensions: initialDimensions,
  musicBox: {
    set: [initialNotes],
    get notes() { return this.set[this.current]; },
    current: 0,
  }
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
      newGrid[action.y][action.x].status = (state.grid[action.y][action.x].status + 1) % 2;
      return {
        ...state,
        grid: newGrid,
      };
    case STEP_GRID:
      const nextColumn = (state.currentColumn + 1) % state.dimensions.columns;
      return {
        ...state,
        grid: (nextColumn === 0 && state.currentColumn > 0) ? Game.generateNewGrid(state.grid, state.dimensions, state.musicBox.notes) : state.grid,
        currentColumn: nextColumn,
      };
    default:
      return state;
  }
};

export default reducer;

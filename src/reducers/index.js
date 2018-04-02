import { STEP_GRID, START_GAME, STOP_GAME, TOGGLE_CELL } from '../constants';
import { COLUMNS, ROWS, NOTES } from '../../config/main.config';

const createGrid = () => {
  const generateCell = idx => ({ age: 0, status: 0, note: NOTES[idx % NOTES.length] });
  const grid = [];
  for (let y = 0; y < ROWS; y += 1) {
    const row = [];
    for (let x = 0; x < COLUMNS; x += 1) {
      row.push(generateCell(y));
    }
    grid.push(row);
  }
  return grid;
};

const countNeighbors = (grid, coords) => {
  let sum = 0 - grid[coords.y][coords.x].status;
  for (let y = -1; y < 2; y += 1) {
    for (let x = -1; x < 2; x += 1) {
      sum += grid[(y + coords.y + COLUMNS) % COLUMNS][(x + coords.x + ROWS) % ROWS].status;
    }
  }
  return sum;
};

const generateNewGrid = (oldGrid) => {
  const grid = [];
  for (let y = 0; y < ROWS; y += 1) {
    const row = [];
    for (let x = 0; x < COLUMNS; x += 1) {
      const neighbors = countNeighbors(oldGrid, { x, y });
      const oldCell = oldGrid[y][x];
      const newCell = {
        ...oldCell,
        age: oldCell.age + 1,
        status: neighbors === 3 ? 1 : 0,
      };
      row.push(newCell);
    }
    grid.push(row);
  }
  return grid;
};

const initialState = {
  grid: createGrid(),
  currentColumn: -1,
  interval: null,
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
      newGrid[action.y][action.x].status = (state.grid[action.y][action.x].status + 1) % 2
      console.log(newGrid[action.y][action.x])
      return {
        ...state,
        grid: newGrid,
      };
    case STEP_GRID:
      const nextColumn = (state.currentColumn + 1) % COLUMNS;
      return {
        ...state,
        grid: (nextColumn === 0 && state.currentColumn > 0) ? generateNewGrid(state.grid) : state.grid,
        currentColumn: nextColumn,
      };
    default:
      return state;
  }
};

export default reducer;

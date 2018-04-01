import { STEP_GRID, START_GAME, STOP_GAME } from '../constants';
import { COLUMNS, ROWS } from '../../config/main.config';

// const notes = ['C4', 'E4', 'G4', 'C5', 'E5', 'G5'];
const notes = ['C6', 'A5', 'G5', 'E5', 'D5', 'C5', 'A4', 'G4', 'E4', 'D4', 'C4', 'A3', 'G3', 'E3', 'D3', 'C3'];
// const notes = [ 'C8', 'A7', 'G7', 'E7', 'D7', 'C7', 'A6', 'G6', 'E6', 'D6', 'C6', 'A5', 'G5', 'E5', 'D5', 
//                 'C5', 'A4', 'G4', 'E4', 'D4', 'C4', 'A3', 'G3', 'E3', 'D3', 'C3', 'A2', 'G2', 'E2', 'D2'];


const createGrid = () => {
  const generateCell = idx => ({ age: 0, status: Math.floor(Math.random() * 2), note: notes[idx % notes.length] });
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

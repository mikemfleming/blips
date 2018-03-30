
import { STEP_GRID, RESET_GRID } from '../constants';

const columns = 16;
const rows = 16;

const createGrid = (seed) => {
  const grid = [];
  for (let y = 0; y < rows; y +=1) {
    const row = [];
    for (let x = 0; x < columns; x +=1) {
      row.push(seed());
    }
    grid.push(row);
  }
  return grid;
};

const countNeighbors = (grid, coords) => {
  let sum = 0 - grid[coords.y][coords.x];
  for (let y = -1; y < 2; y += 1) {
    for (let x = -1; x < 2; x += 1) {
      sum += grid[(y + coords.y + columns) % columns][(x + coords.x + rows) % rows];
    }
  }
  return sum;
};

const generateNewGrid = (oldGrid) => {
  const grid = [];
  for (let y = 0; y < rows; y +=1) {
    const row = [];
    for (let x = 0; x < columns; x +=1) {
      let neighbors = countNeighbors(oldGrid, { x, y });
      const cell = neighbors === 3 ? 1 : 0;
      row.push(cell);
    }
    grid.push(row);
  }
  return grid;
};

const randomBinary = () => Math.floor(Math.random() * 2);

const initialState = {
  grid: createGrid(randomBinary),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STEP_GRID:
      return {
        grid: generateNewGrid(state.grid),
      };
    case RESET_GRID:
      return {
        grid: createGrid(() => 0),
      };
    default:
      return state;
  }
};

export default reducer;


const countNeighbors = (grid, coords, dimensions) => {
  const { rows, columns } = dimensions;
  let sum = 0 - grid[coords.y][coords.x].status;
  for (let y = -1; y < 2; y += 1) {
    for (let x = -1; x < 2; x += 1) {
      sum += grid[(y + coords.y + columns) % columns][(x + coords.x + rows) % rows].status;
    }
  }
  return sum;
};

exports.createGrid = (dimensions, notes) => {
  const { rows, columns } = dimensions;
  const generateCell = idx => ({ age: 0, status: 0, note: notes[idx % notes.length] });
  const grid = [];
  for (let y = 0; y < rows; y += 1) {
    const row = [];
    for (let x = 0; x < columns; x += 1) {
      row.push(generateCell(y));
    }
    grid.push(row);
  }
  return grid;
};

// Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
// Any live cell with two or three live neighbours lives on to the next generation.
// Any live cell with more than three live neighbours dies, as if by overpopulation.
// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
exports.generateNewGrid = (oldGrid, dimensions, notes) => {
  const { rows, columns } = dimensions;
  const grid = [];
  for (let y = 0; y < rows; y += 1) {
    const row = [];
    for (let x = 0; x < columns; x += 1) {
      const neighbors = countNeighbors(oldGrid, { x, y }, dimensions);
      const oldCell = oldGrid[y][x];

      const newStatus = oldCell.status
        ? (
          neighbors < 2
            ? 0
            : (
              (neighbors === 2 || neighbors === 3)
                ? 1
                : 0
            )
        )
        : neighbors === 3 ? 1 : 0;

      const newCell = {
        ...oldCell,
        age: oldCell.age + 1,
        status: newStatus,
      };
      row.push(newCell);
    }
    grid.push(row);
  }
  return grid;
};

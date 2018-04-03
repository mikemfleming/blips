
module.exports = (() => {
  const { PORT } = process.env;

  const PERIOD_MS = 200; // in ms
  const ROWS = 16;
  const COLUMNS = 16;
  const NOTES = ['C6', 'A5', 'G5', 'E5', 'D5', 'C5', 'A4', 'G4', 'E4', 'D4', 'C4', 'A3', 'G3', 'E3', 'D3', 'C3'];

  return {
    PERIOD_MS,
    ROWS,
    COLUMNS,
    NOTES,
    PORT,
  };
})();
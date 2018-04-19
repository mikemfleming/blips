
module.exports = (() => {
  const { PORT } = process.env;

  const PERIOD_MS = 200; // in ms
  const ROWS = 16;
  const COLUMNS = 16;
  const NOTES = ['C6', 'A5', 'G5', 'E5', 'D5', 'C5', 'A4', 'G4', 'E4', 'D4', 'C4', 'A3', 'G3', 'E3', 'D3', 'C3'];
  const INITIAL_DIMENSIONS = { rows: 16, columns: 16 };
  const MAJOR_PENTATONIC = ['C6', 'A5', 'G5', 'E5', 'D5', 'C5', 'A4', 'G4', 'E4', 'D4', 'C4', 'A3', 'G3', 'E3', 'D3', 'C3'];
  const MINOR_PENTATONIC = ['C6', 'A#5', 'G5', 'E#5', 'D#5', 'C5', 'A#4', 'G4', 'E#4', 'D#4', 'C4', 'A#3', 'G3', 'E#3', 'D#3', 'C3'];

  return {
    PERIOD_MS,
    ROWS,
    COLUMNS,
    NOTES,
    PORT,
    INITIAL_DIMENSIONS,
    MAJOR_PENTATONIC,
    MINOR_PENTATONIC,
  };
})();
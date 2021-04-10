import {
  STEP_GRID,
  START_GAME,
  STOP_GAME,
  TOGGLE_CELL,
  TOGGLE_KEY,
  TOGGLE_SYNTH,
  TOGGLE_CREATE_MODE,
  EXIT_CREATE_MODE,
  RESET,
  TOGGLE_MUTE,
  INITIAL_DIMENSIONS,
  MAJOR_PENTATONIC,
  MINOR_PENTATONIC,
  SYNTH_TYPE
} from '../constants';

// initial state for synth
import StartAudioContext from 'startaudiocontext';
import Tone from 'tone';
const volume = new Tone.Volume(-16);
const createSynth = (choice=0) => {
  const synth = new Tone.PolySynth(16, SYNTH_TYPE[choice]);
  synth.chain(volume, Tone.Master);
  return synth;
};

import Game from '../game';
const initialState = {
  grid: Game.createGrid(INITIAL_DIMENSIONS, MAJOR_PENTATONIC),
  currentColumn: -1,
  interval: null,
  dimensions: INITIAL_DIMENSIONS,
  musicBox: {
    keys: [MAJOR_PENTATONIC, MINOR_PENTATONIC],
    currentKey: 0,
    currentSynth: 0,
    mute: false,
  },
  createMode: false,
};

var synth = createSynth(initialState.musicBox.currentSynth);
volume.mute = false;
StartAudioContext(synth.context, '#root')
  .then(() => console.log('INITIALIZED WEB AUDIO API'))
  .catch(() => console.log('FAILED TO INITIALIZE WEB AUDIO API'));

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
      newGrid[action.y][action.x]= state.createMode
        ? 1
        : (state.grid[action.y][action.x] + 1) % 2;
      return {
        ...state,
        grid: newGrid,
      };
    case STEP_GRID:
      const nextColumn = (state.currentColumn + 1) % state.dimensions.columns;
      const notes = state.grid.map((row, y) => {
        const key = state.musicBox.keys[state.musicBox.currentKey];
        return {
          active: row[state.currentColumn],
          note: key[y % key.length],
        };
      }).filter(blip => blip.active)
      .map(blip => blip.note);

      synth.triggerAttackRelease(notes, 0.2);
      
      return {
        ...state,
        musicBox: {
          ...state.musicBox,
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
    case TOGGLE_SYNTH:
      synth.dispose();
      let synthPreset = (state.musicBox.currentSynth + 1) % SYNTH_TYPE.length;
      synth = createSynth(synthPreset);
      return {
        ...state,
        musicBox: {
          ...state.musicBox, 
          currentSynth: synthPreset,
        }
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
      volume.mute = !state.musicBox.mute;
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

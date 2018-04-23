import styled from 'styled-components';

export const AppContainer = styled.div`
  margin: auto;
  max-width: 40vw;
  font-size: 1.5rem;
  @media (max-width: 960px) {
    max-width: 65vw;
  }
  @media (max-width: 768px) {
    max-width: 90vw;
  }
`;

// from about: pl3 pr3 pt3-l ba bw3
// from grid: ba bw3
export const Box = styled.div`
  height: 40vw;
  @media (max-width: 960px) {
    height: 65vw;
  }
  @media (max-width: 768px) {
    height: 90vw;
  }
  .row {
    height: 6.25%;
  }
  .cell {
    display: inline-block;
    width: 6.25%;
    height: 100%;
    border: 1px solid white;
    background: #F4F4F4;
    &.active {
      background: #111111;
      &.playing { animation: trip .2s infinite; }
    }
  }
  .playing { background: #EEEEEE; }
  @keyframes trip {
    0% { background-color: #9400D3;  }
    20% { background-color: #0000FF; }
    40% { background-color: #00FF00; }
    60% { background-color: #FFFF00; }
    80% { background-color: #FF7F00; }
    100% { background-color: #FF0000; }
  }
`;

export const ControlsContainer = styled.div`
  height: 50%;
  padding-top: .5rem;

  .key-visualizer {
    display: flex;
    align-items: center;
    justify-content: space-around;
    border: .2rem solid #111111;
    width: 6rem;
    height 2rem;
    background: white;

    .bouncey-ball {
      height: 10px;
      width: 10px;
      border-radius: 100%;
      background: #111111;

      &.bouncing {
        &.major { animation: bounce .5s ease-in-out infinite, major-phase .5s ease-in-out infinite; }
        &.minor { animation: bounce .5s ease-in-out infinite, minor-phase .5s ease-in-out infinite; }
        &:nth-child(1) { animation-delay: .1s; }
        &:nth-child(2) { animation-delay: .2s; }
        &:nth-child(3) { animation-delay: .3s; }
        &:nth-child(4) { animation-delay: .4s; }
        &:nth-child(5) { animation-delay: .5s; }
      }
    }

    &:hover { cursor: pointer; }

    &:active {
      background: #111111;

      .bouncey-ball {
        background: #F4F4F4;

        &.bouncing {
          &.major { animation: bounce .5s ease-in-out infinite; }
          &.minor { animation: bounce .5s ease-in-out infinite; }
          &:nth-child(1) { animation-delay: .1s; }
          &:nth-child(2) { animation-delay: .2s; }
          &:nth-child(3) { animation-delay: .3s; }
          &:nth-child(4) { animation-delay: .4s; }
          &:nth-child(5) { animation-delay: .5s; }
        }
      }
    }
  }

  @keyframes bounce {
    25% { transform: translateY(5px); }
    75% { transform: translateY(-5px); }
  }

  @keyframes major-phase {
    0% { background: #FF0000; }
    50% { background: #FF7F00; }
    75% { background: #FFFF00; }
    100% { background: #FF0000; }
  }

  @keyframes minor-phase {
    0% { background: #0000FF; }
    50% { background: #4B0082; }
    75% { background: #9400D3; }
    100% { background: #0000FF; }
  }
`;

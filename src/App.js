import React from 'react';
import './App.scss';
import orderBy from 'lodash.orderby';

const HOLES = [
  { hole: 1, par: 5, index: 11 },
  { hole: 2, par: 3, index: 14 },
  { hole: 3, par: 4, index: 7 },
  { hole: 4, par: 4, index: 12 },
  { hole: 5, par: 4, index: 2 },
  { hole: 6, par: 3, index: 18 },
  { hole: 7, par: 4, index: 6 },
  { hole: 8, par: 4, index: 5 },
  { hole: 9, par: 3, index: 9 },
  { hole: 10, par: 4, index: 3 },
  { hole: 11, par: 3, index: 8 },
  { hole: 12, par: 4, index: 1 },
  { hole: 13, par: 5, index: 16 },
  { hole: 14, par: 4, index: 13 },
  { hole: 15, par: 3, index: 10 },
  { hole: 16, par: 4, index: 4 },
  { hole: 17, par: 4, index: 15 },
  { hole: 18, par: 4, index: 17 },
];

const HANDICAP = 9;

const getRandomHoles = (num, isFront) => {
  const holes = [];
  
  while(holes.length < num) {
    let randomHole = Math.floor(Math.random() * 9);
    if (!isFront) {
      randomHole += 9;
    }
    
    if (!holes.includes(randomHole)) {
      holes.push(randomHole);
    }
  }

  return holes;
}

// Assumes handicap is under 18
const generateMatch = () => {
  const front9 = HOLES.slice(0, 9);
  const back9 = HOLES.slice(9, 18);

  let front9Shots = HANDICAP / 2;
  let back9Shots = HANDICAP / 2;

  if (HANDICAP / 2 % 1 > 0) {
    if (Math.random() > 0.5) {
      front9Shots = HANDICAP / 2 - 0.5;
      back9Shots = HANDICAP / 2 + 0.5
    } else {
      front9Shots = HANDICAP / 2 + 0.5;
      back9Shots = HANDICAP / 2 - 0.5
    }
  }

  const front9HandicapHoles = getRandomHoles(front9Shots, true);
  const back9HandicapHoles = getRandomHoles(back9Shots, false);
  const handicapHoles = front9HandicapHoles.concat(back9HandicapHoles);

  
  return HOLES
    .map((hole, index) => {
      return {
        ...hole,
        handicaped: handicapHoles.includes(index),
      }
    });
}


const getHoleClassName = ({ handicaped, par }) => {
  if (handicaped) {
    return par === 3 ? 'hole handicaped par3' : 'hole handicaped'
  }

  return 'hole';
}


const App = () => (
  <div className='scorecard'> 
    {generateMatch().map((hole, i) => (
      <div key={hole.hole} className={getHoleClassName(hole)}>
        <div className='holeNumber'>{i + 1}</div>
        <div>Par {hole.par}</div>
      </div>
    ))}
  </div>
);

export default App;

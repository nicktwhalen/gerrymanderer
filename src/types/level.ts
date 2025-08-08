import { VoterColor } from './game';

export interface Level {
  id: number;
  districtCount: number;
  districtSize: number;
  targetColor: VoterColor;
  voterGrid: VoterColor[][];
}

export const LEVELS: Level[] = [
  {
    id: 1,
    districtCount: 3,
    districtSize: 3,
    targetColor: 'red',
    voterGrid: [
      ['red', 'blue', 'red'],
      ['blue', 'blue', 'blue'],
      ['red', 'blue', 'red'],
    ],
  },
  {
    id: 2,
    districtCount: 5,
    districtSize: 5,
    targetColor: 'blue',
    voterGrid: [
      ['red', 'red', 'red', 'red', 'red'],
      ['red', 'blue', 'blue', 'red', 'red'],
      ['blue', 'blue', 'blue', 'blue', 'blue'],
      ['red', 'blue', 'blue', 'red', 'red'],
      ['red', 'red', 'red', 'red', 'red'],
    ],
  },
];

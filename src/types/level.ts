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
    districtCount: 3,
    districtSize: 5,
    targetColor: 'blue',
    voterGrid: [
      ['blue', 'red', 'red', 'red', 'blue'],
      ['blue', 'red', 'red', 'red', 'blue'],
      ['blue', 'red', 'red', 'red', 'blue'],
    ],
  },
  {
    id: 3,
    districtCount: 5,
    districtSize: 5,
    targetColor: 'red',
    voterGrid: [
      ['blue', 'blue', 'blue', 'blue', 'blue'],
      ['blue', 'red', 'red', 'blue', 'blue'],
      ['red', 'red', 'red', 'red', 'red'],
      ['blue', 'red', 'red', 'blue', 'blue'],
      ['blue', 'blue', 'blue', 'blue', 'blue'],
    ],
  },
  {
    id: 4,
    districtCount: 5,
    districtSize: 5,
    targetColor: 'blue',
    voterGrid: [
      ['red', 'red', 'red', 'red', 'red'],
      ['blue', 'blue', 'blue', 'blue', 'blue'],
      ['red', 'red', 'red', 'red', 'red'],
      ['blue', 'blue', 'blue', 'blue', 'blue'],
      ['red', 'red', 'red', 'red', 'red'],
    ],
  },
  {
    id: 5,
    districtCount: 5,
    districtSize: 5,
    targetColor: 'red',
    voterGrid: [
      ['red', 'red', 'blue', 'blue', 'blue', 'blue'],
      ['red', 'empty', 'empty', 'blue', 'blue', 'blue'],
      ['blue', 'blue', 'empty', 'red', 'empty', 'blue'],
      ['blue', 'blue', 'red', 'red', 'empty', 'red'],
      ['blue', 'blue', 'blue', 'blue', 'red', 'red'],
    ],
  },
  {
    id: 6,
    districtCount: 5,
    districtSize: 7,
    targetColor: 'blue',
    voterGrid: [
      ['blue', 'red', 'red', 'red', 'red', 'red', 'blue'],
      ['blue', 'red', 'red', 'red', 'red', 'red', 'red'],
      ['blue', 'red', 'red', 'red', 'red', 'red', 'red'],
      ['blue', 'red', 'red', 'red', 'red', 'red', 'red'],
      ['blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue'],
    ],
  },
];

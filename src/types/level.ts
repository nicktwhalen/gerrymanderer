import { VoterType } from './game';

export interface Level {
  id: number;
  districtCount: number;
  districtSize: number;
  voterGrid: VoterType[][];
}

// prettier-ignore
export const LEVELS: Level[] = [
  {
    id: 1,
    districtCount: 3,
    districtSize: 3,
    voterGrid: [
      [VoterType.Us, VoterType.Them, VoterType.Us],
      [VoterType.Them, VoterType.Them, VoterType.Them],
      [VoterType.Us, VoterType.Them, VoterType.Us],
    ],
  },
  {
    id: 2,
    districtCount: 3,
    districtSize: 5,
    voterGrid: [
      [VoterType.Us, VoterType.Them, VoterType.Them, VoterType.Them, VoterType.Us],
      [VoterType.Us, VoterType.Them, VoterType.Them, VoterType.Them, VoterType.Us],
      [VoterType.Us, VoterType.Them, VoterType.Them, VoterType.Them, VoterType.Us],
    ],
  },
  {
    id: 3,
    districtCount: 5,
    districtSize: 5,
    voterGrid: [
      [VoterType.Them, VoterType.Them, VoterType.Them, VoterType.Them, VoterType.Them],
      [VoterType.Them, VoterType.Us, VoterType.Us, VoterType.Them, VoterType.Them],
      [VoterType.Us, VoterType.Us, VoterType.Us, VoterType.Us, VoterType.Us],
      [VoterType.Them, VoterType.Us, VoterType.Us, VoterType.Them, VoterType.Them],
      [VoterType.Them, VoterType.Them, VoterType.Them, VoterType.Them, VoterType.Them],
    ],
  },
  {
    id: 4,
    districtCount: 5,
    districtSize: 5,
    voterGrid: [
      [VoterType.Them, VoterType.Them, VoterType.Them, VoterType.Them, VoterType.Them],
      [VoterType.Us, VoterType.Us, VoterType.Us, VoterType.Us, VoterType.Us],
      [VoterType.Them, VoterType.Them, VoterType.Them, VoterType.Them, VoterType.Them],
      [VoterType.Us, VoterType.Us, VoterType.Us, VoterType.Us, VoterType.Us],
      [VoterType.Them, VoterType.Them, VoterType.Them, VoterType.Them, VoterType.Them],
    ],
  },
  {
    id: 5,
    districtCount: 5,
    districtSize: 5,
    voterGrid: [
      [VoterType.Us, VoterType.Us, VoterType.Them, VoterType.Them, VoterType.Them, VoterType.Them],
      [VoterType.Us, VoterType.Nobody, VoterType.Nobody, VoterType.Them, VoterType.Them, VoterType.Them],
      [VoterType.Them, VoterType.Them, VoterType.Nobody, VoterType.Us, VoterType.Nobody, VoterType.Them],
      [VoterType.Them, VoterType.Them, VoterType.Us, VoterType.Us, VoterType.Nobody, VoterType.Us],
      [VoterType.Them, VoterType.Them, VoterType.Them, VoterType.Them, VoterType.Us, VoterType.Us],
    ],
  },
  {
    id: 6,
    districtCount: 5,
    districtSize: 7,
    voterGrid: [
      [VoterType.Us, VoterType.Them, VoterType.Them, VoterType.Them, VoterType.Them, VoterType.Them, VoterType.Us],
      [VoterType.Us, VoterType.Them, VoterType.Them, VoterType.Them, VoterType.Them, VoterType.Them, VoterType.Them],
      [VoterType.Us, VoterType.Them, VoterType.Them, VoterType.Them, VoterType.Them, VoterType.Them, VoterType.Them],
      [VoterType.Us, VoterType.Them, VoterType.Them, VoterType.Them, VoterType.Them, VoterType.Them, VoterType.Them],
      [VoterType.Us, VoterType.Us, VoterType.Us, VoterType.Us, VoterType.Us, VoterType.Us, VoterType.Us],
    ],
  },
];

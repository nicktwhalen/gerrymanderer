import type { Metadata } from 'next';
import { LEVELS } from '@/types/level';
import Button from '@/components/Button/Button';
import Text from '@/components/Text/Text';
import Definition from '@/components/Definition/Definition';
import ArrowRightIcon from '@/icons/ArrowRightIcon';
import ArrowLeftIcon from '@/icons/ArrowLeftIcon';
import Board from '@/components/Board/Board';
import VoterGrid from '@/components/VoterGrid/VoterGrid';
import VoterButton from '@/components/VoterButton/VoterButton';
import { THEM, US, VoterType } from '@/types/game';

const WIN_STATE_DISTRICTS = [
  [VoterType.Us, VoterType.Them, VoterType.Them, VoterType.Them, VoterType.Us],
  [VoterType.Us, VoterType.Us, VoterType.Them, VoterType.Them, VoterType.Us],
  [VoterType.Us, VoterType.Us, VoterType.Us, VoterType.Us, VoterType.Us],
];

import type { VoterMood } from '@/types/game';

const WIN_STATE_MOODS: VoterMood[][] = [
  ['elated', 'sad', 'sad', 'sad', 'elated'],
  ['elated', 'sad', 'sad', 'sad', 'elated'],
  ['elated', 'sad', 'sad', 'sad', 'elated'],
];

const WIN_STATE_BORDERS = [
  [
    { top: true, left: true, right: true },
    { top: true, bottom: true },
    { top: true },
    { top: true, right: true },
    { top: true, right: true },
  ],
  [
    { left: true },
    { right: true },
    { bottom: true },
    { bottom: true, right: true },
    { right: true },
  ],
  [
    { bottom: true, left: true },
    { bottom: true, right: true },
    { bottom: true },
    { bottom: true },
    { bottom: true, right: true },
  ],
];

export const metadata: Metadata = {
  title: 'The Gerrymanderer: Your mission',
  description:
    'When a minority of voters control the majority of districts, you win!',
};

export default function Mission() {
  return (
    <>
      <Text tag="h2">Your mission</Text>
      <Definition
        term="Gerrymandering"
        pronunciation="/ˈjerēˌmandəriNG/ (noun)"
        definition="The art of drawing districts so that politicians get to choose their voters — rather than the other way around."
      />
      <Board interactive={false} style={{ margin: '-1rem auto -1.5rem' }}>
        <VoterGrid cols={5} rows={3}>
          {LEVELS[1].voterGrid.map((row, rowIndex) =>
            row.map((voter, colIndex) => {
              const color = voter === VoterType.Us ? US : THEM;
              const district =
                WIN_STATE_DISTRICTS[rowIndex][colIndex] === VoterType.Us
                  ? US
                  : THEM;
              const winner = district === US ? US : THEM;
              return (
                <VoterButton
                  key={colIndex}
                  color={color}
                  size={6}
                  borders={WIN_STATE_BORDERS[rowIndex][colIndex]}
                  districtColor={winner}
                  mood={WIN_STATE_MOODS[rowIndex][colIndex]}
                />
              );
            }),
          )}
        </VoterGrid>
      </Board>
      <Text>Win the majority of districts!</Text>
      <div className="flex-center" style={{ marginTop: 'auto' }}>
        <Button href="/districts" ariaLabel="Previous: Districts">
          <ArrowLeftIcon />
        </Button>
        <Text color="white">Page 3 of 3</Text>
        <Button href="/game" ariaLabel="Start game">
          <ArrowRightIcon />
        </Button>
      </div>
    </>
  );
}

import type { Metadata } from 'next';
import { LEVELS } from '@/types/level';
import Button from '@/components/Button/Button';
import Text from '@/components/Text/Text';
import Definition from '@/components/Definition/Definition';
import ArrowRightIcon from '@/icons/ArrowRightIcon';
import ArrowLeftIcon from '@/icons/ArrowLeftIcon';
import Board from '@/components/Board/Board';
import { US, Move } from '@/types/game';

const WINNING_MOVES: Move[] = [
  {
    voters: [
      { row: 0, col: 0 },
      { row: 1, col: 0 },
      { row: 2, col: 0 },
      { row: 1, col: 1 },
      { row: 2, col: 1 },
    ],
  },
  {
    voters: [
      { row: 0, col: 4 },
      { row: 1, col: 4 },
      { row: 2, col: 2 },
      { row: 2, col: 3 },
      { row: 2, col: 4 },
    ],
  },
  {
    voters: [
      { row: 0, col: 1 },
      { row: 0, col: 2 },
      { row: 0, col: 3 },
      { row: 1, col: 2 },
      { row: 1, col: 3 },
    ],
  },
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
      <Board
        interactive={false}
        style={{ marginBottom: '-1.5rem' }}
        moves={WINNING_MOVES}
        initialLevel={LEVELS[2]}
        party={US}
      />
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

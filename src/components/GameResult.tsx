'use client';

import { US } from '@/types/game';
import Text from '@/components/Text/Text';

interface GameResultProps {
  playerWon: boolean;
}

export default function GameResult({ playerWon }: GameResultProps) {
  const capitalize = (str: string): string =>
    str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <>
      {playerWon ? (
        <>
          <Text tag="h2">
            Victory: <span className={`text-${US}`}>{capitalize(US)}</span>{' '}
            wins!
          </Text>
        </>
      ) : (
        <>
          <Text tag="h2">
            Defeat: <span className={`text-${US}`}>{capitalize(US)}</span>{' '}
            loses!
          </Text>
        </>
      )}
    </>
  );
}

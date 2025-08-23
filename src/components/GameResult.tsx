'use client';

import { GameState, US, THEM } from '@/types/game';
import { Level } from '@/types/level';
import GameBoard from '@/components/GameBoard';
import Button from '@/components/Button/Button';
import Text from '@/components/Text/Text';

interface GameResultProps {
  usWins: number;
  themWins: number;
  ties: number;
  playerWon: boolean;
  onNewGame: () => void;
  onNextLevel?: () => void;
  usCount: number;
  themCount: number;
  hasNextLevel: boolean;
  gameState: GameState;
  currentLevel: Level;
  version?: string; // Optional version prop for conditional rendering
}

export default function GameResult({
  playerWon,
  onNewGame,
  onNextLevel,
  hasNextLevel,
  currentLevel,
}: GameResultProps) {
  const capitalize = (str: string): string =>
    str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <>
      {playerWon ? (
        <>
          <Text>
            <h2>
              Victory: <span className={`text-${US}`}>{capitalize(US)}</span>{' '}
              wins!
            </h2>
          </Text>

          <GameBoard />

          <Text>
            <p>
              <span className={`text-${US}`}>{capitalize(US)}</span> wins a
              majority of districts...
            </p>
            <p>
              Even though <span className={`text-${THEM}`}>{THEM}</span> has
              more voters!
            </p>
          </Text>
        </>
      ) : (
        <>
          <Text>
            <h2>
              Defeat: <span className={`text-${US}`}>{capitalize(US)}</span>{' '}
              loses!
            </h2>
          </Text>

          <GameBoard />

          <Text>
            <p>
              <span className={`text-${THEM}`}>{capitalize(THEM)}</span> wins
              the majority of districts.
            </p>
            <p>
              Draw more <span className={`text-${US}`}>{US}</span> districts
              next time!
            </p>
          </Text>
        </>
      )}

      <Button onClick={playerWon && hasNextLevel ? onNextLevel : onNewGame}>
        {playerWon ? (hasNextLevel ? 'Next level' : 'Play again') : 'Try again'}
      </Button>
    </>
  );
}

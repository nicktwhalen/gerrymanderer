'use client';

import { GameState } from '@/types/game';
import { Level } from '@/types/level';
import GameBoard from './GameBoard';
import Button from '@/components/Button/Button';
import Text from './Text/Text';

interface GameResultProps {
  blueWins: number;
  redWins: number;
  ties: number;
  playerWon: boolean;
  onNewGame: () => void;
  onNextLevel?: () => void;
  redCount: number;
  blueCount: number;
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
  // Get target color and opposite color for dynamic copy
  const targetColor = currentLevel.targetColor;
  const otherColor = targetColor === 'blue' ? 'red' : 'blue';

  return (
    <>
      {playerWon ? (
        <>
          <Text>
            <h2>
              Victory:{' '}
              <span className={`text-${targetColor}`}>{targetColor}</span> wins!
            </h2>
          </Text>

          <GameBoard />

          <Text>
            <p>
              <span className={`text-${targetColor}`}>{targetColor}</span> wins
              a majority of districts...
            </p>
            <p>
              Even though{' '}
              <span className={`text-${otherColor}`}>{otherColor}</span> has
              more voters!
            </p>
          </Text>
        </>
      ) : (
        <>
          <Text>
            <h2>
              Defeat:{' '}
              <span className={`text-${targetColor}`}>{targetColor}</span>{' '}
              loses!
            </h2>
          </Text>

          <GameBoard />

          <Text>
            <p>
              <span className={`text-${otherColor}`}>{otherColor}</span> wins
              the majority of districts.
            </p>
            <p>
              Draw more{' '}
              <span className={`text-${targetColor}`}>{targetColor}</span>{' '}
              districts next time!
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

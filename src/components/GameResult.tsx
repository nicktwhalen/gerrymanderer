'use client';

import { useModal } from '@/hooks/useModal';
import { GameState } from '@/types/game';
import { Level } from '@/types/level';
import GameBoardMini from './GameBoardMini';

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

export default function GameResult({ playerWon, onNewGame, onNextLevel, hasNextLevel, gameState, currentLevel, version = '1.0' }: GameResultProps) {
  const { handleBackdropClick, handleModalClick } = useModal(true);

  // Get target color and opposite color for dynamic copy
  const targetColor = currentLevel.targetColor;
  const otherColor = targetColor === 'blue' ? 'red' : 'blue';

  return (
    <div className="modal" onClick={handleBackdropClick}>
      <div className="tile tile-grid-mini" onClick={handleModalClick}>
        <h2>{playerWon ? 'Victory!' : 'Defeat!'}</h2>

        <GameBoardMini />

        {playerWon ? (
          <>
            {/* Victory copy */}
            <p>
              <span className={`text-${targetColor}`}>{targetColor}</span> wins a majority of districts..
            </p>
            <p>
              ..Despite there being more <span className={`text-${otherColor}`}>{otherColor}</span> voters.
            </p>
            <p>You win! Take that, democracy!</p>
          </>
        ) : (
          <>
            {/* Defeat copy */}
            <p>Oh no — democracy prevailed!</p>
            <p>
              <span className={`text-${otherColor}`}>{otherColor}</span> has the majority of voters and districts.
            </p>
            <p>
              You lose! Draw more <span className={`text-${targetColor}`}>{targetColor}</span> districts next time.
            </p>
          </>
        )}

        <button onClick={playerWon && hasNextLevel ? onNextLevel : onNewGame}>{playerWon ? (hasNextLevel ? 'Next level' : 'Play again') : 'Try again'}</button>
      </div>
    </div>
  );
}

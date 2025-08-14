'use client';

import { useModal } from '@/hooks/useModal';
import GameStats from './GameStats';
import { GameState } from '@/types/game';
import { Level } from '@/types/level';

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
}

export default function GameResult({ blueWins, redWins, ties, playerWon, onNewGame, onNextLevel, redCount, blueCount, hasNextLevel, gameState, currentLevel }: GameResultProps) {
  const { handleBackdropClick, handleModalClick } = useModal(true);

  // Get target color and opposite color for dynamic copy
  const targetColor = currentLevel.targetColor;
  const otherColor = targetColor === 'blue' ? 'red' : 'blue';

  return (
    <div
      // className="fixed inset-0 flex items-center justify-center p-4 z-50"
      // style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
      onClick={handleBackdropClick}
    >
      <div
        // className="comic-instructions p-6 max-w-sm w-full text-center"
        onClick={handleModalClick}
      >
        <h2
        // className={`comic-title text-3xl sm:text-4xl mb-2 ${playerWon ? 'text-green-600' : 'text-red-600'}`}
        >
          {playerWon ? 'VICTORY!' : 'DEFEAT!'}
        </h2>

        <div
        // className="mb-6"
        >
          {playerWon ? (
            <>
              {/* Victory copy */}
              <div
              // className="text-lg font-bold"
              >
                {targetColor} wins a majority of districts..
              </div>

              <div
              // className="mb-4 text-sm"
              >
                ..Despite there being more {otherColor} voters.
              </div>
            </>
          ) : (
            <>
              {/* Defeat copy */}
              <div
              // className="text-lg font-bold"
              >
                Oh no — democracy prevailed!
              </div>

              <div
              // className="mb-4 text-sm"
              >
                {otherColor} has the majority of voters and districts.
              </div>
            </>
          )}

          {/* Reuse GameStats component */}
          <GameStats gameState={gameState} />
        </div>

        <div
        // className="mb-3 text-sm"
        >
          {playerWon ? 'You win! Take that, democracy!' : `You lose! Draw more ${targetColor} districts next time.`}
        </div>

        <button
          onClick={playerWon && hasNextLevel ? onNextLevel : onNewGame}
          // className="comic-tile comic-red-tile text-white font-bold px-6 py-3 text-lg hover:scale-105 transition-transform"
        >
          {playerWon ? (hasNextLevel ? 'NEXT LEVEL' : 'PLAY AGAIN') : 'TRY AGAIN'}
        </button>
      </div>
    </div>
  );
}

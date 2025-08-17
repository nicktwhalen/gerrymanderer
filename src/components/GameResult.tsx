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

export default function GameResult({ playerWon, onNewGame, onNextLevel, hasNextLevel, gameState, currentLevel }: GameResultProps) {
  const { handleBackdropClick, handleModalClick } = useModal(true);

  // Get target color and opposite color for dynamic copy
  const targetColor = currentLevel.targetColor;
  const otherColor = targetColor === 'blue' ? 'red' : 'blue';

  return (
    <div className="modal" onClick={handleBackdropClick}>
      <div className="tile" onClick={handleModalClick}>
        <h2>{playerWon ? 'Victory!' : 'Defeat!'}</h2>

        {playerWon ? (
          <>
            {/* Victory copy */}
            <p>{targetColor} wins a majority of districts..</p>
            <p>..Despite there being more {otherColor} voters.</p>
          </>
        ) : (
          <>
            {/* Defeat copy */} <p>Oh no — democracy prevailed!</p>
            <p>{otherColor} has the majority of voters and districts.</p>
          </>
        )}

        {/* Reuse GameStats component */}
        {/* <GameStats gameState={gameState} /> */}

        <p>{playerWon ? 'You win! Take that, democracy!' : `You lose! Draw more ${targetColor} districts next time.`}</p>

        <button onClick={playerWon && hasNextLevel ? onNextLevel : onNewGame}>{playerWon ? (hasNextLevel ? 'NEXT LEVEL' : 'PLAY AGAIN') : 'TRY AGAIN'}</button>
      </div>
    </div>
  );
}

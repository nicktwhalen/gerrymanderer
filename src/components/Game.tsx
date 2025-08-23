'use client';

import { useGame } from '@/context/GameContext';
import { US } from '@/types/game';
import GameBoard from '@/components/GameBoard';
import GameStats from '@/components/GameStats';
import GameResult from '@/components/GameResult';
import Button from '@/components/Button/Button';
import Text from '@/components/Text/Text';
import GameInstructions from './GameInstructions';

export default function Game() {
  const {
    gameState,
    currentLevel,
    gameResult,
    hasNextLevel,
    showGameResult,
    resetGame,
    nextLevel,
  } = useGame();

  return (
    <>
      {gameResult && showGameResult ? (
        <GameResult playerWon={gameResult.playerWon}></GameResult>
      ) : (
        <div className="flex-center">
          <Text>
            <h2>
              Level {currentLevel.id}: Help{' '}
              <span className={`text-${US}`}>{US}</span> win!
            </h2>
          </Text>
          <Button ariaLabel="How to play" href="/voters">
            ?
          </Button>
        </div>
      )}
      <GameBoard />
      <GameStats gameState={gameState} resetGame={resetGame} />
      {gameResult && showGameResult ? (
        <Button
          onClick={gameResult.playerWon && hasNextLevel ? nextLevel : resetGame}
        >
          {gameResult.playerWon
            ? hasNextLevel
              ? 'Next level'
              : 'Play again'
            : 'Try again'}
        </Button>
      ) : (
        <GameInstructions gameState={gameState} />
      )}
    </>
  );
}

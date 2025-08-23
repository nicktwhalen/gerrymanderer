'use client';

import { useGame } from '@/context/GameContext';
import { US } from '@/types/game';
import GameBoard from '@/components/GameBoard';
import GameStats from '@/components/GameStats';
import GameResult from '@/components/GameResult';
import Button from '@/components/Button/Button';
import Text from '@/components/Text/Text';

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
        <GameResult
          usWins={gameResult.usWins}
          themWins={gameResult.themWins}
          ties={gameResult.ties}
          playerWon={gameResult.playerWon}
          onNewGame={resetGame}
          onNextLevel={nextLevel}
          usCount={gameState.usCount}
          themCount={gameState.themCount}
          hasNextLevel={hasNextLevel}
          gameState={gameState}
          currentLevel={currentLevel}
        />
      ) : (
        <>
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
          <GameBoard />
          <GameStats gameState={gameState} resetGame={resetGame} />
        </>
      )}
    </>
  );
}

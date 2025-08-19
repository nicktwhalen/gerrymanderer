'use client';

import { useGame } from '@/context/GameContext';
import GameBoard from './GameBoard';
import GameStats from './GameStats';
import GameResult from './GameResult';
import Button from '@/components/Button/Button';

export default function Game() {
  const { gameState, currentLevel, gameResult, hasNextLevel, showGameResult, resetGame, nextLevel } = useGame();

  return (
    <>
      {gameResult && showGameResult ? (
        <GameResult
          blueWins={gameResult.blueWins}
          redWins={gameResult.redWins}
          ties={gameResult.ties}
          playerWon={gameResult.playerWon}
          onNewGame={resetGame}
          onNextLevel={nextLevel}
          redCount={gameState.redCount}
          blueCount={gameState.blueCount}
          hasNextLevel={hasNextLevel}
          gameState={gameState}
          currentLevel={currentLevel}
        />
      ) : (
        <>
          <div className="flex-center">
            <div className="tile flex-center">
              <h2>
                Level {currentLevel.id}: Help <span className={`team text-${currentLevel.targetColor}`}>{currentLevel.targetColor}</span> win!
              </h2>
            </div>
            <Button ariaLabel="How to play" href="/voters/">
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

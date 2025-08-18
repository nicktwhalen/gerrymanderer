'use client';

import { useGame } from '@/context/GameContext';
import { useIntro } from '@/hooks/useIntro';
import GameBoard from './GameBoard';
import GameStats from './GameStats';
import GameResult from './GameResult';
import ResetIcon from './ResetIcon';

export default function Game() {
  const { gameState, currentLevel, gameResult, hasNextLevel, showGameResult, resetGame, nextLevel } = useGame();
  const { openIntro } = useIntro();

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
            <button className="tutorialButton" aria-label="How to play" onClick={openIntro}>
              ?
            </button>
          </div>
          <GameBoard />
          <div className="flex-center">
            <GameStats gameState={gameState} />
            {true && (
              <button aria-label="Reset board" onClick={resetGame}>
                <ResetIcon />
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
}

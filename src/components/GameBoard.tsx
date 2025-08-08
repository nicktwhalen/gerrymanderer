'use client';

import { useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import { useGameLogic } from '@/hooks/useGameLogic';
import { useInteractionStateMachine } from '@/hooks/useInteractionStateMachine';
import { useTutorial } from '@/hooks/useTutorial';
import { GAME_CONFIG, CSS_CLASSES } from '@/config/constants';
import VoterTile from './VoterTile';
import GameStats from './GameStats';
import GameResult from './GameResult';
import Tutorial from './Tutorial';

export default function GameBoard() {
  const { gameState, currentLevel, gameKey, gameResult, hasNextLevel, showGameResult, resetGame, nextLevel } = useGame();

  const { getTileState, getDistrictForVoter } = useGameLogic();
  const { handleMouseDown, handleMouseEnter, handleMouseUp, handleTouchStart, interactionMode, isInPreviewSelection } = useInteractionStateMachine();
  const { showTutorial, closeTutorial, openTutorial } = useTutorial();

  // Global mouseup listener for the state machine interaction system
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (interactionMode !== 'idle') {
        handleMouseUp();
      }
    };

    const handleGlobalTouchEnd = () => {
      if (interactionMode !== 'idle') {
        handleMouseUp();
      }
    };

    document.addEventListener('mouseup', handleGlobalMouseUp);
    document.addEventListener('touchend', handleGlobalTouchEnd);

    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('touchend', handleGlobalTouchEnd);
    };
  }, [interactionMode, handleMouseUp]);

  return (
    <div className={`${CSS_CLASSES.COMIC.BG} flex flex-col items-center p-2 sm:p-4 min-h-screen`}>
      <h1 className={`${CSS_CLASSES.COMIC.TITLE} text-4xl sm:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4 text-center px-2`}>THE GERRYMANDERER</h1>

      <div className={`${CSS_CLASSES.COMIC.INSTRUCTIONS} mb-3 sm:mb-5 p-2 sm:p-2 max-w-xs sm:max-w-md text-center text-xs sm:text-sm mx-2`}>
        <strong className="text-sm sm:text-base">Level {currentLevel.id}</strong>
        <br />
        Create <u>{currentLevel.districtCount}</u> districts of <u>{currentLevel.districtSize}</u> voters each to make <u>{currentLevel.targetColor}</u> win the majority of districts!
        <div className="flex gap-2 mt-2 justify-between">
          <button onClick={openTutorial} className={`${CSS_CLASSES.COMIC.TILE} ${CSS_CLASSES.COMIC.BLUE_TILE} text-white font-bold px-3 py-1 text-xs hover:scale-105 transition-transform`}>
            TUTORIAL
          </button>
          <button onClick={resetGame} className={`${CSS_CLASSES.COMIC.TILE} ${CSS_CLASSES.COMIC.RED_TILE} text-white font-bold px-3 py-1 text-xs hover:scale-105 transition-transform`}>
            RESET
          </button>
        </div>
      </div>

      <div key={gameKey} className={`${CSS_CLASSES.COMIC.BOARD} grid gap-0 p-3 sm:p-6 max-w-sm sm:max-w-none`} style={{ gridTemplateColumns: `repeat(${currentLevel.voterGrid[0].length}, minmax(0, 1fr))` }}>
        {gameState.board.map((row) =>
          row.map((voter) => {
            const district = getDistrictForVoter(voter.id);
            const districtId = district ? parseInt(district.id.split('-')[1]) : -1;

            const backgroundColor = district && district.isComplete ? GAME_CONFIG.DISTRICT_COLORS[districtId % GAME_CONFIG.DISTRICT_COLORS.length] : 'transparent';

            // Override tile state if voter is in preview selection
            let tileState = getTileState(voter);
            if (isInPreviewSelection(voter.id)) {
              tileState = 'selected';
            }

            return (
              <div key={voter.id} className="p-1" style={{ backgroundColor }} data-voter-id={voter.id}>
                <VoterTile
                  voter={voter}
                  state={tileState}
                  district={district}
                  onMouseDown={(e) => handleMouseDown(voter, e)}
                  onMouseEnter={() => handleMouseEnter(voter)}
                  onTouchStart={(e) => handleTouchStart(voter, e)}
                  currentDistrictVoters={gameState.currentDistrict?.voters || []}
                />
              </div>
            );
          }),
        )}
      </div>

      <GameStats gameState={gameState} />

      {gameResult && showGameResult && (
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
        />
      )}

      {showTutorial && <Tutorial onClose={closeTutorial} />}
    </div>
  );
}

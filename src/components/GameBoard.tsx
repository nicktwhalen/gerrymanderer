'use client';

import { CSSProperties, useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import { useGameLogic } from '@/hooks/useGameLogic';
import { useInteractionStateMachine } from '@/hooks/useInteractionStateMachine';
import { useTutorial } from '@/hooks/useTutorial';
import { useWalkthrough } from '@/hooks/useWalkthrough';
import VoterTile from './VoterTile';
import GameStats from './GameStats';
import GameResult from './GameResult';
import Tutorial from './Tutorial';
import Walkthrough from './Walkthrough';
import { District, Voter } from '@/types/game';

export default function GameBoard({ version = '1.0' }) {
  const { gameState, currentLevel, gameKey, gameResult, hasNextLevel, showGameResult, resetGame, nextLevel } = useGame();

  const { getTileState, getDistrictForVoter, getTileBorders } = useGameLogic();
  const { handleMouseDown, handleMouseEnter, handleMouseUp, handleTouchStart, handleTouchMove, interactionMode, isInPreviewSelection } = useInteractionStateMachine();
  const { showTutorial, closeTutorial, openTutorial } = useTutorial();
  const { showWalkthrough, currentStep, setCurrentStep, openWalkthrough, closeWalkthrough } = useWalkthrough();

  // Auto-start walkthrough for level 1 only after tutorial is dismissed and on fresh start
  useEffect(() => {
    if (version === '2.0') return; // Only run this logic for version 2.0

    // Only show walkthrough if:
    // 1. We're on level 1
    // 2. No tutorial is showing (tutorial takes precedence)
    // 3. No game result is showing
    // 4. Game is in fresh state (no districts created)
    // 5. Walkthrough isn't already showing
    // 6. Add a small delay to ensure tutorial logic has run first
    const timer = setTimeout(() => {
      if (currentLevel.id === 1 && !showTutorial && !showGameResult && gameState.districts.length === 0 && !showWalkthrough) {
        openWalkthrough();
      }
    }, 200); // Small delay to let tutorial initialize first

    return () => clearTimeout(timer);
  }, [currentLevel.id, showTutorial, showGameResult, gameState.districts.length, showWalkthrough, openWalkthrough]);

  // Helper function to check if interaction is allowed during walkthrough
  const isInteractionAllowed = (voter: any) => {
    if (version === '2.0') return true; // Allow all interactions in version 2.0

    if (!showWalkthrough) {
      return true; // Allow all interactions when walkthrough is not active
    }

    if (currentStep === 'step2') {
      // Only allow interaction with top 3 squares (row 0, positions 0, 1, 2)
      const voterPosition = gameState.board.flat().findIndex((v) => v.id === voter.id);
      const row = Math.floor(voterPosition / currentLevel.voterGrid[0].length);
      return row === 0; // Only top row (row 0) is allowed
    }

    if (currentStep === 'step3') {
      return false; // No interactions allowed in step 3
    }

    if (currentStep === 'step4') {
      // Only allow interaction with bottom 3 squares (row 2, positions 6, 7, 8)
      const voterPosition = gameState.board.flat().findIndex((v) => v.id === voter.id);
      const row = Math.floor(voterPosition / currentLevel.voterGrid[0].length);
      return row === 2; // Only bottom row (row 2) is allowed
    }

    if (currentStep === 'step5') {
      // Only allow interaction with middle 3 squares (row 1, positions 3, 4, 5)
      const voterPosition = gameState.board.flat().findIndex((v) => v.id === voter.id);
      const row = Math.floor(voterPosition / currentLevel.voterGrid[0].length);
      return row === 1; // Only middle row (row 1) is allowed
    }

    return true; // Allow all interactions for other steps
  };

  // Global mouseup/touchend/touchmove listener for the state machine interaction system
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (interactionMode !== 'idle') {
        handleMouseUp();
      }
    };

    const handleGlobalTouchEnd = (e: TouchEvent) => {
      if (interactionMode !== 'idle') {
        e.preventDefault();
        handleMouseUp();
      }
    };

    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (interactionMode !== 'idle') {
        e.preventDefault();
        // Create a minimal synthetic event that matches our usage
        const syntheticEvent = {
          preventDefault: () => e.preventDefault(),
          stopPropagation: () => e.stopPropagation(),
          touches: e.touches,
        } as unknown as React.TouchEvent;
        handleTouchMove(syntheticEvent);
      }
    };

    document.addEventListener('mouseup', handleGlobalMouseUp);
    document.addEventListener('touchend', handleGlobalTouchEnd, { passive: false });
    document.addEventListener('touchmove', handleGlobalTouchMove, { passive: false });

    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('touchend', handleGlobalTouchEnd);
      document.removeEventListener('touchmove', handleGlobalTouchMove);
    };
  }, [interactionMode, handleMouseUp, handleTouchMove]);

  const getDistrictBorders = (voter: Voter, district?: District | null) => {
    if (!district) return '';
    const borders = getTileBorders(voter, district);
    if (!borders) return '';
    return Object.entries(borders)
      .map(([side, hasBorder]) => (hasBorder ? `border-${side}` : ''))
      .filter(Boolean)
      .join(' ');
  };

  return (
    <div className={`version-${version}`}>
      <header>
        <h1>
          <span className="the">The</span>
          <span className="gerrymanderer">Gerrymanderer</span>
        </h1>
      </header>

      <main>
        {version === '1.0' ? (
          <div data-instructions className="tile tile-instructions">
            <h2>Level {currentLevel.id}</h2>
            <p>
              Create <u>{currentLevel.districtCount}</u> districts of <u>{currentLevel.districtSize}</u> voters each to make <u>{currentLevel.targetColor}</u> win the majority of districts!
            </p>
            <div className="flex-center">
              <button onClick={showWalkthrough ? undefined : openTutorial}>Tutorial</button>
              <button onClick={showWalkthrough ? undefined : resetGame}>Reset</button>
            </div>
          </div>
        ) : (
          <div className="flex-center">
            <div data-instructions className="tile tile-instructions-v2">
              <h2>Level {currentLevel.id}:</h2>
              <p>
                Make <span className={`team text-${currentLevel.targetColor}`}>{currentLevel.targetColor}</span> win!
              </p>
            </div>
            <button aria-label="How to play" onClick={openTutorial}>
              ?
            </button>
          </div>
        )}

        <div
          key={gameKey}
          data-gameboard
          className="grid tile"
          style={
            {
              '--grid-size': currentLevel.voterGrid[0].length,
            } as CSSProperties
          }
        >
          {gameState.board.map((row) =>
            row.map((voter) => {
              const district = getDistrictForVoter(voter.id);
              const redVotes = district ? district.voters.filter((v) => v.color === 'red').length : 0;
              const blueVotes = district ? district.voters.filter((v) => v.color === 'blue').length : 0;
              const winnerColor = redVotes > blueVotes ? 'red' : blueVotes > redVotes ? 'blue' : undefined;

              // Override tile state if voter is in preview selection
              let tileState = getTileState(voter);
              if (isInPreviewSelection(voter.id)) {
                tileState = 'selected';
              }

              return (
                <div
                  key={voter.id}
                  data-voter-id={voter.id}
                  className={`grid-cell 
                  ${tileState}
                  ${winnerColor ? `winner-${winnerColor}` : ''}
                  ${getDistrictBorders(voter, district || gameState.currentDistrict)}`}
                >
                  <VoterTile
                    voter={voter}
                    state={tileState}
                    district={district}
                    onMouseDown={(e) => (isInteractionAllowed(voter) ? handleMouseDown(voter, e) : undefined)}
                    onMouseEnter={() => (isInteractionAllowed(voter) ? handleMouseEnter(voter) : undefined)}
                    onTouchStart={(e) => (isInteractionAllowed(voter) ? handleTouchStart(voter, e) : undefined)}
                    onTouchMove={handleTouchMove}
                    currentDistrictVoters={gameState.currentDistrict?.voters || []}
                  />
                  <div className="div-border-top" />
                  <div className="div-border-right" />
                  <div className="div-border-bottom" />
                  <div className="div-border-left" />
                </div>
              );
            }),
          )}
        </div>

        <div data-scoreboard>
          <div className="flex-center">
            <GameStats gameState={gameState} version={version} />
            {version === '2.0' && (
              <button aria-label="Reset board" onClick={resetGame}>
                <svg className="resetIcon" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 100 100">
                  <path d="M79,43.7L66.7,59.9L50.5,47.6c-2.2-1.7-2.6-4.8-1-7c1.7-2.2,4.8-2.6,7-1l1.1,0.9c-0.8-1.1-1.8-2-2.9-2.9  c-3.3-2.5-7.4-3.6-11.5-3c-4.1,0.6-7.7,2.7-10.2,6c-2.5,3.3-3.6,7.4-3,11.5s2.7,7.7,6,10.2C41,66,47.6,66.5,53,63.5  c2.4-1.3,5.5-0.5,6.8,2c1.3,2.4,0.5,5.5-2,6.8c-3.8,2.1-8.1,3.2-12.3,3.2c-5.4,0-10.9-1.7-15.4-5.2c-5.4-4.1-8.9-10.1-9.9-16.8  c-0.9-6.7,0.8-13.4,4.9-18.9c8.5-11.2,24.5-13.4,35.7-5c3.7,2.8,6.5,6.5,8.2,10.6l2-2.6c1.7-2.2,4.8-2.6,7-1  C80.2,38.3,80.7,41.5,79,43.7z" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {gameResult && showGameResult && (
          <GameResult
            version={version}
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
        )}
      </main>

      {showTutorial && <Tutorial onClose={closeTutorial} />}
      {showWalkthrough && version === '1.0' && <Walkthrough onClose={closeWalkthrough} levelId={currentLevel.id} currentStep={currentStep} setCurrentStep={setCurrentStep} />}
    </div>
  );
}

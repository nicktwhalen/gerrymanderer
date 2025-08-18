'use client';

import { CSSProperties, useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import { useGameLogic } from '@/hooks/useGameLogic';
import { useInteractionStateMachine } from '@/hooks/useInteractionStateMachine';
import VoterTile from '../VoterTile';
import { District, Voter, Face } from '@/types/game';

export default function GameBoard() {
  const { gameState, currentLevel, gameKey, gameResult } = useGame();

  const { getTileState, getDistrictForVoter, getTileBorders } = useGameLogic();
  const { handleMouseDown, handleMouseEnter, handleMouseUp, handleTouchStart, handleTouchMove, interactionMode, isInPreviewSelection } = useInteractionStateMachine();

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

  const getFace = (voter: Voter, district?: District | null): Face => {
    if (!district) return 'neutral';
    const voterColor = voter.color;
    const tileState = getTileState(voter);

    // If the game is complete, determine the face based on the game result
    if (gameResult) {
      const { blueWins, redWins } = gameResult;
      if (redWins > blueWins) {
        if (voterColor === 'red') return 'elated';
        if (voterColor === 'blue') return 'sad';
      } else if (blueWins > redWins) {
        if (voterColor === 'blue') return 'elated';
        if (voterColor === 'red') return 'sad';
      }
    }

    // If the voter is not in a district, return neutral
    if (!district.voters.includes(voter)) return 'neutral';

    const redVotes = district.voters.filter((v) => v.color === 'red').length;
    const blueVotes = district.voters.filter((v) => v.color === 'blue').length;

    // If the district is not complete, return thinking
    if (!district.isComplete) return 'thinking';

    // If the district is complete, determine the face based on the majority color
    if (redVotes > blueVotes) {
      return voterColor === 'red' ? 'happy' : 'worried';
    } else if (blueVotes > redVotes) {
      return voterColor === 'blue' ? 'happy' : 'worried';
    } else {
      return 'neutral';
    }
  };

  return (
    <div className="board">
      <div
        key={gameKey}
        className="grid"
        style={
          {
            '--grid-size-x': currentLevel.voterGrid[0].length,
            '--grid-size-y': currentLevel.voterGrid.length,
          } as CSSProperties
        }
      >
        {gameState.board.map((row) =>
          row.map((voter) => {
            const district = getDistrictForVoter(voter.id);
            const redVotes = district ? district.voters.filter((v) => v.color === 'red').length : 0;
            const blueVotes = district ? district.voters.filter((v) => v.color === 'blue').length : 0;
            const winnerColor = redVotes > blueVotes ? 'red' : blueVotes > redVotes ? 'blue' : undefined;
            const face = getFace(voter, district || gameState.currentDistrict);

            // Override tile state if voter is in preview selection
            let tileState = getTileState(voter);
            if (isInPreviewSelection(voter.id)) {
              tileState = 'selected';
            }

            return (
              <div
                key={voter.id}
                data-voter-id={voter.id}
                onMouseDown={(e) => handleMouseDown(voter, e)}
                onMouseEnter={() => handleMouseEnter(voter)}
                onTouchStart={(e) => handleTouchStart(voter, e)}
                onTouchMove={handleTouchMove}
                className={`grid-cell 
                  ${tileState}
                  ${voter.color}
                  ${winnerColor ? `winner-${winnerColor}` : ''}
                  ${getDistrictBorders(voter, district || gameState.currentDistrict)}`}
              >
                <div className="div-background" />
                <div className="div-foreground" />
                <VoterTile voter={voter} face={face} state={tileState} district={district} currentDistrictVoters={gameState.currentDistrict?.voters || []} />
                <div className="div-border-top" />
                <div className="div-border-right" />
                <div className="div-border-bottom" />
                <div className="div-border-left" />
                <div className="div-border-dashed" />
              </div>
            );
          }),
        )}
      </div>
    </div>
  );
}

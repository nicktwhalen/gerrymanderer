'use client';

import { CSSProperties, useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import { useGameLogic } from '@/hooks/useGameLogic';
import { useInteractionStateMachine } from '@/hooks/useInteractionStateMachine';
import VoterButton from '@/components/Voter/Voter';
import type { District, Voter, VoterMood } from '@/types/game';

export default function GameBoard() {
  const { gameState, currentLevel, gameKey, gameResult } = useGame();

  const { getTileState, getDistrictForVoter, getTileBorders } = useGameLogic();
  const {
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    interactionMode,
    isInPreviewSelection,
  } = useInteractionStateMachine();

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
    document.addEventListener('touchend', handleGlobalTouchEnd, {
      passive: false,
    });
    document.addEventListener('touchmove', handleGlobalTouchMove, {
      passive: false,
    });

    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('touchend', handleGlobalTouchEnd);
      document.removeEventListener('touchmove', handleGlobalTouchMove);
    };
  }, [interactionMode, handleMouseUp, handleTouchMove]);

  const getMood = (voter: Voter, district?: District | null): VoterMood => {
    if (!district) return 'neutral';
    const voterColor = voter.color;

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

    // If the district is not complete, return thinking
    if (!district.isComplete) return 'thinking';

    // If the district is complete, determine the face based on the majority color
    const redVotes = district.voters.filter((v) => v.color === 'red').length;
    const blueVotes = district.voters.filter((v) => v.color === 'blue').length;
    if (redVotes > blueVotes) {
      return voterColor === 'red' ? 'happy' : 'worried';
    } else if (blueVotes > redVotes) {
      return voterColor === 'blue' ? 'happy' : 'worried';
    } else {
      return 'neutral';
    }
  };

  return (
    <>
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
              const { currentDistrict } = gameState;
              const voterDistrict = getDistrictForVoter(voter.id);

              // check if voter is in preview selection
              const selected = isInPreviewSelection(voter.id);
              const state = selected ? 'selected' : getTileState(voter);

              // calculate the district winner color
              const district = selected ? currentDistrict : voterDistrict;
              const redVotes = district
                ? district.voters.filter((v) => v.color === 'red').length
                : 0;
              const blueVotes = district
                ? district.voters.filter((v) => v.color === 'blue').length
                : 0;
              const winnerColor =
                redVotes > blueVotes
                  ? 'red'
                  : blueVotes > redVotes
                    ? 'blue'
                    : undefined;

              // get the mood of the voter
              const mood = getMood(voter, district || currentDistrict);

              // get the district borders of the voter
              const borders = getTileBorders(
                voter,
                district || gameState.currentDistrict || undefined,
              );

              return (
                <VoterButton
                  key={voter.id}
                  data-voter-id={voter.id}
                  borders={borders}
                  color={voter.color}
                  districtColor={winnerColor}
                  mood={mood}
                  state={state}
                  onMouseDown={(e) => handleMouseDown(voter, e)}
                  onMouseEnter={() => handleMouseEnter(voter)}
                  onTouchStart={(e) => handleTouchStart(voter, e)}
                  onTouchMove={handleTouchMove}
                />
              );
            }),
          )}
        </div>
      </div>
    </>
  );
}

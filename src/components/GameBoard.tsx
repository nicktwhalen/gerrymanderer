'use client';

import { CSSProperties, useEffect, useRef } from 'react';
import { useGame } from '@/context/GameContext';
import { useGameLogic } from '@/hooks/useGameLogic';
import { useInteractionStateMachine } from '@/hooks/useInteractionStateMachine';
import VoterButton from '@/components/Voter/Voter';
import type { District, Voter, VoterMood } from '@/types/game';
import { useDragToSelect } from '@/hooks/useDragToSelect';

export default function GameBoard() {
  const { gameState, currentLevel, gameResult } = useGame();
  const { getTileState, getDistrictForVoter, getTileBorders } = useGameLogic();

  // TODO: delete this hook (game state still relying on it?)
  useInteractionStateMachine();

  const board = useRef<HTMLDivElement>(null);
  const { selection } = useDragToSelect({ board });

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
          ref={board}
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
              const selected = selection.has(voter);
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
                />
              );
            }),
          )}
        </div>
      </div>
    </>
  );
}

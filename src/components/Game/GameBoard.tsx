'use client';

import { useRef } from 'react';
import { useGame } from '@/context/GameContext';
import { useGameLogic } from '@/hooks/useGameLogic';
import { useInteractionStateMachine } from '@/hooks/useInteractionStateMachine';
import VoterButton from '@/components/VoterButton/VoterButton';
import type { District, Voter, VoterMood } from '@/types/game';
import { VoterType, VoterColor } from '@/types/game';
import { useDragToSelect } from '@/hooks/useDragToSelect';
import VoterGrid from '@/components/VoterGrid/VoterGrid';
import Board from '@/components/Board/Board';
import Confetti from '@/components/Confetti/Confetti';

export default function GameBoard({ party }: { party: VoterColor }) {
  const { gameState, currentLevel, gameResult } = useGame();
  const { getTileState, getDistrictForVoter, getTileBorders } = useGameLogic();

  const US = party;
  const THEM = US === VoterColor.Red ? VoterColor.Blue : VoterColor.Red;

  // TODO: delete this hook (game state still relying on it?)
  useInteractionStateMachine();

  const board = useRef<HTMLDivElement>(null);
  const { selection } = useDragToSelect({ board });

  // Helper function to convert voter type to display color
  const getVoterColor = (voterType: VoterType): VoterColor => {
    if (voterType === VoterType.Us) return US;
    if (voterType === VoterType.Them) return THEM;
    return VoterColor.Empty;
  };

  // Helper function to get voter mood
  const getMood = (voter: Voter, district?: District | null): VoterMood => {
    if (!district) return 'neutral';

    // If the game is complete, determine the face based on the game result
    if (gameResult) {
      const { usWins, themWins } = gameResult;
      if (usWins > themWins) {
        if (voter.type === VoterType.Us) return 'elated';
        if (voter.type === VoterType.Them) return 'sad';
      } else if (themWins > usWins) {
        if (voter.type === VoterType.Us) return 'sad';
        if (voter.type === VoterType.Them) return 'elated';
      }
    }

    // If the voter is not in a district, return neutral
    if (!district.voters.includes(voter)) return 'neutral';

    // If the district is not complete, return thinking
    if (!district.isComplete) return 'thinking';

    // If the district is complete, determine the face based on the majority type
    const usVotes = district.voters.filter(
      (v) => v.type === VoterType.Us,
    ).length;
    const themVotes = district.voters.filter(
      (v) => v.type === VoterType.Them,
    ).length;
    if (usVotes > themVotes) {
      return voter.type === VoterType.Us ? 'happy' : 'worried';
    } else if (themVotes > usVotes) {
      return voter.type === VoterType.Them ? 'happy' : 'worried';
    } else {
      return 'neutral';
    }
  };

  return (
    <Board square ref={board} interactive={!gameResult}>
      {gameResult?.playerWon && <Confetti party={party} />}
      <VoterGrid
        rows={currentLevel.voterGrid.length}
        cols={currentLevel.voterGrid[0].length}
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
            const usVotes = district
              ? district.voters.filter((v) => v.type === VoterType.Us).length
              : 0;
            const themVotes = district
              ? district.voters.filter((v) => v.type === VoterType.Them).length
              : 0;
            const winnerColor =
              usVotes > themVotes ? US : themVotes > usVotes ? THEM : undefined;

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
                color={getVoterColor(voter.type)}
                districtColor={winnerColor}
                mood={mood}
                state={state}
                size={currentLevel.voterGrid[0].length}
              />
            );
          }),
        )}
      </VoterGrid>
    </Board>
  );
}

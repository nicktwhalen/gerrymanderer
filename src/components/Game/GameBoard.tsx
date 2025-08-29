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
import {
  getVoterColor,
  getDistrictWinnerColor,
  getVoterMood,
} from '@/utils/boardUtils';

export default function GameBoard({ party }: { party: VoterColor }) {
  const { gameState, currentLevel, gameResult } = useGame();
  const { getTileState, getDistrictForVoter, getTileBorders } = useGameLogic();

  const US = party;
  const THEM = US === VoterColor.Red ? VoterColor.Blue : VoterColor.Red;

  // TODO: delete this hook (game state still relying on it?)
  useInteractionStateMachine();

  const board = useRef<HTMLDivElement>(null);
  const { selection } = useDragToSelect({ board });

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

            // calculate the district winner color and mood
            const district = selected ? currentDistrict : voterDistrict;
            const winnerColor = getDistrictWinnerColor(district, US, THEM);
            const mood = getVoterMood(
              voter,
              district || currentDistrict,
              gameResult,
            );

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
                color={getVoterColor(voter.type, US, THEM)}
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

'use client';

import { useRef, useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import { useGameLogic } from '@/hooks/useGameLogic';
import { useInteractionStateMachine } from '@/hooks/useInteractionStateMachine';
import VoterButton from '@/components/VoterButton/VoterButton';
import { VoterColor } from '@/types/game';
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
  const {
    showGameResult,
    gameState,
    currentLevel,
    gameResult,
    nextLevel,
    hasNextLevel,
  } = useGame();
  const { getTileState, getDistrictForVoter, getTileBorders } = useGameLogic();

  const US = party;
  const THEM = US === VoterColor.Red ? VoterColor.Blue : VoterColor.Red;

  // TODO: delete this hook (game state still relying on it?)
  useInteractionStateMachine();

  const board = useRef<HTMLDivElement>(null);
  const { selection } = useDragToSelect({ board });

  useEffect(() => {
    if (showGameResult && gameResult?.playerWon && hasNextLevel) {
      const timer = setTimeout(() => {
        nextLevel();
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [showGameResult, gameResult, hasNextLevel, nextLevel]);

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

            // add preview borders for district + selection shape
            let previewBorders = borders;
            if (
              selected ||
              (currentDistrict &&
                currentDistrict.voters.some((v) => v.id === voter.id))
            ) {
              // Include both committed district voters and current selection
              const allVoters = [
                ...(currentDistrict?.voters || []),
                ...Array.from(selection),
              ];

              const hasVoterAt = (row: number, col: number) =>
                allVoters.some((v) => v.row === row && v.col === col);

              const hasAbove = hasVoterAt(voter.row - 1, voter.col);
              const hasBelow = hasVoterAt(voter.row + 1, voter.col);
              const hasLeft = hasVoterAt(voter.row, voter.col - 1);
              const hasRight = hasVoterAt(voter.row, voter.col + 1);

              previewBorders = {
                top: !hasAbove,
                bottom: !hasBelow,
                left: !hasLeft,
                right: !hasRight,
              };
            }

            return (
              <VoterButton
                key={voter.id}
                data-voter-id={voter.id}
                borders={previewBorders}
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

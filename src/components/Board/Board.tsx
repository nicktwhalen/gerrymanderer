'use client';

import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Move, VoterType, VoterColor, Voter, District } from '@/types/game';
import { Level } from '@/types/level';
import VoterButton from '@/components/VoterButton/VoterButton';
import VoterGrid from '@/components/VoterGrid/VoterGrid';
import {
  getVoterColor,
  getDistrictWinnerColor,
  getVoterMood,
  getTileBorders,
} from '@/utils/boardUtils';
import styles from './Board.module.css';

export type BoardProps = React.HTMLAttributes<HTMLDivElement> & {
  square?: boolean;
  interactive?: boolean;
  moves?: Move[];
  initialLevel?: Level;
  party?: VoterColor;
};

const Board = React.forwardRef<HTMLDivElement, BoardProps>(
  (
    {
      square,
      interactive = true,
      moves,
      initialLevel,
      party = VoterColor.Blue,
      children,
      ...restProps
    },
    ref,
  ) => {
    const className = classNames(
      styles.board,
      square && styles.square,
      interactive && styles.interactive,
    );

    // If moves are provided, render animated version
    if (moves && initialLevel) {
      const [currentMoveIndex, setCurrentMoveIndex] = useState(-1);
      const US = party;
      const THEM = US === VoterColor.Red ? VoterColor.Blue : VoterColor.Red;

      // Create board state from initial level
      const createInitialBoard = (): Voter[][] => {
        return initialLevel.voterGrid.map((row, rowIndex) =>
          row.map((voterType, colIndex) => ({
            id: `${rowIndex}-${colIndex}`,
            type: voterType,
            row: rowIndex,
            col: colIndex,
          })),
        );
      };

      // Apply moves up to current index to get current districts
      const getCurrentDistricts = (): District[] => {
        const districts: District[] = [];
        const board = createInitialBoard();

        for (
          let i = 0;
          i <= currentMoveIndex && i < moves.length && currentMoveIndex >= 0;
          i++
        ) {
          const move = moves[i];
          const voters = move.voters.map((pos) => board[pos.row][pos.col]);

          districts.push({
            id: `district-${i}`,
            voters: voters,
            isComplete: true,
          });
        }

        return districts;
      };

      useEffect(() => {
        if (moves.length === 0) return;

        const timer = setInterval(() => {
          setCurrentMoveIndex((prev) => {
            if (prev >= moves.length - 1) {
              return -1; // Reset to no districts
            }
            return prev + 1;
          });
        }, 1500); // 1.5 second delays between moves

        return () => clearInterval(timer);
      }, [moves.length]);

      const board = createInitialBoard();
      const districts = getCurrentDistricts();

      const getDistrictForVoter = (voterId: string): District | undefined => {
        return districts.find((district) =>
          district.voters.some((v) => v.id === voterId),
        );
      };

      return (
        <div ref={ref} className={className} role="presentation" {...restProps}>
          <VoterGrid
            rows={initialLevel.voterGrid.length}
            cols={initialLevel.voterGrid[0].length}
          >
            {board.map((row) =>
              row.map((voter) => {
                const voterDistrict = getDistrictForVoter(voter.id);
                const winnerColor = getDistrictWinnerColor(
                  voterDistrict,
                  US,
                  THEM,
                );
                // Calculate overall game result: count district wins
                const usDistrictWins = districts.filter((d) => {
                  const usVotes = d.voters.filter(
                    (v) => v.type === VoterType.Us,
                  ).length;
                  const themVotes = d.voters.filter(
                    (v) => v.type === VoterType.Them,
                  ).length;
                  return usVotes > themVotes;
                }).length;
                const themDistrictWins = districts.filter((d) => {
                  const usVotes = d.voters.filter(
                    (v) => v.type === VoterType.Us,
                  ).length;
                  const themVotes = d.voters.filter(
                    (v) => v.type === VoterType.Them,
                  ).length;
                  return themVotes > usVotes;
                }).length;

                const gameResult = {
                  usWins: usDistrictWins,
                  themWins: themDistrictWins,
                };
                const mood = getVoterMood(voter, voterDistrict, gameResult);
                const borders = getTileBorders(voter, voterDistrict, board);

                return (
                  <VoterButton
                    key={voter.id}
                    color={getVoterColor(voter.type, US, THEM)}
                    districtColor={winnerColor}
                    mood={mood}
                    borders={borders}
                    size={7}
                  />
                );
              }),
            )}
          </VoterGrid>
        </div>
      );
    }

    // Default static rendering
    return (
      <div
        ref={ref}
        className={className}
        role={interactive ? undefined : 'presentation'}
        {...restProps}
      >
        {children}
      </div>
    );
  },
);

Board.displayName = 'Board';

export default Board;

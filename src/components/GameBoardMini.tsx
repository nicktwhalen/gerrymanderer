'use client';

import { CSSProperties, useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import { useGameLogic } from '@/hooks/useGameLogic';
import VoterTile from './VoterTile';
import { District, Voter } from '@/types/game';

export default function GameBoardMini() {
  const { gameState, currentLevel, gameKey } = useGame();

  const { getTileState, getDistrictForVoter, getTileBorders } = useGameLogic();

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
    <div
      className="grid grid-mini"
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
          const tileState = getTileState(voter);

          return (
            <div
              key={voter.id}
              data-voter-id={voter.id}
              className={`grid-cell 
                  ${tileState}
                  ${winnerColor ? `winner-${winnerColor}` : ''}
                  ${getDistrictBorders(voter, district || gameState.currentDistrict)}`}
            >
              <VoterTile voter={voter} state={tileState} district={district} currentDistrictVoters={gameState.currentDistrict?.voters || []} />
              <div className="div-border-top" />
              <div className="div-border-right" />
              <div className="div-border-bottom" />
              <div className="div-border-left" />
            </div>
          );
        }),
      )}
    </div>
  );
}

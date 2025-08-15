'use client';

import { Voter, District, TileState } from '@/types/game';

interface VoterTileProps {
  voter: Voter;
  state: TileState;
  district?: District;
  onMouseDown?: (e: React.MouseEvent) => void;
  onMouseEnter?: () => void;
  onTouchStart?: (e: React.TouchEvent) => void;
  onTouchMove?: (e: React.TouchEvent) => void;
  currentDistrictVoters?: Voter[];
}

export default function VoterTile({ voter, district, onMouseDown, onMouseEnter, onTouchStart, onTouchMove }: VoterTileProps) {
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onMouseDown) {
      onMouseDown(e);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onTouchStart) {
      onTouchStart(e);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (onTouchMove) {
      onTouchMove(e);
    }
  };

  return (
    <button
      className={`
        voter
        ${voter.color}
      `}
      onMouseDown={handleMouseDown}
      onMouseEnter={onMouseEnter}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    ></button>
  );
}

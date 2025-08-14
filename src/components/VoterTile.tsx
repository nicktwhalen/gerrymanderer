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

export default function VoterTile({ voter, state, district, onMouseDown, onMouseEnter, onTouchStart, onTouchMove }: VoterTileProps) {
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

  const getComicStyle = () => {
    let style = '';
    switch (state) {
      case 'selected':
        style += ' selected';
        break;
      case 'completed':
        style += ' completed';
        break;
      case 'available':
        style += ' available';
        break;
    }
    return style;
  };

  const getCursor = () => {
    return state === 'completed' && !district ? 'cursor-not-allowed' : 'cursor-pointer';
  };

  return (
    <button
      className={`
        voter
        ${voter.color}
        ${getComicStyle()}
      `}
      // className={`
      //   w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16
      //   ${getBaseColor()}
      //   ${getComicStyle()}
      //   ${getCursor()}
      //   select-none
      //   flex items-center justify-center
      //   text-white text-sm sm:text-base lg:text-lg font-black
      // `}
      onMouseDown={handleMouseDown}
      onMouseEnter={onMouseEnter}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    ></button>
  );
}

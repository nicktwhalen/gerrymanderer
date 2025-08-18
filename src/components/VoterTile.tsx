'use client';

import { Voter, District, TileState, Face } from '@/types/game';

interface VoterTileProps {
  voter?: Voter;
  state?: TileState;
  district?: District;
  face?: Face;
  onClick?: () => void;
  onMouseDown?: (e: React.MouseEvent) => void;
  onMouseEnter?: () => void;
  onTouchStart?: (e: React.TouchEvent) => void;
  onTouchMove?: (e: React.TouchEvent) => void;
  currentDistrictVoters?: Voter[];
}

export default function VoterTile({ voter, face = 'neutral', onClick, onMouseDown, onMouseEnter, onTouchStart, onTouchMove }: VoterTileProps) {
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

  const getFace = (face: Face) => {
    switch (face) {
      case 'elated':
        return '😁';
      case 'happy':
        return '😊';
      case 'sad':
        return '😢';
      case 'worried':
        return '🥺';
      case 'thinking':
        return '🤔';
      default:
        return '😐';
    }
  };

  return (
    <button
      onClick={onClick}
      className={`
        voter
        ${face}
        ${voter?.color}
      `}
    >
      <span className="face">{getFace(face)}</span>
    </button>
  );
}

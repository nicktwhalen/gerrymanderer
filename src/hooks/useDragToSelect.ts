import React, { useRef, useState, useEffect } from 'react';
import type { Voter } from '@/types/game';
import { VoterType } from '@/types/game';
import { useGame } from '@/context/GameContext';
import { useGameLogic } from '@/hooks/useGameLogic';

type UseDragToSelectProps = {
  board: React.RefObject<HTMLDivElement | null>;
};

export const useDragToSelect = ({ board }: UseDragToSelectProps) => {
  const { gameState, currentLevel } = useGame();
  const {
    isVoterInCurrentDistrict,
    removeVotersFromDistrict,
    addMultipleVotersToDistrict,
    canAddVoterToCurrentDistrict,
    isAdjacent,
    isContiguous,
  } = useGameLogic();

  // setup
  const isDragging = useRef(false);
  const currentVoter = useRef<Voter | null>(null);
  const [mode, setMode] = useState<'add' | 'remove'>('add');
  const [selection, setSelection] = useState<Set<Voter>>(() => new Set());

  // attach listeners on mount
  useEffect(() => {
    const boardElement = board.current;
    if (!boardElement) return;

    boardElement.addEventListener('mousedown', onDragStart);
    boardElement.addEventListener('touchstart', onDragStart);
    boardElement.addEventListener('mousemove', onDragMove);
    boardElement.addEventListener('touchmove', onDragMove);
    boardElement.addEventListener('mouseup', onDragEnd);
    boardElement.addEventListener('touchend', onDragEnd);

    // clean up listeners on unmount
    return () => {
      boardElement.removeEventListener('mousedown', onDragStart);
      boardElement.removeEventListener('touchstart', onDragStart);
      boardElement.removeEventListener('mousemove', onDragMove);
      boardElement.removeEventListener('touchmove', onDragMove);
      boardElement.removeEventListener('mouseup', onDragEnd);
      boardElement.removeEventListener('touchend', onDragEnd);
    };
  });

  // Helper function to get the mouse/touch position from the event
  const getPointFromEvent = (
    e: MouseEvent | TouchEvent,
  ): { x: number; y: number } => {
    if (['touchstart', 'touchmove'].includes(e.type)) {
      const touch = (e as TouchEvent).touches[0];
      return { x: touch.clientX, y: touch.clientY };
    } else {
      const event = e as MouseEvent;
      return { x: event.clientX, y: event.clientY };
    }
  };

  // Helper function to get a voter from the mouse/touch position
  const getVoterFromPoint = (point: { x: number; y: number }) => {
    const element = document.elementFromPoint(point.x, point.y);
    const id = element
      ?.closest('[data-voter-id]')
      ?.getAttribute('data-voter-id');

    const voter = gameState.board.flat().find((v) => v.id === id);
    return voter;
  };

  // Helper function to check if a voter can be added to current district
  const canAddVoter = (voter: Voter): boolean => {
    // Don't allow empty squares to be selected
    if (voter.type === VoterType.Nobody) {
      return false;
    }

    // Don't add voter if already in current district (defensive check)
    if (isVoterInCurrentDistrict(voter.id)) {
      return false;
    }

    // For a new selection, check if voter can be added to current district
    if (selection.size === 0) {
      return canAddVoterToCurrentDistrict(voter);
    }

    // Don't add the same voter twice
    if (selection.has(voter)) {
      return false;
    }

    // Calculate total size including existing current district voters
    const existingDistrictSize = gameState.currentDistrict?.voters.length || 0;
    const totalSelectionSize = selection.size + existingDistrictSize;

    // Check district size limit - don't exceed the maximum district size
    if (totalSelectionSize >= currentLevel.districtSize) {
      return false;
    }

    // Check adjacency - voter must be adjacent to at least one voter in current selection
    return Array.from(selection).some((existingVoter) =>
      isAdjacent(existingVoter, voter),
    );
  };

  // Helper function to check if a voter can be removed from current district
  const canRemoveVoter = (voter: Voter): boolean => {
    // Check if voter is in current district
    if (!isVoterInCurrentDistrict(voter.id)) return false;

    // Don't allow deselecting if it would break adjacency
    const updatedDistrict = [
      // the current district voters...
      ...(gameState.currentDistrict?.voters || []),
    ]
      // minus the voters we've already staged to remove...
      .filter((v) => !selection.has(v))
      // minus THIS voter we also want to remove
      .filter((v) => v !== voter);
    return isContiguous(updatedDistrict);
  };

  // Handle drag start event
  const onDragStart = (e: MouseEvent | TouchEvent) => {
    e.preventDefault();

    // get voter
    const { x, y } = getPointFromEvent(e);
    const voter = getVoterFromPoint({ x, y });
    if (!voter) return;

    // determine mode based on current selection state
    const newMode = isVoterInCurrentDistrict(voter.id) ? 'remove' : 'add';

    // update selection state
    setMode(newMode);
    const updatedSelection = new Set<Voter>();
    if (newMode === 'add' && canAddVoter(voter)) {
      updatedSelection.add(voter);
    }
    if (newMode === 'remove' && canRemoveVoter(voter)) {
      updatedSelection.add(voter);
    }

    setSelection(updatedSelection);

    // mark dragging state
    isDragging.current = true;
    currentVoter.current = voter;
  };

  // Handle drag move event
  const onDragMove = (e: MouseEvent | TouchEvent) => {
    e.preventDefault();

    // check if dragging
    if (!isDragging.current) return;

    // get the voter id from the current position
    const { x, y } = getPointFromEvent(e);
    const voter = getVoterFromPoint({ x, y });
    if (!voter) return;

    // return if drag did not leave the previous voter
    if (currentVoter.current === voter) return;

    // update selection state
    setSelection((previousSelection) => {
      const updatedSelection = new Set(previousSelection);
      if (mode === 'add' && canAddVoter(voter)) {
        updatedSelection.add(voter);
      }
      if (mode === 'remove' && canRemoveVoter(voter)) {
        updatedSelection.add(voter);
      }
      return updatedSelection;
    });

    // mark dragging state
    currentVoter.current = voter;
  };

  // Handle drag end event
  const onDragEnd = (e: MouseEvent | TouchEvent) => {
    e.preventDefault();

    // reset dragging state
    isDragging.current = false;
    currentVoter.current = null;

    if (selection.size && mode === 'add') {
      addMultipleVotersToDistrict(Array.from(selection));
    }

    if (selection.size && mode === 'remove') {
      removeVotersFromDistrict(Array.from(selection));
    }

    setSelection(new Set());
  };

  return { selection };
};

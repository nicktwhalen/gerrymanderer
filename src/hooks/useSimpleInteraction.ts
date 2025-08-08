'use client';

import { useState, useCallback } from 'react';
import { Voter } from '@/types/game';
import { useGame } from '@/context/GameContext';
import { useGameLogic } from './useGameLogic';

type InteractionMode = 'idle' | 'clicking' | 'dragging';

interface SimpleInteractionState {
  mode: InteractionMode;
  startVoter: Voter | null;
  currentDragVoters: Set<string>;
}

export const useSimpleInteraction = () => {
  const { setIsDragging, setShowGameResult, gameResult } = useGame();
  const { addVoterToDistrict, addMultipleVotersToDistrict } = useGameLogic();

  const [state, setState] = useState<SimpleInteractionState>({
    mode: 'idle',
    startVoter: null,
    currentDragVoters: new Set(),
  });

  // Start interaction - always begins as "clicking"
  const handleMouseDown = useCallback(
    (voter: Voter, event: React.MouseEvent) => {
      event.preventDefault();

      setState({
        mode: 'clicking',
        startVoter: voter,
        currentDragVoters: new Set([voter.id]),
      });

      setIsDragging(false); // Not dragging yet

      // Don't process the voter immediately - wait for mouseup to determine if it's click or drag
    },
    [setIsDragging],
  );

  // Mouse enter - upgrade to dragging if we were clicking
  const handleMouseEnter = useCallback(
    (voter: Voter) => {
      if (state.mode === 'clicking' && state.startVoter && voter.id !== state.startVoter.id) {
        // Upgrade to dragging
        const originalVoter = state.startVoter; // Capture before state update

        setState((prev) => ({
          ...prev,
          mode: 'dragging',
          currentDragVoters: new Set([prev.startVoter!.id, voter.id]),
        }));

        setIsDragging(true);

        // Add both voters together in a single call to avoid race condition
        addMultipleVotersToDistrict([originalVoter, voter], true);
      } else if (state.mode === 'dragging' && !state.currentDragVoters.has(voter.id)) {
        // Continue dragging to new voter

        setState((prev) => ({
          ...prev,
          currentDragVoters: new Set([...prev.currentDragVoters, voter.id]),
        }));

        addVoterToDistrict(voter, true);
      }
    },
    [state.mode, state.startVoter, state.currentDragVoters, addVoterToDistrict, setIsDragging],
  );

  // Mouse up - finalize the interaction
  const handleMouseUp = useCallback(() => {
    if (state.mode === 'clicking' && state.startVoter) {
      // Pure click - process the voter as a click action
      addVoterToDistrict(state.startVoter, false);
    }
    // If mode was 'dragging', the voters were already added during the drag

    // Reset state
    setState({
      mode: 'idle',
      startVoter: null,
      currentDragVoters: new Set(),
    });

    setIsDragging(false);

    // Check if game should end
    setTimeout(() => {
      if (gameResult?.isComplete) {
        setShowGameResult(true);
      }
    }, 50);
  }, [state.mode, state.startVoter, addVoterToDistrict, setIsDragging, gameResult, setShowGameResult]);

  // Touch handlers - same logic as mouse
  const handleTouchStart = useCallback(
    (voter: Voter, event: React.TouchEvent) => {
      event.preventDefault();

      setState({
        mode: 'clicking',
        startVoter: voter,
        currentDragVoters: new Set([voter.id]),
      });

      setIsDragging(false);
    },
    [setIsDragging],
  );

  // Global event listeners would be handled in a useEffect
  // For now, we'll handle touch move in the component level

  return {
    // State for debugging/UI
    interactionMode: state.mode,
    isDraggingState: state.mode === 'dragging',
    currentDragVoters: state.currentDragVoters,

    // Event handlers
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
    handleTouchStart,
  };
};

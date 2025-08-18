'use client';

import { useCallback, useReducer, useEffect, useRef } from 'react';
import { Voter } from '@/types/game';
import { useGame } from '@/context/GameContext';
import { useGameLogic } from './useGameLogic';

// State Machine Types
type InteractionState =
  | { type: 'idle' }
  | {
      type: 'selecting';
      startVoter: Voter;
      currentSelection: Voter[];
      mode: 'click' | 'drag';
    }
  | {
      type: 'confirmed';
      finalSelection: Voter[];
      mode: 'click' | 'drag';
    };

type InteractionEvent = { type: 'CLICK'; voter: Voter } | { type: 'MOUSE_DOWN'; voter: Voter } | { type: 'MOUSE_ENTER'; voter: Voter } | { type: 'MOUSE_UP' } | { type: 'APPLY_SELECTION' } | { type: 'RESET' };

// Helper function to check if a voter can be added to current selection
const isValidForSelection = (voter: Voter, currentSelection: Voter[], gameLogic: ReturnType<typeof useGameLogic>, maxDistrictSize: number, gameState: any): boolean => {
  // Don't add the same voter twice
  if (currentSelection.some((v) => v.id === voter.id)) {
    return false;
  }

  // Calculate total size including existing current district voters
  const existingDistrictSize = gameState.currentDistrict?.voters.length || 0;
  const totalSelectionSize = currentSelection.length + existingDistrictSize;

  // Check district size limit - don't exceed the maximum district size
  if (totalSelectionSize >= maxDistrictSize) {
    return false;
  }

  // Check adjacency - voter must be adjacent to at least one voter in current selection
  if (currentSelection.length === 0) {
    return true; // First voter is always valid
  }

  return currentSelection.some((existingVoter) => gameLogic.isAdjacent(existingVoter, voter));
};

// State Machine Reducer
const interactionReducer = (state: InteractionState, event: InteractionEvent, gameLogic: ReturnType<typeof useGameLogic>, maxDistrictSize: number, gameState: any): InteractionState => {
  switch (state.type) {
    case 'idle':
      if (event.type === 'MOUSE_DOWN') {
        return {
          type: 'selecting',
          startVoter: event.voter,
          currentSelection: [event.voter],
          mode: 'click', // Start as click, will upgrade to drag if needed
        };
      }
      break;

    case 'selecting':
      if (event.type === 'MOUSE_ENTER' && event.voter.id !== state.startVoter.id) {
        // Upgrade to drag mode
        if (isValidForSelection(event.voter, state.currentSelection, gameLogic, maxDistrictSize, gameState)) {
          return {
            ...state,
            currentSelection: [...state.currentSelection, event.voter],
            mode: 'drag',
          };
        }
        // If voter is not valid, stay in current state
        return state;
      }

      if (event.type === 'MOUSE_ENTER' && state.mode === 'drag') {
        // Continue dragging
        if (isValidForSelection(event.voter, state.currentSelection, gameLogic, maxDistrictSize, gameState)) {
          return {
            ...state,
            currentSelection: [...state.currentSelection, event.voter],
          };
        }
        return state;
      }

      if (event.type === 'MOUSE_UP') {
        return {
          type: 'confirmed',
          finalSelection: state.currentSelection,
          mode: state.mode,
        };
      }
      break;

    case 'confirmed':
      if (event.type === 'APPLY_SELECTION') {
        // Selection has been applied to game, return to idle
        return { type: 'idle' };
      }
      if (event.type === 'RESET') {
        return { type: 'idle' };
      }
      break;
  }

  // No valid transition, return current state
  return state;
};

export const useInteractionStateMachine = () => {
  const { setIsDragging, setShowGameResult, gameResult, gameState, currentLevel } = useGame();
  const gameLogic = useGameLogic();
  const { addMultipleVotersToDistrict, addVoterToDistrict } = gameLogic;

  // Track if we're currently in a touch interaction to prevent synthetic mouse events
  const touchInProgress = useRef(false);
  const touchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // State machine with game logic, district size limit, and game state injected
  const [state, dispatch] = useReducer((state: InteractionState, event: InteractionEvent) => interactionReducer(state, event, gameLogic, currentLevel.districtSize, gameState), { type: 'idle' } as InteractionState);

  // Apply selections when confirmed (not during selecting to avoid double processing)
  useEffect(() => {
    if (state.type === 'confirmed') {
      const { finalSelection, mode } = state;

      if (mode === 'click') {
        // Single click - use toggle logic
        addVoterToDistrict(finalSelection[0], false);
      } else if (mode === 'drag') {
        // Drag - use batch add logic
        addMultipleVotersToDistrict(finalSelection, true);
      }

      // Move to idle after applying
      dispatch({ type: 'APPLY_SELECTION' });
    }
  }, [state, addVoterToDistrict, addMultipleVotersToDistrict, gameResult, setShowGameResult]);

  // Update global dragging state
  useEffect(() => {
    const isDragging = state.type === 'selecting' && state.mode === 'drag';
    setIsDragging(isDragging);
  }, [state, setIsDragging]);

  // Check for game completion with fresh gameResult
  useEffect(() => {
    if (gameResult?.isComplete && state.type === 'idle') {
      setShowGameResult(true);
    }
  }, [gameResult, state.type, setShowGameResult]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (touchTimeoutRef.current) {
        clearTimeout(touchTimeoutRef.current);
      }
    };
  }, []);

  // Event handlers
  const handleClick = useCallback((voter: Voter, event: React.MouseEvent) => {
    dispatch({ type: 'CLICK', voter });
  }, []);

  const handleMouseDown = useCallback((voter: Voter, event: React.MouseEvent) => {
    // Ignore synthetic mouse events from touch
    if (touchInProgress.current) {
      return;
    }
    event.preventDefault();
    dispatch({ type: 'MOUSE_DOWN', voter });
  }, []);

  const handleMouseEnter = useCallback((voter: Voter) => {
    // Ignore synthetic mouse events from touch
    if (touchInProgress.current) {
      return;
    }
    dispatch({ type: 'MOUSE_ENTER', voter });
  }, []);

  const handleMouseUp = useCallback(() => {
    // Clear timeout when interaction ends
    if (touchTimeoutRef.current) {
      clearTimeout(touchTimeoutRef.current);
      touchTimeoutRef.current = null;
    }

    // If this is the end of a touch interaction, process it and clear the flag
    if (touchInProgress.current) {
      dispatch({ type: 'MOUSE_UP' });
      touchInProgress.current = false;
      return;
    }
    dispatch({ type: 'MOUSE_UP' });
  }, []);

  const handleTouchStart = useCallback((voter: Voter, event: React.TouchEvent) => {
    // Clear any existing timeout
    if (touchTimeoutRef.current) {
      clearTimeout(touchTimeoutRef.current);
    }

    touchInProgress.current = true;
    event.preventDefault();
    event.stopPropagation();
    dispatch({ type: 'MOUSE_DOWN', voter });

    // Safety timeout to clear touch flag in case touchend doesn't fire
    touchTimeoutRef.current = setTimeout(() => {
      touchInProgress.current = false;
      touchTimeoutRef.current = null;
    }, 1000);
  }, []);

  const handleTouchMove = useCallback(
    (event: React.TouchEvent) => {
      if (!touchInProgress.current) return;

      event.preventDefault();
      const touch = event.touches[0];
      if (!touch) return;

      // Find the element under the touch point
      const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
      if (!elementBelow) return;

      // Look for voter-id data attribute (could be on the tile or its container)
      const voterContainer = elementBelow.closest('[data-voter-id]');
      if (!voterContainer) return;

      const voterId = voterContainer.getAttribute('data-voter-id');
      if (!voterId) return;

      // Find the voter from the game state
      const voter = gameState.board.flat().find((v) => v.id === voterId);
      if (voter) {
        dispatch({ type: 'MOUSE_ENTER', voter });
      }
    },
    [gameState.board],
  );

  // Reset function for emergencies
  const resetInteraction = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  // Helper function to check if a voter is in current preview selection
  const isInPreviewSelection = useCallback(
    (voterId: string): boolean => {
      return state.type === 'selecting' && state.currentSelection.some((v) => v.id === voterId);
    },
    [state],
  );

  return {
    // State for debugging/UI
    interactionState: state,
    interactionMode: state.type === 'selecting' ? state.mode : 'idle',
    isDraggingState: state.type === 'selecting' && state.mode === 'drag',
    currentSelection: state.type === 'selecting' ? state.currentSelection : [],
    isInPreviewSelection,

    // Event handlers
    handleClick,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    resetInteraction,
  };
};

'use client';

import { useCallback, useMemo } from 'react';
import { Voter, District, Position, TileState } from '@/types/game';
import { useGame } from '@/context/GameContext';

export const useGameLogic = () => {
  const { gameState, updateGameState } = useGame();

  const isAdjacent = useCallback((pos1: Position, pos2: Position): boolean => {
    const rowDiff = Math.abs(pos1.row - pos2.row);
    const colDiff = Math.abs(pos1.col - pos2.col);
    return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
  }, []);

  const isContiguous = useCallback(
    (voters: Voter[]): boolean => {
      if (voters.length <= 1) return true;

      const visited = new Set<string>();
      const queue = [voters[0]];
      visited.add(voters[0].id);

      while (queue.length > 0) {
        const current = queue.shift();
        if (!current) continue;

        for (const voter of voters) {
          if (!visited.has(voter.id) && isAdjacent(current, voter)) {
            visited.add(voter.id);
            queue.push(voter);
          }
        }
      }

      return visited.size === voters.length;
    },
    [isAdjacent],
  );

  const isVoterInCurrentDistrict = useCallback(
    (voterId: string): boolean => {
      return gameState.currentDistrict?.voters.some((v) => v.id === voterId) ?? false;
    },
    [gameState.currentDistrict],
  );

  const isVoterInAnyDistrict = useCallback(
    (voterId: string): boolean => {
      return gameState.districts.some((district) => district.voters.some((v) => v.id === voterId));
    },
    [gameState.districts],
  );

  const canAddVoterToCurrentDistrict = useCallback(
    (voter: Voter): boolean => {
      if (!gameState.currentDistrict) return true;

      if (gameState.currentDistrict.voters.length >= gameState.requiredDistrictSize) {
        return false;
      }

      if (gameState.currentDistrict.voters.length === 0) return true;

      return gameState.currentDistrict.voters.some((v) => isAdjacent(v, voter));
    },
    [gameState.currentDistrict, gameState.requiredDistrictSize, isAdjacent],
  );

  const getTileState = useCallback(
    (voter: Voter): TileState => {
      if (isVoterInCurrentDistrict(voter.id)) {
        return 'selected';
      }
      if (isVoterInAnyDistrict(voter.id)) {
        return 'completed';
      }
      if (gameState.currentDistrict && canAddVoterToCurrentDistrict(voter)) {
        return 'available';
      }
      return 'default';
    },
    [isVoterInCurrentDistrict, isVoterInAnyDistrict, gameState.currentDistrict, canAddVoterToCurrentDistrict],
  );

  const getDistrictForVoter = useCallback(
    (voterId: string): District | undefined => {
      return gameState.districts.find((district) => district.voters.some((v) => v.id === voterId));
    },
    [gameState.districts],
  );

  const addVoterToDistrict = useCallback(
    (voter: Voter, isDragAction: boolean = false) => {
      if (isVoterInAnyDistrict(voter.id) && !isVoterInCurrentDistrict(voter.id)) {
        return false; // Can't modify other districts
      }

      if (!gameState.currentDistrict) {
        // Create new district
        const newDistrict: District = {
          id: `district-${gameState.districts.length}`,
          voters: [voter],
          isComplete: false,
        };
        updateGameState({ currentDistrict: newDistrict });
        return true;
      }

      // For drag actions, only add tiles (don't remove)
      if (isDragAction && isVoterInCurrentDistrict(voter.id)) {
        return false;
      }

      // For click actions, allow removal
      if (!isDragAction && isVoterInCurrentDistrict(voter.id)) {
        const updatedVoters = gameState.currentDistrict.voters.filter((v) => v.id !== voter.id);

        if (!isContiguous(updatedVoters)) {
          return false;
        }

        if (updatedVoters.length === 0) {
          updateGameState({ currentDistrict: null });
          return true;
        }

        updateGameState({
          currentDistrict: {
            ...gameState.currentDistrict,
            voters: updatedVoters,
          },
        });
        return true;
      }

      if (!canAddVoterToCurrentDistrict(voter)) {
        return false;
      }

      // Prevent duplicate voters in the same district
      if (gameState.currentDistrict.voters.some((v) => v.id === voter.id)) {
        return false;
      }

      const newVoters = [...gameState.currentDistrict.voters, voter];
      const isComplete = newVoters.length === gameState.requiredDistrictSize;

      const updatedDistrict: District = {
        ...gameState.currentDistrict,
        voters: newVoters,
        isComplete,
      };

      if (isComplete) {
        updateGameState({
          districts: [...gameState.districts, updatedDistrict],
          currentDistrict: null,
        });
      } else {
        updateGameState({ currentDistrict: updatedDistrict });
      }

      return true;
    },
    [gameState, updateGameState, isVoterInAnyDistrict, isVoterInCurrentDistrict, canAddVoterToCurrentDistrict, isContiguous],
  );

  const addMultipleVotersToDistrict = useCallback(
    (voters: Voter[], isDragAction: boolean = false) => {
      if (voters.length === 0) return false;

      // If there's no current district, create one with all voters
      if (!gameState.currentDistrict) {
        const isComplete = voters.length === gameState.requiredDistrictSize;

        const newDistrict: District = {
          id: `district-${gameState.districts.length}`,
          voters: [...voters],
          isComplete,
        };

        if (isComplete) {
          updateGameState({
            districts: [...gameState.districts, newDistrict],
            currentDistrict: null,
          });
        } else {
          updateGameState({ currentDistrict: newDistrict });
        }

        return true;
      }

      // For drag operations, we need to add voters in order of adjacency
      // Start with voters that can be added to current district
      const validVoters: Voter[] = [];
      const remainingVoters = [...voters];

      while (remainingVoters.length > 0) {
        const currentDistrictVoters = [...gameState.currentDistrict.voters, ...validVoters];
        let foundAdjacent = false;

        for (let i = 0; i < remainingVoters.length; i++) {
          const voter = remainingVoters[i];

          // Skip if voter is in another district
          if (isVoterInAnyDistrict(voter.id) && !isVoterInCurrentDistrict(voter.id)) {
            remainingVoters.splice(i, 1);
            i--;
            continue;
          }

          // Skip if already in current district (for drag actions)
          if (isDragAction && isVoterInCurrentDistrict(voter.id)) {
            remainingVoters.splice(i, 1);
            i--;
            continue;
          }

          // Check if voter is adjacent to any voter in current district (including previously added ones)
          const voterIsAdjacent = currentDistrictVoters.some((existingVoter) => isAdjacent(existingVoter, voter));

          if (voterIsAdjacent) {
            validVoters.push(voter);
            remainingVoters.splice(i, 1);
            foundAdjacent = true;
            break;
          }
        }

        // If we couldn't find any adjacent voter, break to avoid infinite loop
        if (!foundAdjacent) {
          break;
        }
      }

      if (validVoters.length === 0) return false;

      const newVoters = [...gameState.currentDistrict.voters, ...validVoters];
      const isComplete = newVoters.length === gameState.requiredDistrictSize;

      const updatedDistrict: District = {
        ...gameState.currentDistrict,
        voters: newVoters,
        isComplete,
      };

      if (isComplete) {
        updateGameState({
          districts: [...gameState.districts, updatedDistrict],
          currentDistrict: null,
        });
      } else {
        updateGameState({ currentDistrict: updatedDistrict });
      }

      return true;
    },
    [gameState, updateGameState, isVoterInAnyDistrict, isVoterInCurrentDistrict, canAddVoterToCurrentDistrict],
  );

  return useMemo(
    () => ({
      isAdjacent,
      isContiguous,
      isVoterInCurrentDistrict,
      isVoterInAnyDistrict,
      canAddVoterToCurrentDistrict,
      getTileState,
      getDistrictForVoter,
      addVoterToDistrict,
      addMultipleVotersToDistrict,
    }),
    [isAdjacent, isContiguous, isVoterInCurrentDistrict, isVoterInAnyDistrict, canAddVoterToCurrentDistrict, getTileState, getDistrictForVoter, addVoterToDistrict, addMultipleVotersToDistrict],
  );
};

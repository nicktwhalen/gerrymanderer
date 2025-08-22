import { renderHook, act } from '@testing-library/react';
import { ReactNode } from 'react';
import { GameProvider, useGame } from '../GameContext';
import { LEVELS } from '@/types/level';
import { VoterType } from '@/types/game';

const createWrapper = () => {
  const TestWrapper = ({ children }: { children: ReactNode }) => (
    <GameProvider>{children}</GameProvider>
  );
  TestWrapper.displayName = 'TestWrapper';
  return TestWrapper;
};

describe('GameContext', () => {
  describe('Initial State', () => {
    it('should initialize with first level', () => {
      const wrapper = createWrapper();
      const { result } = renderHook(() => useGame(), { wrapper });

      expect(result.current.currentLevel).toEqual(LEVELS[0]);
      expect(result.current.gameState.districts).toEqual([]);
      expect(result.current.gameState.currentDistrict).toBeNull();
      expect(result.current.showGameResult).toBe(false);
      expect(result.current.showTutorial).toBe(false);
    });

    it('should calculate correct voter counts from level', () => {
      const wrapper = createWrapper();
      const { result } = renderHook(() => useGame(), { wrapper });

      const level = LEVELS[0];
      const expectedUsCount = level.voterGrid
        .flat()
        .filter((c) => c === VoterType.Us).length;
      const expectedThemCount = level.voterGrid
        .flat()
        .filter((c) => c === VoterType.Them).length;

      expect(result.current.gameState.usCount).toBe(expectedUsCount);
      expect(result.current.gameState.themCount).toBe(expectedThemCount);
    });
  });

  describe('Level Management', () => {
    it('should switch to next level correctly', () => {
      const wrapper = createWrapper();
      const { result } = renderHook(() => useGame(), { wrapper });

      const initialLevel = result.current.currentLevel;

      act(() => {
        result.current.nextLevel();
      });

      expect(result.current.currentLevel.id).toBe(initialLevel.id + 1);
    });

    it('should not advance beyond last level', () => {
      const wrapper = createWrapper();
      const { result } = renderHook(() => useGame(), { wrapper });

      // Set to last level
      act(() => {
        result.current.setCurrentLevel(LEVELS[LEVELS.length - 1]);
      });

      const lastLevel = result.current.currentLevel;

      act(() => {
        result.current.nextLevel();
      });

      // Should remain on last level
      expect(result.current.currentLevel).toEqual(lastLevel);
    });

    it('should calculate hasNextLevel correctly', () => {
      const wrapper = createWrapper();
      const { result } = renderHook(() => useGame(), { wrapper });

      // Should have next level from first level
      expect(result.current.hasNextLevel).toBe(true);

      // Set to last level
      act(() => {
        result.current.setCurrentLevel(LEVELS[LEVELS.length - 1]);
      });

      expect(result.current.hasNextLevel).toBe(false);
    });
  });

  describe('Game State Management', () => {
    it('should reset game correctly', () => {
      const wrapper = createWrapper();
      const { result } = renderHook(() => useGame(), { wrapper });

      // Modify some state
      act(() => {
        result.current.updateGameState({
          districts: [{ id: 'test', voters: [], isComplete: true }],
        });
        result.current.setShowGameResult(true);
      });

      expect(result.current.gameState.districts).toHaveLength(1);
      expect(result.current.showGameResult).toBe(true);

      // Reset
      act(() => {
        result.current.resetGame();
      });

      expect(result.current.gameState.districts).toEqual([]);
      expect(result.current.showGameResult).toBe(false);
    });

    it('should update game state correctly', () => {
      const wrapper = createWrapper();
      const { result } = renderHook(() => useGame(), { wrapper });

      const testDistrict = { id: 'test', voters: [], isComplete: false };

      act(() => {
        result.current.updateGameState({
          currentDistrict: testDistrict,
        });
      });

      expect(result.current.gameState.currentDistrict).toEqual(testDistrict);
    });
  });

  describe('Game Result Calculation', () => {
    it('should return null when game is incomplete', () => {
      const wrapper = createWrapper();
      const { result } = renderHook(() => useGame(), { wrapper });

      expect(result.current.gameResult).toBeNull();
    });

    it('should calculate game result when districts are complete', () => {
      const wrapper = createWrapper();
      const { result } = renderHook(() => useGame(), { wrapper });

      const level = result.current.currentLevel;

      // Create test districts that complete the game
      const testDistricts = Array.from(
        { length: level.districtCount },
        (_, i) => ({
          id: `district-${i}`,
          voters: [
            {
              id: `voter-${i}`,
              row: 0,
              col: i,
              type: i % 2 === 0 ? VoterType.Them : VoterType.Us,
            },
          ],
          isComplete: true,
        }),
      );

      act(() => {
        result.current.updateGameState({
          districts: testDistricts,
        });
      });

      const gameResult = result.current.gameResult;
      expect(gameResult).not.toBeNull();
      expect(gameResult?.isComplete).toBe(true);
      expect(typeof gameResult?.playerWon).toBe('boolean');
    });
  });

  describe('Modal State Management', () => {
    it('should manage tutorial state', () => {
      const wrapper = createWrapper();
      const { result } = renderHook(() => useGame(), { wrapper });

      expect(result.current.showTutorial).toBe(false);

      act(() => {
        result.current.setShowTutorial(true);
      });

      expect(result.current.showTutorial).toBe(true);
    });

    it('should manage game result modal state', () => {
      const wrapper = createWrapper();
      const { result } = renderHook(() => useGame(), { wrapper });

      expect(result.current.showGameResult).toBe(false);

      act(() => {
        result.current.setShowGameResult(true);
      });

      expect(result.current.showGameResult).toBe(true);
    });
  });
});

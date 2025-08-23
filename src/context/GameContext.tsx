'use client';

import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import {
  GameState,
  Voter,
  District,
  GameResult,
  DistrictWinner,
  VoterType,
  US,
  THEM,
} from '@/types/game';
import { Level, LEVELS } from '@/types/level';

interface GameContextType {
  // State
  gameState: GameState;
  currentLevel: Level;
  isDragging: boolean;
  showGameResult: boolean;
  showTutorial: boolean;
  gameKey: number;

  // Actions
  setCurrentLevel: (level: Level) => void;
  updateGameState: (updates: Partial<GameState>) => void;
  setIsDragging: (dragging: boolean) => void;
  setShowGameResult: (show: boolean) => void;
  setShowTutorial: (show: boolean) => void;
  resetGame: () => void;
  nextLevel: () => void;

  // Computed values
  gameResult: GameResult | null;
  hasNextLevel: boolean;
}

type GameAction =
  | { type: 'SET_CURRENT_LEVEL'; payload: Level }
  | { type: 'UPDATE_GAME_STATE'; payload: Partial<GameState> }
  | { type: 'SET_IS_DRAGGING'; payload: boolean }
  | { type: 'SET_SHOW_GAME_RESULT'; payload: boolean }
  | { type: 'SET_SHOW_TUTORIAL'; payload: boolean }
  | { type: 'SET_SHOW_INTRO'; payload: boolean }
  | { type: 'RESET_GAME' }
  | { type: 'NEXT_LEVEL' }
  | { type: 'FORCE_RERENDER' };

interface GameContextState {
  gameState: GameState;
  currentLevel: Level;
  isDragging: boolean;
  showGameResult: boolean;
  showTutorial: boolean;
  gameKey: number;
}

const createBoardFromLevel = (level: Level): Voter[][] => {
  return level.voterGrid.map((row, rowIndex) =>
    row.map((type, colIndex) => ({
      id: `${rowIndex}-${colIndex}`,
      type,
      row: rowIndex,
      col: colIndex,
    })),
  );
};

const calculateGameResult = (
  gameState: GameState,
  currentLevel: Level,
): GameResult | null => {
  if (gameState.districts.length !== currentLevel.districtCount) return null;

  const calculateDistrictWinner = (district: District): DistrictWinner => {
    const usVotes = district.voters.filter(
      (v) => v.type === VoterType.Us,
    ).length;
    const themVotes = district.voters.filter(
      (v) => v.type === VoterType.Them,
    ).length;

    if (usVotes > themVotes) return VoterType.Us;
    if (themVotes > usVotes) return VoterType.Them;
    return 'tie';
  };

  const districtWins = gameState.districts.map(calculateDistrictWinner);
  const usWins = districtWins.filter(
    (winner) => winner === VoterType.Us,
  ).length;
  const themWins = districtWins.filter(
    (winner) => winner === VoterType.Them,
  ).length;
  const ties = districtWins.filter((winner) => winner === 'tie').length;

  return {
    usWins,
    themWins,
    ties,
    playerWon: usWins > themWins,
    isComplete: true,
  };
};

// Note: initialState is now dynamically created in GameProvider based on URL parameters

const gameReducer = (
  state: GameContextState,
  action: GameAction,
): GameContextState => {
  switch (action.type) {
    case 'SET_CURRENT_LEVEL':
      const board = createBoardFromLevel(action.payload);
      const usCount = board
        .flat()
        .filter((v) => v.type === VoterType.Us).length;
      const themCount = board
        .flat()
        .filter((v) => v.type === VoterType.Them).length;

      return {
        ...state,
        currentLevel: action.payload,
        gameState: {
          board,
          districts: [],
          currentDistrict: null,
          requiredDistrictSize: action.payload.districtSize,
          totalDistricts: action.payload.districtCount,
          usCount,
          themCount,
        },
        showGameResult: false, // Reset game result when switching levels
        gameKey: state.gameKey + 1,
      };

    case 'UPDATE_GAME_STATE':
      return {
        ...state,
        gameState: { ...state.gameState, ...action.payload },
      };

    case 'SET_IS_DRAGGING':
      return { ...state, isDragging: action.payload };

    case 'SET_SHOW_GAME_RESULT':
      return { ...state, showGameResult: action.payload };

    case 'SET_SHOW_TUTORIAL':
      return { ...state, showTutorial: action.payload };

    case 'RESET_GAME':
      const resetBoard = createBoardFromLevel(state.currentLevel);
      const resetUsCount = resetBoard
        .flat()
        .filter((v) => v.type === VoterType.Us).length;
      const resetThemCount = resetBoard
        .flat()
        .filter((v) => v.type === VoterType.Them).length;

      return {
        ...state,
        gameState: {
          board: resetBoard,
          districts: [],
          currentDistrict: null,
          requiredDistrictSize: state.currentLevel.districtSize,
          totalDistricts: state.currentLevel.districtCount,
          usCount: resetUsCount,
          themCount: resetThemCount,
        },
        isDragging: false,
        showGameResult: false,
        gameKey: state.gameKey + 1,
      };

    case 'NEXT_LEVEL':
      const currentIndex = LEVELS.findIndex(
        (level) => level.id === state.currentLevel.id,
      );
      if (currentIndex < LEVELS.length - 1) {
        const nextLevel = LEVELS[currentIndex + 1];
        const nextBoard = createBoardFromLevel(nextLevel);
        const nextUsCount = nextBoard
          .flat()
          .filter((v) => v.type === VoterType.Us).length;
        const nextThemCount = nextBoard
          .flat()
          .filter((v) => v.type === VoterType.Them).length;

        return {
          ...state,
          currentLevel: nextLevel,
          gameState: {
            board: nextBoard,
            districts: [],
            currentDistrict: null,
            requiredDistrictSize: nextLevel.districtSize,
            totalDistricts: nextLevel.districtCount,
            usCount: nextUsCount,
            themCount: nextThemCount,
          },
          isDragging: false,
          showGameResult: false,
          gameKey: state.gameKey + 1,
        };
      }
      return state;

    case 'FORCE_RERENDER':
      return { ...state, gameKey: state.gameKey + 1 };

    default:
      return state;
  }
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  // Always start with level 1 to avoid hydration mismatch
  const defaultLevel = LEVELS[0];
  const defaultBoard = createBoardFromLevel(defaultLevel);
  const defaultUsCount = defaultBoard
    .flat()
    .filter((v) => v.type === VoterType.Us).length;
  const defaultThemCount = defaultBoard
    .flat()
    .filter((v) => v.type === VoterType.Them).length;

  const defaultInitialState: GameContextState = {
    gameState: {
      board: defaultBoard,
      districts: [],
      currentDistrict: null,
      requiredDistrictSize: defaultLevel.districtSize,
      totalDistricts: defaultLevel.districtCount,
      usCount: defaultUsCount,
      themCount: defaultThemCount,
    },
    currentLevel: defaultLevel,
    isDragging: false,
    showGameResult: false,
    showTutorial: false,
    gameKey: 0,
  };

  const [state, dispatch] = useReducer(gameReducer, defaultInitialState);

  const setCurrentLevel = useCallback((level: Level) => {
    dispatch({ type: 'SET_CURRENT_LEVEL', payload: level });

    // Update URL to reflect current level
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('level', level.id.toString());
      window.history.replaceState({}, '', url.toString());
    }
  }, []);

  // Effect to handle URL parameter after hydration
  useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'test') {
      const urlParams = new URLSearchParams(window.location.search);
      const levelParam = urlParams.get('level');

      if (levelParam) {
        const levelId = parseInt(levelParam, 10);
        const level = LEVELS.find((l) => l.id === levelId);
        if (level) {
          setCurrentLevel(level);
        }
      }
    }
  }, []); // Run once after mount

  const updateGameState = useCallback((updates: Partial<GameState>) => {
    dispatch({ type: 'UPDATE_GAME_STATE', payload: updates });
  }, []);

  const setIsDragging = useCallback((dragging: boolean) => {
    dispatch({ type: 'SET_IS_DRAGGING', payload: dragging });
  }, []);

  const setShowGameResult = useCallback((show: boolean) => {
    dispatch({ type: 'SET_SHOW_GAME_RESULT', payload: show });
  }, []);

  const setShowTutorial = useCallback((show: boolean) => {
    dispatch({ type: 'SET_SHOW_TUTORIAL', payload: show });
  }, []);

  const resetGame = useCallback(() => {
    dispatch({ type: 'RESET_GAME' });
  }, []);

  const nextLevel = useCallback(() => {
    const currentIndex = LEVELS.findIndex(
      (level) => level.id === state.currentLevel.id,
    );
    if (currentIndex < LEVELS.length - 1) {
      const nextLevelObj = LEVELS[currentIndex + 1];
      dispatch({ type: 'NEXT_LEVEL' });

      // Update URL to reflect next level
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        url.searchParams.set('level', nextLevelObj.id.toString());
        window.history.replaceState({}, '', url.toString());
      }
    }
  }, [state.currentLevel.id]);

  const gameResult = useMemo(() => {
    const result = calculateGameResult(state.gameState, state.currentLevel);
    return result;
  }, [state.gameState, state.currentLevel, state.showGameResult]);

  const hasNextLevel = useMemo(
    () =>
      LEVELS.findIndex((level) => level.id === state.currentLevel.id) <
      LEVELS.length - 1,
    [state.currentLevel.id],
  );

  const contextValue = useMemo(
    () => ({
      ...state,
      setCurrentLevel,
      updateGameState,
      setIsDragging,
      setShowGameResult,
      setShowTutorial,
      resetGame,
      nextLevel,
      gameResult,
      hasNextLevel,
    }),
    [
      state,
      setCurrentLevel,
      updateGameState,
      setIsDragging,
      setShowGameResult,
      setShowTutorial,
      resetGame,
      nextLevel,
      gameResult,
      hasNextLevel,
    ],
  );

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
